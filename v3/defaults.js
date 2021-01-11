/*
 * Default configuration for ecam (backend and frontend)
*/

/*frontend elements visible or not*/
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;

let debug=true;
//debug=false;

if(debug){
  //initial input values
  Global.General.Country="Algeria";
  select_scenario.set_variables_from_selected_country();

  //create 1 substage at each stage
  Structure.filter(s=>s.sublevel).forEach(stage=>{
    stages_menu.add_substage(stage.level, stage.sublevel);
  });

  //add energy consumption at each substage
  let energy = 1;
  Structure.filter(s=>s.sublevel).forEach(stage=>{
    Global[stage.level][stage.sublevel].forEach(ss=>ss[stage.prefix+'_nrg_cons']=energy++);
  });

  //other inputs
  Global.Water.Distribution[0].wsd_serv_pop=100;
  Global.Water.ws_resi_pop                 =1000;
  Global.Waste.Treatment[0].wwt_serv_pop   =100;
  Global.Waste.ww_resi_pop                 =1000;

  //add another assessment
  ecam.new_scenario();
  Scenarios.forEach(scenario=>{
    compare_scenarios.scenarios_compared.push(scenario);
  });
}

//ecam.show('landing');
ecam.show('report');
//go_to('Waste','Onsite');
//variable.view('wwt_biog_pro');
