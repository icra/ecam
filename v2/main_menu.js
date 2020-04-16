//functions: new | open | save | clear
//TODO

let main_menu={
  //new
  newSystem() {
    removeAllCookies();
    window.location="getStarted.php";
  },

  //save: generate a json/text file
  saveToFile(){
    let SavedFile={
      "Global":Global,
      "Substages":Substages,
    };
    let link=document.createElement('a');
    link.href="data:text/json;charset=utf-8,"+JSON.stringify(SavedFile,null,'  '); //with newlines
    link.download=Global.General.Name+".json";
    link.style.display='';
    document.body.appendChild(link);
    link.click();
  },

  //load json file
  loadFile(evt) {
    //get json file contents
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload=function(){
      let SavedFile = JSON.parse(reader.result);

      copyFieldsFrom(SavedFile.Global, Global);
      copyFieldsFrom(SavedFile.Substages, Substages);
      //substages are saved unpacked, no need to convert

      //solve bug #183 after Global loaded (related to tier A visibility)
      Structure.filter(s=>!s.sublevel).forEach(s=>{
        Global.Configuration.Expanded[s.alias]=1;
      });

      updateResult(); //write cookies
      window.location='sources.php';
    }
    try{
      reader.readAsText(file);
    }catch(e){alert(e)}
  },

  //clear
  removeAllCookies() {
    removeCookie("Global");
    removeCookie("Substages");
  },

  clearSystem() {
    removeAllCookies();
    window.location='index.php';
  },
}
