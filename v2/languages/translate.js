//languages object (ecam v3)
let Languages={
  current:"en", //default lang

  list:[
    'en',
    'es',
    'fr',
    'th',
    'de',
  ],

  tags:{}, //language tags for all languages here

  //load all language tags
  load(){
    this.list.forEach(lang=>{
      fetch(`languages/${lang}.json`).then(response=>
        response.json()
      ).then(jsonResponse => {
        this.tags[lang] = jsonResponse;
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
