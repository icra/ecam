/*
  IN DEVELOPMENT

  current aproximation:
    1. overwrite tier B inputs temporarily
    2. calculate GHG executing tier B equations
    3. return results
    4. restore original tier B inputs

  TODO
  DOES NOT WORK BECAUSE CREATES A LOOP BETWEEN RENDERER AND BACKEND

*/

let Tier_A = {

  //water supply
  Water:{
    //inputs
    ws_nrg_cons:  0, //can overwrite Global.Water.Abstraction.wsa_nrg_cons
    ws_vol_fuel:  0, //can overwrite Global.Water.Abstraction.wsa_vol_fuel
    wsd_vol_dist: 0, //can overwrite Global.Water.Distribution.wsd_vol_dist
    ws_run_cost:  0, //can overwrite Global.Water.ws_run_cost
    ws_nrg_cost:  0, //can overwrite Global.Water.ws_nrg_cost

    //output
    ws_KPI_GHG:function(){
      return -1;
    },
  },

  Faecl:{
    //numeric inputs
    fs_nrg_cons:  0, //can overwrite Global.Faecl.Containment.fsc_nrg_cons
    fs_vol_trck:  0, //can overwrite Global.Faecl.Containment.fsc_vol_trck
    fsc_cont_emp: 0, //can overwrite Global.Faecl.Containment.fsc_cont_emp

    //dropdowns
    fsc_flooding: 0, //yes/no
    fsc_type_tre: 0, //dropdown
    fst_type_tre: 0, //dropdown
    fsr_type_tre: 0, //dropdown
    fsr_fslu_typ: 0, //dropdown

    //biogas fst (yes/no)
    fst_producing_biogas:  0, //are you producing biogas
    fst_valorizing_biogas: 0, //are you valorizing biogas
  },

  Waste:{
    //wastewater
    ww_nrg_cons:  0, //
    ww_vol_fuel:  0, //
    wwt_vol_trea: 0, //
    wwd_vol_disc: 0, //
    wwd_n2o_effl: 0, //
    ww_run_cost:  0, //
    ww_nrg_cost:  0, //

    //biogas
    wwt_producing_biogas:  0, //yes/no
    wwt_valorizing_biogas: 0, //yes/no

    //treatment type
    wwt_type_tre: 0, //dropdown

    //sludge management TODO
    //Global.Configuration.Selected.sludge_estimation_method=method;
    //ww_sludge_disposal_method: 0, //new input
  },

};

Global.Tier_A = Tier_A;
