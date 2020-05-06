//languages object (v3)
let Languages={
  //default lang
  current:"en",

  //all langs
  list:[ 'en', 'es', 'fr', 'th', 'de', 'ar', ],

  //are all languages loaded?
  ready:false,

  //language tags for all languages are loaded here
  tags:{},

  //load all languages
  load(){
    let loaded_languages=[];
    this.list.forEach(lang=>{
      fetch(`frontend/languages/${lang}.json`).then(response=>
        response.json()
      ).then(jsonResponse => {
        this.tags[lang] = jsonResponse;
        loaded_languages.push(lang);
        if(loaded_languages.length == this.list.length){
          this.ready = true;
          if(typeof ecam == 'object'){
            ecam.force_update();
          }
        }
      });
    });
  },

  //translate a tag
  translate(id){
    //current language
    let lang = this.current;

    //null language (for debugging)
    if(lang=='null'){ 
      return `["#${id}"]`; 
    }

    //language not found
    if(!this.tags[lang]){
      return `["#${id}" - language not found]`; 
    }

    //normal case or tag not found
    return this.tags[lang][`#${id}`] || `["#${id}" - tag not found]`;
  },
};

Languages.load();

//make translate global
function translate(id){
  return Languages.translate(id);
}
