let ecam = {

  //views == pages
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

  //show a view
  show(view){
    if(!this.views[view]){
      throw new Error(`view '${view}' not found`);
    }

    //activate linear_menu when entering tier_b
    if(['tier_a','tier_b'].indexOf(view)+1){
      linear_menu.visible=true;
    }

    this.hide_all();
    this.views[view].visible=true;
    linear_menu.current_view = view;
    window.scrollTo(0,0);
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
