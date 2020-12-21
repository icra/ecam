/*
 * Default configuration for ecam (backend and frontend)
*/

/*frontend elements visible or not*/
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;

//initial input values
Global.General.Country="Algeria";
select_scenario.set_variables_from_selected_country();

//create 1 substage at each stage
Structure.filter(s=>s.sublevel).forEach(stage=>{
  stages_menu.add_substage(stage.level, stage.sublevel);
});

let energy = 1;
Structure.filter(s=>s.sublevel).forEach(stage=>{
  Global[stage.level][stage.sublevel].forEach(ss=>ss[stage.prefix+'_nrg_cons']=energy++);
});

Global.Water.Distribution[0].wsd_serv_pop=100;
Global.Water.ws_resi_pop                 =1000;
Global.Waste.Treatment[0].wwt_serv_pop   =100;
Global.Waste.ww_resi_pop                 =1000;

/*initial page to display*/
ecam.new_scenario();
Scenarios.forEach(scenario=>{
  compare_scenarios.scenarios_compared.push(scenario);
});

ecam.show('select_scenario');
//go_to('Waste','Onsite');
//tier_b.disable_all_filters();
//tier_b.filters_active.Biogas=true;
//variable.view('wwt_biog_pro');
