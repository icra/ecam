//main view controller
let ecam={

  //views (==pages, Vue objects)
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
    emission_tree,

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
      if(view.constructor===Vue && view.visible){
        view.visible=false;
      }
    });
  },

  //automated test
  test(){
    //visit every page
    //test every equation TODO

    //all questions to "yes"
    Object.keys(Questions).forEach(key=>{
      Global.Configuration.Questions[key] = 1;
    });

    this.show('landing');
    this.show('get_started');
    this.show('configuration');
    this.show('countries');
    this.show('population');
    this.show('gwp_table');
    this.show('about');
    this.show('help');
    this.show('tier_a');
    Structure.forEach(s=>{
      go_to(s.level, s.sublevel);
    });
    //TODO

    return true;
  },
};

//onclose listener: avoid data loss if page is accidentally closed
//TODO
