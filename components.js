//--components--------------------------------
let ecam_logo = new Vue({
  el:'#ecam-logo',
  data:{
    version:"v3.0",
    Languages,
  },
  methods:{
    translate,
  },
});

let sidebar = new Vue({
  el:"#sidebar",
  data:{
    Global,
    Structure,
    visible:false,
  },
  methods:{
    translate,
  },
});

let linear_menu = new Vue({
  el:'#linear-menu',
  data:{
    Global,
    Structure,
    visible:true,
  },
  methods:{
    translate,
    go_to_edit(l2){
      if(Global.Configuration.ActiveStages[l2.alias]){
        window.location=`edit.php?level=${l2.level}&sublevel=${l2.sublevel}`;
      }
    }
  },
});

//--views---------------------------------
let index = new Vue({
  el:'#index',
  data:{
    visible:false,
    Global,
  },
  methods:{
    translate,
  },
});

let get_started = new Vue({
  el:"#get-started",
  data:{
    visible:false,
    Global,
  },
  methods:{
    translate,
  },
});

let configuration = new Vue({
  el:'#configuration',
  data:{
    visible:false,
    Global,
    Structure,
    Countries,
    GWP_reports,
    Cts,
  },
  methods:{
    translate,
    updateResult,

    //deactivate level2 when level1 is deactivated
    check_l2_from_l1(){
      //if level1 is inactive, set related level2 inactive
      Structure.filter(l=>l.sublevel==false).forEach(l1=>{
        if(!Global.Configuration.ActiveStages[l1.alias]){
          //reset l1 values
          this.reset_stage(l1.alias);
          //reset l2 values
          Structure.filter(l=>(l.sublevel && l.level==l1.level))
            .forEach(l=>{
              Global.Configuration.ActiveStages[l.alias]=false;
              this.reset_stage(l.alias);
            });
        }
      });
    },

    //activate level1 when level2 is activated
    check_l1_from_l2(){
      //if level2 is active, set related level1 active
      Structure.filter(l=>l.sublevel).forEach(l2=>{
        if(Global.Configuration.ActiveStages[l2.alias]){
          Structure.filter(l=>(l.sublevel==false && l.level==l2.level))
            .forEach(l=>{
              Global.Configuration.ActiveStages[l.alias]=true;
            });
        }else{
          this.reset_stage(l2.alias);
        }
      });
    },

    //activate all stages
    activate_all_stages(){
      Structure.forEach(l=>{
        Global.Configuration.ActiveStages[l.alias]=true;
      })
      updateResult();
    },

    //reset a stage:
    //1) set all variables to zero
    //2) reset substages (only level2)
    reset_stage(alias){
      let stage=Structure.find(s=>s.alias==alias);
      if(!stage) throw `stage '${alias}' not found`

      let obj = null; //stage object inside Global

      if(stage.sublevel==false){
        //l1
        obj = Global[stage.level];
      }else{
        //l2
        obj = Global[stage.level][stage.sublevel];
        Substages[stage.level][stage.sublevel]=[]; //reset substages
      }

      //reset obj values
      for(let key in obj) {
        if(typeof(obj[key])=="number") obj[key]=0;
      }

      updateResult();
    },

    //set variables from selected country
    set_variables_from_selected_country(){
      let country = Global.General.Country;
      Global.Configuration.Selected.prot_con=country;
      //variables in Global.General to be changed:
      [ 'conv_kwh_co2',
        'prot_con',
        'bod_pday',
        'bod_pday_fs'
      ].forEach(key=>{
        //put bod_pday value in faecal sludge as well
        let key2 = key;
        if(key=="bod_pday_fs"){ key2="bod_pday"; }
        Global.General[key]=Countries[country][key2];
      });
      updateResult();
    },

    //answer fuel engines question
    answerAnyFuelEngines(){
      let ans=parseInt(Global.General.anyFuelEngines);
      Global.General.anyFuelEngines = ans;
      console.log({ans});
      Global.Configuration['Yes/No'].wsa_engines=ans;
      Global.Configuration['Yes/No'].wst_engines=ans;
      Global.Configuration['Yes/No'].wsd_engines=ans;
      Global.Configuration['Yes/No'].wwc_engines=ans;
      Global.Configuration['Yes/No'].wwt_engines=ans;
      Global.Configuration['Yes/No'].wwd_engines=ans;
      Global.Configuration['Yes/No'].fst_engines=ans;
      if(!ans){
        //reset stage values
        Global.Water.Abstraction .wsa_vol_fuel=0;
        Global.Water.Treatment   .wst_vol_fuel=0;
        Global.Water.Distribution.wsd_vol_fuel=0;
        Global.Waste.Collection  .wwc_vol_fuel=0;
        Global.Waste.Treatment   .wwt_vol_fuel=0;
        Global.Waste.Discharge   .wwd_vol_fuel=0;
        Global.Faecl.Treatment   .fst_vol_fuel=0;
        //reset substage values
        Substages.Water.Abstraction .forEach(s=>{s.wsa_vol_fuel=0});
        Substages.Water.Treatment   .forEach(s=>{s.wst_vol_fuel=0});
        Substages.Water.Distribution.forEach(s=>{s.wsd_vol_fuel=0});
        Substages.Waste.Collection  .forEach(s=>{s.wwc_vol_fuel=0});
        Substages.Waste.Treatment   .forEach(s=>{s.wwt_vol_fuel=0});
        Substages.Waste.Discharge   .forEach(s=>{s.wwd_vol_fuel=0});
        Substages.Faecl.Treatment   .forEach(s=>{s.fst_vol_fuel=0});
      }
      updateResult();
    },

    //set constants from selected gwp report
    set_constants_from_gwp_report(){
      let index = Global.Configuration.Selected.gwp_reports_index;
      Cts.ct_ch4_eq.value = GWP_reports[index].ct_ch4_eq;
      Cts.ct_n2o_eq.value = GWP_reports[index].ct_n2o_eq;
      updateResult();
    },
  },
});

