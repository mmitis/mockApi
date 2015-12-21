/**
 * Created by mmitis on 19.12.15.
 */

import Handlebars from "handlebars";
import _ from 'lodash';
import q from 'q';
import LRU from 'lru-cache';
import md5 from 'md5';


/**
 * Loader for the templating engine
 */
class HandlebarsLoader {

    var cache = LRU(500);

    constructor(){


    }
    /**
     * Function to generate template
     * @param templateName {string} templateName
     * @param language   {String} template language
     * @param properties {Object} fields to render template
     * @param fromCache  should force to not load from cache
     * @returns {string} rendered template
     */
    static loadTemplateAsync(templateName, language, properties, forceLoad) {
        var self = this;
        var deferred = q.defer();
        var lang = language || 'en';
        var templateUrl = config.root + '/views/'+ lang +'/' + templateName + '.handlebars';

        var cachedTemplate = self.cache.get(md5(templateUrl + properties.toString()));
        //try load from cache
        if(cachedTemplate && forceLoad !== true){
            deferred.resolve(cachedTemplate);
        } else {
            fs.readFile(templateUrl, function (err, templateData) {
                if (err) {
                    deferred.reject(err);
                }
                var generated = Handlebars.compile(templateData)(properties);
                //save in cache
                self.cache.set(md5(templateUrl + properties.toString(), generated));
                deferred.resolve(generated);
            });
        }
        return deferred.promise;
    }
}
export default HandlebarsLoader;
