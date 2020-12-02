/*
 * Default configuration for ecam (backend and frontend)
*/

/*frontend elements visible or not*/
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;

Structure.filter(s=>s.sublevel).forEach(stage=>{
  Global[stage.level][stage.sublevel].forEach(ss=>ss[stage.prefix+'_nrg_cons']=1);
});

/*initial page to display*/
ecam.show('summary_ghg');
//go_to('Waste','Treatment');
//tier_b.disable_all_filters();
//tier_b.filters_active.Biogas=true;
//variable.view('wwt_biog_pro');

/*default values*/
Global.General.Country="Algeria";
select_scenario.set_variables_from_selected_country();
