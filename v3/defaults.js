let debug=true; //development mode ON/OFF
/*
  Default configuration and debug mode (backend and frontend)
  this file is intended to help development

  note: remember to change Vue.js to production in file "index.html"
*/

/*frontend elements: set visibility*/
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;

if(debug){
  //initial input values
  Global.General.Country="Algeria";
  select_scenario.set_variables_from_selected_country();

  //create substages
  Structure.filter(s=>s.sublevel).forEach(stage=>{
    stages_menu.add_substage(stage.level, stage.sublevel);
    stages_menu.add_substage(stage.level, stage.sublevel);
  });

  //add some input values
  Global.Water.Distribution[0].wsd_serv_pop=100;
  Global.Water.ws_resi_pop                 =1000;
  Global.Waste.Treatment[0].wwt_serv_pop   =100;
  Global.Waste.ww_resi_pop                 =1000;

  //add energy consumption at each substage
  let energy=1;
  Structure.filter(s=>s.sublevel).forEach(stage=>{
    Global[stage.level][stage.sublevel].forEach(ss=>ss[stage.prefix+'_nrg_cons']=energy++);
  });

  //add another scenario layout scenario
  ecam.new_scenario();
  Scenarios.forEach(scenario=>{
    compare_scenarios.scenarios_compared.push(scenario);
  });
}

if(debug){
  //initial page to display
  ecam.show('more'); //view page
  //go_to('Water','Abstraction'); //view inventory stage
  //variable.view('wwt_KPI_GHG_slu_stockpilling'); //view variable detailed info
}
