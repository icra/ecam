<div id=currentJson style="display:
none;">
  <!--global-->
  <div class=inline style="text-align:left;border:1px solid #ccc;width:50%;background:#fafafa">
    <pre><span id=currentGlobal></span></pre>
  </div>
</div>
<script>
  /** Stringify Global object and display it */
  /** COOKIE SIZE LIMIT FOR GOOGLE CHROME IS ~ 8170 CHARACTERS */
  function updateResult() {
    //console.time('updateResult');
    //document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"  ");
    /*Compress the object "Global" (using LZString library) */
    setCookie("Global",    LZString.compressToEncodedURIComponent(JSON.stringify(Global))); 
    setCookie("Substages", LZString.compressToEncodedURIComponent(JSON.stringify(compress_Substages()))); 
    //cookieSummary(); //debugging info
    //console.timeEnd('updateResult');
  }

  /** Display an ascii table in Console to summarize all cookie sizes */
  function cookieSummary(){
    if(getCookie('Global')){
      var uG = JSON.stringify(Global).length;
      var cG = getCookie('Global').length;
      var uS = JSON.stringify(Substages).length;
      var cS = getCookie('Substages').length;
      console.log( ""+
        "[*] Cookies chars lengths:\n"+
        " |--* Uncompressed Global:    "+uG+"\n"+
        " |--* Compressed   Global:    "+cG+"\n"+
        " |--* Uncompressed Substages: "+uS+" \n"+
        " |--* Compressed   Substages: "+cS+"\n"+
        " TOTAL compressed = "+format(100*(cG+cS)/8170)+"%\n"+
      "");
    }
  }

  //memory improvement: this function works with the unpack_Substages at "js/updateGlobalFromCookies.js"
  function compress_Substages(){
    var Compacted=JSON.parse(JSON.stringify(Substages)); //clone object
    Object.keys(Compacted).forEach(l1=>{
      Object.keys(Compacted[l1]).forEach(l2=>{
        var substages = Compacted[l1][l2];
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
</script>
