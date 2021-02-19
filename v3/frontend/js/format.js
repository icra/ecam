/*convert number to formated string: i.e. "3.999,4" instead of 3999.4*/
function format(number,digits,divisor){

  //deal with unit changes from here
  if(divisor){
    number /= divisor;
  }

  //default digits for values
  if(digits==undefined){
    if(number>=1000) digits=0;
    if(number<1000)  digits=1;
    if(number< 100)  digits=2;
    if(number<0.10)  digits=3;
    if(number<0.01)  digits=4;
  }else{
    digits=digits||0;
  }

  //get the result string
  let str=new Intl.NumberFormat('en-EN',{maximumFractionDigits:digits}).format(number);

  //if "NaN" or "Infinity" display 'missing inputs'
  if(str=="NaN" || !isFinite(number)){
    return `~${translate('missing_inputs')}`;
  }

  //return resulting string
  return str;
}
