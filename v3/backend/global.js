/*
 * Main data structure object.
 * It stores user inputs and has all equations (except estimations, which could be
 * moved here also) TODO "backend/estimations.js"
*/

//utils
Array.prototype.sum=function(){return this.reduce((p,c)=>(p+c),0)};

//A "layout" or "scenario" or is an Ecam object
class Ecam{
  constructor(){
    this.General={
      version              : "3.0.0-in-development",
      Name                 : `Untitled assessment${Scenarios.length ? (' '+(1+Scenarios.length)):''}`,
      AssessmentPeriodStart: "2021-01-01",
      AssessmentPeriodEnd  : "2022-01-01",
      Comments             : "",
      Currency             : "USD", //default currency
      Country              : false, //selected country name (string)
      conv_kwh_co2         : 0,     //electricity conversion (kgCO2/kWh)
      prot_con             : 0,     //prot consumption (kg/person/year)
      bod_pday             : 0,     //BOD5 (g/person/day)
      bod_pday_fs          : 0,     //BOD5 in faecal sludge (g/person/day)
      gwp_reports_index    : 0,     //index of selected GWP report
    };

    this.Water=new Water_stages(), //Water supply stages
    this.Waste=new Waste_stages(), //Wastewater stages

    this.Configuration={
      //user selected units for inputs
      Units:{ /*code:"unit"*/ },
    };
  }

  //global GHG emissions and energy consumed
  TotalGHG(){return this.Water.ws_KPI_GHG()+this.Waste.ww_KPI_GHG()}
  TotalNRG(){return this.Water.ws_nrg_cons()+this.Waste.ww_nrg_cons()}

  //assesment period duration (in days and years)
  Days(){
    let startDate=new Date(this.General.AssessmentPeriodStart);
    let finalDate=new Date(this.General.AssessmentPeriodEnd);
    return (finalDate-startDate)/1000/60/60/24; //days
  }
  Years(){return this.Days()/365}

  //grouped emissions by source
    fuel_GHG(){
      //fuel combuestion emissions
      let wsa_engines  = this.Water.Abstraction.map( s=>s.wsa_KPI_GHG_fuel());
      let wst_engines  = this.Water.Treatment.map(   s=>s.wst_KPI_GHG_fuel());
      let wsd_engines  = this.Water.Distribution.map(s=>s.wsd_KPI_GHG_fuel());
      let wsd_trucks   = this.Water.Distribution.map(s=>s.wsd_KPI_GHG_trck());
      let wwc_engines  = this.Waste.Collection.map(  s=>s.wwc_KPI_GHG_fuel());
      let wwt_engines  = this.Waste.Treatment.map(   s=>s.wwt_KPI_GHG_fuel());
      let wwo_engines  = this.Waste.Onsite.map(      s=>s.wwo_KPI_GHG_fuel());
      let wwt_digester = this.Waste.Treatment.map(   s=>s.wwt_KPI_GHG_dig_fuel());
      let wwt_slu_tr   = this.Waste.Treatment.map(   s=>s.wwt_KPI_GHG_slu_transport());
      let wwt_trucks   = this.Waste.Treatment.map(   s=>s.wwt_KPI_GHG_reus_trck());
      let wwo_trucks   = this.Waste.Onsite.map(      s=>s.wwo_KPI_GHG_trck());

      let emissions=[]
        .concat(wsa_engines)
        .concat(wst_engines)
        .concat(wsd_engines)
        .concat(wwc_engines)
        .concat(wwt_engines)
        .concat(wwo_engines)
        .concat(wsd_trucks)
        .concat(wwt_trucks)
        .concat(wwo_trucks)
        .concat(wwt_digester)
        .concat(wwt_slu_tr)

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    untr_GHG(){
      //untreated wastewater emissions
      let cso = this.Waste.Collection.map(s=>s.wwc_KPI_GHG_cso()    );
      let col = this.Waste.Collection.map(s=>s.wwc_KPI_GHG_col()    );
      let opd = this.Waste.Onsite    .map(s=>s.wwo_KPI_GHG_unt_opd());

      let emissions=[]
        .concat(cso)
        .concat(col)
        .concat(opd)

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    biog_GHG(){
      //biogas emissions
      let wwt = this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_biog());
      let wwo = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_biog());

      let emissions=[]
        .concat(wwt)
        .concat(wwo)

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    wwtr_GHG(){
      //treatment process emissions
      let wwt = this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_tre());
      let wwo = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_tre());

