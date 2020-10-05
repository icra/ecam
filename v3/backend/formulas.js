/**
  * Functions to deal with formulas/equations
  *
*/
let Formulas={
  /*
    return array of strings corresponding to variables matched in formula string
    example: "this.sV1+this.aV2" returns ['sV1','aV2']
  */
  ids_per_formula(formula){
    //ensure that formula is a string
    formula = formula.toString() || false;
    if(!formula) return false;

    //return value
    let matches=[];

    let all_input_codes=[];
    Structure.concat({level:"General"}).forEach(s=>{
      let stage = s.sublevel ? Global[s.level][s.sublevel] : Global[s.level];
      Object.keys(stage).forEach(key=>{
        if(typeof(stage[key])=='number'){
          all_input_codes.push(key);
        }
      });
    });
    let all_output_codes = Object.getOwnPropertyNames(Ecam.prototype);
    let all_codes        = all_input_codes.concat(all_output_codes);

    //concatenate constants and variables and iterate keys
    Object.keys(Cts).concat(all_codes).forEach(field=>{
      let reg=new RegExp("\\W"+field+"(\\W|$)");
      // \W matches any non-word characters (short for [^a-zA-Z0-9_]).
      // \D matches any non-digit (short for [^0-9]).
      if(formula.search(reg)+1){
        matches.push(field);
      }
    });

    return matches;
  },

  /*
    return array of strings: outputs that use input
    example: "sV1" returns ['c_wwt1','c_aV2']
  */
  outputs_per_input(id){
    let matches=[];
    let reg=new RegExp('\\W'+id+"\\W");

    //get arrays of strings corresponding to codes of outputs
    let all_outputs     = Object.getOwnPropertyNames(Ecam.prototype);
    let all_estimations = Object.keys(Estimations);
    let all_benchmarks  = Object.keys(Benchmarks);

    all_outputs.forEach(code=>{
      if(code=='constructor') return;
      let match = Global[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    all_estimations.forEach(code=>{
      let match = Estimations[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    all_benchmarks.forEach(code=>{
      let match = Benchmarks[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    return Array.from(new Set(matches));
  },

  prettify(formula){
    //ensure that formula is a string
    formula = formula.toString() || false;
    if(!formula) return false;

    let result = formula;
    Structure.forEach(s=>{
      //replace prefix
      let reg = new RegExp(`this\\.${s.prefix}\\.`,'g')
      result = result.replace(reg,'');

      //replace level and sublevel
      if(s.sublevel){
        let reg = new RegExp(`${s.sublevel}\\.`,'g')
        result = result.replace(reg,'');
      }else{
        let reg = new RegExp(`${s.level}\\.`,'g')
        result = result.replace(reg,'');
      }
    });
    result = result.replace(/this\./g,"");
    result = result.replace(/\+/g," + ");
    result = result.replace(/\-/g," - ");
    result = result.replace(/\*/g," * ");
    result = result.replace(/Global./g,"");
    result = result.replace(/General./g,"");

    Object.keys(Cts).forEach(key=>{
      let reg = new RegExp(`Cts\.${key}\.value`,'g');
      result = result.replace(reg,key);
    });

    return result;
  },
};
