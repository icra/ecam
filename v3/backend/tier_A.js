let Tier_A={
  Water:{
    //water supply
    ws_nrg_cons:  0, //energy consumed from the grid (wsa + wst + wsd)
    ws_vol_fuel:  0, //volume of fuel consumed
    wsd_vol_dist: 0, //volume of water injected to distribution
    ws_run_cost:  0, //running costs
    ws_nrg_cost:  0, //energy costs
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

    //sludge management
    //Global.Configuration.Selected.sludge_estimation_method=method;
    //ww_sludge_disposal_method: 0, //new input
  },
  Faecl:{
    //numeric inputs
    fs_nrg_cons:  0, //
    fs_vol_trck:  0, //
    fsc_cont_emp: 0, //

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
};

Global.Tier_A = Tier_A;
