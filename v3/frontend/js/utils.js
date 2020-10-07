/*
  HELPER FUNCTIONS
*/

//sum of substages, sum emissions
function get_sum_of_substages(output_code){
  return get_current_stage(output_code).substages.map(ss=>{
    let output = ss[output_code]();
    if(typeof(output.total)=='number'){
      return output.total;
    }else{
      return output;
    }
  }).reduce((p,c)=>(p+c),0);
}

//get unit stablished by the user at a concrete scenario (system or substage)
function get_current_unit(code, scenario){
  if(!code) return false;
  scenario = scenario || Global;

  if(!Info[code]){
    return `["${code}" unit not found]`;
  }
  if(Info[code].magnitude=='Currency'){
    return scenario.General.Currency;
  }
  if(scenario.Configuration.Units[code]==undefined){
    scenario.Configuration.Units[code] = Info[code].unit;
  }
  return scenario.Configuration.Units[code];
}

//get base unit (regardless of default unit or user stablished)
function get_base_unit(code, scenario){
  if(!code) return false;
  scenario = scenario || Global;

  let info = Info[code];
  if(!info) return "";

  if(Info[code].magnitude=="Currency"){
    return scenario.General.Currency;
  }

  if(Units[info.magnitude]==undefined) return info.unit;

  let base_unit = Object.entries(Units[info.magnitude]).find(([key,val])=>val==1)[0];
  //let info_unit = info.unit; //default unit at info (may not be the base unit)
  //console.log({info_unit, base_unit});

  return base_unit;
}

//get the memory location of code "code" at a concrete scenario (system or
//substage)
function get_current_stage(code, scenario){
  if(!code) return false;
  scenario = scenario || Global;

  let loc = locate_variable(code);
  if(!loc) return false;

  let level    = loc.level;
  let sublevel = loc.sublevel;

  if(sublevel){
    return scenario[level][sublevel];
  }else if(level){
    return scenario[level];
  }else{
    return false;
  }
}

//get value of variable (not affected by units)
function get_variable_value(code, scenario){
  if(!code) return false;
  let type = get_variable_type(code);
  if(!type) return false;
  if(type=='output'){
    let output = Global[code](); //can be a number or an object
    if(output==undefined) return 0;
    return (typeof(output.total)=='number'?output.total:output);
  }
  if(type=='input') return get_current_stage(code)[code];
  return false;
}

function get_output_value(code, scenario){
  scenario = scenario || Global;
  let output = scenario[code](); //can be a number or an object
  if(output==undefined) return 0;
  return (typeof(output.total)=='number'?output.total:output);
}

//navigate to a tier b stage
function go_to(level, sublevel, no_history_entry){
  let possible_levels = Structure.filter(s=>!s.sublevel).map(s=>s.level);
  possible_levels.push('General');
  if(possible_levels.indexOf(level)==-1){
    throw new Error(`level '${level}' does not exist`);
  }

  let possible_sublevels = Structure.filter(s=>s.sublevel).map(s=>s.sublevel);
  if(sublevel && possible_sublevels.indexOf(sublevel)==-1){
    throw new Error(`sublevel '${level}' does not exist`);
  }

  if(sublevel){
    if(Global[level][sublevel].substages.length==0){
      stages_menu.add_substage(level, sublevel);
    }

    let ss = Global[level][sublevel].substages[0];
    go_to_substage(ss);
    return;
  }else{
    tier_b.Global   = Global;
    tier_b.level    = level;
    tier_b.sublevel = false;
    ecam.show('tier_b', no_history_entry);
  }
}

function go_to_substage(substage, no_history_entry){
  if(!substage) return;
  if(substage.constructor!=Substage){ throw new Error('substage is not a Substage'); }

  let level    = substage.type.level;
  let sublevel = substage.type.sublevel;

  tier_b.Global   = substage;
  tier_b.level    = level;
  tier_b.sublevel = sublevel;
  ecam.show('tier_b', no_history_entry);
}

//get level color
function get_level_color(level){
  let stage = Structure.find(s=>s.level==level);
  if(stage){
    return stage.color;
  }else{
    return "var(--color-level-generic)";
  }
}

//get stage input codes (variables)
function get_input_codes(level, sublevel){
  level    = level    || false;
  sublevel = sublevel || false;
  if(!level) return [];
  if(!Global[level]) return [];

  let obj = null;

  if(sublevel){
    if(!Global[level][sublevel]) return [];
    obj = Global[level][sublevel];
  }else{
    obj = Global[level];
  }

  return Object.keys(obj).filter(key=>{
    return typeof(obj[key])!='object';
  });
}

//get stage equation codes (variables)
function get_equation_codes(level, sublevel){
  level    = level    || false;
  sublevel = sublevel || false;
  if(!level) return [];
  if(!Global[level]) return [];

  if(sublevel){
    if(!Global[level][sublevel]) return [];
    return Global[level][sublevel].equations;
  }else{
    return Global[level].equations;
  }
}

//get level and sublevel of "code" variable (input or output)
function locate_variable(code){
  if(!code) return false;

  //search inside General
  {
    let level="General";
    if(
      get_input_codes   (level).indexOf(code)+1
      ||
      get_equation_codes(level).indexOf(code)+1
    ){
      return {level, sublevel:false};
    }
  }

  //search inside Global
  for(let i in Structure){
    let s        = Structure[i];
    let level    = s.level;
    let sublevel = s.sublevel;

    if(
      get_input_codes(   level, sublevel).indexOf(code)+1
      ||
      get_equation_codes(level, sublevel).indexOf(code)+1
    ){
      return {level, sublevel};
      break;
    }
  }

  //if code reaches here and location is still not found, we can use stage
  //prefix as last option useful for outputs not listed in main stage, such as
  //"wsa_KPI_GHG_fuel_co2"
  for(let i in Structure){
    let s        = Structure[i];
    let level    = s.level;
    let sublevel = s.sublevel;
    let prefix   = s.prefix+'_';
    if(code.search(prefix)==0){
      return {level, sublevel};
      break;
    }
  }

  return false;
}


//get variable type ("input" or "output")
function get_variable_type(code){
  if(!code) return false;

  //search equations in Global
  if(Global[code] && typeof(Global[code])=='function'){
    return 'output';
  }

  //search in "Global.General"
  {
    let level="General";
    if(get_input_codes(level).indexOf(code)+1){
      return 'input';
    }
  }

  //search inside Global[{Water,Waste}]
  for(let i in Structure){
    let s        = Structure[i];
    let level    = s.level;
    let sublevel = s.sublevel;
    if(get_input_codes(level, sublevel).indexOf(code)+1){
      return 'input';
    }
  }

  return false;
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
    }
  }
  return false;
}
