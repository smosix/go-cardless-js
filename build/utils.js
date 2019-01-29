"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function attributeDeprecationWarning(attr, prevAttr, newAttr) {
    if (attr) {
        console.warn("deprecation warning: " + prevAttr + " is being deprecated, please use " + newAttr);
    }
}
exports.attributeDeprecationWarning = attributeDeprecationWarning;
function apiDeprecationWarning(prevAttr, newAttr) {
    console.warn("deprecation warning: the api named " + prevAttr + " is being deprecated, please use the new " + newAttr);
}
exports.apiDeprecationWarning = apiDeprecationWarning;
function responseDeprecationWarning(attr) {
    console.warn("deprecation warning: the response format for requests is changing. the new format will no longer having resources nested under their envelope name " + attr);
}
exports.responseDeprecationWarning = responseDeprecationWarning;
