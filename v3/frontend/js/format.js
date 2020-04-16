/*convert number to formated string: i.e. "3.999,4" instead of 3999.4*/
function format(number,digits){
  //default digits if not specified
  digits=digits||0;

  //default digits for values
  if(number<1000) digits=1;
  if(number< 100) digits=2;
  if(number<0.10) digits=3;
  if(number<0.01) digits=4;

  //for non applicable
  if(number=="NA"){ return "<span style=color:#ccc>NA</span>"; }

  //get the result string
  var str=new Intl.NumberFormat('en-EN',{maximumFractionDigits:digits}).format(number);

  //if "NaN" or "Infinity" display 'missing inputs'
  if(str=="NaN" || !isFinite(number)) return "<span style=color:#666;font-size:10px>~"+translate('missing_inputs')+"</span>";

  //return resulting string
  return str;
}
