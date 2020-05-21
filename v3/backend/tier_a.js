let Tier_A={
  //water supply
  Water:{
    //inputs
    ws_nrg_cons:  0, //energy consumed from the grid (wsa + wst + wsd)
    ws_vol_fuel:  0, //volume of fuel consumed
    wsd_vol_dist: 0, //volume of water injected to distribution
    ws_run_cost:  0, //running costs
    ws_nrg_cost:  0, //energy costs

    //outputs
    ws_KPI_GHG_elec(){
      return this.ws_nrg_cons*Global.General.conv_co2_kwh;
    },
    ws_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'].Diesel;//<br>
      return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    },
    ws_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'].Diesel;//<br>
      return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    },
    ws_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'].Diesel;//<br>
      return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    },
    ws_KPI_GHG_fuel(){
      return this.ws_KPI_GHG_fuel_co2()+this.ws_KPI_GHG_fuel_n2o()+this.ws_KPI_GHG_fuel_ch4();
    },
    ws_KPI_GHG(){
      return this.ws_KPI_GHG_elec()+this.ws_KPI_GHG_fuel();
    },
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

    ww_KPI_GHG_elec(){
      return this.ws_nrg_cons*Global.General.conv_co2_kwh;
    },
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
