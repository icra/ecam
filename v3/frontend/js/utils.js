/*
  HELPER FUNCTIONS
  they are global
*/

//navigate to a tier b stage
function go_to(level, sublevel, no_history_entry){
  let possible_levels = Structure.filter(s=>!s.sublevel).map(s=>s.level);
  possible_levels.push('General');
  if(possible_levels.indexOf(level)==-1){
    throw new Error(`level '${level}' does not exist`);
  }

  if(level=='General'){
    ecam.show('select_scenario', no_history_entry);
    return;
  }

  let possible_sublevels = Structure.filter(s=>s.sublevel).map(s=>s.sublevel);
  if(sublevel && possible_sublevels.indexOf(sublevel)==-1){
    throw new Error(`sublevel '${sublevel}' does not exist`);
  }

  if(sublevel){
    if(Global[level][sublevel].length==0){
      go_to(level);
      return;
    }else{
      if(
        tier_b.substage &&
        Global[level][sublevel].indexOf(tier_b.substage)+1
      ){
        go_to_substage(tier_b.substage);
        return;
      }else{
        go_to_substage(Global[level][sublevel][0]);
        return;
      }
    }
  }else{
    tier_b.level    = level;
    tier_b.sublevel = false;
    tier_b.substage = false;
    ecam.show('tier_b', no_history_entry);
  }
}

function go_to_substage(substage, no_history_entry){
  if(!substage) return;

  let stage = Structure.find(s=>s.class==substage.constructor);
  if(!stage) throw 'stage error';

  tier_b.level    = stage.level;
  tier_b.sublevel = stage.sublevel;
  tier_b.substage = substage;

  if(
    stage.sublevel
    && tier_b.normalization.selected=="kgCO2eq/year/serv.pop."
    && Normalization[stage.level][stage.sublevel]==false
  ){
    tier_b.normalization.selected="kgCO2eq";
  }

  ecam.show('tier_b', no_history_entry);
}

//get total value of one output
function get_output_value(code, stage){
  let output = null;
  if(Global[code] && typeof(Global[code])=='function'){
    output = Global[code]();
  }else{
    output = stage[code](); //can be a number or an object
  }
  //stage can be for example Global.Water or a substage
  if(output==undefined) return 0;
  return (typeof(output.total)=='number'?output.total:output);
}

//get partial results of one output (for example one emission that is
//total=CH4+N2O+CO2)
function get_output_partial_values(code, stage){
  //return value
  //can be a number or an object
  let output = null;

  if(Global[code] && typeof(Global[code])=='function'){
    output = Global[code]();
  }else{
    output = stage[code]();
  }

  switch(typeof(output)){
    case 'number':
      return {total:output};
      break;
    case 'object':
      return output;
      break;
    default:
      console.warn(`"${code}" output type error`)
      return {};
      break;
  }
}

//sum of substages of one output
function get_sum_of_substages(level,sublevel,output_code){
  if(!Global[level])           throw `level "${level}" incorrect`;
  if(!Global[level][sublevel]) throw `sublevel "${sublevel}" incorrect`;
  return Global[level][sublevel].map(ss=>{
    return get_output_value(output_code, ss);
  }).sum();
}

//get unit stablished by the user
function get_current_unit(code){
  if(!code) return "";

  if(!Info[code]) return `["${code}" unit not found]`;

  if(Info[code].magnitude=='Currency') return Global.General.Currency;

  if(!Global.Configuration.Units[code]){
    Global.Configuration.Units[code] = Info[code].unit;
  }

  return Global.Configuration.Units[code];
}

//get base unit (regardless of default unit or user stablished)
function get_base_unit(code, scenario){
  if(!code) return "";
  scenario = scenario || Global;

  let info = Info[code];
  if(!info){
    console.warn(`base unit not found for "${code}"`);
    return "";
  }

  if(Info[code].magnitude=="Currency"){return scenario.General.Currency}
  if(Units[info.magnitude]==undefined) return info.unit;

  let base_unit = Object.entries(Units[info.magnitude]).find(([key,val])=>val==1)[0];
  return base_unit;
}

//get level color
function get_level_color(level){
  let stage = Structure.find(s=>s.level==level);
  return stage ? stage.color : "var(--color-level-generic)";
}

//get stage input codes (variables)
function get_input_codes(level, sublevel){
  level    = level    || false;
  sublevel = sublevel || false;
  if(!level) return [];
  if(!Global[level]) return [];

  let stage = Structure.concat({level:"General",sublevel:false}).find(s=>s.level==level&&s.sublevel==sublevel);
  if(!stage) return [];

  let obj = null;

  if(stage.class){
    obj = new stage.class();
  }else{
    obj = Global[level];
  }

  return Object.keys(obj).filter(key=>{
    return typeof(obj[key])=='number';
  });
}

//get stage equation codes (variables)
function get_output_codes(level, sublevel){
  level    = level    || false;
  sublevel = sublevel || false;
  if(!level) return [];
  if(!Global[level]) return [];

  let stage = Structure.find(s=>s.level==level&&s.sublevel==sublevel);
  if(!stage) return [];

  let obj = null;

  if(stage.class){
    obj = stage.class.prototype;
  }else{
    obj = Global[level];
  }

  return Object.getOwnPropertyNames(obj).filter(name=>{
    return typeof(obj[name])=='function' && name!='constructor';
  });
}

//get level and sublevel of "code" variable (input or output)
function locate_variable(code){
  if(!code) return false;

  //fix correct search for global functions
  if(Global[code] && typeof(Global[code])=='function'){
    return {level:false, sublevel:false, stage:Global};
    //stage is an object
  }

  let all_stages = Structure.concat({level:"General",sublevel:false});

  //search inside all stages
  for(let i in all_stages){
    let s        = all_stages[i];
    let level    = s.level;
    let sublevel = s.sublevel;

    if(
      get_input_codes(level, sublevel).indexOf(code)+1
      ||
      get_output_codes(level, sublevel).indexOf(code)+1
    ){
      if(sublevel){
        return {level, sublevel, stage:Global[level][sublevel]}; //stage is an array
      }else{
        return {level, sublevel, stage:Global[level]}; //stage is an object
      }
      break;
    }
  }

  return false;
}

//get variable type ("input" or "output")
function get_variable_type(code){
  //fix correct search for global functions
  if(Global[code] && typeof(Global[code])=='function'){
    return "output";
  }

  let loc = locate_variable(code);
  if(!loc)       return "code '"+code+"' could not be located";
  if(!loc.level) return "code '"+code+"': level '"+loc.level+"' not found";
  let level    = loc.level;
  let sublevel = loc.sublevel;
  if(get_input_codes (level,sublevel).indexOf(code)+1){return "input"}
  if(get_output_codes(level,sublevel).indexOf(code)+1){return "output"}
  return "code '"+code+"'not found";
}

//detect if the string "code" is inside any filter
function is_code_in_any_filter(code){
  if(Questions.is_inside(code)) return true;
  return Object.values(Filters).reduce((p,c)=>c.concat(p),[]).indexOf(code)>-1;
}

//get filter of variable "code"
function get_filter_by_code(code){
  for(let key in Filters){
    if(Filters[key].indexOf(code)+1){
      return key;
      break;
    }
  }
  return false;
}
