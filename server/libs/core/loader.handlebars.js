/**
 * Created by mmitis on 19.12.15.
 */

import Handlebars from "handlebars";
import _ from 'lodash';
import q from 'q';
class HandlebarsLoader {

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

    loadTemplateSync(templateName, language, properties, fromCache) {
        var deferred = q.defer();
        var lang = language;
        var templateUrl = config.root + '/views/mails/' + template + '_' + lang + '.mustache';
        fs.readFile(templateUrl, function (err, data) {
            if (err) {

                throw err;
            }
    });
    return deferred.promise;
}



}
export default HandlebarsLoader;
