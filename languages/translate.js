//translate (ecam v3)

//default language
let lang='en';

//languages list
let langs=[
  'en',
  'es',
  'fr',
  'th',
  'de',
];

//load all language files async
let Languages={};
langs.forEach(lang=>{
  fetch(`languages/${lang}.json`).then(response=>
    response.json()
  ).then(jsonResponse => {
    Languages[lang] = jsonResponse;
  });
});

//translate a language tag
function translate(id){
  if(lang=="null"){
    return `[#${id}]`;
  }else{
    if(Languages[lang]){
      return Languages[lang][`#${id}`] || `[#${id}]`;
    }else{
      return `[#${id}]`;
    }
  }
}
