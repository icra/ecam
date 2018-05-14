/** Find a variable code inside 'Global'*/
function locateVariable(code) {
  var localization={};//e.g {"level":"Water","sublevel":"Abstraction"}
  localization.toString=function() {
    var levelName=(function() {
      switch(localization.level) {
        case "Water": return translate('Water');break;
        case "Waste": return translate('Waste');break;
        default: return localization.level;break;
      }
    })();

    if(localization.sublevel) {
      var sublevelName=(function() {
        switch(localization.sublevel) {
          default: return localization.sublevel; break;
        }
      })(); 
      return levelName+"/"+sublevelName
    }
    else
      return levelName;
  };

  for(var level in Global) {
    for(var field in Global[level]) {
      if(typeof(Global[level][field])=='object') {
        for(var subfield in Global[level][field]) {
          if(code==subfield) {
            localization["level"]=level;
            localization["sublevel"]=field;
            return localization;
            break;
          }
        }
      } else {
        if(code==field) {
          localization["level"]=level;
          localization["sublevel"]=false;
          return localization;
          break;
        }
      }
    }
  }
  return false;
}

//return directly the variable value
function getVariable(code){
  var loc=locateVariable(code);
  var pointer=null;
  if(!loc){
    return false;
  }else if(loc.sublevel){
    pointer=Global[loc.level][loc.sublevel];
  }else{
    pointer=Global[loc.level];
  }
  //check pointer to level or sublevel
  if(!pointer)return false;
  //return value
  if     (typeof(pointer[code])=='number')   return pointer[code];
  else if(typeof(pointer[code])=='function') return pointer[code]();
}

/*convert number to formated string: i.e. "3.999,4" instead of 3999.4*/
function format(number,digits){
  //default digits if not specified
  digits=digits||2;

  if(number>1e6)digits=0;

  //for non applicable
  if(number=="NA"){ return "<span style=color:#ccc>NA</span>"; }

  //get the result string
  var str=new Intl.NumberFormat('en-EN',{maximumFractionDigits:digits}).format(number);

  //if "NaN" or "Infinity" display 'missing inputs'
  if(str=="NaN" || !isFinite(number)) return "<span style=color:#666;font-size:10px>~"+translate('missing_inputs')+"</span>";

  //return resulting string
  return str;
}

/** Colors for GHG emissions */
var ColorsGHG = {
  ws_KPI_GHG_elec      :"#3366CC", //electricity
  ws_KPI_GHG_ne        :"#DC3912", //fuel
  ww_KPI_GHG_elec      :"#FF9900", //electricity
  ww_KPI_GHG_ne_ch4_wwt:"#109618", //methane treated
  ww_KPI_GHG_ne_n2o_tre:"#990099", //nitrogen treated
  ww_KPI_GHG_ne_tsludge:"#0099C6", //transport
  ww_KPI_GHG_ne_ch4_unt:"#DD4477", //methane untreated
  ww_KPI_GHG_ne_n2o_unt:"#66AA00", //nitrogen untreated
  ww_KPI_GHG_ne_engines:"#B82E2E", //fuel
}

var Utils={};//namespace
//return array of codes that use "code" in its formula
Utils.usedInBenchmarks=function(code) {
  var benchmarks=[];
  for(var bm in RefValues) {
    var bm_formula=RefValues[bm];
    if(bm_formula.toString().indexOf(code)+1) {
      benchmarks.push(bm);
    }
  }
  return benchmarks;
}
