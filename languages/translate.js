//translate (ecam v3)

//default language
let lang='en';

//all language tags
//TODO
let Languages={
  'en':{},
  'es':{},
  'de':{},
  //ETC TODO
}

//load files async
//TODO

function translate(id){
  if(lang=="null"){
    return `[#${id}]`;
  }else{
    return Languages[lang][id] || `[#${id}]`;
  }
}
