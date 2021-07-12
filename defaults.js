let debug=true; //development mode ON/OFF
/*
  Default configuration and debug mode (backend and frontend)
  this file is intended to help development
  note: remember to change Vue.js to production in file "index.html"
*/

/*frontend elements visibility*/
  ecam_logo.visible   = 1;
  linear_menu.visible = 1;
  stages_menu.visible = 0;

/*add input values*/
if(debug){
  /*input values*/
    Global.General.Country="Afghanistan";
    select_scenario.set_variables_from_selected_country();

  /*add substages*/
    Structure.filter(s=>s.sublevel).forEach(stage=>{
      stages_menu.add_substage(stage.level, stage.sublevel);
      //stages_menu.add_substage(stage.level, stage.sublevel);
    });

  /*default input values*/
    Global.Water.Distribution[0].wsd_serv_pop=100;
    Global.Water.ws_resi_pop                 =1000;
    Global.Waste.Treatment[0].wwt_serv_pop   =100;
    Global.Waste.ww_resi_pop                 =1000;

  /*default energy consumption in substages*/
    let energy=1;//kWh
    Structure.filter(s=>s.sublevel).forEach(stage=>{
      Global[stage.level][stage.sublevel].forEach(ss=>ss[stage.prefix+'_nrg_cons']=energy++);
    });

  /*add another scenario*/
    /*
    ecam.new_scenario();
    Scenarios.forEach(scenario=>{
      compare_scenarios.scenarios_compared.push(scenario);
    });
    */

  /*default filters on for tier B*/
    //tier_b.filters_on=true;

  /*default language*/
    Languages.current="null";

  /*tutorial tips*/
    landing.include_tutorial_tips=true;

  /*default page*/
    //go_to('Water','Abstraction'); //"inventory"
    //variable.view('wsa_fuel_typ'); //variable detailed info
    ecam.show('tables'); //view
  /**/
}
