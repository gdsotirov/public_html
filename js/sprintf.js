/**
 * @file Implements a C like sprintf function
 * @author Jan Moesen (jan.moesen.nu)
 * @see https://jan.moesen.nu/code/javascript/sprintf-and-printf-in-javascript/
 * Modified by: Georgi D. Sotirov, gdsotirov@gmail.com
 */

/**
 * C like sprintf function
 * @param {string} format String with formatting directives
 * @returns String with formatting directives replaced
 */
function sprintf(format) {
  if ( arguments.length < 1 )
    return;

  var str = arguments[0];
  var re = /([^%]*)%(.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
  var a = [];
  var numSubstitutions = 0;
  var numMatches = 0;

  while ( a = re.exec(str) ) {
    var leftpart = a[1];
    var pPrecision = a[5], pType = a[6], rightPart = a[7];

    numMatches++;
    if ( pType == '%' )
      subst = '%';
    else {
      numSubstitutions++;
      if ( numSubstitutions >= arguments.length )
        console.log('Error! Not enough function arguments (' + (arguments.length - 1) + ', excluding the string)\nfor the number of substitution parameters in string (' + numSubstitutions + ' so far).');

      var param = arguments[numSubstitutions];
      var precision = -1;
      if ( pPrecision && pType == 'f' )
        precision = parseInt(pPrecision.substring(1));
      var subst;
      switch ( pType ) {
        case 'b': subst = parseInt(param).toString(2);
                  break;
        case 'c': subst = String.fromCharCode(parseInt(param));
                  break;
        case 'd': subst = parseInt(param) ? parseInt(param) : 0;
                  break;
        case 'u': subst = Math.abs(param);
                  break;
        case 'f': subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision): parseFloat(param);
                  break;
        case 'o': subst = parseInt(param).toString(8);
                  break;
        case 's': subst = param;
                  break;
        case 'x': subst = ('' + parseInt(param).toString(16)).toLowerCase();
                  break;
        case 'X': subst = ('' + parseInt(param).toString(16)).toUpperCase();
                  break;
      }
      str = leftpart + subst + rightPart;
    }
  }
  return str;
}

