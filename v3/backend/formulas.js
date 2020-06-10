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

    // \W matches any non-word characters (short for [^a-zA-Z0-9_]).
    // \D matches any non-digit (short for [^0-9]).

    //concatenate constants and variables and iterate keys
    Object.keys(Cts).concat(Object.keys(Info)).forEach(field=>{
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
    let matches=[];
    let reg=new RegExp('\\W'+id+"\\W");

    Global.General.equations.forEach(code=>{
      let match = Global[code].toString().search(reg); //will return -1 if not found
      if(match+1) matches.push(code);
    });

    Structure.forEach(s=>{
      let level    = s.level;
      let sublevel = s.sublevel;
      //console.log({level, sublevel:s.sublevel});
      get_equation_codes(level, sublevel).forEach(code=>{
        let match = Global[code].toString().search(reg); //will return -1 if not found
        if(match+1) matches.push(code);
      });
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
    result = result.replace(/return /g,"");
    result = result.replace(/\(\)/g,"");
    result = result.replace(/{/g," {<br>");
    result = result.replace(/}/g,"<br>}");
    result = result.replace(/\+/g," + ");
    result = result.replace(/\-/g," - ");
    result = result.replace(/\*/g," * ");
    result = result.replace(/Cts./g,"");
    result = result.replace(/().value/g,"$1");
    result = result.replace(/Global./g,"");
    result = result.replace(/General./g,"");

    //result = result.replace(/let /g,"");
    //result = result.replace(/\|\|0/g,"");
    //result = result.replace(/[\r\n\t]/g,"");
    //result = result.replace(/Water./g,"");
    //result = result.replace(/Waste./g,"");
    //result = result.replace(/Faecl./g,"");
    //result = result.replace(/Abstraction./g,"");
    //result = result.replace(/Treatment./g,"");
    //result = result.replace(/Distribution./g,"");
    //result = result.replace(/Collection./g,"");
    //result = result.replace(/Discharge./g,"");
    //result = result.replace(/Containment./g,"");
    //result = result.replace(/Reuse./g,"");
    //result = result.replace(/Configuration./g,"");
    //result = result.replace(/\(\)/g,"");
    //result = result.replace(/}$/g,"");
    //result = result.replace(/^ *{/g," ");
    //result = result.replace(/\*/g," * ");
    //result = result.replace(/\(\./g,"(");
    //result = result.replace(/\/\//g,"");
    //result = result.replace(/\"\]\./g,"");
    //result = result.replace(/\'\]\./g,"");
    return result;
  },
};
