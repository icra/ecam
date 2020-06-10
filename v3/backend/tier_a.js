/*
  Tier A backend (inputs and outputs only)
*/

let Tier_A = {
  //water supply
  Water:{
    //ws inputs
      ws_nrg_cons:  0, //kWh - energy consumed from the grid
      ws_vol_fuel:  0, //L   - volume of fuel consumed (engines)
      wsd_vol_dist: 0, //m3  - volume of water injected to distribution
      ws_run_cost:  0, //$   - total running costs
      ws_nrg_cost:  0, //$   - energy cost

    //ws outputs
      ws_KPI_GHG(){ //ws total ghg emissions
        return this.ws_KPI_GHG_elec()+this.ws_KPI_GHG_fuel();
      },
      ws_KPI_GHG_elec(){ //ws ghg from electricity
        return this.ws_nrg_cons*Global.General.conv_kwh_co2;
      },
      ws_KPI_GHG_fuel(){ //ws ghg from fuel engines (CO2 + N2O + CH4)
        return this.ws_KPI_GHG_fuel_co2()+this.ws_KPI_GHG_fuel_n2o()+this.ws_KPI_GHG_fuel_ch4();
      },
      ws_KPI_GHG_fuel_co2(){ //ws ghg from fuel engines (CO2)
        let fuel=Tables['Fuel types'].Diesel; //assume diesel as fuel type
        return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      ws_KPI_GHG_fuel_n2o(){ //ws ghg from fuel engines (N2O)
        let fuel=Tables['Fuel types'].Diesel; //assume diesel as fuel type
        return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      ws_KPI_GHG_fuel_ch4(){ //ws ghg from fuel engines (CH4)
        let fuel=Tables['Fuel types'].Diesel; //assume diesel as fuel type
        return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },
  },

  //wastewater
  Waste:{
    //ww inputs
      ww_nrg_cons:               0, //kWh      - energy consumed from the grid
      ww_vol_fuel:               0, //L        - volume of fuel consumed (engines)
      wwt_vol_trea:              0, //m3       - volume of treated water
      wwd_vol_disc:              0, //m3       - volume of discharged effluent to water body
      wwd_n2o_effl:              0, //mg/L     - total nitrogen concentration in the effluent
      ww_run_cost:               0, //$        - total running costs
      ww_nrg_cost:               0, //$        - energy cost
      wwt_producing_biogas:      0, //yes/no   - are you producing biogas?
      wwt_valorizing_biogas:     0, //yes/no   - are you valorizing biogas?
      wwt_type_tre:              0, //dropdown - select main treatment type
      ww_sludge_disposal_method: 0, //dropdown - select sludge disposal method

    //ww outputs (ghg emissions)
      ww_KPI_GHG() { //ww total ghg emissions
        return this.ww_KPI_GHG_elec()+
          this.ww_KPI_GHG_fuel()+
          this.ww_KPI_GHG_biog()+
          this.ww_KPI_GHG_tre()+
          this.ww_KPI_GHG_slu();
      },
      ww_KPI_GHG_elec(){ //ww ghg from electricity
        return this.ww_nrg_cons*Global.General.conv_kwh_co2;
      },
      ww_KPI_GHG_fuel(){ //ww ghg from fuel engines (CO2 + N2O + CH4)
        return this.ww_KPI_GHG_fuel_co2()+this.ww_KPI_GHG_fuel_n2o()+this.ww_KPI_GHG_fuel_ch4();
      },
      ww_KPI_GHG_fuel_co2(){ //ww ghg from fuel engines (CO2)
        let fuel=Tables['Fuel types'].Diesel;
        return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      ww_KPI_GHG_fuel_n2o(){ //ww ghg from fuel engines (N2O)
        let fuel=Tables['Fuel types'].Diesel;
        return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      ww_KPI_GHG_fuel_ch4(){ //ww ghg from fuel engines (CH4)
        let fuel=Tables['Fuel types'].Diesel;
        return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },
      ww_KPI_GHG_biog(){ //ww ghg from biogas
        let ww_biog_pro = this.wwt_producing_biogas  ? Global.Waste.Treatment.wwt_serv_pop*Global.General.bod_pday*Global.Days()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value/1000 : 0;
        let ww_biog_val = this.wwt_valorizing_biogas ? ww_biog_pro : 0;
        let ww_biog_fla = this.wwt_valorizing_biogas ? 0           : ww_biog_pro;
        let ww_ch4_biog = 59;
        return (ww_biog_pro - ww_biog_val - ww_biog_fla + ww_biog_fla*Cts.ct_ch4_lo.value/100)*ww_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
      },
      ww_KPI_GHG_tre(){ //ww ghg from treatment (Treatment and Discharge stages)
        return this.wwt_KPI_GHG_tre() + this.wwd_KPI_GHG_tre();
      },
      wwt_KPI_GHG_tre(){ //ww ghg from treatment (Treatment) (CH4 + N2O)
        return this.wwt_KPI_GHG_tre_ch4()+this.wwt_KPI_GHG_tre_n2o();
      },
      wwt_KPI_GHG_tre_ch4(){ //ww ghg from treatment (Treatment) (CH4)
        let wwt_type_tre = this.wwt_type_tre;   //number
        let wwt_bod_infl = this.wwt_bod_infl(); //number
        let wwt_bod_effl = this.wwt_bod_effl(); //number
        let wwt_bod_slud = this.wwt_bod_slud(); //number
        let wwt_ch4_efac = this.wwt_ch4_efac(); //number
        return (wwt_bod_infl-wwt_bod_slud-wwt_bod_effl)*wwt_ch4_efac*Cts.ct_ch4_eq.value; //number
      },
      wwt_KPI_GHG_tre_n2o(){ //ww ghg from treatment (Treatment) (N2O)
        return Global.Waste.Treatment.wwt_serv_pop*Cts.ct_fac_ic.value*Cts.ct_n2o_efp.value*Global.Years()*1e-3*Cts.ct_n2o_eq.value;
      },
      wwd_KPI_GHG_tre(){ //ww ghg from treatment (Discharge) (CH4 + N2O)
        return this.wwd_KPI_GHG_tre_ch4()+this.wwd_KPI_GHG_tre_n2o();
      },
      wwd_KPI_GHG_tre_ch4(){ //ww ghg from treatment (Discharge) (CH4)
        return this.wwt_bod_effl()*this.wwt_ch4_efac()*Cts.ct_ch4_eq.value;
      },
      wwd_KPI_GHG_tre_n2o(){ //ww ghg from treatment (Discharge) (N2O)
        return this.wwd_n2o_effl/1000*this.wwd_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
      },
      ww_KPI_GHG_slu(){ //ww ghg from sludge management
        return this.wwt_KPI_GHG_slu_comp()+
          this.wwt_KPI_GHG_slu_inc()+
          this.wwt_KPI_GHG_slu_landapp()+
          this.wwt_KPI_GHG_slu_landfill()+
          this.wwt_KPI_GHG_slu_stock();
      },
      wwt_KPI_GHG_slu_comp(){ //ww ghg from sludge management (composting) (CH4 + N2O)
        return this.wwt_KPI_GHG_slu_comp_ch4()+this.wwt_KPI_GHG_slu_comp_n2o();
      },
      wwt_KPI_GHG_slu_comp_ch4(){ //ww ghg from sludge management (composting) (CH4)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'comp') return 0;

        let wwt_mass_slu_comp = this.wwt_dryw_slu();
        return wwt_mass_slu_comp*Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*Cts.ct_ch4_up.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_eq.value;
      },
      wwt_KPI_GHG_slu_comp_n2o(){ //ww ghg from sludge management (composting) (N2O)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'comp') return 0;

        let wwt_mass_slu_comp = this.wwt_dryw_slu();
        return wwt_mass_slu_comp*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      },
      wwt_KPI_GHG_slu_inc(){ //ww ghg from sludge management (incineration) (CH4 + N2O)
        return this.wwt_KPI_GHG_slu_inc_ch4()+this.wwt_KPI_GHG_slu_inc_n2o();
      },
      wwt_KPI_GHG_slu_inc_ch4(){ //ww ghg from sludge management (incineration) (CH4)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'inc') return 0;

        let wwt_mass_slu_inc = this.wwt_dryw_slu();
        return (4.85/1e5)*wwt_mass_slu_inc*Cts.ct_ch4_eq.value;
      },
      wwt_KPI_GHG_slu_inc_n2o(){ //ww ghg from sludge management (incineration) (N2O)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'inc') return 0;

        let wwt_temp_inc = 1023; //temperature assumed in tier A
        let wwt_mass_slu_inc = this.wwt_dryw_slu();
        return 0.03*wwt_mass_slu_inc*(161.3-0.14*Math.max(1023,wwt_temp_inc))*0.01*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      },
      wwt_KPI_GHG_slu_landapp(){ //ww ghg from sludge management (land application) (N2O)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'app') return 0;

        let sludge_type       = "Non-digested";
        let soil_type         = "Fine-Textured (>30% clay)";
        let wwt_slu_la_N_cont = Tables.wwt_slu_disp[sludge_type].la_N_cont;
        let wwt_mass_slu_la   = this.wwt_dryw_slu();
        let ratio_CN          = Global.content_C(wwt_mass_slu_la,sludge_type)/Global.content_N(wwt_mass_slu_la,sludge_type)||0;
        if(ratio_CN>=30){return 0;}
        return wwt_mass_slu_la*wwt_slu_la_N_cont/100*0.023*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      },
      wwt_KPI_GHG_slu_landfill(){ //ww ghg from sludge management (landfilling) (CH4 + N2O)
        return this.wwt_KPI_GHG_slu_landfill_ch4()+this.wwt_KPI_GHG_slu_landfill_n2o();
      },
      wwt_KPI_GHG_slu_landfill_ch4(){ //ww ghg from sludge management (landfilling) (CH4)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'land') return 0;

        let wwt_mass_slu_lf = this.wwt_dryw_slu();
        let sludge_type     = "Non-digested"; //tier A assumption
        let wwt_slu_lf_TVS  = Tables.wwt_slu_disp[sludge_type].TVS;
        return wwt_mass_slu_lf*Cts.ct_oc_vs.value*wwt_slu_lf_TVS/100*Cts.ct_lf_unc.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_lf.value/100*Cts.ct_DOCfra.value/100*Cts.ct_d3y_lf.value/100*Cts.ct_ch4_eq.value;
      },
      wwt_KPI_GHG_slu_landfill_n2o(){ //ww ghg from sludge management (landfilling) (N2O)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'land') return 0;

        let wwt_mass_slu_lf   = this.wwt_dryw_slu();
        let sludge_type       = "Non-digested"; //tier A assumption
        let wwt_slu_lf_N_cont = Tables.wwt_slu_disp[sludge_type].la_N_cont;
        let ratio_CN          = Global.content_C(wwt_mass_slu_lf,sludge_type)/Global.content_N(wwt_mass_slu_lf,sludge_type)||0;

        if(ratio_CN>30){
          return 0;
        }else{
          return wwt_mass_slu_lf*wwt_slu_lf_N_cont/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        }
      },
      wwt_KPI_GHG_slu_stock(){ //ww ghg from sludge management (stockpiling)
        let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
        if(sludge_disposal_method != 'stock') return 0;

        return this.wwt_dryw_slu()*90.3/1000;
      },

    //ww estimations
      wwt_bod_infl(){ //ww estimation: influent BOD based on population
        return Global.General.bod_pday/1000*Global.ww_serv_pop()*Global.Days(); //number
      },
      wwt_bod_effl(){ //ww estimation: effluent BOD (10%)
        return 0.1 * this.wwt_bod_infl();
      },
      wwt_bod_slud(){ //ww estimation: bod removed as sludge based on treatment type
        let type_tre = Tables.find('wwt_type_tre', this.wwt_type_tre); //string
        var percent  = Tables.wwt_type_tre[type_tre].bod_rmvd_as_sludge_estm; //number
        return percent*this.wwt_bod_infl(); //number
      },
      wwt_ch4_efac(){ //ww estimation: CH4 emission factor based on treatment type
        let type_tre = Tables.find('wwt_type_tre', this.wwt_type_tre); //string
        return Tables.wwt_type_tre[type_tre].ch4_efac; //number
      },
      wwt_dryw_slu(){ //ww estimation: mass of dry sludge produced (4% of wet sludge produced)
        let b = this.wwt_producing_biogas ? 0.6 : 1;
        let wwt_mass_slu = b*0.55*Global.General.bod_pday*Global.ww_serv_pop()*0.9*1e-3*1.176*Global.Days();
        return 0.04*wwt_mass_slu;
      },
  },

  //faecal sludge management
  //TODO make code readable (add comments)
  Faecl:{
    //fs inputs
      fs_nrg_cons:           0, //kWh      - energy consumed from the grid
      fs_vol_trck:           0, //L        - volume of fuel consumed (truck transport)
      fsc_cont_emp:          0, //%        - containments emptied
      fsc_flooding:          0, //yes/no   - is the containment experiencing flooding or groundwater infiltration?
      fsc_type_tre:          0, //dropdown - main containment type
      fst_type_tre:          0, //dropdown - main treatment type
      fst_producing_biogas:  0, //yes/no   - are you producing biogas?
      fst_valorizing_biogas: 0, //yes/no   - are you valorizing biogas?
      fsr_n2o_effl:          0, //number   - nitrogen load in the effluent
      fsr_type_tre:          0, //dropdown - main disposal type
      fsr_fslu_typ:          0, //dropdown - type of faecal sludge disposed

    //OUTPUTS (EMISSIONS AND ESTIMATIONS)
      //fs total ghg
      fs_KPI_GHG(){
        return this.fs_KPI_GHG_elec()+
          this.fs_KPI_GHG_trck()+
          this.fsc_KPI_GHG_cont()+
          this.fst_KPI_GHG_tre()+
          this.fst_KPI_GHG_biog()+
          this.fsr_KPI_GHG_landfil()+
          this.fsr_KPI_GHG_landapp()+
          this.fsr_KPI_GHG_dumping();
      },

      //fs ghg elec
      fs_KPI_GHG_elec(){return this.fs_nrg_cons*Global.General.conv_kwh_co2;},

      //fs ghg trck
        fs_KPI_GHG_trck(){
          return this.fs_KPI_GHG_trck_co2()+
          this.fs_KPI_GHG_trck_n2o()+
          this.fs_KPI_GHG_trck_ch4();
        },
        fs_KPI_GHG_trck_co2(){
          let fuel=Tables['Fuel types'].Diesel;
          return this.fs_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        },
        fs_KPI_GHG_trck_n2o(){
          let fuel=Tables['Fuel types'].Diesel;
          return this.fs_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
        },
        fs_KPI_GHG_trck_ch4(){
          let fuel=Tables['Fuel types'].Diesel;
          return this.fs_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
        },

      //fsc ghg cont
        fsc_KPI_GHG_cont(){
          return (this.fsc_bod_infl()-this.fsc_bod_rmvd())*this.fsc_ch4_efac()*Cts.ct_ch4_eq.value;
        },

      //fst ghg tre
        fst_KPI_GHG_tre(){
          return this.fst_KPI_GHG_tre_ch4()+this.fst_KPI_GHG_tre_n2o();
        },
        fst_KPI_GHG_tre_ch4(){
          return (this.fst_bod_infl()-this.fst_bod_slud()-this.fst_bod_effl())*this.fst_ch4_efac()*Cts.ct_ch4_eq.value;
        },
        fst_KPI_GHG_tre_n2o(){
          return 0; //to be defined (TBD TODO)
        },

      //fst ghg biogas
        fst_KPI_GHG_biog(){
          let fst_ch4_biog = 59; //%
          return (this.fst_biog_pro()-this.fst_biog_val()-this.fst_biog_fla()+this.fst_biog_fla()*Cts.ct_ch4_lo.value/100)*fst_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
        },

      //fsr ghg landfill
        fsr_KPI_GHG_landfil(){
          return this.fsr_KPI_GHG_landfil_n2o()+
            this.fsr_KPI_GHG_landfil_ch4();
        },
        fsr_KPI_GHG_landfil_n2o(){
          let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
          if(fsr_type_tre!="Landfilling") return 0;

          return this.fsr_mass_landfil()*this.fsr_lf_N_cont()/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        },
        fsr_KPI_GHG_landfil_ch4(){
          let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
          if(fsr_type_tre!="Landfilling") return 0;

          return this.fsr_mass_landfil()*this.fsr_lf_TVS()/100*Cts.ct_oc_vs.value*Cts.ct_DOCfra.value/100*Cts.ct_lf_unc.value*Cts.ct_ch4_C.value*Cts.ct_ch4_lf.value/100*Cts.ct_d3y_lf.value/100*Cts.ct_ch4_eq.value;
        },

      //fsr ghg landapp
        fsr_KPI_GHG_landapp(){
          let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
          if(fsr_type_tre!="Land application") return 0;

          let N_transformed_to_N2O=0.023;
          return this.fsr_mass_landapp()*this.fsr_la_N_cont()/100*N_transformed_to_N2O*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        },

      //fsr ghg dumping
        fsr_KPI_GHG_dumping(){
          return this.fsr_KPI_GHG_dumping_n2o()+this.fsr_KPI_GHG_dumping_ch4();
        },
        fsr_KPI_GHG_dumping_n2o(){
          let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
          if(fsr_type_tre!="Dumping") return 0;

          return this.fsr_vol_dumping()*this.fsr_n2o_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        },
        fsr_KPI_GHG_dumping_ch4(){
          let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
          if(fsr_type_tre!="Dumping") return 0;

          let fsr_ch4_efac_dumping = 0.3; //kgCH4/kgBOD
          return this.fsr_vol_dumping()*this.fsr_bod_conc_fs()*fsr_ch4_efac_dumping*Cts.ct_ch4_eq.value;
        },

      //fsm estimations
        fsc_bod_infl(){ return Global.General.bod_pday_fs/1000*Global.Faecl.fs_onsi_pop*Global.Days(); },
        fsc_bod_rmvd(){ return this.fsc_fslu_emp()*this.fsc_bod_conc_fs(); },
        fsc_bod_conc_fs(){
          let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //containment type (string)
          return Tables.fsc_type_tre[cont_typ].BOD_conc_FS;
        },
        fsc_fslu_emp(){ return Cts.ct_fs_prod.value*Global.Faecl.fs_onsi_pop*Global.Days()/this.fsc_fdensity()*this.fsc_cont_emp/100; },
        fsc_fdensity(){
          let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //string
          return Tables.fsc_type_tre[cont_typ].fs_density;
        },
        fsc_ch4_efac(){
          let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //string
          return Tables.fsc_type_tre[cont_typ][this.fsc_flooding?'ch4_efac_flooding':'ch4_efac'];
        },
        fst_bod_infl(){ return this.fsc_bod_rmvd(); },
        fst_bod_slud(){
          let type_tre=Tables.find('fst_type_tre',this.fst_type_tre); //string
          return Tables.fst_type_tre[type_tre].bod_rmvd_as_sludge_estm*this.fst_bod_infl();
        },
        fst_bod_effl(){ return 0.10*this.fst_bod_infl(); },
        fst_ch4_efac(){
          let type_tre=Tables.find('fst_type_tre',this.fst_type_tre); //string
          return Tables.fst_type_tre[type_tre].ch4_efac;
        },
        fst_biog_pro(){
          if(this.fst_producing_biogas){
            return this.fst_bod_infl()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;
          }else{
            return 0;
          }
        },
        fst_biog_val(){
          if(this.fst_valorizing_biogas){
            return this.fst_biog_pro();
          }else{
            return 0;
          }
        },
        fst_biog_fla(){
          return this.fst_valorizing_biogas ? 0 : this.fst_biog_pro();
        },
        fsr_mass_landfil(){
          let fsr_fslu_typ=Tables.find('fsr_fslu_typ_lf',this.fsr_fslu_typ);
          let total_solids=Tables.fsr_fslu_typ_lf[fsr_fslu_typ].total_solids;
          return this.fsc_fslu_emp()*this.fsc_fdensity()*total_solids;
        },
        fsr_lf_N_cont(){
          let fsr_fslu_typ=Tables.find('fsr_fslu_typ_lf',this.fsr_fslu_typ);
          return Tables.fsr_fslu_typ_lf[fsr_fslu_typ].N_content;
        },
        fsr_lf_TVS(){
          let fsr_fslu_typ=Tables.find('fsr_fslu_typ_lf',this.fsr_fslu_typ);
          return 100*Tables.fsr_fslu_typ_lf[fsr_fslu_typ].TVS;
        },
        fsr_mass_landapp(){
          let fsr_fslu_typ=Tables.find('fsr_fslu_typ_la',this.fsr_fslu_typ);
          let total_solids=Tables.fsr_fslu_typ_la[fsr_fslu_typ].total_solids;
          return this.fsc_fslu_emp()*this.fsc_fdensity()*total_solids;
        },
        fsr_la_N_cont(){
          let fsr_fslu_typ=Tables.find('fsr_fslu_typ_la',this.fsr_fslu_typ);
          return Tables.fsr_fslu_typ_la[fsr_fslu_typ].N_content;
        },
        fsr_vol_dumping(){return this.fsc_fslu_emp()},
        fsr_bod_conc_fs(){
          let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //containment type (string)
          return Tables.fsc_type_tre[cont_typ].BOD_conc_FS;
        },
  },
};

Global.Tier_A = Tier_A;
