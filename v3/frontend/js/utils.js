
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

//functions that talk directly to backend with no side effects
function get_current_unit(code){
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

function locate_variable(code){
  let level    = false; //level 1
  let sublevel = false; //level 2

  //array of possible level1 names
  let possible_levels = Structure.filter(s=>!s.sublevel).map(s=>s.level);
  possible_levels.push('General');

  //search inside Global
  for(let l1 in Global){
    if(possible_levels.indexOf(l1) == -1){ continue; }
    for(let field in Global[l1]){
      if(typeof(Global[l1][field])=='object'){
        for(let subfield in Global[l1][field]){
          if(code==subfield){
            level    = l1;
            sublevel = field;
            return {level, sublevel};
            break;
          }
        }
      }else{
        if(code==field){
          level = l1;
          return {level, sublevel}
          break;
        }
      }
    }
  }

  //return value
  if(!level && !sublevel){
    return false;
  }else{
    return {level, sublevel};
  }
}

function get_current_stage(code){
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

function get_variable_value(code){

  let current_stage = get_current_stage(code);
  if(!current_stage) return false;

  switch(typeof(current_stage[code])){
    case 'number':   return current_stage[code];   break;
    case 'function': return current_stage[code](); break;
    default:
      throw new Error('type error');
      break;
  }
}

function get_level_color(level){
  let stage = this.Structure.find(s=>s.level==level);
  if(stage){
    return stage.color;
  }else{
    return "#2b6488";
  }
}

function get_variable_type(code){
  let current_stage = get_current_stage(code);
  if(!current_stage) return false;
  let type = typeof(current_stage[code]);
  switch(type){
    case 'number':   return 'input'; break;
    case 'function': return 'output';break;
    default: throw new Error("variable type error");
  }
}

