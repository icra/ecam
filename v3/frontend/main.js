//main view controller
let ecam={
  //elements of the user interface: ecam_logo, sidebar, etc (Vue objects)
  elements:{
    ecam_logo,
    caption,
    linear_menu,
    sidebar,
  },

  //views (==pages, Vue objects)
  views:{
    landing,
    select_scenario,
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
    report,

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

    //history manipulation
    {
      let state_obj={view};
      let url   = window.location.pathname+"?view="+view;
      if(view=='tier_b'){
        let level       = tier_b.level;
        let sublevel    = tier_b.sublevel;
        state_obj.level = level;
        url += `&level=${level}`
        if(sublevel){
          state_obj.sublevel = sublevel;
          url += `&sublevel=${sublevel}`
        }
      }
      history.pushState(state_obj,'', url);
    }
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

  //append <style> elements to body foreach vue object that has styles in it
  //this function overwrites css_components.css file
  add_styles(){
    Object.values(this.elements).concat(
    Object.values(this.views)).forEach(vue_obj=>{
      if(vue_obj.$options.style){
        let el = document.createElement('style');
        document.body.appendChild(el);
        el.outerHTML = vue_obj.$options.style;
      }
    });
  },

  //set current scenario for the frontend
  //==update Global object in the frontend
  set_current_scenario(ecam_object){
    if(!ecam_object){
      return;
    }
    if(ecam_object.constructor!==Ecam){
      throw new Error('ecam_object is not an Ecam object');
      return;
    }

    //update Global variable
    Global = ecam_object;

    //update property "Global" in every view and element
    ['elements','views'].forEach(key=>{
      Object.values(ecam[key]).forEach(vue_object=>{
        if(vue_object.constructor!==Vue){
          throw new Error('object is not a Vue object');
        }
        if(vue_object.Global){
          vue_object.Global = ecam_object;
        }
      });
    });
  },

  //add new scenario
  new_scenario(){
    let scenario = new Ecam();
    Scenarios.push(scenario);
    //this.set_current_scenario(scenario);
  },

  //delete scenario
  delete_scenario(scenario){
    if(scenario==Global) return;
    let index = Scenarios.indexOf(scenario);
    if(index==-1) return;
    Scenarios.splice(index,1);
  },
};

ecam.add_styles();

/*history*/
window.onpopstate=function(event){
  let view = event.state.view;

  console.log(`
    location: ${document.location          },
    state:    ${JSON.stringify(event.state)}`
  );

  if(view=='tier_b'){
    let level    = event.state.level;
    let sublevel = event.state.sublevel;
    go_to(level, sublevel);
  }else{
    ecam.show(view);
  }
}