      let emissions=[]
        .concat(wwt)
        .concat(wwo)

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    slud_GHG(){
      //sludge management emissions
      let wwt_slu = this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_slu()    );
      let wwo_con = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_cont()   );
      let wwo_lap = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_landapp());
      let wwo_laf = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_landfil());
      let wwo_dum = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_dumping());
      let wwo_uri = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_urine()  );
      let emissions=[]
        .concat(wwt_slu)
        .concat(wwo_con)
        .concat(wwo_lap)
        .concat(wwo_laf)
        .concat(wwo_dum)
        .concat(wwo_uri)

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }
    disc_GHG(){
      //discharge emissions
      let wwt = this.Waste.Treatment.map(s=>s.wwt_KPI_GHG_disc());
      let wwo = this.Waste.Onsite   .map(s=>s.wwo_KPI_GHG_dis());

      let emissions=[wwt,wwo];

      //sum gases
      let co2   = emissions.map(e=>e.co2).sum();
      let ch4   = emissions.map(e=>e.ch4).sum();
      let n2o   = emissions.map(e=>e.n2o).sum();
      let total = emissions.map(e=>e.total).sum();
      return {total,co2,ch4,n2o};
    }

  //---
  static from(json_obj){
    //return value
    let o = Object.assign(new Ecam(), json_obj);
    o.Water = Water_stages.from(json_obj.Water);
    o.Waste = Waste_stages.from(json_obj.Waste);
    return o;
  }
};

class Water_stages{
  constructor(){
    this.ws_resi_pop = 0; //resident population

    //arrays of substages
    this.Abstraction  = [ new Water_Abstraction('Abstraction 1')   ];
    this.Treatment    = [ new Water_Treatment('Treatment 1')       ];
    this.Distribution = [ new Water_Distribution('Distribution 1') ];

    this.equations=[
      "ws_KPI_GHG_abs",
      "ws_KPI_GHG_tre",
      "ws_KPI_GHG_dis",
      "ws_KPI_GHG",

      "ws_serv_pop",
      "ws_SL_serv_pop",
      "ws_SL_auth_con",
      "ws_nrg_cons",
      "ws_vol_fuel",
    ];
  }
  //GHG ws
    ws_KPI_GHG_abs(){ return this.Abstraction.map( s=>s.wsa_KPI_GHG().total).sum(); }
    ws_KPI_GHG_tre(){ return this.Treatment.map(   s=>s.wst_KPI_GHG().total).sum(); }
    ws_KPI_GHG_dis(){ return this.Distribution.map(s=>s.wsd_KPI_GHG().total).sum(); }
    ws_KPI_GHG(){
      let wsa=this.ws_KPI_GHG_abs();
      let wst=this.ws_KPI_GHG_tre();
      let wsd=this.ws_KPI_GHG_dis();
      return wsa+wst+wsd;
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
      return 100*this.ws_serv_pop()/this.ws_resi_pop;
    }
    ws_SL_auth_con(){
      let wsd_auth_con = this.Distribution.map(s=>s.wsd_auth_con).sum(); //m3
      let wsd_serv_pop = this.Distribution.map(s=>s.wsd_serv_pop).sum(); //population
      return 1e3*wsd_auth_con/wsd_serv_pop/Global.Days()||0;
    }
  //---
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

    //arrays of Substages
    this.Collection = [ new Waste_Collection('Collection 1') ];
    this.Treatment  = [ new Waste_Treatment('Treatment 1')   ];
    this.Onsite     = [ new Waste_Onsite('Onsite 1')         ];

