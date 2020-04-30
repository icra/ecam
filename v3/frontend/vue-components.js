// vim: set foldlevel=0 nomodeline:
//-----------------------------------------------------------------------------
// COMMON ELEMENTS (visible everywhere)
//-----------------------------------------------------------------------------
  let loading_container = new Vue({
    el:"#loading_container",
    data:{
      Languages,
    },
    methods:{
      ready(){
        return this.Languages.ready;
      },
    },
  });

  let ecam_logo = new Vue({
    el:'#ecam-logo',
    data:{
      version:"v3.0 development",
      Languages,
    },
    methods:{
      translate,
    },
  });

  let sidebar = new Vue({
    el:"#sidebar",
    data:{
      visible:false,
      Global,
      Structure,
    },
    methods:{
      translate,
      go_to(level, sublevel){
        tier_b.level    = level;
        tier_b.sublevel = sublevel||false;
        tier_b.current_stage = sublevel ? Global[level][sublevel] : Global[level];
        ecam.show('tier_b');
      },
    },
  });

  let linear_menu = new Vue({
    el:'#linear-menu',
    data:{
      visible:false,
      Global,
      Structure,
      current_view:null,
    },
    methods:{
      translate,
      go_to: sidebar.go_to,
      is_tier_b_selected(level, sublevel){
        if(this.current_view!='tier_b') return false;
        if(level==tier_b.level && sublevel==tier_b.sublevel){
          return true;
        }
      },
    },
  });

  let caption = new Vue({
    el:"#caption",
    data:{
      visible:false,
      text:"caption text",
    },
    methods:{
      show(ev, element){
        ev.stopPropagation(); //prevent parent elements triggering show() onmousemove
        this.visible=true;
        if(element.getAttribute('caption')){
          this.text=element.getAttribute('caption');
        }
        let el=document.querySelector("#caption");
        el.style.left=(ev.clientX-10)+"px";
        el.style.top=(ev.clientY+15)+"px";
      },

      hide(){
        this.visible=false;
      },

      //mouse listeners IMPROVE THIS CODE TODO
      listeners() {
        //get all elements with 'caption' attribute
        document.querySelectorAll("[caption]").forEach(el=>{
          el.addEventListener('mousemove',function(e){caption.show(e,this)});
          el.addEventListener('mouseout',function(){caption.hide()});
        });
      },
    },
  });

