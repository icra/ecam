//sum ghg of substages or stages combined 2^6=64 options
function calculate_emissions_Water(wsa,wst,wsd){
  wsa=wsa||false;
  wst=wst||false;
  wsd=wsd||false;

  var rv=0; //return value

  //wsa
  if(wsa) rv += Substages.Water.Abstraction.map(s=>s.wsa_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Water.Abstraction.wsa_KPI_GHG();
  //wst
  if(wst) rv += Substages.Water.Treatment.map(s=>s.wst_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Water.Treatment.wst_KPI_GHG();
  //wsd
  if(wsd) rv += Substages.Water.Distribution.map(s=>s.wsd_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Water.Distribution.wsd_KPI_GHG();

  return rv;
}
function calculate_emissions_Waste(wwc,wwt,wwd){
  wwc=wwc||false;
  wwt=wwt||false;
  wwd=wwd||false;

  var rv=0; //return value

  rv += Global.Waste.ww_KPI_GHG_unt(); //add untreated ww emissions

  //wwc
  if(wwc) rv += Substages.Waste.Collection.map(s=>s.wwc_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Waste.Collection.wwc_KPI_GHG();
  //wwt
  if(wwt) rv += Substages.Waste.Treatment.map(s=>s.wwt_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Waste.Treatment.wwt_KPI_GHG();
  //wwd
  if(wwd) rv += Substages.Waste.Discharge.map(s=>s.wwd_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Waste.Discharge.wwd_KPI_GHG();

  return rv;
}
function calculate_emissions_Faecl(fsc,fst,fsr){
  fsc=fsc||false;
  fst=fst||false;
  fsr=fsr||false;

  var rv=0; //return value

  //fsc
  if(fsc) rv += Substages.Faecl.Containment.map(s=>s.fsc_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Faecl.Containment.fsc_KPI_GHG();
  //fst
  if(fst) rv += Substages.Faecl.Treatment.map(s=>s.fst_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Faecl.Treatment.fst_KPI_GHG();
  //fsr
  if(fsr) rv += Substages.Faecl.Reuse.map(s=>s.fsr_KPI_GHG()).reduce((pr,cu)=>(pr+cu),0);
  else    rv +=    Global.Faecl.Reuse.fsr_KPI_GHG();

  return rv;
}
function calculate_emissions(wsa,wst,wsd,wwc,wwt,wwd,fsc,fst,fsr){
  return calculate_emissions_Water(wsa,wst,wsd) +
    calculate_emissions_Waste(wwc,wwt,wwd)      +
    calculate_emissions_Faecl(fsc,fst,fsr);
}

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

  //default digits for values
  if     (number>1e4)  digits=0;
  else if(number<0.01) digits=4;

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
