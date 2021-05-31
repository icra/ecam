/*
 * Main data structure object.
 * It stores user inputs and has all equations (except estimations, which could be
 * moved here also) TODO "backend/estimations.js"
*/

/*UTILS*/
//sum elements of Array
Array.prototype.sum=function(){return this.reduce((p,c)=>(p+c),0)};

//configuration global settings
let Configuration={
  gwp_reports_index:0, //index of selected GWP report
};

//array of scenarios (layout == Ecam object == scenario == assessment)
let Scenarios=[];

//A "scenario" is an Ecam object
class Ecam{
  constructor(){
    this.General={
      version              : "3.0.0-in-development",
      Name                 : `Untitled assessment${Scenarios.length ? (' '+(1+Scenarios.length)):''}`,
      AssessmentPeriodStart: "2021-01-01",
      AssessmentPeriodEnd  : "2022-01-01",
      Comments             : "",
      Currency             : "EUR", //default currency
      Country              : "",    //selected country name (string)
      conv_kwh_co2         : 0,     //electricity conversion (kgCO2/kWh)
      prot_con             : 0,     //prot consumption (kg/person/year)
      bod_pday             : 0,     //BOD5 (g/person/day)
    };

    this.Water=new Water_stages(), //Water supply stages
    this.Waste=new Waste_stages(), //Wastewater stages

    this.Configuration={
      //user selected units for inputs
      Units:{ /*code:"unit"*/ },
    };
  }

  //global GHG emissions and energy consumed
  TotalGHG(){
    let sources=[
      this.Water.ws_KPI_GHG(),
      this.Waste.ww_KPI_GHG(),
    ];
    let co2 = sources.map(s=>s.co2).sum();
    let ch4 = sources.map(s=>s.ch4).sum();
    let n2o = sources.map(s=>s.n2o).sum();
    let total = sources.map(s=>s.total).sum();
    return {total,co2,ch4,n2o};
  }

  //total energy consumed
  TotalNRG(){
    return this.Water.ws_nrg_cons()+this.Waste.ww_nrg_cons();
  }

  //assesment period duration (in days and years)
  Days(){
    let startDate=new Date(this.General.AssessmentPeriodStart);
    let finalDate=new Date(this.General.AssessmentPeriodEnd);
    return (finalDate-startDate)/1000/60/60/24; //days
  }
  Years(){return this.Days()/365}

  //Service Level (SL) indicators
  ws_SL_auth_con(){
    let wsd_auth_con = this.Water.Distribution.map(s=>s.wsd_auth_con).sum(); //m3
    let wsd_serv_pop = this.Water.Distribution.map(s=>s.wsd_serv_pop).sum(); //population
    return 1e3*wsd_auth_con/wsd_serv_pop/this.Days()||0;
  }

  //grouped emissions by source
    fuel_GHG(){
      //fuel combustion emissions
      let emissions=[
        ...this.Water.Abstraction .map(s=>s.wsa_KPI_GHG_fuel()),
        ...this.Water.Treatment   .map(s=>s.wst_KPI_GHG_fuel()),
        ...this.Water.Distribution.map(s=>s.wsd_KPI_GHG_fuel()),
        ...this.Water.Distribution.map(s=>s.wsd_KPI_GHG_trck()),
        ...this.Waste.Collection  .map(s=>s.wwc_KPI_GHG_fuel()),
        ...this.Waste.Treatment   .map(s=>s.wwt_KPI_GHG_fuel()),
        ...this.Waste.Onsite      .map(s=>s.wwo_KPI_GHG_fuel()),
        ...this.Waste.Treatment   .map(s=>s.wwt_KPI_GHG_dig_fuel()),
        ...this.Waste.Treatment   .map(s=>s.wwt_KPI_GHG_slu_transport()),
        ...this.Waste.Treatment   .map(s=>s.wwt_KPI_GHG_reus_trck()),
        ...this.Waste.Onsite      .map(s=>s.wwo_KPI_GHG_trck()),
        ...this.Waste.Onsite      .map(s=>s.wwo_KPI_GHG_dig_fuel()),
      ];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    untr_GHG(){
      //untreated wastewater emissions
      let emissions=[
        ...this.Waste.Collection.map(s=>s.wwc_KPI_GHG_cso()),
        ...this.Waste.Collection.map(s=>s.wwc_KPI_GHG_col()),
        ...this.Waste.Onsite    .map(s=>s.wwo_KPI_GHG_unt_opd()),
      ];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    biog_GHG(){
      //biogas emissions
      let emissions=[
        ...this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_biog()),
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_biog()),
      ];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    wwtr_GHG(){
      //treatment process emissions
      let emissions=[
        ...this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_tre()),
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_containment()),
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_tre()),
      ];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    slud_GHG(){
      //sludge management emissions
      let emissions=[
        ...this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_slu()),     //array
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_landapp()), //array
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_landfil()), //array
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_dumping()), //array
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_urine()),   //array
      ];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    disc_GHG(){
      //discharge emissions
      let emissions=[
        ...this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_disc()), //array
        ...this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_dis()), //array
      ];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }

  //load a json object
  static from(json_obj){
    //return value
    let o   = Object.assign(new Ecam(), json_obj);
    o.Water = Water_stages.from(json_obj.Water);
    o.Waste = Waste_stages.from(json_obj.Waste);
    return o;
  }
};

class Water_stages{
  constructor(){
    this.ws_resi_pop=0; //resident population
    this.ws_nrg_cost=0; //energy costs
    this.ws_run_cost=0; //total running costs

    //arrays of substages
    this.Abstraction  = [ ];
    this.Treatment    = [ ];
    this.Distribution = [ ];
  }

