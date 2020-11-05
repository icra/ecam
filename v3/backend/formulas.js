/**
  * Functions to deal with formulas/equations
  *
*/
let Formulas={
  /*
    return array of strings corresponding to variables matched in formula string
    example: "this.sV1+this.aV2" returns ['sV1','aV2']

    // \W matches any non-word characters (short for [^a-zA-Z0-9_]).
    // \D matches any non-digit (short for [^0-9]).
  */
  ids_per_formula(formula){
    //ensure that formula is a string
    formula = formula.toString() || false;
    if(!formula) return false;

    //return value
    let matches=[];

    let all_input_codes=[];
    let all_output_codes = Object.getOwnPropertyNames(Ecam.prototype);
    Structure.concat({level:"General"}).forEach(s=>{
      let stage = s.class ? new s.class() : Global[s.level];
      Object.keys(stage).forEach(key=>{
        if(typeof(stage[key])=='number'){
          all_input_codes.push(key);
        }
      });

      stage = s.class ? s.class.prototype : Global[s.level];

      Object.getOwnPropertyNames(stage).forEach(key=>{
        if(typeof(stage[key])=='function'){
          all_output_codes.push(key);
        }
      });
    });
    let all_codes = all_input_codes.concat(all_output_codes);

    //add constants
    all_codes = all_codes.concat(Object.keys(Cts));

    //iterate keys
    all_codes.forEach(field=>{
      let reg=new RegExp("\\W"+field+"(\\W|$)");
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
    let matches=[]; //return value
    let reg=new RegExp('\\W'+id+"\\W");

    //search Ecam.prototype
    Object.getOwnPropertyNames(Ecam.prototype).forEach(code=>{
      let match = Ecam.prototype[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    //search all stages
    Structure.concat({level:"General"}).forEach(s=>{
      let stage = s.class ? s.class.prototype : Global[s.level];
      Object.getOwnPropertyNames(stage).forEach(code=>{
        if(code=='constructor') return;
        if(typeof(stage[code])=='function'){
          let match = stage[code].toString().search(reg); //will return -1 if not found
          if(match+1) matches.push(code);
        }
      });
    });

    //search estimations
    let all_estimations = Object.keys(Estimations);
    all_estimations.forEach(code=>{
      let match = Estimations[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    //search benchmarks
    let all_benchmarks = Object.keys(Benchmarks);
    all_benchmarks.forEach(code=>{
      let match = Benchmarks[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    //search exceptions
    let all_exceptions = Object.keys(Exceptions);
    all_exceptions.forEach(code=>{
      Object.values(Exceptions[code]).forEach(value=>{
        //"value" is a string or a function
        let match = value.toString().search(new RegExp(id)); //will return -1 if not found
        if(match+1){
          matches.push(code);
        }
      });
    });

    //exclude constructors
    matches = matches.filter(m=>m!='constructor');

    return Array.from(new Set(matches));
  },

  prettify(formula){
    //ensure that formula is a string
    formula = formula.toString() || false;
    if(!formula) return false;

    let result = formula;
    result = result.replace(/this\./g,"");
    result = result.replace(/Global\./g,"");
    result = result.replace(/General\./g,"");

    return result;
  },
};
