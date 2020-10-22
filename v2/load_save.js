/* Generate a json/text file of the Global object */
function saveToFile() {
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
}

/*update Global object with loaded file parsed to JSON*/
function loadFile(evt) {
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
}
