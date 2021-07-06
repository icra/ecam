/*convert a number to formated string. Example: 3999.4 --> "3.999,4" */
function format(number,digits,divisor){
  //deal with unit changes using "divisor"
  if(divisor && typeof(divisor)=='number'){
    number /= divisor;
  }

  //default digits for values
  if(digits==undefined){
    if(number>=1000   ) digits=0;
    if(number< 1000   ) digits=1;
    if(number<  100   ) digits=2;
    if(number<    0.10) digits=3;
    if(number<    0.01) digits=4;
  }else{
    //use parameter supplied
    digits=digits||0;
  }

  //get the result string
  let str=new Intl.NumberFormat('en-EN',{maximumFractionDigits:digits}).format(number);

  //if resulting string is "NaN" or "Infinity" turn it to 'missing inputs'
  if(str=="NaN" || !isFinite(number)){
    str=`~${translate('missing_inputs')}`;
  }

  //return formatted string
  return str;
}
