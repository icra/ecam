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

    document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"  ");
    /**
      *
      * Compress Global (using LZString library)
      *
      */
    //stringify 'Global'
    var uncompressed = JSON.stringify(Global);

    //compress the string
    var compressed = LZString.compressToEncodedURIComponent(uncompressed); 

    //Set cookie GLOBAL as compressed
    setCookie("GLOBAL",compressed);

    //set cookies for Substages
    Structure.filter(s=>s.sublevel).forEach(s=>{
      setCookie(s.alias, LZString.compressToEncodedURIComponent(JSON.stringify(Substages[s.level][s.sublevel]))); 
    });

    //cookieSummary();
    //console.timeEnd('updateResult');
  }

  /** Display an ascii table in Console to summarize all cookie sizes */
  function cookieSummary(){
    if(getCookie('GLOBAL')){
      console.log( ""+
        "[*] Cookies chars lengths:\n"+
        " |--* Uncompressed : "+JSON.stringify(Global).length+" \n"+
        " |--* Compressed   : "+getCookie('GLOBAL').length+"\n"+
      "");
      Structure.filter(s=>s.sublevel).forEach(s=>{
        console.log(" |--* "+alias+": "+getCookie(s.alias).length);
      });
    }
  }
</script>
