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
        console.log(object_from[field]);
        console.log(object_to[field]);
      }
    }
  });
}

/**
  * OVERWRITE "Global" AND "Substages" objects with the parsed cookie content
  */
if(getCookie("Global")!==null){
  /**
  *
  * Decompress cookie global
  *
  */

  //compressed is a string with weird symbols
  //decompressed is a string with the JSON structure of Global
  //parsed now is a real object
  //copy the fields from parsed to Global
  var compressed=getCookie('Global');
  var decompressed=LZString.decompressFromEncodedURIComponent(compressed);
  var parsed=JSON.parse(decompressed);
  copyFieldsFrom(parsed,Global);

  //memory improvement
  function unpack_Substages(Compacted){
    var Unpacked={};
    Object.keys(Compacted).forEach(l1=>{
      Unpacked[l1]={};
      Object.keys(Compacted[l1]).forEach(l2=>{
        var substage_from = Compacted[l1][l2][0]; //object
        Unpacked[l1][l2]=[];                      //new array
        if(!substage_from)return;
        var n = substage_from.name.length; //number of substages to create
        //console.log(l1,l2,n);
        for(var i=0;i<n;i++){
          var new_substage = {};
          Object.keys(substage_from).forEach(key=>{
            new_substage[key]=substage_from[key][i];
          });
          Unpacked[l1][l2].push(new_substage);
        }
      });
    });
    return Unpacked;
  }

  //decompress and parse Substages in one step
  var compressed=getCookie('Substages');
  var decompressed=LZString.decompressFromEncodedURIComponent(compressed);
  var parsed=JSON.parse(decompressed);
  Substages=unpack_Substages(parsed);

  //set the value of the constants ct_ch4_eq and ct_n2o from the Global.Configuration.Selected.gwp_reports_index
  Cts.ct_ch4_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_ch4_eq;
  Cts.ct_n2o_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_n2o_eq;
}
