/* Georgi Dimitrov Sotirov's Personal Home Page
 * Written by Georgi D. Sotirov, gdsotirov@dir.bg
 *
 * Scripting
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

//var strLangId = new Array("bg", "en");
var strLang = new Array(strBG, strEN);

/* Function   : getLangId
 * Description: Retrive language id based on language i18n name.
 */
function getLangId(langStr) {
  switch (langStr) {
    case "bg": return 0;
    case "en": return 1;
    default  : return 1;
  }
}

/* Function   : translateString
 * Description: This function helps multilingual support.
 * Conformance: DOM L1, ECMAScript
 * Return val.: Requested string in the corresponding page language.
 */
function translateString(strId) {
  var htmltags = document.getElementsByTagName("html");
  /* TODO: Check if this is collection or not. */
  var htmltag = htmltags[0];
  var lang = htmltag.lang;
  var langId = getLangId(lang);

  return strLang[langId][strId];
}

/* Function   : checkMsgBody
 * Description: Check the body of the ICQ message and alert the user if it's
 *              not filled.
 * Conformance: DOM L1, ECMAScript
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

/* Function   : genProblemsReport
 * Description: Provide user with easy way to report problems with the page.
 * Conformance: DOM L1, DOM L0!, ECMA Script
 */
function genProblemsReport() {
  var strAddress = "gdsotirov@dir.bg";
  var strUA = navigator.userAgent; /* Warning: DOM L0 - Not in the specification. */
  var strSubject = translateString(PROBLEMS_REPORT);
  strSubject = sprintf(strSubject, strUA);
  var strHref = "mailto:" + strAddress + "?subject=" + strSubject;
  var linkSend = document.getElementById("ProblemsReport");
  linkSend.setAttribute("href", strHref);
}
