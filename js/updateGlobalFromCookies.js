/**
  Update Global and Substages objects without overwriting functions,
  since JSON.stringify does not stringify object fields that are functions
**/

function copyFieldsFrom(object_from,object_to){
  //go through object keys
  Object.keys(object_from).forEach(field=>{
    //copy substages
    if(object_from[field].constructor===Array) {
      object_to[field]=object_from[field];
      return;
    }

    /**
       field is never a function because of JSON.stringify
       if field is object, recursive call.
       if field is number or string, copy it
    */
    if(typeof(object_from[field])=="object") {
      /*
       * HOTFIX FOR OLD JSON FILES
       * Problem: "field" may have space characters
       * Solution: Remove spaces with String.replace()
       */
      var newField=field.replace(/ /g,"");
      copyFieldsFrom(object_from[field],object_to[newField]);
    }else{
      //copy always these values
      if(object_to==Global.Configuration.Units ||      //custom units
         object_to==Global.Configuration['Yes/No'] ||  //answers to Questions (filters)
         object_to==Global.Configuration.Expanded      //display or not inputs for a particular question
      ){
        object_to[field]=object_from[field];
      }

      var type_from = typeof object_from[field];
      var type_to   = typeof object_to[field];

      //rest: copy only values that match in its type
      if(type_from==type_to){
        object_to[field]=object_from[field];
      }else if(type_from!='number' && type_to=='number'){
        //new variables: set to zero
        object_to[field]=0;
      }else if(type_from=='number' && type_to!='number'){
        //old variables: do nothing
        console.warn(field,' is an old variable; not loaded');
        alert("Input '("+field+" = "+format(object_from[field])+")' not loaded. It is an old variable that has been modified or removed in this version. You might need to reenter it.");
      }else{
        //do nothing
        console.warn(field,' types do not match');
      }
    }
  });
}

/**
  * OVERWRITE "Global" AND "Substages" objects with the parsed cookie content
  */
if(getCookie("GLOBAL")!==null){
  /**
  *
  * Decompress cookie global
  *
  */

  //compressed is a string with weird symbols
  var compressed=getCookie('GLOBAL');

  //decompressed is a string with the JSON structure of Global
  var decompressed=LZString.decompressFromEncodedURIComponent(compressed);

  //parsed now is a real object
  var parsed=JSON.parse(decompressed);

  //copy the fields from parsed to Global
  copyFieldsFrom(parsed,Global);

  //decompress and parse Substages in one step
  Structure.filter(s=>s.sublevel).forEach(s=>{
    Substages[s.level][s.sublevel]=JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie(s.alias)));
  });

  //set the value of the constants ct_ch4_eq and ct_n2o from the Global.Configuration.Selected.gwp_reports_index
  Cts.ct_ch4_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_ch4_eq;
  Cts.ct_n2o_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_n2o_eq;
}
