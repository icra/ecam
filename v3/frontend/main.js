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
    //all questions to "yes"
    Object.keys(Questions).forEach(key=>{
      Global.Configuration.Questions[key] = 1;
    });

    //prepare clicking everywhere
    let _this    = this;
    let timer    = 1;   //seconds
    let interval = 100; //millisecons

    //toggle sidebar
    setTimeout( ()=>{sidebar.visible=1}, interval*timer++);
    setTimeout( ()=>{sidebar.visible=0}, interval*timer++);

    //visit every page (=view)
    Object.keys(this.views).forEach(key=>{
      setTimeout( ()=>{_this.show(key)}, interval*timer++);
    });

    //visit every tier b stage
    Structure.forEach(s=>{
      setTimeout(()=>{go_to(s.level, s.sublevel)}, interval*timer++);
    });

    //visit every variable
    Structure.forEach(s=>{
      get_input_codes(s.level, s.sublevel).concat(
        get_equation_codes(s.level, s.sublevel)
      ).forEach(code=>{
        setTimeout(function(){variable.view(code)}, interval*timer++);
      });
    });

    //visit every constant
    Object.keys(Cts).forEach(code=>{
      setTimeout(()=>{constant.view(code)}, interval*timer++);
    });
  },
};

//onclose listener: avoid data loss if page is accidentally closed
//TODO