  //GHG ws
    ws_KPI_GHG_abs(){
      let sources = this.Abstraction.map(ss=>ss.wsa_KPI_GHG());
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    ws_KPI_GHG_tre(){
      let sources = this.Treatment.map(ss=>ss.wst_KPI_GHG());
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    ws_KPI_GHG_dis(){
      let sources = this.Distribution.map(s=>s.wsd_KPI_GHG());
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    ws_KPI_GHG(){
      let sources = [
        this.ws_KPI_GHG_abs(),
        this.ws_KPI_GHG_tre(),
        this.ws_KPI_GHG_dis(),
      ];
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

  //SL ws
    ws_serv_pop(){
      return this.Distribution.map(s=>s.wsd_serv_pop).sum();
    }
    ws_nrg_cons(){
      let wsa = this.Abstraction .map(s=>s.wsa_nrg_cons).sum();
      let wst = this.Treatment   .map(s=>s.wst_nrg_cons).sum();
      let wsd = this.Distribution.map(s=>s.wsd_nrg_cons).sum();
      return wsa+wst+wsd;
    }
    ws_vol_fuel(){
      let wsa = this.Abstraction .map(s=>s.wsa_vol_fuel).sum();
      let wst = this.Treatment   .map(s=>s.wst_vol_fuel).sum();
      let wsd = this.Distribution.map(s=>s.wsd_vol_fuel).sum();
      return wsa+wst+wsd;
    }
    ws_SL_serv_pop(){
      return (100*this.ws_serv_pop()/this.ws_resi_pop)||0;
    }

  //---
  static get equations(){
    return[
      "ws_KPI_GHG_abs",
      "ws_KPI_GHG_tre",
      "ws_KPI_GHG_dis",
      "ws_KPI_GHG",

      "ws_serv_pop",
      "ws_SL_serv_pop",
      "ws_nrg_cons",
      "ws_vol_fuel",
    ];
  }

  //load a json object
  static from(json_obj){
    //return value
    let o = Object.assign(new Water_stages(), json_obj);

    //populate stages with each correct class
    Structure.filter(s=>s.level=='Water'&&s.sublevel).forEach(s=>{
      //reset array of substages
      o[s.sublevel]=[];
      //invoke each class static method "from(json_obj)"
      json_obj[s.sublevel].forEach(obj=>{
        o[s.sublevel].push( s.class.from(obj) );
      });
    });

    return o;
  }
}

class Waste_stages{
  constructor(){
    this.ww_resi_pop=0; //resident population
    this.ww_vol_gene=0; //volume of generated wastewater
    this.ww_nrg_cost=0; //energy costs
    this.ww_run_cost=0; //total running costs

    //arrays of substages
    this.Collection = [ ];
    this.Treatment  = [ ];
    this.Onsite     = [ ];
  }

  //GHG ww
    ww_KPI_GHG_col(){
      let sources = this.Collection.map(ss=>ss.wwc_KPI_GHG());
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }
    ww_KPI_GHG_tre(){
      let sources = this.Treatment.map(ss=>ss.wwt_KPI_GHG());
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }
    ww_KPI_GHG_ons(){
      let sources = this.Onsite.map(ss=>ss.wwo_KPI_GHG());
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }
    ww_KPI_GHG(){
      let sources=[
        this.ww_KPI_GHG_col(),
        this.ww_KPI_GHG_tre(),
        this.ww_KPI_GHG_ons(),
      ];
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

  //ww SL
    ww_serv_pop(){
      let wwt = this.Treatment.map(s=>s.wwt_serv_pop).sum();
      let wwo = this.Onsite   .map(s=>s.wwo_onsi_pop).sum();
      return wwt+wwo;
    }
    ww_SL_serv_pop(){
      return (100*this.ww_serv_pop()/this.ww_resi_pop)||0;
    }
    ww_nrg_cons(){
      let wwc = this.Collection.map(s=>s.wwc_nrg_cons).sum();
      let wwt = this.Treatment .map(s=>s.wwt_nrg_cons).sum();
      let wwo = this.Onsite    .map(s=>s.wwo_nrg_cons).sum();
      return wwc+wwt+wwo;
    }
    ww_vol_fuel(){
      let wwc = this.Collection.map(s=>s.wwc_vol_fuel).sum();
      let wwt = this.Treatment .map(s=>s.wwt_vol_fuel).sum();
      let wwo = this.Onsite    .map(s=>s.wwo_vol_fuel).sum();
      return wwc+wwt+wwo;
      //TO BE REVISED (variables missing) TODO
    }
    ww_GHG_avoided(){
      let wwt = this.Treatment.map(ss=>ss.wwt_ghg_avoided()).sum();
      let wwo = this.Onsite   .map(ss=>ss.wwo_ghg_avoided()).sum();
      return wwt+wwo;
    }

  //---
  static get equations(){
    return[
      "ww_KPI_GHG_col", //GHG from Wastewater Collection
      "ww_KPI_GHG_tre", //GHG from Wastewater Treatment
      "ww_KPI_GHG_ons", //GHG from Wastewater Discharge
      "ww_KPI_GHG",     //GHG from Wastewater
      "ww_serv_pop",    //SL serviced population
      "ww_SL_serv_pop", //SL serviced population
      "ww_nrg_cons",    //SL energy consumed from the grid
      "ww_GHG_avoided", //SL GHG avoided
    ];
  }

  //load a json object
  static from(json_obj){
    let o = Object.assign(new Waste_stages(), json_obj);

    //populate stages with each correct class
    Structure.filter(s=>s.level=='Waste'&&s.sublevel).forEach(s=>{
      //reset array of substages
      o[s.sublevel]=[];
      //invoke each class static method "from(json_obj)"
      json_obj[s.sublevel].forEach(obj=>{
        o[s.sublevel].push( s.class.from(obj) );
      });
    });

    return o;
  }
}

//classes for Substages inside Ecam objects
class Substage{
  constructor(){
    //substage name
    this.name="new substage";

    /*user preferences*/
    this.Configuration={
      //answers for filters (see "questions.js")
      Questions:{},

      //keys of folded Questions
      FoldedQuestions:[],
    };

    //set default values for all questions to 0
    Object.keys(Questions).filter(key=>{
      return typeof(Questions[key])=='object';
    }).forEach(key=>{
      this.Configuration.Questions[key]=false;
    });
  }
};

class Water_Abstraction extends Substage{
  constructor(name){
    super();
    this.name=name;

    this.wsa_vol_conv = 0; //volume of abstracted water
    this.wsa_fuel_typ = 0; //type of fuel (engines)
    this.wsa_vol_fuel = 0; //volume of fuel (engines)

    this.wsa_nrg_cons = 0; //energy consumed from the grid (kWh)
    this.wsa_conv_kwh = 0; //kWh to kgCO2eq conversion factor

    this.wsa_nrg_cost = 0; //energy costs
    this.wsa_run_cost = 0; //total running costs

    this.wsa_vol_pump = 0;   //energy perf
    this.wsa_nrg_pump = 0;   //energy perf
    this.wsa_sta_head = 0;   //energy perf
    this.wsa_pmp_head = 0;   //energy perf
    this.wsa_main_len = 0;   //energy perf
    this.wsa_pmp_type = 0;   //energy perf
    this.wsa_pmp_size = 0;   //energy perf
    this.wsa_pmp_flow = 0;   //energy perf
    this.wsa_pmp_volt = 0;   //energy perf
    this.wsa_pmp_amps = 0;   //energy perf
    this.wsa_pmp_pf   = 0.9; //energy perf
    this.wsa_pmp_exff = 0;   //energy perf
  }

  //GHG wsa
    wsa_KPI_GHG(){
      //sources (objects)
      let elec = this.wsa_KPI_GHG_elec();
      let fuel = this.wsa_KPI_GHG_fuel();

      //gases (numbers)
      let co2 = elec.co2 + fuel.co2;
      let ch4 = elec.ch4 + fuel.ch4;
      let n2o = elec.n2o + fuel.n2o;

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wsa_KPI_GHG_elec(){
      let co2 = this.wsa_nrg_cons*this.wsa_conv_kwh;
      let ch4 = 0;
      let n2o = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    wsa_KPI_GHG_fuel(){
      let vol   = this.wsa_vol_fuel;
      let fuel  = Tables.get_row('Fuel type',this.wsa_fuel_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }
  //SL wsa
    wsa_nrg_per_abs_watr(){return this.wsa_nrg_cons/this.wsa_vol_conv}
    wsa_nrg_per_pmp_watr(){return this.wsa_nrg_pump/this.wsa_vol_pump}

    wsa_pmp_pw(){return this.wsa_pmp_flow*this.wsa_pmp_head*Cts.ct_gravit.value/1000;}
    wsa_KPI_std_nrg_cons(){
      return this.wsa_nrg_pump/(this.wsa_vol_pump*this.wsa_pmp_head/100);
    }
    wsa_KPI_un_head_loss(){
      return 1e3*(
        this.wsa_pmp_head
        -this.wsa_sta_head
      )/this.wsa_main_len;
    }
    wsa_KPI_nrg_elec_eff(){
      return 100*this.wsa_pmp_pw()/(
        this.wsa_pmp_volt
        *this.wsa_pmp_amps
        *Math.sqrt(3)*this.wsa_pmp_pf/1000
      );
    }
    wsa_KPI_std_nrg_newp(){
      return this.wsa_KPI_nrg_elec_eff()/
        this.wsa_pmp_exff*
        this.wsa_KPI_std_nrg_cons();
    }
    wsa_KPI_nrg_cons_new(){
      return this.wsa_KPI_nrg_elec_eff()/
        this.wsa_pmp_exff*
        this.wsa_nrg_pump;
    }
    wsa_KPI_nrg_estm_sav(){
      return this.wsa_nrg_cons - this.wsa_KPI_nrg_cons_new();
    }
    wsa_KPI_ghg_estm_red(){
      return this.wsa_KPI_nrg_estm_sav()*this.wsa_conv_kwh;;
    }

  //---
  static get equations(){
    return[
      "wsa_KPI_GHG_elec",
      "wsa_KPI_GHG_fuel",
      "wsa_KPI_GHG",
      "wsa_nrg_per_abs_watr",
      "wsa_nrg_per_pmp_watr",
      "wsa_pmp_pw",
      "wsa_KPI_std_nrg_cons",
      "wsa_KPI_un_head_loss",
      "wsa_KPI_nrg_elec_eff",
      "wsa_KPI_ghg_estm_red",
      "wsa_KPI_std_nrg_newp",
      "wsa_KPI_nrg_cons_new",
      "wsa_KPI_nrg_estm_sav",
    ];
  }

  //load a json object
  static from(json_obj){
    return Object.assign(new Water_Abstraction(), json_obj);
  }
};

class Water_Treatment extends Substage{
  constructor(name){
    super();
    this.name=name;
    this.wst_vol_trea = 0;

    this.wst_nrg_cost = 0; //energy costs
    this.wst_run_cost = 0; //total running costs

    this.wst_mass_slu  = 0;
    this.wst_treatment = 0;

    this.wst_nrg_cons = 0; //energy consumed from the grid (kWh)
    this.wst_conv_kwh = 0; //kWh to kgCO2eq conversion factor

    this.wst_fuel_typ = 0;
    this.wst_vol_fuel = 0;
    this.wst_tst_carr = 0;
    this.wst_trea_cap = 0;
    this.wst_nrg_pump = 0;
    this.wst_vol_pump = 0;
    this.wst_pmp_head = 0;
    this.wst_sta_head = 0;
    this.wst_coll_len = 0;
    this.wst_pmp_flow = 0;
    this.wst_pmp_volt = 0;
    this.wst_pmp_amps = 0;
    this.wst_pmp_pf   = 0.9;
    this.wst_pmp_exff = 0;
  }

  //GHG wst
    wst_KPI_GHG(){
      //sources (objects)
      let elec = this.wst_KPI_GHG_elec();
      let fuel = this.wst_KPI_GHG_fuel();

      //gases (numbers)
      let co2 = elec.co2 + fuel.co2;
      let ch4 = elec.ch4 + fuel.ch4;
      let n2o = elec.n2o + fuel.n2o;

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wst_KPI_GHG_elec(){
      let co2 = this.wst_nrg_cons*this.wst_conv_kwh;
      let ch4 = 0;
      let n2o = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    wst_KPI_GHG_fuel(){
      let vol   = this.wst_vol_fuel;
      let fuel  = Tables.get_row('Fuel type',this.wst_fuel_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }
  //SL wst
    wst_KPI_nrg_per_m3(){return this.wst_nrg_cons/this.wst_vol_trea}
    wst_KPI_slu_per_m3(){return this.wst_mass_slu/this.wst_vol_trea}
    wst_KPI_capac_util(){return 100*this.wst_vol_trea/this.wst_trea_cap}
    wst_KPI_tst_carr(){return this.wst_tst_carr;}
    wst_KPI_std_nrg_cons(){return this.wst_nrg_pump/(this.wst_vol_pump*this.wst_pmp_head/100)}
    wst_KPI_un_head_loss(){return 1e3*(this.wst_pmp_head-this.wst_sta_head)/this.wst_coll_len}
    wst_pmp_pw(){return this.wst_pmp_flow*this.wst_pmp_head*Cts.ct_gravit.value/1000;}
    wst_KPI_nrg_elec_eff(){return 100*this.wst_pmp_pw()/(this.wst_pmp_volt*this.wst_pmp_amps*Math.sqrt(3)*this.wst_pmp_pf/1000)}
    wst_KPI_std_nrg_newp(){return this.wst_KPI_nrg_elec_eff()/this.wst_pmp_exff*this.wst_KPI_std_nrg_cons()}
    wst_KPI_nrg_cons_new(){return this.wst_vol_pump*this.wst_KPI_std_nrg_newp()/100*this.wst_pmp_head}
    wst_KPI_nrg_estm_sav(){return this.wst_nrg_cons-this.wst_KPI_nrg_cons_new()}
    wst_KPI_ghg_estm_red(){return this.wst_KPI_nrg_estm_sav()*this.wst_conv_kwh}
  //---
  static get equations(){
    return[
      "wst_KPI_GHG_elec",
      "wst_KPI_GHG_fuel",
      "wst_KPI_GHG",
      "wst_KPI_nrg_per_m3",
      "wst_KPI_slu_per_m3",
      "wst_KPI_capac_util",
      "wst_KPI_tst_carr",
      "wst_KPI_std_nrg_cons",
      "wst_KPI_un_head_loss",
      "wst_pmp_pw",
      "wst_KPI_nrg_elec_eff",
      "wst_KPI_std_nrg_newp",
      "wst_KPI_nrg_cons_new",
      "wst_KPI_nrg_estm_sav",
      "wst_KPI_ghg_estm_red",
    ];
  }

  //load a json object
  static from(json_obj){
    return Object.assign(new Water_Treatment(), json_obj);
  }
};

class Water_Distribution extends Substage{
  constructor(name){
    super();
    this.name=name;
    this.wsd_serv_pop = 0;
    this.wsd_vol_dist = 0;

    this.wsd_nrg_cons = 0; //energy consumed from the grid (kWh)
    this.wsd_conv_kwh = 0; //kWh to kgCO2eq conversion factor

    this.wsd_nrg_cost = 0; //energy costs
    this.wsd_run_cost = 0; //total running costs

    this.wsd_auth_con = 0;
    this.wsd_bill_con = 0;
    this.wsd_fuel_typ = 0;
    this.wsd_vol_fuel = 0;
    this.wsd_trck_typ = 0;
    this.wsd_vol_trck = 0;
    this.wsd_deli_pts = 0;
    this.wsd_ser_cons = 0;
    this.wsd_time_pre = 0;
    this.wsd_min_pres = 0;
    this.wsd_hi_no_el = 0;
    this.wsd_lo_no_el = 0;
    this.wsd_av_no_el = 0;
    this.wsd_wt_el_no = 0;
    this.wsd_vol_pump = 0;
    this.wsd_nrg_pump = 0;
    this.wsd_pmp_size = 0;
    this.wsd_sta_head = 0;
    this.wsd_pmp_head = 0;
    this.wsd_main_len = 0;
    this.wsd_pmp_flow = 0;   //Measured pump flow L/s
    this.wsd_pmp_volt = 0;   //Measured pump voltage V
    this.wsd_pmp_amps = 0;   //Measured pump current Amp
    this.wsd_pmp_exff = 0;   //Expected electromechanical efficiency of new pump % C
    this.wsd_pmp_pf   = 0.9; //power factor (no unit)
  }

  //GHG wsd
    wsd_KPI_GHG(){
      //sources (objects)
      let sources=[
        this.wsd_KPI_GHG_elec(),
        this.wsd_KPI_GHG_fuel(),
        this.wsd_KPI_GHG_trck(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wsd_KPI_GHG_elec(){
      let co2 = this.wsd_nrg_cons*this.wsd_conv_kwh;
      let ch4 = 0;
      let n2o = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    wsd_KPI_GHG_fuel(){
      let vol   = this.wsd_vol_fuel;
      let fuel  = Tables.get_row('Fuel type',this.wsd_fuel_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }
    wsd_KPI_GHG_trck(){
      let vol   = this.wsd_vol_trck;
      let fuel  = Tables.get_row('Fuel type',this.wsd_trck_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }
  //SL wsd
    wsd_KPI_nrg_per_vd(){return this.wsd_nrg_cons/this.wsd_vol_dist}
    wsd_KPI_nrg_per_m3(){return this.wsd_nrg_cons/this.wsd_auth_con}
    wsd_SL_nr_water(){return 100*(this.wsd_vol_dist-this.wsd_bill_con)/this.wsd_vol_dist;}
    wsd_SL_water_loss(){return 100*(this.wsd_vol_dist-this.wsd_auth_con)/this.wsd_vol_dist;}
    wsd_pmp_pw(){return this.wsd_pmp_flow*this.wsd_pmp_head*Cts.ct_gravit.value/1000;}
    wsd_KPI_nrg_per_m3(){return this.wsd_nrg_cons/this.wsd_auth_con}
    wsd_KPI_nrg_per_vd(){return this.wsd_nrg_cons/this.wsd_vol_dist}
    wsd_SL_nr_water(){
      return 100*(this.wsd_vol_dist-this.wsd_bill_con)/this.wsd_vol_dist;
    }
    wsd_SL_water_loss(){
      return 100*(this.wsd_vol_dist-this.wsd_auth_con)/this.wsd_vol_dist;
    }
    wsd_SL_pres_ade(){return 100*this.wsd_deli_pts/this.wsd_ser_cons}
    wsd_SL_cont_sup(){return 100*this.wsd_time_pre/24}
    wsd_nrg_topo(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_hi_no_el-this.wsd_av_no_el)/3600000}
    wsd_nrg_natu(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_wt_el_no-this.wsd_lo_no_el)/3600000}
    wsd_nrg_mini(){return Cts.ct_gravit.value*this.wsd_auth_con*(this.wsd_min_pres+this.wsd_av_no_el-this.wsd_lo_no_el)/3600000}
    wsd_nrg_supp(){return this.wsd_nrg_cons+this.wsd_nrg_natu()}
    wsd_KPI_nrg_efficien(){return 100*this.wsd_nrg_mini()/this.wsd_nrg_supp()}
    wsd_KPI_nrg_topgraph(){return 100*this.wsd_nrg_topo()/this.wsd_nrg_supp()}
    wsd_KPI_std_nrg_cons(){
      return this.wsd_nrg_pump/(this.wsd_vol_pump*this.wsd_pmp_head/100)
    }
    wsd_KPI_un_head_loss(){return 1000*(this.wsd_pmp_head-this.wsd_sta_head)/this.wsd_main_len}
    wsd_KPI_water_losses(){return Math.max(0,1000*(this.wsd_vol_dist-this.wsd_auth_con)/(this.wsd_main_len))}
    wsd_KPI_nrg_elec_eff(){return 100*this.wsd_pmp_pw()/(this.wsd_pmp_volt*this.wsd_pmp_amps*Math.sqrt(3)*this.wsd_pmp_pf/1000)}
    wsd_KPI_std_nrg_newp(){return this.wsd_KPI_nrg_elec_eff()/this.wsd_pmp_exff*this.wsd_KPI_std_nrg_cons()}
    wsd_KPI_nrg_cons_new(){return this.wsd_KPI_nrg_elec_eff()/this.wsd_pmp_exff*this.wsd_nrg_pump}
    wsd_KPI_nrg_estm_sav(){return this.wsd_nrg_cons-this.wsd_KPI_nrg_cons_new()}
    wsd_KPI_ghg_estm_red(){return this.wsd_KPI_nrg_estm_sav()*this.wsd_conv_kwh}
  //---
  static get equations(){
    return[
      "wsd_KPI_GHG_elec",
      "wsd_KPI_GHG_fuel",
      "wsd_KPI_GHG_trck",
      "wsd_KPI_GHG",

      "wsd_KPI_nrg_per_vd",
      "wsd_KPI_ghg_estm_red",
      "wsd_KPI_nrg_cons_new",
      "wsd_KPI_nrg_efficien",
      "wsd_KPI_nrg_elec_eff",
      "wsd_KPI_nrg_estm_sav",
      "wsd_KPI_nrg_per_m3",
      "wsd_KPI_nrg_topgraph",
      "wsd_KPI_std_nrg_cons",
      "wsd_KPI_std_nrg_newp",
      "wsd_KPI_un_head_loss",
      "wsd_KPI_water_losses",
      "wsd_SL_cont_sup",
      "wsd_SL_nr_water",
      "wsd_SL_pres_ade",
      "wsd_SL_water_loss",
      "wsd_nrg_mini",
      "wsd_nrg_natu",
      "wsd_nrg_supp",
      "wsd_nrg_topo",
      "wsd_pmp_pw",
    ];
  }

  //load a json object
  static from(json_obj){
    return Object.assign(new Water_Distribution(), json_obj);
  }
};

class Waste_Collection extends Substage{
  constructor(name){
    super();
    this.name=name;
    this.wwc_conn_pop     = 0; //population connected to sewers
    this.wwc_vol_coll     = 0; //volume of collected wastewater
    this.wwc_vol_coll_unt = 0; //volume of collected wastewater untreated (CSO)
    this.wwc_vol_coll_tre = 0; //volume of collected wastewater conveyed to treatment
    this.wwc_bod = 0; //BOD in collection system
    this.wwc_tn  = 0; //TN in collection system
    this.wwc_ch4_efac_cso = 0; //EF CH4 cso
    this.wwc_ch4_efac_col = 0; //EF CH4 collected ww
    this.wwc_n2o_efac_cso = 0; //EF N2O cso
    this.wwc_n2o_efac_col = 0; //EF N2O collected ww

    this.wwc_fuel_typ = 0;
    this.wwc_vol_fuel = 0;

    this.wwc_nrg_cons = 0; //energy consumed from the grid (kWh)
    this.wwc_conv_kwh = 0; //kWh to kgCO2eq conversion factor

    this.wwc_nrg_cost     = 0; //energy costs
    this.wwc_run_cost     = 0; //total running costs

    this.wwc_vol_pump     = 0;
    this.wwc_nrg_pump     = 0;
    this.wwc_pmp_head     = 0;
    this.wwc_sta_head     = 0;
    this.wwc_coll_len     = 0;
    this.wwc_pmp_flow     = 0; //Measured pump flow L/s
    this.wwc_pmp_volt     = 0; //Measured pump voltage V
    this.wwc_pmp_amps     = 0; //Measured pump current Amp
    this.wwc_pmp_exff     = 0; //Expected electromechanical efficiency of new pump % C
    this.wwc_pmp_pf       = 0.9; //power factor (no unit)
  }

  //GHG wwc
    wwc_KPI_GHG(){
      //sources (objects)
      let sources=[
        this.wwc_KPI_GHG_elec(),
        this.wwc_KPI_GHG_fuel(),
        this.wwc_KPI_GHG_cso(),
        this.wwc_KPI_GHG_col(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wwc_KPI_GHG_elec(){
      let co2 = this.wwc_nrg_cons*this.wwc_conv_kwh;
      let ch4 = 0;
      let n2o = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    wwc_KPI_GHG_fuel(){
      let vol   = this.wwc_vol_fuel;
      let fuel  = Tables.get_row('Fuel type',this.wwc_fuel_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }
    wwc_KPI_GHG_cso(){
      //overflowing contaminant loads
      let BOD = this.wwc_bod*(this.wwc_vol_coll_unt/this.wwc_vol_coll)||0; //kg BOD
      let TN  = this.wwc_tn *(this.wwc_vol_coll_unt/this.wwc_vol_coll)||0; //kg TN
      //emissions
      let co2   = 0;
      let ch4   = BOD*this.wwc_ch4_efac_cso*Cts.ct_ch4_eq.value;
      let n2o   = TN *this.wwc_n2o_efac_cso*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    wwc_KPI_GHG_col(){
      //non-overflowing contaminant loads
      let BOD = this.wwc_bod*(this.wwc_vol_coll_tre/this.wwc_vol_coll)||0; //kg BOD
      let TN  = this.wwc_tn *(this.wwc_vol_coll_tre/this.wwc_vol_coll)||0; //kg TN
      //emissions
      let co2   = 0;
      let ch4   = BOD*this.wwc_ch4_efac_col*Cts.ct_ch4_eq.value;
      let n2o   = TN *this.wwc_n2o_efac_col*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
  //SL wwc
    wwc_KPI_nrg_per_m3(){return this.wwc_nrg_cons/this.wwc_vol_coll_tre}
    wwc_pmp_pw(){return this.wwc_pmp_flow*this.wwc_pmp_head*Cts.ct_gravit.value/1000;}
    wwc_KPI_std_nrg_cons(){return this.wwc_nrg_pump/(this.wwc_vol_pump*this.wwc_pmp_head/100)}
    wwc_KPI_un_head_loss(){return 1000*(this.wwc_pmp_head-this.wwc_sta_head)/this.wwc_coll_len}
    wwc_KPI_nrg_elec_eff(){return 100*this.wwc_pmp_pw()/(this.wwc_pmp_volt*this.wwc_pmp_amps*Math.sqrt(3)*this.wwc_pmp_pf/1000)}
    wwc_KPI_std_nrg_newp(){return this.wwc_KPI_nrg_elec_eff()/this.wwc_pmp_exff*this.wwc_KPI_std_nrg_cons()}
    wwc_KPI_nrg_cons_new(){return this.wwc_vol_pump*this.wwc_KPI_std_nrg_newp()/100*this.wwc_pmp_head}
    wwc_KPI_nrg_estm_sav(){return this.wwc_nrg_cons-this.wwc_KPI_nrg_cons_new()}
    wwc_KPI_ghg_estm_red(){return this.wwc_KPI_nrg_estm_sav()*this.wwc_conv_kwh}
  //---
  static get equations(){
    return[
      "wwc_KPI_GHG_elec",
      "wwc_KPI_GHG_fuel",
      "wwc_KPI_GHG_cso",
      "wwc_KPI_GHG_col",
      "wwc_KPI_GHG",

      "wwc_KPI_nrg_per_m3",

      "wwc_KPI_std_nrg_cons",
      "wwc_KPI_un_head_loss",
      "wwc_KPI_nrg_elec_eff",
      "wwc_KPI_std_nrg_newp",
      "wwc_KPI_nrg_cons_new",
      "wwc_KPI_nrg_estm_sav",
      "wwc_KPI_ghg_estm_red",
    ];
  }

  //load a json object
  static from(json_obj){
    return Object.assign(new Waste_Collection(), json_obj);
  }
};

class Waste_Treatment extends Substage{
  constructor(name){
    super();
    this.name=name;
    this.wwt_serv_pop = 0; //population serviced
    this.wwt_vol_trea = 0; //volume of treated ww
    this.wwt_vol_nonp = 0; //Volume of water reused
    this.wwt_vol_disc = 0; //discharged ww volume
    this.wwt_bod_infl = 0; //BOD influent
    this.wwt_bod_effl = 0; //BOD effluent

    this.wwt_tn_infl = 0; //TN influent
    this.wwt_tn_effl = 0; //TN effluent

    this.wwt_mass_slu = 0;
    this.wwt_bod_slud = 0; //BOD removed as sludge

    this.wwt_ch4_efac_tre = 0;
    this.wwt_ch4_efac_dis = 0;
    this.wwt_n2o_efac_tre = 0;
    this.wwt_n2o_efac_dis = 0;

    this.wwt_fuel_typ = 0;
    this.wwt_vol_fuel = 0;
    this.wwt_trea_cap = 0;
    this.wwt_tst_cmpl = 0;
    this.wwt_tst_cond = 0;

    this.wwt_nrg_cons = 0; //energy consumed from the grid (kWh)
    this.wwt_conv_kwh = 0; //kWh to kgCO2eq conversion factor

    this.wwt_nrg_cost = 0; //energy costs
    this.wwt_run_cost = 0; //total running costs

    this.wwt_vol_pump = 0;
    this.wwt_nrg_pump = 0;
    this.wwt_pmp_head = 0;
    this.wwt_sta_head = 0;
    this.wwt_coll_len = 0;
    this.wwt_pmp_flow = 0;
    this.wwt_pmp_volt = 0;
    this.wwt_pmp_amps = 0;
    this.wwt_pmp_pf   = 0.9;
    this.wwt_pmp_exff = 0;

    //biogas
    this.wwt_biog_pro  = 0; //total biogas produced
    this.wwt_biog_fla  = 98; //% of biogas produced that is flared
    this.wwt_biog_val  = 0; //% of biogas produced that is used for heat
    this.wwt_biog_lkd  = 2; //% of biogas produced that is leaked
    this.wwt_biog_sold = 0; //% of biogas produced that is sold
    this.wwt_ch4_biog  = 59; //% of CH4 in biogas (volume)
    this.wwt_dige_typ  = 0;
    this.wwt_fuel_dig  = 0;
    this.wwt_nrg_biog  = 0;

    //reuse
    this.wwt_reus_trck_typ = 0;
    this.wwt_reus_vol_trck = 0;

    //composting of sludge
    this.wwt_mass_slu_comp = 0;
    this.wwt_slu_comp_emis_treated_or_piles_covered = 0; //yes/no
    this.wwt_slu_comp_solids_content = 0; //percentage

    this.wwt_wr_N_rec       = 0; //N recovered
    this.wwt_wr_P_rec       = 0; //P recovered
    this.wwt_slu_disp       = 0;
    this.wwt_mass_slu_sto   = 0;
    this.wwt_time_slu_sto   = 0;
    this.wwt_mass_slu_inc   = 0;
    this.wwt_temp_inc       = 1023;
    this.wwt_mass_slu_app   = 0;
    this.wwt_soil_typ       = 0; //Option ("Fine" or "Coarse")
    this.wwt_slu_la_N_cont  = 0; //Total Nitrogen (% of dry weight)
    this.wwt_mass_slu_land  = 0;
    this.wwt_slu_lf_N_cont  = 0;
    this.wwt_slu_lf_TVS     = 0;
    this.wwt_slu_type       = 0;
    this.wwt_mass_slu_stock = 0;
    this.wwt_trck_typ       = 0;
    this.wwt_vol_tslu       = 0;
  }

  //GHG wwt
    wwt_KPI_GHG(){
      //sources (objects)
      let sources=[
        this.wwt_KPI_GHG_elec(),
        this.wwt_KPI_GHG_fuel(),
        this.wwt_KPI_GHG_tre(),
        this.wwt_KPI_GHG_biog(),
        this.wwt_KPI_GHG_dig_fuel(),
        this.wwt_KPI_GHG_slu(),
        this.wwt_KPI_GHG_reus_trck(),
        this.wwt_KPI_GHG_disc(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }
    wwt_KPI_GHG_elec(){
      let co2 = this.wwt_nrg_cons*this.wwt_conv_kwh;
      let ch4 = 0;
      let n2o = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    wwt_KPI_GHG_fuel(){
      let vol   = this.wwt_vol_fuel;
      let fuel  = Tables.get_row('Fuel type',this.wwt_fuel_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }
    wwt_KPI_GHG_dig_fuel(){
      let vol   = this.wwt_fuel_dig;
      let fuel  = Tables.get_row('Fuel type',this.wwt_dige_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_tre(){
      let co2   = 0;
      let ch4   = (this.wwt_bod_infl-this.wwt_bod_slud)*this.wwt_ch4_efac_tre*Cts.ct_ch4_eq.value;
      let n2o   = this.wwt_tn_infl*this.wwt_n2o_efac_tre*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //biogas emissions
    wwt_KPI_GHG_biog(){
      let sources=[
        this.wwt_KPI_GHG_biog_flared(),
        this.wwt_KPI_GHG_biog_valorized(),
        this.wwt_KPI_GHG_biog_leaked(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    //convert volume of biogas produced to moles of biogas produced
    wwt_moles_biogas_produced(){
      //use PV=nRT formula
      //n = PV/RT
      //use normal conditions of pressure and temperature
      let P = 1.013e5; //Pa == N/m2 == J/m3
      let V = this.wwt_biog_pro; //m3
      let R = 8.31446261815324; //J/K·mol
      let T = 273.15; //K == 0ºC
      return P*V/(R*T); //"moles" of biogas produced
    }

    //biogas flared emissions
    wwt_KPI_GHG_biog_flared(){
      let moles_biogas        = this.wwt_moles_biogas_produced(); //moles of biogas produced
      let moles_biogas_flared = moles_biogas*this.wwt_biog_fla/100; //moles of biogas flared
      let moles_ch4_flared    = moles_biogas_flared*this.wwt_ch4_biog/100; //moles of CH4 flared

      //combustion of 1 mol of CH4 produces 1 mol of CO2
      //CH4 + 2·O2 -> CO2 + 2·H2O
      //we do not account moles of CO2 already present into the biogas, because it is biogenic CO2
      let moles_co2_to_atmosphere = moles_ch4_flared; //moles of CO2
      let mass_co2_to_atmosphere = moles_co2_to_atmosphere*(44/1000); //kg of CO2

      let co2 = mass_co2_to_atmosphere; //kgCO2
      let n2o = 0;
      let ch4 = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //biogas valorized emissions
    wwt_KPI_GHG_biog_valorized(){
      let moles_biogas           = this.wwt_moles_biogas_produced(); //moles of biogas produced
      let moles_biogas_valorized = moles_biogas*this.wwt_biog_val/100; //moles of biogas valorized
      let moles_ch4_valorized    = moles_biogas_valorized*this.wwt_ch4_biog/100; //moles of CH4 valorized

      //combustion of 1 mol of CH4 produces 1 mol of CO2
      //CH4 + 2·O2 -> CO2 + 2·H2O
      //we do not account moles of CO2 already present into the biogas, because it is biogenic CO2
      let moles_co2_to_atmosphere = moles_ch4_valorized; //moles of CO2
      let mass_co2_to_atmosphere = moles_co2_to_atmosphere*(44/1000); //kg of CO2

      let co2 = mass_co2_to_atmosphere; //kgCO2
      let n2o = 0;
      let ch4 = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //biogas leaked emissions
    wwt_KPI_GHG_biog_leaked(){
      let moles_biogas = this.wwt_moles_biogas_produced(); //moles of biogas produced
      let moles_biogas_leaked = moles_biogas*this.wwt_biog_lkd/100; //moles of biogas leaked

      //we do not account moles of CO2 already present into the biogas, because it is biogenic CO2
      let moles_ch4_leaked = moles_biogas_leaked*this.wwt_ch4_biog/100; //moles of CH4 leaked
      let mass_ch4_to_atmosphere = moles_ch4_leaked*(16/1000); //kg of CH4 leaked

      let co2 = 0;
      let n2o = 0;
      let ch4 = mass_ch4_to_atmosphere*Cts.ct_ch4_eq.value; //kgCO2eq
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //ghg from sludge management
    wwt_KPI_GHG_slu(){
      let sources=[
        this.wwt_KPI_GHG_slu_storage(),
        this.wwt_KPI_GHG_slu_composting(),
        this.wwt_KPI_GHG_slu_incineration(),
        this.wwt_KPI_GHG_slu_land_application(),
        this.wwt_KPI_GHG_slu_landfilling(),
        this.wwt_KPI_GHG_slu_stockpilling(),
        this.wwt_KPI_GHG_slu_transport(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_storage(){
      let sludge_type  = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp);
      let sludge_mass  = this.wwt_mass_slu_sto; //kg of sludge
      let storage_time = this.wwt_time_slu_sto; //days

      let ch4_potential = (function(){
        let TVS   = sludge_type.TVS; //gTVS/gSludge
        let OC    = Cts.ct_oc_vs.value; //gOC/gTVS
        let f_ch4 = sludge_type.f_ch4; //??
        return sludge_mass*f_ch4*TVS*OC*(4/3);
      })();

      let f=(function(){
        if(storage_time > 5 && storage_time < 20){
          return 0.03;
        }else if(storage_time >= 20){
          return 0.05;
        }else{
          return 0;
        }
      })();

      let co2   = 0;
      let n2o   = 0;
      let ch4   = f*ch4_potential*Cts.ct_ch4_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_composting(){
      let emissions_are_treated_or_piles_are_covered = this.wwt_slu_comp_emis_treated_or_piles_covered; //boolean
      let sludge_mass = this.wwt_mass_slu_comp; //kg of sludge
      let solids_content_of_compost = this.wwt_slu_comp_solids_content; //percentage gSolids/gSludge
      let sludge_type = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp); //digested or non-digested

      let sludge_to_TVS = sludge_type.TVS; //gTVS/gSludge
      let sludge_to_ON  = sludge_type.la_N_cont/100; //gN/gSludge
      let TVS_to_OC     = Cts.ct_oc_vs.value;  //0.56 gOC/gTVS
      let OC_to_CH4     = Cts.ct_ch4_oc.value; //1.33 gCH4/gOC
      let ratio_up      = Cts.ct_ch4_up.value; //0.025 ratio for uncovered pile

      //gases
      let co2 = 0;
      let ch4 = (function(){
        if(emissions_are_treated_or_piles_are_covered){return 0}
        if(solids_content_of_compost>55){return 0}
        return sludge_mass*sludge_to_TVS*TVS_to_OC*ratio_up*OC_to_CH4*Cts.ct_ch4_eq.value;
      })();

      let n2o = (function(){
        let C_content = sludge_mass*sludge_to_TVS*TVS_to_OC; //kgC
        let N_content = sludge_mass*sludge_to_ON; //kgN
        let ratio_CN  = C_content/N_content||0;

        if(ratio_CN>=30){return 0}
        if(solids_content_of_compost>55){return 0}

        let factor_for_low_CN_ratio = Cts.ct_n2o_lf.value/100;
        return sludge_mass*sludge_to_ON*factor_for_low_CN_ratio*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      })();

      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_incineration(){
      let sludge_mass = this.wwt_mass_slu_inc; //kg
      let temperature = this.wwt_temp_inc;     //ºC

      let co2 = 0;
      let ch4 = (4.85/1e5)*sludge_mass*Cts.ct_ch4_eq.value;
      let n2o = (function(){
        if(temperature > 1152){
          return 0;
        }else{
          return 0.03*sludge_mass*(161.3-0.14*Math.max(1023,temperature))*0.01*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        }
      })();

      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_land_application(){
      let sludge_mass = this.wwt_mass_slu_app; //kg sludge
      let sludge_type = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp);
      let C_content = (function(){
        let TVS = sludge_type.TVS; //gTVS/gSludge
        let OC = Cts.ct_oc_vs.value; //gOC/gTVS
        return sludge_mass*TVS*OC; //gOC
      })(); //gOC
      let N_content = sludge_mass*this.wwt_slu_la_N_cont/100;
      let ratio_CN = C_content/N_content || 0;
      if(ratio_CN>=30){return {total:0,co2:0,ch4:0,n2o:0};}
      let f_la = Tables.get_row('Soil type',this.wwt_soil_typ).f_la; //??

      let co2   = 0;
      let ch4   = 0;
      let n2o   = N_content*f_la*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_landfilling(){
      let sludge_mass = this.wwt_mass_slu_land;
      let sludge_type = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp);
      let TVS         = this.wwt_slu_lf_TVS/100; //gTVS/gSludge
      let ratio       = Tables.get_row('Type of landfill',this.wwt_slu_type).ratio;
      let N_content   = sludge_mass*this.wwt_slu_lf_N_cont/100; //gN
      let OC          = Cts.ct_oc_vs.value; //gOC/gTVS

      let co2 = 0;
      let ch4 = ratio*(function(){
        let uncertainty   = Cts.ct_lf_unc.value;
        let OC_to_CH4     = Cts.ct_ch4_oc.value; //gCH4/gOC
        let CH4_in_lf_gas = Cts.ct_ch4_lf.value/100;
        let DOC_fra       = Cts.ct_DOCfra.value/100;
        let dec_3year     = Cts.ct_d3y_lf.value/100;
        return uncertainty*sludge_mass*TVS*OC*OC_to_CH4*CH4_in_lf_gas*DOC_fra*dec_3year*Cts.ct_ch4_eq.value;
      })();
      let n2o = ratio*(function(){
        let C_content = sludge_mass*TVS*OC; //gOC
        let ratio_CN = C_content/N_content || 0;
        if(ratio_CN>=30){return 0;}
        let factor_for_low_CN_ratio = Cts.ct_n2o_lf.value/100;
        return N_content*factor_for_low_CN_ratio*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      })();

      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_stockpilling(){
      let sludge_mass =  this.wwt_mass_slu_stock;
      let co2   = sludge_mass*90.3/1000;
      let ch4   = 0;
      let n2o   = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_transport(){
      let vol   = this.wwt_vol_tslu;
      let fuel  = Tables.get_row('Fuel type',this.wwt_trck_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,n2o,ch4};
    }

    wwt_KPI_GHG_reus_trck(){
      let vol   = this.wwt_reus_vol_trck;
      let fuel  = Tables.get_row('Fuel type',this.wwt_reus_trck_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_disc(){
      let co2   = 0;
      let ch4   = this.wwt_bod_effl*this.wwt_ch4_efac_dis*Cts.ct_ch4_eq.value;
      let n2o   = this.wwt_tn_effl *this.wwt_n2o_efac_dis*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

  //SL wwt
    //all biogas produced is used for different things. Has to add up to 100%
    wwt_biogas_usage(){
      let flared = this.wwt_biog_fla;  //% of biogas produced that is flared
      let used   = this.wwt_biog_val;  //% of biogas produced that is used for heat
      let leaked = this.wwt_biog_lkd;  //% of biogas produced that is leaked
      let sold   = this.wwt_biog_sold; //% of biogas produced that is sold
      return flared + used + leaked + sold;
    }
    wwt_bod_rmvd(){return this.wwt_bod_infl-this.wwt_bod_effl}
    wwt_KPI_nrg_per_m3(){return this.wwt_nrg_cons/this.wwt_vol_trea}
    wwt_KPI_nrg_per_kg(){return this.wwt_nrg_cons/this.wwt_bod_rmvd()}
    wwt_KPI_capac_util(){return 100*this.wwt_vol_trea/this.wwt_trea_cap}
    wwt_SL_qual_com(){return 100*this.wwt_tst_cmpl/this.wwt_tst_cond}
    wwt_KPI_nrg_per_pump(){return this.wwt_nrg_pump/this.wwt_vol_pump}
    wwt_KPI_std_nrg_cons(){return this.wwt_nrg_pump/(this.wwt_vol_pump*this.wwt_pmp_head/100)}
    wwt_KPI_un_head_loss(){return 1000*(this.wwt_pmp_head-this.wwt_sta_head)/this.wwt_coll_len}
    wwt_pmp_pw(){return this.wwt_pmp_flow*this.wwt_pmp_head*Cts.ct_gravit.value/1000;}
    wwt_KPI_nrg_elec_eff(){return 100*this.wwt_pmp_pw()/(this.wwt_pmp_volt*this.wwt_pmp_amps*Math.sqrt(3)*this.wwt_pmp_pf/1000)}
    wwt_KPI_std_nrg_newp(){return this.wwt_KPI_nrg_elec_eff()/this.wwt_pmp_exff*this.wwt_KPI_std_nrg_cons()}
    wwt_KPI_nrg_cons_new(){return this.wwt_vol_pump*this.wwt_KPI_std_nrg_newp()/100*this.wwt_pmp_head}
    wwt_KPI_nrg_estm_sav(){return this.wwt_nrg_cons-this.wwt_KPI_nrg_cons_new()}
    wwt_KPI_ghg_estm_red(){return this.wwt_KPI_nrg_estm_sav()*this.wwt_conv_kwh}
    wwt_nrg_biog_val(){
      let biogas_produced = this.wwt_biog_pro; //m3 of biogas
      let biogas_valorized = biogas_produced*this.wwt_biog_val/100; //m3 of biogas
      let methane_valorized = biogas_valorized*this.wwt_ch4_biog/100; //m3 of methane
      return methane_valorized*Cts.ct_ch4_nrg.value; //kWh
    }
    wwt_KPI_nrg_biogas(){return this.wwt_nrg_biog/this.wwt_vol_trea}
    wwt_KPI_nrg_x_biog(){return 100*this.wwt_nrg_biog/this.wwt_nrg_biog_val()}
    wwt_total_m3(){return this.wwt_vol_disc+this.wwt_vol_nonp;}
    wwt_KPI_sludg_prod(){return this.wwt_mass_slu/this.wwt_vol_trea;}

    //ghg avoided
    wwt_ghg_avoided(){
      return [
        this.wwt_ghg_avoided_biogas(),
        this.wwt_ghg_avoided_reuse_nutrient(),
        this.wwt_ghg_avoided_reuse_water(),
        this.wwt_ghg_avoided_sequestration(),
      ].sum();
    }
    wwt_ghg_avoided_biogas(){
      return this.wwt_nrg_biog*this.wwt_conv_kwh;
    }
    wwt_ghg_avoided_reuse_nutrient(){
      let N = this.wwt_wr_N_rec*Cts.ct_cr_forN.value;
      let P = this.wwt_wr_P_rec*Cts.ct_cr_forP.value;
      return N+P;
    }
    wwt_ghg_avoided_reuse_water(){
      let ch4 = 0; //TBD TODO: methane emissions avoided due to water reused
      let n2o = this.wwt_vol_nonp*((this.wwt_tn_effl/this.wwt_vol_disc)||0)*this.wwt_n2o_efac_dis*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      return ch4+n2o;
    }
    wwt_ghg_avoided_sequestration(){
      return [
        this.wwt_ghg_avoided_sequestration_composting(),
        this.wwt_ghg_avoided_sequestration_landapp(),
        this.wwt_ghg_avoided_sequestration_landfil(),
      ].sum();
    }
    wwt_ghg_avoided_sequestration_composting(){
      return this.wwt_mass_slu_comp*Cts.ct_C_seqst.value;
    }
    wwt_ghg_avoided_sequestration_landapp(){
      return this.wwt_mass_slu_app*Cts.ct_C_seqst.value;
    }
    wwt_ghg_avoided_sequestration_landfil(){
      let sludge_mass = this.wwt_mass_slu_land;
      let TVS = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp).TVS;
      return sludge_mass*(TVS)*(0.56)*(0.2)*(44/12);
    }

  //---
  static get equations(){
    return[
      "wwt_KPI_GHG_elec",
      "wwt_KPI_GHG_fuel",
      "wwt_KPI_GHG_tre",
      "wwt_KPI_GHG_biog",
      "wwt_KPI_GHG_dig_fuel",
      "wwt_KPI_GHG_slu",
      "wwt_KPI_GHG_disc",

      "wwt_KPI_GHG_reus_trck",

      "wwt_KPI_GHG",

      "wwt_bod_rmvd",
      "wwt_KPI_nrg_per_m3",
      "wwt_KPI_nrg_per_kg",
      "wwt_KPI_capac_util",

      "wwt_SL_qual_com",
      "wwt_KPI_nrg_per_pump",
      "wwt_KPI_std_nrg_cons",
      "wwt_KPI_un_head_loss",
      "wwt_KPI_nrg_elec_eff",
      "wwt_KPI_std_nrg_newp",
      "wwt_KPI_nrg_cons_new",
      "wwt_KPI_nrg_estm_sav",
      "wwt_KPI_ghg_estm_red",

      "wwt_moles_biogas_produced",
      "wwt_biogas_usage",
      "wwt_nrg_biog_val",
      "wwt_KPI_nrg_biogas",
      "wwt_KPI_nrg_x_biog",
      "wwt_KPI_sludg_prod",
      "wwt_total_m3",

      "wwt_ghg_avoided",
    ];
  }

  //load a json object
  static from(json_obj){
    return Object.assign(new Waste_Treatment(), json_obj);
  }
};

class Waste_Onsite extends Substage{
  constructor(name){
    super();
    this.name=name;

    //1. population
    this.wwo_onsi_pop = 0; //population with onsite treatment

    //2. containment + transport
    this.wwo_bod_cont     = 0; //bod entering containment
    this.wwo_flooding     = 0; //yes/no
    this.wwo_ch4_efac_con = 0; //EF
    this.wwo_cont_emp     = 0; //containments emptied
    this.wwo_fdensity     = 1400; //density of faecal sludge
    this.wwo_fslu_emp     = 0; //FS emptied
    this.wwo_bod_conc_fs  = 67.8; //[BOD] in FS
    this.wwo_bod_rmvd     = 0; //bod removed as FS (going to treatment)

    //3. treatment
    this.wwo_bod_infl     = 0; //bod entering treatment == wwo_bod_rmvd
    this.wwo_tn_infl      = 0; //TN influent
    this.wwo_ch4_efac_tre = 0; //EF
    this.wwo_n2o_efac_tre = 0; //EF
    this.wwo_bod_effl     = 0; //bod exiting treatment
    this.wwo_tn_effl      = 0; //TN effluent
    this.wwo_bod_slud     = 0; //bod removed with excess sludge

    //4. disposal end use
    this.wwo_ch4_efac_dis = 0; //EF
    this.wwo_n2o_efac_dis = 0; //EF

    //5. open defecation
    this.wwo_open_pop = 0; //population open defecation
    this.wwo_prot_con = 0; //protein consumption open defecation
    this.wwo_n2o_efac_opd = 0; //EF

    //pump efficiency
    this.wwo_nrg_pump = 0;
    this.wwo_vol_pump = 0;
    this.wwo_pmp_head = 0;
    this.wwo_sta_head = 0;
    this.wwo_coll_len = 0;
    this.wwo_pmp_flow = 0;
    this.wwo_pmp_volt = 0;
    this.wwo_pmp_amps = 0;
    this.wwo_pmp_pf   = 0.9;
    this.wwo_pmp_exff = 0;
    this.wwo_vol_fuel = 0; //fuel consumed
    this.wwo_fuel_typ = 0; //type of fuel
    this.wwo_trck_typ = 0; //type of fuel
    this.wwo_vol_trck = 0; //fuel consumed

    //biogas
    this.wwo_biog_pro  = 0; //total biogas produced
    this.wwo_biog_fla  = 98; //% of biogas produced that is flared
    this.wwo_biog_val  = 0; //% of biogas produced that is used for heat
    this.wwo_biog_lkd  = 2; //% of biogas produced that is leaked
    this.wwo_biog_sold = 0; //% of biogas produced that is sold
    this.wwo_ch4_biog  = 59; //% of CH4 in biogas (volume)
    this.wwo_dige_typ  = 0;
    this.wwo_fuel_dig  = 0;
    this.wwo_nrg_biog  = 0;

    //land application
    this.wwo_mass_landapp = 0; //dry weight sent to land application
    this.wwo_la_N_to_N2O  = 0; //land application N transformed to N2O
    this.wwo_la_N_cont    = 0; //N content of faecal sludge

    //landfill
    this.wwo_mass_landfil = 0; //dry weight sent to landfilling
    this.wwo_lf_type      = 0; //disposal type for landfilling
    this.wwo_fslu_typ_lf  = 0; //type of faecal sludge disposed landfil
    this.wwo_lf_N_cont    = 0; //N content of faecal sludge
    this.wwo_lf_TVS       = 0; //TVS content of faecal sludge

    //dumping
    this.wwo_vol_dumping      = 0; //volume dumped
    this.wwo_ch4_efac_dumping = 0; //emission factor depending on dumping pathway

    //land application of urine
    this.wwo_N_urine  = 0;
    this.wwo_reused_N = 0;
    this.wwo_reused_P = 0;

    //6. energy performance
    this.wwo_nrg_cons = 0; //energy consumed from the grid (kWh)
    this.wwo_conv_kwh = 0; //kWh to kgCO2eq conversion factor
    this.wwo_nrg_cost = 0; //energy costs
    this.wwo_run_cost = 0; //total running costs

    //this.not_used_variable = 0; //use it to test if the function that locates not used variables works
  }

  //GHG wwo
    //wwo total emissions
    wwo_KPI_GHG(){
      //sources (objects)
      let sources=[
        this.wwo_KPI_GHG_elec(),
        this.wwo_KPI_GHG_fuel(),
        this.wwo_KPI_GHG_unt_opd(),
        this.wwo_KPI_GHG_containment(),
        this.wwo_KPI_GHG_tre(),
        this.wwo_KPI_GHG_dis(),
        this.wwo_KPI_GHG_biog(),
        this.wwo_KPI_GHG_dig_fuel(),
        this.wwo_KPI_GHG_landapp(),
        this.wwo_KPI_GHG_landfil(),
        this.wwo_KPI_GHG_dumping(),
        this.wwo_KPI_GHG_trck(),
        this.wwo_KPI_GHG_urine(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    //electricity
    wwo_KPI_GHG_elec(){
      let co2 = this.wwo_nrg_cons*this.wwo_conv_kwh;
      let ch4 = 0;
      let n2o = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //fuel engines
    wwo_KPI_GHG_fuel(){
      let vol   = this.wwo_vol_fuel;
      let fuel  = Tables.get_row('Fuel type',this.wwo_fuel_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,n2o,ch4};
    }

    //open defecation
    wwo_KPI_GHG_unt_opd(){
      let protein = this.wwo_prot_con; //kg
      let fra_np  = Cts.ct_fra_np.value;
      let fac_nc  = Cts.ct_fac_nc.value;
      let n2o_ef  = this.wwo_n2o_efac_opd;
      let n2o_co  = Cts.ct_n2o_co.value;
      let n2o_eq  = Cts.ct_n2o_eq.value;

      let co2   = 0;
      let ch4   = 0; //IPCC considers that CH4 is not produced since anaerobic conditions are unlikely
      let n2o   = protein*fra_np*fac_nc*n2o_ef*n2o_co*n2o_eq;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //transport
    wwo_KPI_GHG_trck(){
      let vol   = this.wwo_vol_trck;
      let fuel  = Tables.get_row('Fuel type',this.wwo_trck_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,n2o,ch4};
    }

    //containment
    wwo_KPI_GHG_containment(){
      let co2   = 0;
      let n2o   = 0;
      let ch4   = (this.wwo_bod_cont-this.wwo_bod_rmvd)*this.wwo_ch4_efac_con*Cts.ct_ch4_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,n2o,ch4};
    }

    //biogas
    wwo_KPI_GHG_biog(){
      let sources=[
        this.wwo_KPI_GHG_biog_flared(),
        this.wwo_KPI_GHG_biog_valorized(),
        this.wwo_KPI_GHG_biog_leaked(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    //convert volume of biogas produced to moles of biogas produced
    wwo_moles_biogas_produced(){
      //use PV=nRT formula
      //n = PV/RT
      //use normal conditions of pressure and temperature
      let P = 1.013e5; //Pa == N/m2 == J/m3
      let V = this.wwo_biog_pro; //m3
      let R = 8.31446261815324; //J/K·mol
      let T = 273.15; //K == 0ºC
      return P*V/(R*T); //"moles" of biogas produced
    }

    //biogas flared emissions
    wwo_KPI_GHG_biog_flared(){
      let moles_biogas        = this.wwo_moles_biogas_produced(); //moles of biogas produced
      let moles_biogas_flared = moles_biogas*this.wwo_biog_fla/100; //moles of biogas flared
      let moles_ch4_flared    = moles_biogas_flared*this.wwo_ch4_biog/100; //moles of CH4 flared

      //combustion of 1 mol of CH4 produces 1 mol of CO2
      //CH4 + 2·O2 -> CO2 + 2·H2O
      //we do not account moles of CO2 already present into the biogas, because it is biogenic CO2
      let moles_co2_to_atmosphere = moles_ch4_flared; //moles of CO2
      let mass_co2_to_atmosphere = moles_co2_to_atmosphere*(44/1000); //kg of CO2

      let co2 = mass_co2_to_atmosphere; //kgCO2
      let n2o = 0;
      let ch4 = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //biogas valorized emissions
    wwo_KPI_GHG_biog_valorized(){
      let moles_biogas           = this.wwo_moles_biogas_produced(); //moles of biogas produced
      let moles_biogas_valorized = moles_biogas*this.wwo_biog_val/100; //moles of biogas valorized
      let moles_ch4_valorized    = moles_biogas_valorized*this.wwo_ch4_biog/100; //moles of CH4 valorized

      //combustion of 1 mol of CH4 produces 1 mol of CO2
      //CH4 + 2·O2 -> CO2 + 2·H2O
      //we do not account moles of CO2 already present into the biogas, because it is biogenic CO2
      let moles_co2_to_atmosphere = moles_ch4_valorized; //moles of CO2
      let mass_co2_to_atmosphere = moles_co2_to_atmosphere*(44/1000); //kg of CO2

      let co2 = mass_co2_to_atmosphere; //kgCO2
      let n2o = 0;
      let ch4 = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //biogas leaked emissions
    wwo_KPI_GHG_biog_leaked(){
      let moles_biogas = this.wwo_moles_biogas_produced(); //moles of biogas produced
      let moles_biogas_leaked = moles_biogas*this.wwo_biog_lkd/100; //moles of biogas leaked

      //we do not account moles of CO2 already present into the biogas, because it is biogenic CO2
      let moles_ch4_leaked = moles_biogas_leaked*this.wwo_ch4_biog/100; //moles of CH4 leaked
      let mass_ch4_to_atmosphere = moles_ch4_leaked*(16/1000); //kg of CH4 leaked

      let co2 = 0;
      let n2o = 0;
      let ch4 = mass_ch4_to_atmosphere*Cts.ct_ch4_eq.value; //kgCO2eq
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //fuel consumed by anaerobic digester
    wwo_KPI_GHG_dig_fuel(){
      let vol   = this.wwo_fuel_dig;
      let fuel  = Tables.get_row('Fuel type',this.wwo_dige_typ);
      let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2
      let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,ch4,n2o};
    }

    //treatment
    wwo_KPI_GHG_tre(){
      let co2   = 0;
      let ch4   = (this.wwo_bod_infl-this.wwo_bod_slud)*this.wwo_ch4_efac_tre*Cts.ct_ch4_eq.value;
      let n2o   = this.wwo_tn_infl*this.wwo_n2o_efac_tre*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //discharge
    wwo_KPI_GHG_dis(){
      let co2   = 0;
      let ch4   = this.wwo_bod_effl*this.wwo_ch4_efac_dis*Cts.ct_ch4_eq.value;
      let n2o   = this.wwo_tn_effl *this.wwo_n2o_efac_dis*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //land application
    wwo_KPI_GHG_landapp(){
      let fs_mass = this.wwo_mass_landapp; //kg of faecal sludge sent to land application
      let N_cont  = this.wwo_la_N_cont; //% Nitrogen in faecal sludge
      let N_transformed_to_N2O = this.wwo_la_N_to_N2O; //gN2O-N/gN

      let co2 = 0;
      let ch4 = 0;
      let n2o = fs_mass*N_cont/100*N_transformed_to_N2O*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    //landfill
    wwo_KPI_GHG_landfil(){
      let sludge_mass = this.wwo_mass_landfil;
      let ratio       = Tables.get_row('Type of landfill',this.wwo_lf_type).ratio;
      let N_content   = sludge_mass*this.wwo_lf_N_cont/100;
      let TVS         = this.wwo_lf_TVS/100; //gTVS/gSludge
      let n2o         = ratio*N_content*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value
      let ch4 = ratio*(function(){
        let OC            = Cts.ct_oc_vs.value; //gOC/gTVS
        let DOC_fra       = Cts.ct_DOCfra.value/100;
        let uncertainty   = Cts.ct_lf_unc.value;
        let OC_to_CH4     = Cts.ct_ch4_oc.value; //gCH4/gOC
        let CH4_in_lf_gas = Cts.ct_ch4_lf.value/100;
        let dec_3year     = Cts.ct_d3y_lf.value/100;
        return sludge_mass*TVS*OC*DOC_fra*uncertainty*OC_to_CH4*CH4_in_lf_gas*dec_3year*Cts.ct_ch4_eq.value;
      })();
      let co2 = 0;
      let total = co2 + n2o + ch4;
      return {total,co2,n2o,ch4};
    }
    //dumping
    wwo_KPI_GHG_dumping(){
      let co2   = 0;
      let ch4   = this.wwo_vol_dumping*this.wwo_bod_conc_fs*this.wwo_ch4_efac_dumping*Cts.ct_ch4_eq.value;
      let n2o   = this.wwo_vol_dumping*this.wwo_tn_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+n2o+ch4;
      return {total,co2,n2o,ch4};
    }
    //urine
    wwo_KPI_GHG_urine(){
      let co2   = 0;
      let ch4   = 0;
      let n2o   = this.wwo_N_urine*Cts.ct_n2o_co.value*0.01;
      let total = co2+n2o+ch4;
      return {total,co2,n2o,ch4};
    }

  //SL wwo
    wwo_nrg_biog_val(){
      let biogas_produced = this.wwo_biog_pro; //m3 of biogas
      let biogas_valorized = biogas_produced*this.wwo_biog_val/100; //m3 of biogas
      let methane_valorized = biogas_valorized*this.wwo_ch4_biog/100; //m3 of methane
      return methane_valorized*Cts.ct_ch4_nrg.value; //kWh
    }

    wwo_biogas_usage(){
      let flared = this.wwo_biog_fla;  //% of biogas produced that is flared
      let used   = this.wwo_biog_val;  //% of biogas produced that is used for heat
      let leaked = this.wwo_biog_lkd;  //% of biogas produced that is leaked
      let sold   = this.wwo_biog_sold; //% of biogas produced that is sold
      return flared + used + leaked + sold;
    }

    //avoided ghg in wwo
    wwo_ghg_avoided(){
      return [
        this.wwo_ghg_avoided_biogas(),
        this.wwo_ghg_avoided_landapp(),
        this.wwo_ghg_avoided_landfil(),
        this.wwo_ghg_avoided_reuse(),
      ].sum();
    }
    wwo_ghg_avoided_biogas(){
      return this.wwo_nrg_biog*this.wwo_conv_kwh;
    }
    wwo_ghg_avoided_landapp(){
      return this.wwo_mass_landapp*Cts.ct_C_seqst.value;
    }
    wwo_ghg_avoided_landfil(){
      let fslu_type = Tables.get_row('Type of faecal sludge',this.wwo_fslu_typ_lf);
      let TVS       = fslu_type.TVS;
      return this.wwo_mass_landfil*TVS*Cts.ct_oc_vs.value*Cts.ct_u_org_f.value*Cts.ct_co2_C.value;
    }
    wwo_ghg_avoided_reuse(){
      let N = this.wwo_reused_N*Cts.ct_cr_forN.value;
      let P = this.wwo_reused_P*Cts.ct_cr_forP.value;
      return N+P;
    }

    //energy eff
    wwo_pmp_pw(){return this.wwo_pmp_flow*this.wwo_pmp_head*Cts.ct_gravit.value/1000;}
    wwo_KPI_std_nrg_cons(){return this.wwo_nrg_pump/(this.wwo_vol_pump*this.wwo_pmp_head/100);}
    wwo_KPI_un_head_loss(){
      return 1e3*(
        this.wwo_pmp_head
        -this.wwo_sta_head
      )/this.wwo_coll_len;
    }
    wwo_KPI_nrg_elec_eff(){
      return 100*this.wwo_pmp_pw()/(
        this.wwo_pmp_volt
        *this.wwo_pmp_amps
        *Math.sqrt(3)*this.wwo_pmp_pf/1000
      );
    }
    wwo_KPI_ghg_estm_red(){
      return this.wwo_KPI_nrg_estm_sav()*this.wwo_conv_kwh;
    }
    wwo_KPI_std_nrg_newp(){
      return this.wwo_KPI_nrg_elec_eff()/
        this.wwo_pmp_exff*
        this.wwo_KPI_std_nrg_cons();
    }
    wwo_KPI_nrg_cons_new(){
      return this.wwo_KPI_nrg_elec_eff()/
        this.wwo_pmp_exff*
        this.wwo_nrg_pump;
    }
    wwo_KPI_nrg_estm_sav(){
      return this.wwo_nrg_cons - this.wwo_KPI_nrg_cons_new();
    }

  //---
  static get equations(){
    return[
      "wwo_KPI_GHG_elec",
      "wwo_KPI_GHG_fuel",
      "wwo_KPI_GHG_unt_opd",
      "wwo_KPI_GHG_containment",
      "wwo_KPI_GHG_trck",
      "wwo_KPI_GHG_biog",
      "wwo_KPI_GHG_dig_fuel",
      "wwo_KPI_GHG_tre",
      "wwo_KPI_GHG_dis",
      "wwo_KPI_GHG_landapp",
      "wwo_KPI_GHG_landfil",
      "wwo_KPI_GHG_dumping",
      "wwo_KPI_GHG_urine",
      "wwo_KPI_GHG",
      "wwo_ghg_avoided",
      "wwo_pmp_pw",
      "wwo_KPI_std_nrg_cons",
      "wwo_KPI_un_head_loss",
      "wwo_KPI_nrg_elec_eff",
      "wwo_KPI_ghg_estm_red",
      "wwo_KPI_std_nrg_newp",
      "wwo_KPI_nrg_cons_new",
      "wwo_KPI_nrg_estm_sav",

      "wwo_moles_biogas_produced",
      "wwo_biogas_usage",
    ];
  }

  //load a json object
  static from(json_obj){
    return Object.assign(new Waste_Onsite(), json_obj);
  }
};

//default initial layout
let Global=new Ecam();
Scenarios.push(Global);
