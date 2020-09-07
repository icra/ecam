//main view controller
let ecam={
  //elements of the user interface: ecam_logo, etc (Vue objects)
  elements:{
    ecam_logo,
    caption,
    linear_menu,
    stages_menu,
  },

  //views (==pages, Vue objects)
  views:{
    landing,
    select_scenario,
    configuration,
    countries,
    population,
    gwp_table,
    fuel_table,
    more,
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
  show(view, no_history_entry){
    no_history_entry = no_history_entry || false;
    //view is a STRING

    if(!this.views[view]){
      let e = new Error(`view '${view}' not found`);
      alert(e);
      throw e;
    }

    this.hide_all();
    this.views[view].visible=true; //make "view" visible

    //other settings
    stages_menu.visible = view=='tier_b';
    stages_menu.current_view = view;
    linear_menu.current_view = view;
    caption.hide();

    window.scrollTo(0,0);

    //history manipulation
    if(!no_history_entry){
      let state_obj={view};
      let url   = window.location.pathname+"?view="+view;
      let title = view;
      if(view=='tier_b'){
        let level       = tier_b.level;
        let sublevel    = tier_b.sublevel;
        state_obj.level = level;
        url            += `&level=${level}`
        title           = translate(level);
        if(sublevel){
          state_obj.sublevel  = sublevel;
          url                += `&sublevel=${sublevel}`
          title              += ' '+translate(sublevel);
        }
      }else if(view=='variable'){
        state_obj.id  = variable.id;
        url          += `&id=${variable.id}`
        title        += ' '+variable.id;
      }else if(view=='constant'){
        state_obj.code = constant.code;
        url           += `&code=${constant.code}`
        title         += ' '+constant.code;
      }
      history.pushState(state_obj,'title',"");
      document.title = title;
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
  if(!event){ return }
  if(!event.state){ return }
  if(!event.state.view){ return }

  /*
  console.log(`
    location: ${document.location          },
    state:    ${JSON.stringify(event.state)}`
  );
  */

  let view = event.state.view;

  //pressing "back" does not push a new historystate object, otherwise an
  //infinite loop is generated with "ecam.show"
  let no_history_entry = true;

  if(view=='tier_b'){
    go_to(event.state.level, event.state.sublevel, no_history_entry);
  }else if(view=='variable'){
    variable.view(event.state.id, no_history_entry);
  }else if(view=='constant'){
    constant.view(event.state.code, no_history_entry);
  }else{
    ecam.show(view, no_history_entry);
  }
}
