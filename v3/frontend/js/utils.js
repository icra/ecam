//helper functions

//navigate tier b levels
function go_to(level, sublevel){
  let possible_levels = Structure.filter(s=>!s.sublevel).map(s=>s.level);
  possible_levels.push('General');
  possible_levels.push('UNFCCC');

  if(possible_levels.indexOf(level)==-1){
    throw new Error(`level '${level}' does not exist`);
  }

  let possible_sublevels = Structure.filter(s=>s.sublevel).map(s=>s.sublevel);
  if(sublevel && possible_sublevels.indexOf(sublevel)==-1){
    throw new Error(`sublevel '${level}' does not exist`);
  }

  tier_b.level         = level;
  tier_b.sublevel      = sublevel || false;
  tier_b.current_stage = sublevel ? Global[level][sublevel] : Global[level];
  ecam.show('tier_b');
}

//get unit
function get_current_unit(code){
  if(!code) return false;

  if(!Info[code]){
    return `["${code}" unit not found]`;
  }
  if(Info[code].magnitude=='Currency'){
    return Global.General.Currency;
  }
  if(undefined===Global.Configuration.Units[code]){
    Global.Configuration.Units[code] = Info[code].unit;
  }
  return Global.Configuration.Units[code];
}

//get base unit (without unit conversion)
function get_base_unit(code){
  if(!code) return false;

  let info = Info[code];
  if(!info) throw new Error(`no unit for variable "${code}"`);

  if(Units[info.magnitude]){
    for(let unit in Units[info.magnitude]){
      if(Units[info.magnitude][unit]==1){
        return unit;
        break;
      }
    }
  }else{
    return info.unit;
  }
}

//get level color
function get_level_color(level){
  let stage = this.Structure.find(s=>s.level==level);
  if(stage){
    return stage.color;
  }else{
    return "#2b6488";
  }
}

//get stage input codes
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

//get stage equation codes
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

  return false
}

//get current stage
function get_current_stage(code){
  if(!code) return false;

  let loc = locate_variable(code);
  if(!loc) return false;

  let level    = loc.level;
  let sublevel = loc.sublevel;

  if(sublevel){
    return Global[level][sublevel];
  }else if(level){
    return Global[level];
  }else{
    return false;
  }
}

//get variable value
function get_variable_value(code){
  if(!code) return false;
  let type = get_variable_type(code);
  if(!type) return false;
  if(type=='output') return Global[code]();
  if(type=='input') return get_current_stage(code)[code];
  return false;
}

//get variable type
function get_variable_type(code){
  if(!code) return false;

  //search in General
  {
    let level="General";
    if(get_input_codes(   level).indexOf(code)+1){
      return 'input';
    }
    if(get_equation_codes(level).indexOf(code)+1){
      return 'output';
    }
  }

  //search inside Global
  for(let i in Structure){
    let s        = Structure[i];
    let level    = s.level;
    let sublevel = s.sublevel;

    if(get_input_codes(   level, sublevel).indexOf(code)+1){
      return 'input';
    }
    if(get_equation_codes(level, sublevel).indexOf(code)+1){
      return 'output';
    }
  }

  return false;
}