let population=new Vue({
  el:'#population',
  data:{
    visible:false,
    Global,
    Structure,
    Population:[
      {level:'Water', stage:Global.Water,            code:'ws_resi_pop'},
      {level:'Water', stage:Global.Water,            code:'ws_serv_pop'},
      {level:'Waste', stage:Global.Waste,            code:'ww_resi_pop'},
      {level:'Waste', stage:Global.Waste.Collection, code:'wwc_conn_pop'},
      {level:'Waste', stage:Global.Waste.Treatment,  code:'wwt_serv_pop'},
      {level:'Faecl', stage:Global.Faecl,            code:'fs_resi_pop'},
      {level:'Faecl', stage:Global.Faecl,            code:'fs_onsi_pop'},
    ],
  },
  methods:{
    translate,
    format,
    focus_input(pop, event){
      let input = event.target;
      input.value = pop.stage[pop.code]
      input.select();
    },
    blur_input(pop, event){
      let input = event.target;
      let value = parseFloat(input.value) || 0;
      pop.stage[pop.code] = value;
      input.value=format(pop.stage[pop.code]);
      updateResult();
    },
  }
});

//--view controller
let ecam={
  views:{
    index,
    get_started,
    configuration,
    population,

    //hide all views
    hide_all(){
      Object.entries(this).forEach(([key,view])=>{
        if(typeof(view)=='object'){
          if(view.constructor===Vue){
            if(view.visible){
              view.visible=false;
            }
          }
        }
      });
    },

    //show a view
    show(view){
      //TODO: activar linear_menu.visible=true el primer cop que entris a tier B

      if(!this[view]){
        console.error(`view '${view}' not found`);
        return;
      }
      this.hide_all();
      this[view].visible=true;
    },
  },
};
