//properly display subindexes and superindexes in HTML
String.prototype.prettify=function(){
  let str=new String(this);
  str=str.replace(/CO2/g, "CO<sub>2</sub>");
  str=str.replace(/N2O/g, "N<sub>2</sub>O");
  str=str.replace(/CH4/g, "CH<sub>4</sub>");
  str=str.replace(/BOD5/g,"BOD<sub>5</sub>");
  str=str.replace(/DBO5/g,"DBO<sub>5</sub>");
  str=str.replace(/H2O/g, "H<sub>2</sub>O");
  str=str.replace(/C6H12O6/g, "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>");

  str=str.replace(/m3/g,  "m<sup>3</sup>");
  str=str.replace(/m2/g,  "m<sup>2</sup>");
  str=str.replace(/s2/g,  "s<sup>2</sup>");
  return str;
}

//TEST
/*
  let a = "CO2 N2O CH4 blabla";
  let b = a.prettify();
  console.log({a,b});
*/