//-----------------------------------------------------------------------------
// VIEWS (= pages)
//-----------------------------------------------------------------------------
  //landing page
  let index = new Vue({
    el:'#index',
    data:{
      visible:true,
      Global,
    },
    methods:{
      translate,
    },
  });

  let about = new Vue({
    el:"#about",
    data:{
      visible:false,
    },
    methods:{
      translate
    },
  });

  let help = new Vue({
    el:"#help",
    data:{
      visible:false,
    },
    methods:{
      translate
    },
  });

  let get_started = new Vue({
    el:"#get_started",
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
      },

      //answer fuel engines question
      answerAnyFuelEngines(){
        let ans=parseInt(Global.General.anyFuelEngines);
        Global.General.anyFuelEngines=ans;
        Global.Configuration.Questions.wsa_engines=ans;
        Global.Configuration.Questions.wst_engines=ans;
        Global.Configuration.Questions.wsd_engines=ans;
        Global.Configuration.Questions.wwc_engines=ans;
        Global.Configuration.Questions.wwt_engines=ans;
        Global.Configuration.Questions.wwd_engines=ans;
        Global.Configuration.Questions.fst_engines=ans;
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
      },

      //set constants from selected gwp report
      set_constants_from_gwp_report(){
        let index = Global.Configuration.Selected.gwp_reports_index;
        Cts.ct_ch4_eq.value = GWP_reports[index].ct_ch4_eq;
        Cts.ct_n2o_eq.value = GWP_reports[index].ct_n2o_eq;
      },
    },
  });

  let countries = new Vue({
    el:"#countries",
    data:{
      visible:false,
      Global,
      Countries,
    },
    methods:{
      translate,
    },
  });

  let gwp_table = new Vue({
    el:"#gwp_table",
    data:{
      visible:false,
      Global,
      GWP_reports,
    },
    methods:{
      translate,
    }
  });

  let population = new Vue({
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
      },
    }
  });

  //TODO
  let tier_a = new Vue({
    el:"#tier_a",
    data:{
      visible:false,
      Global,
      Info,
      Structure,
    },
    methods:{
      translate,
      format,
    },
  });

  //TODO
  let tier_b = new Vue({
    el:"#tier_b",
    data:{
      visible:false,
      level:'Water',
      sublevel:'Abstraction',
      current_stage:Global.Water.Abstraction,

      Global,
      Info,
      Structure,
      Tips,
      Units,
      Tables,
      Recommendations,
      Exceptions,
      Normalization,
      Formulas,
      Questions,
    },
    methods:{
      translate,
      format,
      focus_input(stage, key, event){
        let input = event.target;
        input.value = stage[key]/Units.multiplier(key);
        input.select();
      },
      blur_input(stage, key, event){
        let input = event.target;
        let value = parseFloat(input.value) || 0;
        stage[key] = value*Units.multiplier(key);
        input.value=format(stage[key]/Units.multiplier(key));
      },

      /*UNITS*/
      /*select unit for a specific variable and save it to configuration*/
      select_unit(key, event){
        let select = event.target;
        let newUnit = select.value;
        this.Global.Configuration.Units[key]=newUnit;
        this.$forceUpdate();
      },
      //get current unit for specific variable
      get_current_unit(key){
        if(Info[key].magnitude=='Currency'){
          return Global.General.Currency;
        }
        if(undefined===this.Global.Configuration.Units[key]){
          this.Global.Configuration.Units[key] = this.Info[key].unit;
        }
        return this.Global.Configuration.Units[key];
      },
    },
  });

  //TODO
  let summary_ghg = new Vue({
    el:"#summary_ghg",
    data:{
      visible:false,
    },
  });

  //TODO
  let summary_nrg = new Vue({
    el:"#summary_nrg",
    data:{
      visible:false,
    },
  });

  //TODO
  let opportunities = new Vue({
    el:"#opportunities",
    data:{
      visible:false,
    },
  });

//-----------------------------------------------------------------------------
// MAIN CONTROLLER (not a vue component)
//-----------------------------------------------------------------------------
let ecam={
  //componenets == all can be active
  components:{
    ecam_logo,     //top logo
    sidebar,       //side bar (left)
    linear_menu,   //linear menu top
    caption,       //mouse over notes
  },

  //views == pages: only one is active
  views:{
    index,         //landing page
    get_started,   //general info
    configuration, //configuration of stages
    countries,     //list of countries for preselecting emission factors
    population,    //inserting number of inhabitants to each section
    gwp_table,
    about,
    help,
    tier_a,
    tier_b,
    summary_ghg,
    summary_nrg,
    opportunities,
  },

  /*METHODS*/
  //hide all views
  hide_all(){
    Object.entries(this.views).forEach(([key,view])=>{
      if(view.constructor===Vue){
        if(view.visible){
          view.visible=false;
        }
      }
    });
  },

  //show a view
  show(view){
    if(!this.views[view]){
      throw new Error(`view '${view}' not found`);
    }

    //activate linear_menu when entering tier_b
    if(view=='tier_b'){
      linear_menu.visible=true;
    }

    this.hide_all();
    this.views[view].visible=true;
    linear_menu.current_view = view;
    window.scrollTo(0,0);

    //TODO make it async, figure out how to do it
    //add mouse listeners to every [caption] element
    setTimeout(caption.listeners, 1000);
  },

  //force render views and components (for language tags)
  force_update(){
    Object.entries(this.views)
      .concat(Object.entries(this.components))
      .forEach(([key,obj])=>{
        obj.$forceUpdate();
    });
  },
};

//defaults (development)
index.visible        = true;
linear_menu.visible  = false;
tier_b.level         = 'Water';
tier_b.sublevel      = 'Abstraction';
tier_b.current_stage = Global.Water.Abstraction;
tier_b.visible       = false;
