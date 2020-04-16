//languages object (v3)
let Languages={
  list:[
    'en',
    'es',
    'fr',
    'th',
    'de',
  ],

  //default lang
  current:"en",

  //all languages loaded?
  ready:false,

  //language tags for all languages are loaded here
  tags:{},

  //load all language tags
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
          ecam.force_update();
        }
      });
    });
  },

  //translate a tag
  translate(id){
    //current language
    let lang = this.current;

    //null language (for debugging)
    if(lang=='null'){ return `[#${id}]` }

    //language not found: return tag id
    if(!this.tags[lang]){
      //console.warn(`'#${lang}' language not found`);
      return `[#${id}]`;
    }

    //normal case
    return this.tags[lang][`#${id}`] || `[#${id}]`;
  },
};

Languages.load();

function translate(id){
  return Languages.translate(id);
}
