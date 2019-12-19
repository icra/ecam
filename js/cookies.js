/* 
 * RAW COOKIE FUNCTIONS 
 */

/* new cookie */
function setCookie(name,value,days){
  //expires
  days=days||365;
  var d=new Date();
  d.setTime(d.getTime()+(days*24*60*60*1000));
  var expires="expires="+d.toUTCString();
  //set cookie
  document.cookie=name+"="+value+";"+expires;
}

/* read cookie */
function getCookie(name){
  var nameEQ=name+"=";
  var ca=document.cookie.split(';');
  for(var i=0;i<ca.length;i++) {
    var c=ca[i];
    while(c.charAt(0)==' '){c=c.substring(1,c.length);}
    if(c.indexOf(nameEQ)==0) {  
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

/* remove cookie */
function removeCookie(name){
  document.cookie=name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  console.log("Cookie '"+name+"' removed");
}

/* 
 * ECAM RELATED COOKIE FUNCTIONS
 */

/* stringify Global object*/
function updateResult() {
  //console.time('updateResult');
  /*compress "Global" (using LZString library) */
  /* COOKIE SIZE LIMIT FOR GOOGLE CHROME IS ~ 8170 CHARACTERS */
  try{
    setCookie("Global",    LZString.compressToEncodedURIComponent(JSON.stringify(Global              )));
    setCookie("Substages", LZString.compressToEncodedURIComponent(JSON.stringify(compress_Substages())));
  }catch(e){
    alert(e);
    return false;
  }
  //console.timeEnd('updateResult');
  console.log(`cookies written (length: ${document.cookie.length})`);
  //cookieSummary();
}

/* Display an ascii table in Console to summarize all cookie sizes */
function cookieSummary(){
  if(getCookie('Global')){
    let uG = JSON.stringify(Global).length;
    let cG = getCookie('Global').length;
    let uS = JSON.stringify(Substages).length;
    let cS = getCookie('Substages').length;
    console.log(""+
      "[*] Cookies chars lengths:\n"+
      " |--* Uncompressed Global:    "+uG+"\n"+
      " |--* Compressed   Global:    "+cG+"\n"+
      " |--* Uncompressed Substages: "+uS+"\n"+
      " |--* Compressed   Substages: "+cS+"\n"+
      " TOTAL compressed = "+format(100*(cG+cS)/8170)+"%\n"+
    "");
  }
}

//memory improvement: compress Substages object to save space in cookies
function compress_Substages(){
  let Compacted=JSON.parse(JSON.stringify(Substages)); //clone object
  Object.keys(Compacted).forEach(l1=>{
    Object.keys(Compacted[l1]).forEach(l2=>{
      let substages = Compacted[l1][l2];
      if(substages.length==0) return;
      //convert each field of the first substage to an array
      Object.keys(substages[0]).forEach(key=>{
        substages[0][key]=[substages[0][key]];
      });
      //add each field of the substages to the new arrays
      substages.forEach((substage,i)=>{
        if(i==0)return;
        Object.keys(substage).forEach(key=>{
          substages[0][key].push(substage[key]);
        });
      });
      //Delete the other substages other than 0
      substages.splice(1,substages.length);
    });
  });
  //console.log(JSON.stringify(Substages).length);
  //console.log(JSON.stringify(Compacted).length);
  return Compacted;
}

//memory improvement: revert to the non compacted original structure
function unpack_Substages(Compacted){
  let Unpacked={};
  Object.keys(Compacted).forEach(l1=>{
    Unpacked[l1]={};
    Object.keys(Compacted[l1]).forEach(l2=>{
      let substage_from = Compacted[l1][l2][0]; //object
      Unpacked[l1][l2]=[];                      //new array
      if(!substage_from)return;
      let n=substage_from.name.length; //number of substages to create
      //console.log(l1,l2,n);
      for(let i=0;i<n;i++){
        let new_substage={};//new empty object
        Object.keys(substage_from).forEach(key=>{
          new_substage[key]=substage_from[key][i];
        });
        Unpacked[l1][l2].push(new_substage);
      }
    });
  });
  return Unpacked;
}
