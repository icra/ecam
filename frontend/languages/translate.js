//languages object (v3)
let Languages={
  //default lang
  current:"en",

  //all langs
  list:['en','es','fr','th','de','ar','pl'],

  //are all languages loaded?
  ready:false,

  //language tags for all languages are loaded here
  tags:{},

  //load all language json files
  load(){
    let loaded_languages=[];
    this.list.forEach(lang=>{
      fetch(`frontend/languages/${lang}.json`).then(response=>
        response.json()
      ).then(jsonResponse=>{
        this.tags[lang]=jsonResponse;
        loaded_languages.push(lang);
        if(loaded_languages.length==this.list.length){
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
      let error =`"#${id}" - language "${lang}" not found]`;
      throw(error);
    }

    //tag not found
    if(!this.tags[lang][`#${id}`]){
      //add tag to the list of not found tags
      this.not_found_tags[`#${id}`]=1;

      //fall back to english translation
      if(!debug){
        return this.tags.en[`#${id}`] ? this.tags.en[`#${id}`]:`["#${id}"]`;
      }

      return `["#${id}"]`;
    }

    /*translation found*/

    //store "id" as "used"
    this.used_tags[`#${id}`]=1;

    return this.tags[lang][`#${id}`];
  },

  //container to store used tags
  //by default is empty when ecam loads
  //goal: identify not used tags (fx find_not_used_tags)
  used_tags:{},

  //find unused tags for current language
  //note: a tag has to been displayed in order to set it as used
  find_not_used_tags(){ //->Array
    let lang=this.current; //current language

    //lang checks
    if(lang=='null') return [];
    if(!this.tags[lang]) throw `language '${lang}' not found`;

    let found=[];//return value
    Object.keys(this.tags[lang]).forEach(tag=>{
      if(!this.used_tags[tag]){
        found.push(tag);
      }
    });

    return found;
  },

  //container to store not found tags
  not_found_tags:{},
};

//start loading language tags
Languages.load();

//make "translate" a global function
function translate(id){
  return Languages.translate(id);
}
