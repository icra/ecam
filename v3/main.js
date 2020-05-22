//main view controller
let ecam = {

  //views (==pages)
  views:{
    landing,
    get_started,
    configuration,
    countries,
    population,
    gwp_table,
    about,
    help,
    tier_a,
    tier_b,
    summary_ghg,
    summary_nrg,
    variable,
    constants,
    constant,
    development,
    problems,
    translation_problems,
    validate_json,
    data_structure_viewer,
    benchmarks,
    graphs,
  },

  //show a view (==open a page)
  show(view){
    if(!this.views[view]){
      let e = new Error(`view '${view}' not found`);
      alert(e);
      throw e;
    }

    //activate linear_menu when entering tier_b
    if(['tier_a','tier_b'].indexOf(view)+1){
      linear_menu.visible=true;
    }

    this.hide_all();
    this.views[view].visible=true;
    linear_menu.current_view = view;
    caption.hide();
    window.scrollTo(0,0);
  },

  //hide all views
  hide_all(){
    Object.entries(this.views).forEach(([key,view])=>{
      //console.log(key);
      if(view.constructor===Vue){
        if(view.visible){
          view.visible=false;
        }
      }
    });
  },
};