    this.equations=[
      "ww_KPI_GHG_col", //GHG from Wastewater Collection
      "ww_KPI_GHG_tre", //GHG from Wastewater Treatment
      "ww_KPI_GHG_ons", //GHG from Wastewater Discharge
      "ww_KPI_GHG",     //GHG from Wastewater

      "ww_serv_pop",    //SL serviced population
      "ww_nrg_cons",    //SL energy consumed from the grid
      "ww_GHG_avoided", //SL GHG avoided
    ];
  }
  //GHG ww
    ww_KPI_GHG_col(){ return this.Collection.map(s=>s.wwc_KPI_GHG().total).sum(); }
    ww_KPI_GHG_tre(){ return this.Treatment.map( s=>s.wwt_KPI_GHG().total).sum(); }
    ww_KPI_GHG_ons(){ return this.Onsite.map(    s=>s.wwo_KPI_GHG().total).sum(); }
    ww_KPI_GHG(){
      let wwc = this.ww_KPI_GHG_col();
      let wwt = this.ww_KPI_GHG_tre();
      let wwo = this.ww_KPI_GHG_ons();
      return wwc+wwt+wwo;
    }
  //ww SL
    ww_serv_pop(){
      let wwt = this.Treatment.map(s=>s.wwt_serv_pop).sum();
      let wwo = this.Onsite   .map(s=>s.wwo_onsi_pop).sum();
      return wwt+wwo;
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
      return (
        this.Treatment.map(s=>s.wwt_SL_GHG_avoided()   ).sum()+
        this.Treatment.map(s=>s.wwt_wr_C_seq_slu()     ).sum()+
        this.Treatment.map(s=>s.wwt_SL_ghg_non()       ).sum()+
        this.Treatment.map(s=>s.wwt_wr_GHG_avo()       ).sum()+
        this.Onsite   .map(s=>s.wwo_SL_GHG_avoided()   ).sum()+
        this.Onsite   .map(s=>s.wwo_ghg_avoided_reuse()).sum()+
        this.Onsite   .map(s=>s.wwo_ghg_avoided_land() ).sum()
      );
    }
  //---
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
    this.name="new stage";

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
      this.Configuration.Questions[key]=0;
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
    this.wsa_nrg_cons = 0; //energy consumed from the grid
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
    this.equations=[
      "wsa_KPI_GHG_elec",
      "wsa_KPI_GHG_fuel",
      "wsa_KPI_GHG",
      "wsa_nrg_per_abs_watr",
      "wsa_nrg_per_pmp_watr",
      "wsa_SL_nrg_cost",
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
  //GHG wsa
    wsa_KPI_GHG(){
      //sources (objects)
      let elec = this.wsa_KPI_GHG_elec();
      let fuel = this.wsa_KPI_GHG_fuel();

      //gases (numbers)
      let co2 = elec + fuel.co2;
      let ch4 =        fuel.ch4;
      let n2o =        fuel.n2o;

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wsa_KPI_GHG_elec(){
      return this.wsa_nrg_cons*Global.General.conv_kwh_co2;
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
    wsa_nrg_per_abs_watr(){return this.wsa_nrg_cons/this.wsa_vol_conv;}
    wsa_nrg_per_pmp_watr(){return this.wsa_nrg_pump/this.wsa_vol_pump;}
    wsa_SL_nrg_cost(){return 100*this.wsa_nrg_cost/this.wsa_run_cost;}

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
      return Global.General.conv_kwh_co2*this.wsa_KPI_nrg_estm_sav();
    }
  //---
  static from(json_obj){
    return Object.assign(new Water_Abstraction(), json_obj);
  }
};

class Water_Treatment extends Substage{
  constructor(name){
    super();
    this.name=name;
    this.wst_vol_trea = 0;
    this.wst_nrg_cons = 0;
    this.wst_nrg_cost = 0; //energy costs
    this.wst_run_cost = 0; //total running costs
    this.wst_mass_slu = 0;
    this.wst_treatmen = 0;
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
    this.equations=[
      "wst_KPI_GHG_elec",
      "wst_KPI_GHG_fuel",
      "wst_KPI_GHG",
      "wst_KPI_nrg_per_m3",
      "wst_KPI_slu_per_m3",
      "wst_SL_nrg_cost",
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
  //GHG wst
    wst_KPI_GHG(){
      //sources (objects)
      let elec = this.wst_KPI_GHG_elec();
      let fuel = this.wst_KPI_GHG_fuel();

      //gases (numbers)
      let co2 = elec + fuel.co2;
      let ch4 =        fuel.ch4;
      let n2o =        fuel.n2o;

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wst_KPI_GHG_elec(){return this.wst_nrg_cons*Global.General.conv_kwh_co2}
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
    wst_SL_nrg_cost(){return 100*this.wst_nrg_cost/this.wst_run_cost}
    wst_KPI_capac_util(){return 100*this.wst_vol_trea/this.wst_trea_cap}
    wst_KPI_tst_carr(){return this.wst_tst_carr;}
    wst_KPI_std_nrg_cons(){return this.wst_nrg_pump/(this.wst_vol_pump*this.wst_pmp_head/100)}
    wst_KPI_un_head_loss(){return 1e3*(this.wst_pmp_head-this.wst_sta_head)/this.wst_coll_len}
    wst_pmp_pw(){return this.wst_pmp_flow*this.wst_pmp_head*Cts.ct_gravit.value/1000;}
    wst_KPI_nrg_elec_eff(){return 100*this.wst_pmp_pw()/(this.wst_pmp_volt*this.wst_pmp_amps*Math.sqrt(3)*this.wst_pmp_pf/1000)}
    wst_KPI_std_nrg_newp(){return this.wst_KPI_nrg_elec_eff()/this.wst_pmp_exff*this.wst_KPI_std_nrg_cons()}
    wst_KPI_nrg_cons_new(){return this.wst_vol_pump*this.wst_KPI_std_nrg_newp()/100*this.wst_pmp_head}
    wst_KPI_nrg_estm_sav(){return this.wst_nrg_cons-this.wst_KPI_nrg_cons_new()}
    wst_KPI_ghg_estm_red(){return Global.General.conv_kwh_co2*this.wst_KPI_nrg_estm_sav()}
  //---
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
    this.wsd_nrg_cons = 0;
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
    this.equations=[
      "wsd_KPI_GHG_elec",
      "wsd_KPI_GHG_fuel",
      "wsd_KPI_GHG_trck",
      "wsd_KPI_GHG",

      "wsd_SL_nrg_cost",
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
  //GHG wsd
    wsd_KPI_GHG(){
      //sources (objects)
      let elec = this.wsd_KPI_GHG_elec();
      let fuel = this.wsd_KPI_GHG_fuel();
      let trck = this.wsd_KPI_GHG_trck();

      //gases (numbers)
      let co2 = elec + fuel.co2 + trck.co2;
      let ch4 =        fuel.ch4 + trck.ch4;
      let n2o =        fuel.n2o + trck.n2o;

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wsd_KPI_GHG_elec(){
      return this.wsd_nrg_cons*Global.General.conv_kwh_co2;
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
    wsd_SL_nrg_cost(){return 100*this.wsd_nrg_cost/this.wsd_run_cost}
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
    wsd_KPI_water_losses(){return Math.max(0,1000*(this.wsd_vol_dist-this.wsd_auth_con)/(this.wsd_main_len))/Global.Years()}
    wsd_KPI_nrg_elec_eff(){return 100*this.wsd_pmp_pw()/(this.wsd_pmp_volt*this.wsd_pmp_amps*Math.sqrt(3)*this.wsd_pmp_pf/1000)}
    wsd_KPI_std_nrg_newp(){return this.wsd_KPI_nrg_elec_eff()/this.wsd_pmp_exff*this.wsd_KPI_std_nrg_cons()}
    wsd_KPI_nrg_cons_new(){return this.wsd_KPI_nrg_elec_eff()/this.wsd_pmp_exff*this.wsd_nrg_pump}
    wsd_KPI_nrg_estm_sav(){return this.wsd_nrg_cons-this.wsd_KPI_nrg_cons_new()}
    wsd_KPI_ghg_estm_red(){return Global.General.conv_kwh_co2*this.wsd_KPI_nrg_estm_sav()}
  //---
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

    this.wwc_fuel_typ     = 0;
    this.wwc_vol_fuel     = 0;
    this.wwc_nrg_cons     = 0; //energy consumed from the grid
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
    this.equations=[
      "wwc_KPI_GHG_elec",
      "wwc_KPI_GHG_fuel",
      "wwc_KPI_GHG_cso",
      "wwc_KPI_GHG_col",
      "wwc_KPI_GHG",

      "wwc_SL_conn_pop",
      "wwc_KPI_nrg_per_m3",
      "wwc_SL_nrg_cost",

      "wwc_KPI_std_nrg_cons",
      "wwc_KPI_un_head_loss",
      "wwc_KPI_nrg_elec_eff",
      "wwc_KPI_std_nrg_newp",
      "wwc_KPI_nrg_cons_new",
      "wwc_KPI_nrg_estm_sav",
      "wwc_KPI_ghg_estm_red",
    ];
  }
  //GHG wwc
    wwc_KPI_GHG(){
      //sources (objects)
      let elec = this.wwc_KPI_GHG_elec(); //number
      let fuel = this.wwc_KPI_GHG_fuel(); //object
      let cso  = this.wwc_KPI_GHG_cso();  //object
      let col  = this.wwc_KPI_GHG_col();  //object

      //gases (numbers)
      let co2 = elec + fuel.co2 + cso.co2 + col.co2;
      let ch4 =        fuel.ch4 + cso.ch4 + col.ch4;
      let n2o =        fuel.n2o + cso.n2o + col.n2o;

      //total
      let total = co2 + ch4 + n2o;
      return {total,co2,ch4,n2o};
    }
    wwc_KPI_GHG_elec(){
      return this.wwc_nrg_cons*Global.General.conv_kwh_co2;
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
    wwc_SL_conn_pop(){return 100*this.wwc_conn_pop/Global.Waste.ww_resi_pop}
    wwc_SL_nrg_cost(){return 100*this.wwc_nrg_cost/this.wwc_run_cost}
    wwc_KPI_nrg_per_m3(){return this.wwc_nrg_cons/this.wwc_vol_coll_tre}
    wwc_pmp_pw(){return this.wwc_pmp_flow*this.wwc_pmp_head*Cts.ct_gravit.value/1000;}
    wwc_KPI_std_nrg_cons(){return this.wwc_nrg_pump/(this.wwc_vol_pump*this.wwc_pmp_head/100)}
    wwc_KPI_un_head_loss(){return 1000*(this.wwc_pmp_head-this.wwc_sta_head)/this.wwc_coll_len}
    wwc_KPI_nrg_elec_eff(){return 100*this.wwc_pmp_pw()/(this.wwc_pmp_volt*this.wwc_pmp_amps*Math.sqrt(3)*this.wwc_pmp_pf/1000)}
    wwc_KPI_std_nrg_newp(){return this.wwc_KPI_nrg_elec_eff()/this.wwc_pmp_exff*this.wwc_KPI_std_nrg_cons()}
    wwc_KPI_nrg_cons_new(){return this.wwc_vol_pump*this.wwc_KPI_std_nrg_newp()/100*this.wwc_pmp_head}
    wwc_KPI_nrg_estm_sav(){return this.wwc_nrg_cons-this.wwc_KPI_nrg_cons_new()}
    wwc_KPI_ghg_estm_red(){return Global.General.conv_kwh_co2*this.wwc_KPI_nrg_estm_sav()}
  //---
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

    this.wwt_fuel_typ       = 0;
    this.wwt_vol_fuel       = 0;
    this.wwt_trea_cap       = 0;
    this.wwt_tst_cmpl       = 0;
    this.wwt_tst_cond       = 0;
    this.wwt_nrg_cons       = 0;
    this.wwt_nrg_cost       = 0; //energy costs
    this.wwt_run_cost       = 0; //total running costs
    this.wwt_vol_pump       = 0;
    this.wwt_nrg_pump       = 0;
    this.wwt_pmp_head       = 0;
    this.wwt_sta_head       = 0;
    this.wwt_coll_len       = 0;
    this.wwt_pmp_flow       = 0;
    this.wwt_pmp_volt       = 0;
    this.wwt_pmp_amps       = 0;
    this.wwt_pmp_pf         = 0.9;
    this.wwt_pmp_exff       = 0;

    this.wwt_biog_pro       = 0; //total biogas produced
    this.wwt_biog_fla       = 0; //biogas produced flared
    this.wwt_biog_val       = 0; //biogas produced valorised
    this.wwt_biog_boi       = 0; //biogas produced valorised

    this.wwt_ch4_biog       = 59;
    this.wwt_dige_typ       = 0;
    this.wwt_fuel_dig       = 0;
    this.wwt_nrg_biog       = 0;

    this.wwt_reus_trck_typ = 0;
    this.wwt_reus_vol_trck = 0;

    this.wwt_wr_N_rec       = 0; //N recovered
    this.wwt_wr_P_rec       = 0; //P recovered
    this.wwt_wr_vol_d       = 0; //volume of reused water displacing potable water
    this.wwt_dryw_slu       = 0;
    this.wwt_slu_disp       = 0;
    this.wwt_mass_slu_sto   = 0;
    this.wwt_time_slu_sto   = 0;
    this.wwt_mass_slu_comp  = 0;
    this.wwt_mass_slu_inc   = 0;
    this.wwt_temp_inc       = 0;
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
    this.equations=[
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
      "wwt_SL_vol_pday",
      "wwt_KPI_capac_util",
      "wwt_SL_nrg_cost",

      "wwt_SL_qual_com",
      "wwt_KPI_nrg_per_pump",
      "wwt_KPI_std_nrg_cons",
      "wwt_KPI_un_head_loss",
      "wwt_KPI_nrg_elec_eff",
      "wwt_KPI_std_nrg_newp",
      "wwt_KPI_nrg_cons_new",
      "wwt_KPI_nrg_estm_sav",
      "wwt_KPI_ghg_estm_red",
      "wwt_KPI_biog_x_bod",
      "wwt_nrg_biog_val",
      "wwt_KPI_nrg_biogas",
      "wwt_KPI_nrg_x_biog",
      "wwt_SL_GHG_avoided",
      "wwt_KPI_sludg_prod",
      "wwt_wr_C_seq_slu",
      "wwt_wr_GHG_avo_N",

      "wwt_wr_GHG_avo_P",
      "wwt_wr_GHG_avo",
      "wwt_SL_ghg_non",
      "wwt_total_m3",
    ];
  }
  //GHG wwt
    wwt_KPI_GHG(){
      //sources (objects)
      let elec    = this.wwt_KPI_GHG_elec(); //number
      let sources = [
        this.wwt_KPI_GHG_fuel(),
        this.wwt_KPI_GHG_dig_fuel(),
        this.wwt_KPI_GHG_tre(),
        this.wwt_KPI_GHG_biog(),
        this.wwt_KPI_GHG_slu(),
        this.wwt_KPI_GHG_reus_trck(),
        this.wwt_KPI_GHG_disc(),
      ];

      //gases (numbers)
      let co2 = elec + sources.map(s=>s.co2).sum();
      let ch4 =        sources.map(s=>s.ch4).sum();
      let n2o =        sources.map(s=>s.n2o).sum();

      //total
      let total = elec + sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }
    wwt_KPI_GHG_elec(){
      return this.wwt_nrg_cons*Global.General.conv_kwh_co2;
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
        this.wwt_KPI_GHG_biog_flare(),
        this.wwt_KPI_GHG_biog_boiler(),
        this.wwt_KPI_GHG_biog_engine(),
        this.wwt_KPI_GHG_biog_injection(),
        this.wwt_KPI_GHG_biog_leak(),
      ];

      //gases (numbers)
      let co2 = sources.map(s=>s.co2).sum();
      let ch4 = sources.map(s=>s.ch4).sum();
      let n2o = sources.map(s=>s.n2o).sum();

      //total
      let total = sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }

    //TODO biogas flared
    wwt_KPI_GHG_biog_flare(){
      let co2 = 0;
      let n2o = 0;
      let ch4 = (
        this.wwt_biog_pro
        -this.wwt_biog_val
        -this.wwt_biog_fla
        +this.wwt_biog_fla*Cts.ct_ch4_lo.value/100
      )*this.wwt_ch4_biog/100
      *Cts.ct_ch4_m3.value
      *Cts.ct_ch4_eq.value;

      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //TODO biogas boiler
    wwt_KPI_GHG_biog_boiler(){
      let co2   = 0;
      let ch4   = 0;
      let n2o   = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //TODO biogas engine
    wwt_KPI_GHG_biog_engine(){
      let co2   = 0;
      let ch4   = 0;
      let n2o   = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //TODO biogas injection to city grid
    wwt_KPI_GHG_biog_injection(){
      let co2   = 0;
      let ch4   = 0;
      let n2o   = 0;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    //TODO biogas leak
    wwt_KPI_GHG_biog_leak(){
      let co2   = 0;
      let ch4   = 0;
      let n2o   = 0;
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
      let sludge_mass = this.wwt_mass_slu_comp; //kg of sludge
      let sludge_type = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp);

      let co2 = 0;
      let ch4 = (function(){
        let sludge_to_TVS = sludge_type.TVS; //gTVS/gSludge
        let TVS_to_OC     = Cts.ct_oc_vs.value;  //gOC/gTVS
        let OC_to_CH4     = Cts.ct_ch4_oc.value; //gCH4/gOC
        let ratio_up      = Cts.ct_ch4_up.value; //ratio for uncovered pile
        return sludge_mass * sludge_to_TVS * TVS_to_OC * ratio_up * Cts.ct_ch4_eq.value;
      })();
      let n2o = sludge_mass*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;

      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }

    wwt_KPI_GHG_slu_incineration(){
      let sludge_mass = this.wwt_mass_slu_inc;
      let temperature = this.wwt_temp_inc;

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
      if(ratio_CN>=30){return 0;}
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
        let C_content = (function(){
          let TVS = sludge_type.TVS;    //gTVS/gSludge
          return sludge_mass*TVS*OC;    //gOC
        })(); //gOC
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
    wwt_bod_rmvd(){return this.wwt_bod_infl-this.wwt_bod_effl}
    wwt_KPI_nrg_per_m3(){return this.wwt_nrg_cons/this.wwt_vol_trea}
    wwt_KPI_nrg_per_kg(){return this.wwt_nrg_cons/this.wwt_bod_rmvd()}
    wwt_SL_nrg_cost(){return 100*this.wwt_nrg_cost/this.wwt_run_cost}
    wwt_SL_vol_pday(){return 1000*this.wwt_vol_trea/this.wwt_serv_pop/Global.Days()}
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
    wwt_KPI_ghg_estm_red(){return Global.General.conv_kwh_co2*this.wwt_KPI_nrg_estm_sav()}
    wwt_KPI_biog_x_bod(){return this.wwt_biog_pro/this.wwt_bod_rmvd()}
    wwt_nrg_biog_val(){return this.wwt_biog_val*this.wwt_ch4_biog/100*Cts.ct_ch4_nrg.value}
    wwt_KPI_nrg_biogas(){return this.wwt_nrg_biog/this.wwt_vol_trea}
    wwt_KPI_nrg_x_biog(){return 100*this.wwt_nrg_biog/this.wwt_nrg_biog_val()}
    wwt_SL_GHG_avoided(){return this.wwt_nrg_biog*Global.General.conv_kwh_co2}
    wwt_wr_GHG_avo_N(){ return this.wwt_wr_N_rec*Cts.ct_cr_forN.value; }
    wwt_wr_GHG_avo_P(){ return this.wwt_wr_P_rec*Cts.ct_cr_forP.value; }
    wwt_wr_GHG_avo(){ return this.wwt_wr_GHG_avo_N() + this.wwt_wr_GHG_avo_P(); }

    wwt_SL_ghg_non(){
      return this.wwt_vol_nonp*this.wwt_tn_effl/1000*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
    }
    wwt_total_m3(){
      return this.wwt_vol_disc+this.wwt_vol_nonp;
    }

    //other sludge equations
    wwt_KPI_sludg_prod(){return this.wwt_mass_slu/this.wwt_vol_trea}
    wwt_wr_C_seq_slu(){
      return this.wwt_slu_comp_C_seq()+
      this.wwt_slu_app_C_seq()+
      this.wwt_slu_land_C_seq();
    }

    wwt_slu_comp_C_seq(){
      return this.wwt_mass_slu_comp*Cts.ct_C_seqst.value;
    }
    wwt_slu_app_C_seq(){
      return this.wwt_mass_slu_app*Cts.ct_C_seqst.value;
    }
    wwt_slu_land_C_seq(){
      let sludge_mass = this.wwt_mass_slu_land;
      let TVS = Tables.get_row('Type of sludge disposed',this.wwt_slu_disp).TVS;
      return sludge_mass*(TVS)*(0.56)*(0.2)*(44/12);
    }
  //---
  static from(json_obj){
    return Object.assign(new Waste_Treatment(), json_obj);
  }
};

class Waste_Onsite extends Substage{
  constructor(name){
    super();
    this.name=name;
    this.wwo_onsi_pop         = 0; //population with onsite treatment
    this.wwo_open_pop         = 0; //population open defecation
    this.wwo_vol_unco         = 0; //volume of uncollected wastewater
    this.wwo_vol_unco_unt     = 0; //volume of uncollected untreated wastewater
    this.wwo_vol_unco_ons     = 0; //volume of uncollected wastewater conveyed to onsite treatment
    this.wwo_vol_unco_tre     = 0; //treated wastewater
    this.wwo_vol_disc         = 0; //water discharged
    this.wwo_ch4_efac_unt     = 0;
    this.wwo_ch4_efac_con     = 0;
    this.wwo_ch4_efac_tre     = 0;
    this.wwo_n2o_efac_tre     = 0;
    this.wwo_ch4_efac_dis     = 0;
    this.wwo_n2o_efac_dis     = 0;
    this.wwo_nrg_cons         = 0; //energy consumed
    this.wwo_nrg_cost         = 0; //energy costs
    this.wwo_run_cost         = 0; //total running costs
    this.wwo_nrg_pump         = 0;
    this.wwo_vol_pump         = 0;
    this.wwo_pmp_head         = 0;
    this.wwo_sta_head         = 0;
    this.wwo_coll_len         = 0;
    this.wwo_pmp_flow         = 0;
    this.wwo_pmp_volt         = 0;
    this.wwo_pmp_amps         = 0;
    this.wwo_pmp_pf           = 0.9;
    this.wwo_pmp_exff         = 0;
    this.wwo_vol_fuel         = 0; //fuel consumed
    this.wwo_fuel_typ         = 0; //type of fuel
    this.wwo_trck_typ         = 0; //type of fuel
    this.wwo_vol_trck         = 0; //fuel consumed
    this.wwo_bod_infl         = 0; //influent bod load
    this.wwo_bod_effl         = 0; //effluent BOD
    this.wwo_bod_rmvd         = 0; //bod removed as FS
    this.wwo_bod_slud         = 0; //?
    this.wwo_type_con         = 0; //type of containment
    this.wwo_flooding         = 0; //yes/no
    this.wwo_cont_emp         = 0; //containments emptied
    this.wwo_fdensity         = 0; //density of faecal sludge
    this.wwo_bod_conc_fs      = 0; //[BOD] in FS
    this.wwo_fslu_emp         = 0; //FS emptied
    this.wwo_type_tre         = 0; //type of treatment
    this.wwo_tn_infl          = 0; //TN influent
    this.wwo_tn_effl          = 0; //TN effluent
    this.wwo_biog_pro         = 0;
    this.wwo_biog_val         = 0;
    this.wwo_biog_fla         = 0;
    this.wwo_ch4_biog         = 59;
    this.wwo_nrg_biog         = 0;
    this.wwo_type_dis         = 0;         //main type of disposal
    this.wwo_fslu_typ         = 0;         //main type of faecal sludge
    this.wwo_mass_landapp     = 0;     //dry weight sent to land application
    this.wwo_soil_typ         = 0;         //soil type for land application
    this.wwo_fslu_typ_la      = 0;      //type of faecal sludge disposed landapp
    this.wwo_la_N_cont        = 0;        //N content of faecal sludge
    this.wwo_mass_landfil     = 0;     //dry weight sent to landfilling
    this.wwo_lf_type          = 0;         //disposal type for landfilling
    this.wwo_fslu_typ_lf      = 0;      //type of faecal sludge disposed landfil
    this.wwo_lf_N_cont        = 0;        //N content of faecal sludge
    this.wwo_lf_TVS           = 0;           //TVS content of faecal sludge
    this.wwo_vol_dumping      = 0;      //volume dumped
    this.wwo_ch4_efac_dumping = 0; //emission factor depending on dumping pathway
    this.wwo_dumping_pth      = 0;      //dumping pathway
    this.wwo_N_urine          = 0;
    this.wwo_reused_N         = 0;
    this.wwo_reused_P         = 0;
    this.not_used_variable    = 0;
    this.equations=[
      //GHG from Wastewater Onsite Treatment
      "wwo_KPI_GHG_elec",
      "wwo_KPI_GHG_fuel",
      "wwo_KPI_GHG_unt_opd",
      "wwo_KPI_GHG_cont",
      "wwo_KPI_GHG_trck",
      "wwo_KPI_GHG_biog",
      "wwo_KPI_GHG_tre",
      "wwo_KPI_GHG_dis",
      "wwo_KPI_GHG_landapp",
      "wwo_KPI_GHG_landfil",
      "wwo_KPI_GHG_dumping",
      "wwo_KPI_GHG_urine",
      "wwo_KPI_GHG",

      "wwo_SL_nrg_cost",
      "wwo_SL_GHG_avoided",
      "wwo_ghg_avoided_land",
      "wwo_ghg_avoided_reuse",

      "wwo_pmp_pw",
      "wwo_KPI_std_nrg_cons",
      "wwo_KPI_un_head_loss",
      "wwo_KPI_nrg_elec_eff",
      "wwo_KPI_ghg_estm_red",
      "wwo_KPI_std_nrg_newp",
      "wwo_KPI_nrg_cons_new",
      "wwo_KPI_nrg_estm_sav",
    ];
  }
  //GHG wwo
    //wwo total emissions
    wwo_KPI_GHG(){
      //sources (objects)
      let elec    = this.wwo_KPI_GHG_elec();
      let sources = [
        this.wwo_KPI_GHG_fuel(),
        this.wwo_KPI_GHG_unt_opd(),
        this.wwo_KPI_GHG_cont(),
        this.wwo_KPI_GHG_trck(),
        this.wwo_KPI_GHG_biog(),
        this.wwo_KPI_GHG_tre(),
        this.wwo_KPI_GHG_dis(),
        this.wwo_KPI_GHG_landapp(),
        this.wwo_KPI_GHG_landfil(),
        this.wwo_KPI_GHG_dumping(),
        this.wwo_KPI_GHG_urine(),
      ];

      //gases (numbers)
      let co2 = elec + sources.map(s=>s.co2).sum();
      let ch4 =        sources.map(s=>s.ch4).sum();
      let n2o =        sources.map(s=>s.n2o).sum();

      //total
      let total = elec + sources.map(s=>s.total).sum();
      return {total,co2,ch4,n2o};
    }
    //electricity
    wwo_KPI_GHG_elec(){
      return this.wwo_nrg_cons*Global.General.conv_kwh_co2;
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
      let pop   = this.wwo_open_pop;
      let co2   = 0;
      let ch4   = pop*Global.General.bod_pday/1000*Global.Days()*this.wwo_ch4_efac_unt*Cts.ct_ch4_eq.value;
      let n2o   = pop*Global.General.prot_con*Global.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let total = co2+ch4+n2o;
      return {total,co2,ch4,n2o};
    }
    //emissions containment
    wwo_KPI_GHG_cont(){
      let co2   = 0;
      let ch4   = (this.wwo_bod_infl-this.wwo_bod_rmvd)*this.wwo_ch4_efac_con*Cts.ct_ch4_eq.value;
      let n2o   = 0;
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
    //biogas
    wwo_KPI_GHG_biog(){
      let co2   = 0;
      let ch4   = (this.wwo_biog_pro-this.wwo_biog_val-this.wwo_biog_fla+this.wwo_biog_fla*Cts.ct_ch4_lo.value/100)*this.wwo_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
      let n2o   = 0;
      let total = co2+ch4+n2o;
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
      let soil_type=Tables.get_row('Soil type',this.wwo_soil_typ);
      let N_transformed_to_N2O = soil_type.f_la;
      let n2o = this.wwo_mass_landapp*this.wwo_la_N_cont/100*N_transformed_to_N2O*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      let co2 = 0;
      let ch4 = 0;
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
    wwo_SL_nrg_cost(){
      return 100*this.wwo_nrg_cost/this.wwo_run_cost;
    }
    wwo_SL_GHG_avoided(){
      return this.wwo_nrg_biog*Global.General.conv_kwh_co2;
    }
    wwo_ghg_avoided_land(){
      return this.wwo_ghg_avoided_landapp()+this.wwo_ghg_avoided_landfil();
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
      return this.wwo_ghg_avoided_reuse_N()+this.wwo_ghg_avoided_reuse_P();
    }
    wwo_ghg_avoided_reuse_N(){
      return this.wwo_reused_N*Cts.ct_cr_forN.value;
    }
    wwo_ghg_avoided_reuse_P(){
      return this.wwo_reused_P*Cts.ct_cr_forP.value;
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
      return Global.General.conv_kwh_co2*this.wwo_KPI_nrg_estm_sav();
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
  static from(json_obj){
    return Object.assign(new Waste_Onsite(), json_obj);
  }
};

//array of layouts (layout == Ecam object)
let Scenarios=[];

//default layout (called Global since ecam v1.0)
let Global=new Ecam();
Scenarios.push(Global);
