//capitalize first letter of a string
String.prototype.ucfirst = function(){
  let str = new String(this);
  let rv = str[0].toUpperCase();
  rv += str.substring(1);
  return rv;
}
