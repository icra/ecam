//languages object (v3)
let Languages={
  //default lang
  current:"en",

  //all langs
  list:['en','es','fr','th','de','ar',],

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
        }
      });
    });
  },

  //translate a tag
  translate(id){
    //current language
    let lang = this.current;

    //null language (show tag instead of translation)
    if(lang=='null'){
      return `["#${id}"]`;
    }

    //language not found
    if(!this.tags[lang]){
      let warn=`"#${id}" - language not found]`;
      console.warn(warn);
      return `["#${id}"]`;
    }

    //translation not found
    if(!this.tags[lang][`#${id}`]){
      let warn=`"#${id}" - translation not found]`;
      console.warn(warn);
      return `["#${id}"]`;
    }

    //translation found
    return this.tags[lang][`#${id}`];
  },
};

//start loading language tags
Languages.load();

//make "translate" a global function
function translate(id){
  return Languages.translate(id);
}
