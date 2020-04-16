/*
 * Update Global and Substages objects without overwriting functions, since
 * JSON.stringify does not stringify functions
 */
let old_codes_conversion={
  //<old-code>:function(value){<new-location>                       = value;}  //from <old-version-number>
  ww_conn_pop :function(value){Global.Waste.Collection.wwc_conn_pop = value;}, //from v2.0
  ww_serv_pop :function(value){Global.Waste.Treatment.wwt_serv_pop  = value;}, //from v2.0
  ww_onsi_pop :function(value){Global.Faecl.fs_onsi_pop             = value;}, //from v2.0
  wwc_bod_pday:function(value){Global.General.bod_pday              = value;}, //from v2.0
  wwc_prot_con:function(value){Global.General.prot_con              = value;}, //from v2.0
};

function copyFieldsFrom(object_from,object_to){
  //special cases (structure variable)
  if(
    object_to == Global.Configuration['Yes/No'] ||
    object_to == Global.Configuration.Selected  ||
    object_to == Global.Configuration.Units     ||
    object_to == Global.Configuration.Expanded
  ){
    //console.log('using assign...');
    Object.assign(object_to, object_from);
    return;
  }

  //go through object keys
  Object.keys(object_from).forEach(field=>{
    //copy substages
    if(object_from[field].constructor===Array) {
      object_to[field]=object_from[field];
      return;
    }

    /*
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
      let newField=field.replace(/ /g,"");
      copyFieldsFrom(object_from[field], object_to[newField]);
    }else{
      let type_from = typeof object_from[field];
      let type_to   = typeof object_to[field];

      //rest: copy only values that match in its type
      if(type_from==type_to){
        object_to[field]=object_from[field];
      }else if(type_from!='number' && type_to=='number'){
        //new variable: set to zero
        object_to[field]=0;
      }else if(type_from=='number' && type_to!='number'){
        //old variable found
        if(old_codes_conversion[field]){ //conversion considered (see above)
          old_codes_conversion[field](object_from[field]);
          console.log(field,' is an old variable; conversion found');
        }else{
          console.warn(field,' is an old variable; not loaded');
          alert(""+
            "Input '("+field+" = "+format(object_from[field])+")' not"+
            "loaded. It is an old variable that has been removed in this version."+
            "Please save again the file to update the file version to the latest"+
            "one.");
        }
      }else{
        //do nothing
        console.warn(`"${field}" types do not match`);
        console.log(typeof object_from[field]);
        console.log(typeof object_to[field]);
      }
    }
  });
}

/*
 * OVERWRITE "Global" AND "Substages" objects with the parsed cookie content
 */
if(getCookie("Global")!==null){
  /*
   * uncompress cookie "Global"
   */

  //compressed is a string with weird symbols
  //decompressed is a string with the JSON structure of Global
  //parsed becomes a real object
  //copy the fields from parsed to Global
  {
    let compressed   = getCookie('Global');
    let decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    let parsed       = JSON.parse(decompressed);
    copyFieldsFrom(parsed, Global);
  }

  //decompress and parse Substages in one step
  {
    let compressed   = getCookie('Substages');
    let decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    let parsed       = JSON.parse(decompressed);
    Substages        = unpack_Substages(parsed);
  }

  //set the value of the constants ct_ch4_eq and ct_n2o from the Global.Configuration.Selected.gwp_reports_index
  Cts.ct_ch4_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_ch4_eq;
  Cts.ct_n2o_eq.value=GWP_reports[Global.Configuration.Selected.gwp_reports_index].ct_n2o_eq;
}
