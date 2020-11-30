/*
 * Default configuration for ecam (backend and frontend)
*/

/*frontend elements visible or not*/
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;

/*initial page to display*/
ecam.show('summary_ghg');
//go_to('Waste','Treatment');
//variable.view('wwt_KPI_GHG_biog');

/*default values*/
Global.General.Country="Algeria";
select_scenario.set_variables_from_selected_country();
