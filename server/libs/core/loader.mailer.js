/**
 * Created by mmitis on 19.12.15.
 */
import _ from 'lodash';
import q from 'q';
import lrucache from 'lru-cache';
import config from './../../config/config';
import nodemailer from 'nodemailer';

/**
 * Loader for mailing
 */
class MailerLoader {

    var transporter;
    var queue = [];
    var queueInterval;

    constructor(){
        this.transporter = nodemailer.createTransport(smtpTransport(config.mail));
        this.queueInterval = setInterval(this.sendFromQueue, config.mail.interval);
    }

    /**
     * Get mails from the queue if exist and send them via transport
     * @returns {deferred.promise|{then, always}|*}
     */
    sendFromQueue(){
        var requestMap = [],
            deferred = q.defer();

        for(var i = 0; i < config.mail.mailsPerInterval ; i++){
            if(queue.length > 0){
                var mailOptions = queue.shift();
                requestMap.push(this.transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        deferred.reject(error);
                    }
                    deferred.resolve(info)
                }));
            }
        }
        q.all(requestMap).then(function(data){
            deferred.resolve(data);
        }).catch(function(e){
            deferred.reject(e);
        });
        return deferred.promise;
    }

    /**
     * Add mail to the sending queue (doesn't send mail)
     * @param receiveMail mail of receiver
     * @param subjectString - string with the subject of the mail
     * @param templateString - html content of the mail
     * @returns {deferred.promise|{then, always}|*}
     */
    queueMail(receiveMail, subjectString, templateString){
        var deferred = q.defer();
        this.queue.push({
            from: config.mail.email,
            to: receiveMail,
            subject: subjectString,
            html: templateString
        });
        deferred.resolve(queue.length);
        return deferred.promise;

    }

    /**
     * Sends mail to the receiver
     * @param receiveMail mail of receiver
     * @param subjectString - string with the subject of the mail
     * @param templateString - html content of the mail
     * @returns {deferred.promise|{then, always}|*}
     */
    sendMail(receiveMail, subjectString, templateString){
        var deferred = q.defer();
        var mailOptions = {
            from: config.mail.email,
            to: receiveMail,
            subject: subjectString,
            html: templateString
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if(error){
                deferred.reject(error);
            }
            deferred.resolve(info)
        });
        return deferred.promise;
    }
}
export default MailerLoader;
