/**
 * @file Personal Home Page scripts
 * @author Georgi D. Sotirov <gdsotirov@gmail.com>
 * @license GPL-2.0-only
 */

/* String IDs */
var PLS_FILL_MSG_BODY = 0;
var PROBLEMS_REPORT   = 1;

/* Bulgarian strings */
var strBG = new Array(
 /*  0 */ "Моля, попълнете тялото на съобщението!",
 /*  1 */ "Проблем с вашата страница в потребителски агент '%s'!");

/* English strings */
var strEN = new Array(
 /*  0 */ "Please, fill in the message body!",
 /*  1 */ "Problems with your page in user agent '%s'!");

/* Language translation array */
var strLang = new Array(strBG, strEN);

/**
 * Retrieve language id based on language i18n name
 * @param {string} langStr Language code (e.g. bg or en)
 * @returns Index in the language translation array
 */
function getLangId(langStr) {
  switch (langStr) {
    case "bg": return 0;
    case "en": return 1;
    default  : return 1;
  }
}

/**
 * Translates a string in different languages.
 * Conformance: DOM L1, ECMAScript
 * @param {number} strId Identifier of the string to translate
 * @returns Requested string in the corresponding page language
 */
function translateString(strId) {
  var htmltags = document.getElementsByTagName("html");
  var htmltag = htmltags[0];
  var lang = htmltag.lang;
  var langId = getLangId(lang);

  return strLang[langId][strId];
}

/**
 * Check the body of the ICQ message and alert the user if it's empty.
 * Conformance: DOM L1, ECMAScript
 * @returns False if empty, otherwise true
 */
function checkMsgBody() {
  var body = document.getElementById("body");

  if ( body.value == "" ) {
    alert(translateString(PLS_FILL_MSG_BODY));
    body.focus();
    return false;
  }
  return true;
}

/**
 * Provide user with easy way to report problems with the page.
 * Conformance: DOM L1, DOM L0!, ECMA Script
 */
function genProblemsReport() {
  var strAddress = "gdsotirov@gmail.com";
  var strUA = navigator.userAgent; /* Warning: DOM L0 - Not in the specification. */
  var strSubject = translateString(PROBLEMS_REPORT);
  strSubject = sprintf(strSubject, strUA);
  var strHref = "mailto:" + strAddress + "?subject=" + strSubject;
  var linkSend = document.getElementById("ProblemsReport");
  linkSend.setAttribute("href", strHref);
}

