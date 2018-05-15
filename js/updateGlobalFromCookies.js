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
      //only copy fields that match in its type
      if(typeof(object_to[field])==typeof(object_from[field])){
        object_to[field]=object_from[field];
      }else{
        //bug fix for user custom cfg
        if(object_to==Global.Configuration.Units ||      //custom units
           object_to==Global.Configuration['Yes/No'] ||  //answers to Questions
           object_to==Global.Configuration.Expanded      //display or not inputs for a particular question
        ){
          object_to[field]=object_from[field];
        }
      }
    }
  });
}

/**
  *
  * OVERWRITE "Global" AND "Substages" objects with cookie content
  *
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
  Substages.Water.Abstraction  = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('waterAbs')));
  Substages.Water.Treatment    = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('waterTre')));
  Substages.Water.Distribution = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('waterDis')));
  Substages.Waste.Collection   = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('wasteCol')));
  Substages.Waste.Treatment    = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('wasteTre')));
  Substages.Waste.Discharge    = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('wasteDis')));

  //set the value of the constants ct_ch4_eq and ct_n2o from the Global.Configuration.Selected.gwp_reports_index
  Cts.ct_ch4_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_ch4_eq;
  Cts.ct_n2o_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_n2o_eq;
}
