/*
 * Main data structure object.
 * It stores user inputs and has all equations (except estimations, which could be
 * moved here also) TODO "backend/estimations.js"
*/

//A "system" or "scenario" is a class Ecam object
class Ecam{
  constructor(){
    this.General={
      version              : "3.0.0",
      Name                 : `Untitled system${Scenarios.length ? (' '+(1+Scenarios.length)):''}`,
      AssessmentPeriodStart: "2020-01-01",
      AssessmentPeriodEnd  : "2020-12-31",
      Comments             : "",
      Currency             : "USD", //default currency
      Country              : false, //selected country name (string)
      conv_kwh_co2         : 0,     //electricity conversion (kgCO2/kWh)
      prot_con             : 0,     //prot consumption (kg/person/year)
      bod_pday             : 0,     //BOD5 (g/person/day)
      bod_pday_fs          : 0,     //BOD5 in faecal sludge (g/person/day)
      equations:[
        "Days",
        "Years",
        "TotalGHG",
        "TotalNRG",
      ],
    },

    /*Level 1 - Water Supply*/
    this.Water={
      ws_resi_pop:0, //resident population
      ws_nrg_cost:0, //total energy costs
      ws_run_cost:0, //total running costs
      equations:[
        "wsa_KPI_GHG",
        "wst_KPI_GHG",
        "wsd_KPI_GHG",
        "ws_KPI_GHG",
        "ws_SL_nrg_cost",
        "ws_nrg_cons",
        "ws_vol_fuel",
        "ws_SL_serv_pop",
        "ws_SL_auth_con",
      ],

      Abstraction:{
        wsa_vol_conv:0, //volume of abstracted water
        wsa_nrg_cons:0, //energy consumed from the grid
        wsa_fuel_typ:0,
        wsa_vol_fuel:0,
        wsa_vol_pump:0,
        wsa_nrg_pump:0,
        wsa_sta_head:0,
        wsa_pmp_head:0,
        wsa_main_len:0,
        wsa_pmp_type:0,
        wsa_pmp_size:0,
        wsa_pmp_flow:0, //Measured pump flow L/s
        wsa_pmp_volt:0, //Measured pump voltage V
        wsa_pmp_amps:0, //Measured pump current Amp
        wsa_pmp_pf:0.9, //power factor (no unit)
        wsa_pmp_exff:0, //Expected electromechanical efficiency of new pump % C

        equations:[
          "wsa_KPI_GHG_elec",
          "wsa_KPI_GHG_fuel",
          "wsa_KPI_GHG",
          "wsa_nrg_per_abs_watr",
          "wsa_nrg_per_pmp_watr",
          "wsa_pmp_pw",
          "wsa_KPI_std_nrg_cons",
          "wsa_KPI_un_head_loss",
          "wsa_KPI_nrg_elec_eff",
          "wsa_KPI_ghg_estm_red",
          "wsa_KPI_std_nrg_newp",
          "wsa_KPI_nrg_cons_new",
          "wsa_KPI_nrg_estm_sav",
        ],
      },

      Treatment:{
        wst_vol_trea:0,
        wst_nrg_cons:0,
        wst_mass_slu:0,
        wst_fuel_typ:0,
        wst_vol_fuel:0,
        wst_nrg_pump:0,
        wst_vol_pump:0,
        wst_pmp_head:0,
        wst_sta_head:0,
        wst_coll_len:0,
        wst_pmp_flow:0,
        wst_pmp_volt:0,
        wst_pmp_amps:0,
        wst_pmp_pf:0.9,
        wst_pmp_exff:0,
        wst_tst_carr:0,
        wst_trea_cap:0,
        equations:[
          "wst_KPI_GHG_elec",
          "wst_KPI_GHG_fuel",
          "wst_KPI_GHG",
          "wst_KPI_nrg_per_m3",
          "wst_KPI_slu_per_m3",
          "wst_KPI_capac_util",
          "wst_KPI_tst_carr",
          "wst_KPI_std_nrg_cons",
          "wst_KPI_un_head_loss",
          "wst_pmp_pw",
          "wst_KPI_nrg_elec_eff",
          "wst_KPI_std_nrg_newp",
          "wst_KPI_nrg_cons_new",
          "wst_KPI_nrg_estm_sav",
          "wst_KPI_ghg_estm_red",
        ],
      },

      Distribution:{
        wsd_serv_pop:0,
        wsd_vol_dist:0,
        wsd_nrg_cons:0,
        wsd_auth_con:0,
        wsd_bill_con:0,
        wsd_fuel_typ:0,
        wsd_vol_fuel:0,
        wsd_trck_typ:0,
        wsd_vol_trck:0,
        wsd_deli_pts:0,
        wsd_ser_cons:0,
        wsd_time_pre:0,
        wsd_min_pres:0,
        wsd_hi_no_el:0,
        wsd_lo_no_el:0,
        wsd_av_no_el:0,
        wsd_wt_el_no:0,
        wsd_vol_pump:0,
        wsd_nrg_pump:0,
        wsd_pmp_size:0,
        wsd_sta_head:0,
        wsd_pmp_head:0,
        wsd_main_len:0,
        wsd_pmp_flow:0, //Measured pump flow L/s
        wsd_pmp_volt:0, //Measured pump voltage V
        wsd_pmp_amps:0, //Measured pump current Amp
        wsd_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
        wsd_pmp_pf:0.9, //power factor (no unit)
        equations:[
          "wsd_KPI_GHG_elec",
          "wsd_KPI_GHG_fuel",
          "wsd_KPI_GHG_trck",
          "wsd_KPI_GHG",

          "wsd_KPI_nrg_per_vd",
          "wsd_KPI_nrg_per_m3",
          "wsd_SL_nr_water",
          "wsa_SL_GHG_nrw",
          "wst_SL_GHG_nrw",
          "wsd_SL_GHG_nrw",
          "wsd_SL_ghg_attr",
          "wsd_SL_water_loss",
          "wsd_pmp_pw",
          "wsd_KPI_nrg_per_m3",
          "wsd_KPI_nrg_per_vd",
          "wsd_SL_nr_water",
          "wsd_SL_water_loss",
          "wsd_SL_pres_ade",
          "wsd_SL_cont_sup",
          "c_wsd_nrg_topo",
          "c_wsd_nrg_natu",
          "c_wsd_nrg_mini",
          "c_wsd_nrg_supp",
          "wsd_KPI_nrg_efficien",
          "wsd_KPI_nrg_topgraph",
          "wsd_KPI_std_nrg_cons",
          "wsd_KPI_un_head_loss",
          "wsd_KPI_water_losses",
          "wsd_KPI_nrg_elec_eff",
          "wsd_KPI_std_nrg_newp",
          "wsd_KPI_nrg_cons_new",
          "wsd_KPI_nrg_estm_sav",
          "wsd_KPI_ghg_estm_red",
        ],
      },
    };

    /*Level 1 - Wastewater*/
    this.Waste={
      ww_resi_pop:0, //resident population
      ww_vol_gene:0, //volume of generated wastewater
      ww_nrg_cost:0, //energy costs
      ww_run_cost:0, //total running costs
      equations:[
        "wwc_KPI_GHG", //GHG from Wastewater Collection
        "wwt_KPI_GHG", //GHG from Wastewater Treatment
        "wwo_KPI_GHG", //GHG from Wastewater Discharge
        "ww_KPI_GHG",  //GHG from Wastewater
        "ww_SL_nrg_cost", //SL energy cost percentage
        "ww_nrg_cons",    //energy consumed from the grid

        /*
        "ww_GHG_avoided", //GHG avoided
        "ww_vol_fuel",    //fuel consumed by engines
        */
      ],

      Collection:{
        //population and volumes of wastewater
        wwc_conn_pop:0,       //population connected to sewers
        wwc_vol_coll:0,       //volume of collected wastewater
        wwc_vol_coll_tre:0,   //volume of collected wastewater conveyed to treatment
        wwc_vol_coll_unt:0,   //volume of collected wastewater untreated (CSO)

        //emission factors
        ww_ch4_efac_col:0,    //emission factor for collected wastewater
        ww_ch4_efac_cso:0.3,  //emission factor for collected untreated wastewater

        //fuel engines
        wwc_fuel_typ:0,
        wwc_vol_fuel:0,

        //energy performance
        wwc_nrg_cons:0, //energy consumed from the grid
        wwc_vol_pump:0,
        wwc_nrg_pump:0,
        wwc_pmp_head:0,
        wwc_sta_head:0,
        wwc_coll_len:0,
        wwc_pmp_flow:0, //Measured pump flow L/s
        wwc_pmp_volt:0, //Measured pump voltage V
        wwc_pmp_amps:0, //Measured pump current Amp
        wwc_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
        wwc_pmp_pf:0.9, //power factor (no unit)

        equations:[
          "wwc_KPI_GHG_elec",
          "wwc_KPI_GHG_fuel",
          "wwc_KPI_GHG_cso",
          "wwc_KPI_GHG_col",
          "wwc_KPI_GHG",
          "wwc_SL_conn_pop",
          "wwc_KPI_nrg_per_m3",
          "wwc_KPI_std_nrg_cons",
          "wwc_KPI_un_head_loss",
          "wwc_KPI_nrg_elec_eff",
          "wwc_KPI_std_nrg_newp",
          "wwc_KPI_nrg_cons_new",
          "wwc_KPI_nrg_estm_sav",
          "wwc_KPI_ghg_estm_red",
        ],
      },

      Treatment:{
        //population and volumes
        wwt_serv_pop:0, //population serviced
        wwt_vol_trea:0, //volume of treated ww
        wwd_vol_disc:0, //discharged ww volume
        wwd_vol_nonp:0, //Volume of water reused

        //operational parameters
        wwt_bod_infl:0, //BOD influent
        wwt_bod_slud:0, //BOD removed as sludge
        wwt_bod_effl:0, //BOD effluent
        wwd_n2o_effl:0, //TKN effluent

        //emission factors
        wwt_ch4_efac:0,
        wwt_n2o_efac:0,
        wwd_ch4_efac:0,
        wwd_n2o_efac:0,

        //fuel engines
        wwt_fuel_typ:0,
        wwt_vol_fuel:0,

        wwt_trea_cap:0,
        wwt_tst_cmpl:0,
        wwt_tst_cond:0,

        //energy performance
        wwt_nrg_cons:0,
        wwt_vol_pump:0,
        wwt_nrg_pump:0,
        wwt_pmp_head:0,
        wwt_sta_head:0,
        wwt_coll_len:0,
        wwt_pmp_flow:0,
        wwt_pmp_volt:0,
        wwt_pmp_amps:0,
        wwt_pmp_pf:0.9,
        wwt_pmp_exff:0,

        //biogas
        wwt_biog_pro:0,
        wwt_biog_fla:0,
        wwt_ch4_biog:59,
        wwt_dige_typ:0,
        wwt_fuel_dig:0,
        wwt_nrg_biog:0,
        wwt_biog_val:0,

        //transport of reused water
        wwd_trck_typ:0,
        wwd_vol_trck:0,

        //nutrient recovery
        wwd_wr_N_rec:0, //N recovered
        wwd_wr_P_rec:0, //P recovered
        wwd_wr_adnrg:0, //additional energy
        wwd_wr_vol_d:0, //volume of reused water displacing potable water

        //sludge management
        wwt_mass_slu:0,
        wwt_dryw_slu:0,
        wwt_slu_disp:0,
        wwt_mass_slu_sto:0,
        wwt_time_slu_sto:0,
        wwt_mass_slu_comp:0,
        wwt_mass_slu_inc:0,
        wwt_temp_inc:0,
        wwt_mass_slu_app:0,
        wwt_soil_typ:0,      //Option: ["Fine","Coarse"]
        wwt_slu_la_N_cont:0, //Total Nitrogen (% of dry weight)
        wwt_mass_slu_land:0,
        wwt_slu_lf_N_cont:0,
        wwt_slu_lf_TVS:0,
        wwt_slu_type:0,
        wwt_mass_slu_stock:0,
        wwt_trck_typ:0,
        wwt_vol_tslu:0,

        equations:[
          "wwt_KPI_GHG_elec",
          "wwt_KPI_GHG_fuel",
          "wwt_KPI_GHG_tre",
          "wwt_KPI_GHG_biog",
          "wwt_KPI_GHG_dig_fuel",
          "wwt_KPI_GHG_slu",
          "wwd_KPI_GHG_disc",
          "wwd_KPI_GHG_trck",
          "wwt_KPI_GHG",

          "wwt_bod_rmvd",
          "wwt_KPI_nrg_per_m3",
          "wwt_KPI_nrg_per_kg",
          "wwt_SL_vol_pday",

          "wwt_KPI_capac_util",
          "wwt_SL_qual_com",

          "wwt_KPI_nrg_per_pump",
          "wwt_KPI_std_nrg_cons",
          "wwt_KPI_un_head_loss",
          "wwt_KPI_nrg_elec_eff",
          "wwt_KPI_std_nrg_newp",
          "wwt_KPI_nrg_cons_new",
          "wwt_KPI_nrg_estm_sav",
          "wwt_KPI_ghg_estm_red",

          "wwt_KPI_biog_x_bod",
          "c_wwt_nrg_biog",
          "wwt_KPI_nrg_biogas",
          "wwt_KPI_nrg_x_biog",
          "wwt_SL_GHG_avoided",
          "wwt_KPI_sludg_prod",
          "wwt_KPI_dry_sludge",

          "wwt_wr_C_seq_slu",
          "wwd_wr_GHG_avo_N",
          "wwd_wr_GHG_avo_P",
          "wwd_wr_GHG_avo",
          "wwd_wr_nrg_sav",
          "wwd_wr_GHG_avo_d",
          "wwd_SL_ghg_non",
          "wwd_total_m3",
        ],
      },

      //TODO ipcc 2019
      Onsite:{
        fsc_onsi_pop:0, //population with onsite treatment
        fsc_open_pop:0, //population open defecation

        wwc_vol_unco:0,     //volume of uncollected wastewater
        wwc_vol_unco_ons:0, //volume of uncollected wastewater conveyed to onsite treatment
        wwc_vol_unco_unt:0, //volume of uncollected wastewater untreated
        wwo_vol_trea:0,     //treated wastewater

        //fsm containment
        fsc_type_tre:0,    //hidden (treatment type)
        fsc_nrg_cons:0,    //energy consumed
        fsc_bod_infl:0,    //influent bod load
        fsc_flooding:0,    //yes/no
        fsc_ch4_efac:0,    //ch4 emission factor
        fsc_cont_emp:0,    //containments emptied
        fsc_fdensity:0,    //density of faecal sludge
        fsc_fslu_emp:0,    //FS emptied
        fsc_bod_conc_fs:0, //[BOD] in FS
        fsc_bod_rmvd:0,    //bod removed as FS
        fsc_trck_typ:0,    //type of fuel
        fsc_vol_trck:0,    //fuel consumed
        fsc_nrg_pump:0,
        fsc_vol_pump:0,
        fsc_pmp_head:0,
        fsc_sta_head:0,
        fsc_coll_len:0,
        fsc_pmp_flow:0,
        fsc_pmp_volt:0,
        fsc_pmp_amps:0,
        fsc_pmp_pf:0.9,
        fsc_pmp_exff:0,

        //fsm treatment
        fst_nrg_cons:0,
        fst_n2o_efac:0,
        fst_ch4_efac:0,
        fst_vol_fuel:0, //fuel consumed (engines)
        fst_fuel_typ:0, //type of fuel (engines)
        fst_trck_typ:0, //type of fuel (trucks)
        fst_vol_trck:0, //fuel consumed (trucks)
        fst_biog_pro:0,
        fst_biog_val:0,
        fst_biog_fla:0,
        fst_ch4_biog:59,
        fst_nrg_biog:0,
        fst_bod_infl:0,
        fst_bod_effl:0,
        fst_type_tre:0,
        fst_bod_slud:0,
        fst_nrg_pump:0,
        fst_vol_pump:0,
        fst_pmp_head:0,
        fst_sta_head:0,
        fst_coll_len:0,
        fst_pmp_flow:0,
        fst_pmp_volt:0,
        fst_pmp_amps:0,
        fst_pmp_pf:0.9,
        fst_pmp_exff:0,

        //fsm reuse/disposal
        fsr_type_tre:0,         //main type of disposal
        fsr_fslu_typ:0,         //main type of faecal sludge
        fsr_nrg_cons:0,
        fsr_fuel_typ:0,         //type of fuel
        fsr_vol_fuel:0,         //fuel consumed
        fsr_trck_typ:0,         //type of fuel
        fsr_vol_trck:0,         //fuel consumed
        fsr_mass_landapp:0,     //dry weight sent to land application
        fsr_soil_typ:0,         //soil type for land application
        fsr_fslu_typ_la:0,      //type of faecal sludge disposed landapp
        fsr_la_N_cont:0,        //N content of faecal sludge
        fsr_mass_landfil:0,     //dry weight sent to landfilling
        fsr_disp_typ:0,         //disposal type for landfilling
        fsr_fslu_typ_lf:0,      //type of faecal sludge disposed landfil
        fsr_lf_N_cont:0,        //N content of faecal sludge
        fsr_lf_TVS:0,           //TVS content of faecal sludge
        fsr_vol_dumping:0,      //volume dumped
        fsr_ch4_efac_dumping:0, //emission factor depending on dumping pathway
        fsr_dumping_pth:0,      //dumping pathway
        fsr_bod_conc_fs:0,      //[BOD] in FS
        fsr_vol_disc:0,
        fsr_bod_effl:0,
        fsr_ch4_efac:0,
        fsr_n2o_effl:0,
        fsr_N_urine:0,
        fsr_reused_N:0,
        fsr_reused_P:0,
        fsr_nrg_pump:0,
        fsr_vol_pump:0,
        fsr_pmp_head:0,
        fsr_sta_head:0,
        fsr_coll_len:0,
        fsr_pmp_flow:0,
        fsr_pmp_volt:0,
        fsr_pmp_amps:0,
        fsr_pmp_pf:0.9,
        fsr_pmp_exff:0,

        equations:[
          "wwo_KPI_GHG", //GHG from Wastewater Onsite Treatment
          /*
          "fst_KPI_GHG_elec",
          "fst_KPI_GHG_fuel",
          "fst_KPI_GHG_trck",
          "fst_KPI_GHG_biog",
          "fst_KPI_GHG_tre",
          "fst_KPI_GHG",
          "fst_SL_GHG_avoided",
          "fst_KPI_std_nrg_cons",
          "fst_KPI_un_head_loss",
          "fst_pmp_pw",
          "fst_KPI_nrg_elec_eff",
          "fst_KPI_std_nrg_newp",
          "fst_KPI_nrg_cons_new",
          "fst_KPI_nrg_estm_sav",
          "fst_KPI_ghg_estm_red",

          "fsr_KPI_GHG_elec",
          "fsr_KPI_GHG_fuel",
          "fsr_KPI_GHG_trck",
          "fsr_KPI_GHG_landapp",
          "fsr_KPI_GHG_landfil",
          "fsr_KPI_GHG_dumping",
          "fsr_KPI_GHG_tre",
          "fsr_KPI_GHG_urine",
          "fsr_KPI_GHG",
          "fsr_ghg_avoided_landapp",
          "fsr_ghg_avoided_landfil",
          "fsr_ghg_avoided_reuse_N",
          "fsr_ghg_avoided_reuse_P",
          "fsr_ghg_avoided_reuse",
          "fsr_KPI_std_nrg_cons",
          "fsr_KPI_un_head_loss",
          "fsr_pmp_pw",
          "fsr_KPI_nrg_elec_eff",
          "fsr_KPI_std_nrg_newp",
          "fsr_KPI_nrg_cons_new",
          "fsr_KPI_nrg_estm_sav",
          "fsr_KPI_ghg_estm_red",
          "fsr_ghg_avoided_land",
          */
        ],
      },
    };

    //aliases for level 2: minimize code of equations
      this.wsa = this.Water.Abstraction;
      this.wst = this.Water.Treatment;
      this.wsd = this.Water.Distribution;
      this.wwc = this.Waste.Collection;
      this.wwt = this.Waste.Treatment;
      this.wwo = this.Waste.Onsite;
    //</>

    /*user preferences*/
    this.Configuration={
      //user selected units for inputs
      Units:{
        //code:unit
      },

      //auxiliar object to store user selections
      Selected:{
        gwp_reports_index:0,
      },

      //answers for filters (see "questions.js")
      Questions:{
        //wwt_valorizing_biogas: 0,
        //fst_valorizing_biogas: 0,
      },

      //keys of folded Questions (TODO move to frontend)
      FoldedQuestions:[
      ],
    };

    //set default values for all questions to 0
    Object.keys(Questions).filter(key=>{
      return typeof(Questions[key])=='object'
    }).forEach(key=>{
      this.Configuration.Questions[key]=0;
    });

    //Arrays of substages (for level 3)
    //TODO v3
    this.Substages={
      "Water":{
        "Abstraction": [], //wsa
        "Treatment":   [], //wst
        "Distribution":[], //wsd
      },
      "Waste":{
        "Collection":[], //wwc
        "Treatment":[], //wwt
        "Onsite":   [], //wwd
      },
    };
  }

  //===========================================================================
  // ALL EQUATIONS
  //===========================================================================
  //General functions
    //assesment period duration (in days)
    Days(){
      let startDate=new Date(this.General.AssessmentPeriodStart);
      let finalDate=new Date(this.General.AssessmentPeriodEnd);
      //add 1 day to include the whole final date
      //for example: from january 1st to december 31th is 365 days
      return 1+(finalDate-startDate)/1000/60/60/24; //days
    }
    //assesment period duration (in years)
    Years(){return this.Days()/365}
  //</>

  //All emissions
    TotalGHG(){return this.ws_KPI_GHG()+this.ww_KPI_GHG()}
    ws_KPI_GHG(){return this.wsa_KPI_GHG()+this.wst_KPI_GHG()+this.wsd_KPI_GHG()}
    ww_KPI_GHG(){return this.wwc_KPI_GHG()+this.wwt_KPI_GHG()+this.wwo_KPI_GHG()}
    //GHG wsa
      wsa_KPI_GHG(){return this.wsa_KPI_GHG_elec()+this.wsa_KPI_GHG_fuel().total}
      wsa_KPI_GHG_elec(){return this.wsa.wsa_nrg_cons*this.General.conv_kwh_co2}
      wsa_KPI_GHG_fuel(){
        let vol   = this.wsa.wsa_vol_fuel;
        let fuel  = Tables.get_row('Fuel type',this.wsa.wsa_fuel_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
    //GHG wst
      wst_KPI_GHG(){return this.wst_KPI_GHG_elec()+this.wst_KPI_GHG_fuel().total}
      wst_KPI_GHG_elec(){return this.wst.wst_nrg_cons*this.General.conv_kwh_co2}
      wst_KPI_GHG_fuel(){
        let vol   = this.wst.wst_vol_fuel;
        let fuel  = Tables.get_row('Fuel type',this.wst.wst_fuel_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
    //GHG wsd
      wsd_KPI_GHG(){return this.wsd_KPI_GHG_elec()+this.wsd_KPI_GHG_fuel().total+this.wsd_KPI_GHG_trck().total}
      wsd_KPI_GHG_elec(){return this.wsd.wsd_nrg_cons*this.General.conv_kwh_co2}
      wsd_KPI_GHG_fuel(){
        let vol   = this.wsd.wsd_vol_fuel;
        let fuel  = Tables.get_row('Fuel type',this.wsd.wsd_fuel_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
      wsd_KPI_GHG_trck(){
        let vol   = this.wsd.wsd_vol_trck;
        let fuel  = Tables.get_row('Fuel type',this.wsd.wsd_trck_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
    //GHG wwc
      wwc_KPI_GHG(){
        return this.wwc_KPI_GHG_elec()
          +this.wwc_KPI_GHG_fuel().total
          +this.wwc_KPI_GHG_cso()
          +this.wwc_KPI_GHG_col();
        }

      wwc_KPI_GHG_elec(){return this.wwc.wwc_nrg_cons*this.General.conv_kwh_co2}
      wwc_KPI_GHG_fuel(){
        let vol   = this.wwc.wwc_vol_fuel;
        let fuel  = Tables.get_row('Fuel type',this.wwc.wwc_fuel_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
      wwc_KPI_GHG_cso(){
        let pop = this.Waste.Collection.wwc_conn_pop*(this.Waste.Collection.wwc_vol_coll_unt/this.Waste.Collection.wwc_vol_coll||0);
        let ch4 = pop*this.General.bod_pday/1000*this.Days()*this.wwc.ww_ch4_efac_cso*Cts.ct_ch4_eq.value;
        return ch4;
      }
      wwc_KPI_GHG_col(){
        let pop = this.Waste.Collection.wwc_conn_pop*(this.Waste.Collection.wwc_vol_coll_tre/this.Waste.Collection.wwc_vol_coll||0);
        let ch4 = pop*this.General.bod_pday/1000*this.Days()*this.wwc.ww_ch4_efac_col*Cts.ct_ch4_eq.value;
        return ch4;
      }
    //GHG wwt
      wwt_KPI_GHG(){
        return (
          this.wwt_KPI_GHG_elec()
          +this.wwt_KPI_GHG_fuel().total
          +this.wwt_KPI_GHG_dig_fuel().total
          +this.wwt_KPI_GHG_tre().total
          +this.wwt_KPI_GHG_biog()
          +this.wwt_KPI_GHG_slu().total
          +this.wwd_KPI_GHG_trck().total
          +this.wwd_KPI_GHG_disc().total
        )
      }
      wwt_KPI_GHG_elec(){return this.wwt.wwt_nrg_cons*this.General.conv_kwh_co2}
      wwt_KPI_GHG_fuel(){
        let vol   = this.wwt.wwt_vol_fuel;
        let fuel  = Tables.get_row('Fuel type',this.wwt.wwt_fuel_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
      wwt_KPI_GHG_dig_fuel(){
        let vol   = this.wwt.wwt_fuel_dig;
        let fuel  = Tables.get_row('Fuel type',this.wwt.wwt_dige_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }
      wwt_KPI_GHG_tre(){
        let ch4   = (this.wwt.wwt_bod_infl-this.wwt.wwt_bod_slud-this.wwt.wwt_bod_effl)*this.wwt.wwt_ch4_efac*Cts.ct_ch4_eq.value;
        let n2o   = this.wwt.wwt_serv_pop*Cts.ct_fac_ic.value*this.wwt.wwt_n2o_efac*this.Years()*Cts.ct_n2o_eq.value*1e-3;
        let total = ch4+n2o;
        return {total,ch4,n2o};
      }
      wwt_KPI_GHG_biog(){
        return (
          this.wwt.wwt_biog_pro
          -this.wwt.wwt_biog_val
          -this.wwt.wwt_biog_fla
          +this.wwt.wwt_biog_fla*Cts.ct_ch4_lo.value/100
        )*this.wwt.wwt_ch4_biog/100
        *Cts.ct_ch4_m3.value
        *Cts.ct_ch4_eq.value;
      }

      //wwt sludge
      wwt_KPI_GHG_slu_storage(){
        let sludge_type  = Tables.get_row('wwt_slu_disp',this.wwt.wwt_slu_disp);
        let sludge_mass  = this.wwt.wwt_mass_slu_sto; //kg of sludge
        let storage_time = this.wwt.wwt_time_slu_sto; //days

        let ch4_potential = (function(){
          let TVS   = sludge_type.TVS; //gTVS/gSludge
          let OC    = Cts.ct_oc_vs.value; //gOC/gTVS
          let f_ch4 = sludge_type.f_ch4; //??
          return sludge_mass*f_ch4*TVS*OC*(4/3);
        })();

        let f=(function(){
          if(storage_time > 5 && storage_time < 20){
            return 0.03;
          }else if(storage_time >= 20){
            return 0.05;
          }else{
            return 0;
          }
        })();

        return f*ch4_potential*Cts.ct_ch4_eq.value;
      }

      wwt_KPI_GHG_slu_composting(){
        let sludge_mass = this.wwt.wwt_mass_slu_comp; //kg of sludge
        let sludge_type = Tables.get_row('wwt_slu_disp',this.wwt.wwt_slu_disp);
        let ch4 = (function(){
          let sludge_to_TVS = sludge_type.TVS; //gTVS/gSludge
          let TVS_to_OC     = Cts.ct_oc_vs.value;  //gOC/gTVS
          let OC_to_CH4     = Cts.ct_ch4_oc.value; //gCH4/gOC
          let ratio_up      = Cts.ct_ch4_up.value; //ratio for uncovered pile
          return sludge_mass * sludge_to_TVS * TVS_to_OC * ratio_up * Cts.ct_ch4_eq.value;
        })();
        let n2o = sludge_mass*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        let total = ch4+n2o;
        return {total,ch4,n2o};
      }

      wwt_KPI_GHG_slu_incineration(){
        let sludge_mass = this.wwt.wwt_mass_slu_inc;
        let temperature = this.wwt.wwt_temp_inc;
        let ch4 = (4.85/1e5)*sludge_mass*Cts.ct_ch4_eq.value;
        let n2o = (function(){
          if(temperature > 1152){
            return 0;
          }else{
            return 0.03*sludge_mass*(161.3-0.14*Math.max(1023,temperature))*0.01*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
          }
        })();
        let total = ch4+n2o;
        return {total,ch4,n2o};
      }

      wwt_KPI_GHG_slu_land_application(){
        let sludge_mass = this.wwt.wwt_mass_slu_app; //kg sludge
        let sludge_type = Tables.get_row('wwt_slu_disp',this.wwt.wwt_slu_disp);
        let C_content = (function(){
          let TVS = sludge_type.TVS; //gTVS/gSludge
          let OC = Cts.ct_oc_vs.value; //gOC/gTVS
          return sludge_mass*TVS*OC; //gOC
        })(); //gOC
        let N_content = sludge_mass*this.wwt.wwt_slu_la_N_cont/100;
        let ratio_CN = C_content/N_content || 0;
        if(ratio_CN>=30){return 0;}
        let f_la = Tables.get_row('wwt_soil_typ',this.wwt.wwt_soil_typ).f_la; //??
        return N_content*f_la*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      }

      wwt_KPI_GHG_slu_landfilling(){
        let sludge_mass = this.wwt.wwt_mass_slu_land;
        let sludge_type = Tables.get_row('wwt_slu_disp',this.wwt.wwt_slu_disp);
        let TVS         = this.wwt.wwt_slu_lf_TVS/100; //gTVS/gSludge
        let ratio       = Tables.get_row('wwt_slu_type',this.wwt.wwt_slu_type).ratio;
        let N_content   = sludge_mass*this.wwt.wwt_slu_lf_N_cont/100; //gN
        let OC          = Cts.ct_oc_vs.value; //gOC/gTVS

        let ch4 = ratio*(function(){
          let uncertainty   = Cts.ct_lf_unc.value;
          let OC_to_CH4     = Cts.ct_ch4_oc.value; //gCH4/gOC
          let CH4_in_lf_gas = Cts.ct_ch4_lf.value/100;
          let DOC_fra       = Cts.ct_DOCfra.value/100;
          let dec_3year     = Cts.ct_d3y_lf.value/100;
          return uncertainty*sludge_mass*TVS*OC*OC_to_CH4*CH4_in_lf_gas*DOC_fra*dec_3year*Cts.ct_ch4_eq.value;
        })();

        let n2o = ratio*(function(){
          let C_content = (function(){
            let TVS = sludge_type.TVS;    //gTVS/gSludge
            return sludge_mass*TVS*OC;    //gOC
          })(); //gOC
          let ratio_CN = C_content/N_content || 0;
          if(ratio_CN>=30){return 0;}
          let factor_for_low_CN_ratio = Cts.ct_n2o_lf.value/100;
          return N_content*factor_for_low_CN_ratio*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        })();

        let total = ch4+n2o;
        return {total,ch4,n2o};
      }

      wwt_KPI_GHG_slu_stockpilling(){
        let sludge_mass =  this.wwt.wwt_mass_slu_stock;
        return sludge_mass*90.3/1000;
      }

      wwt_KPI_GHG_slu_transport(){
        let vol   = this.wwt.wwt_vol_tslu;
        let fuel  = Tables.get_row('Fuel type',this.wwt.wwt_trck_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,n2o,ch4};
      }

      wwt_KPI_GHG_slu(){
        let storage          = this.wwt_KPI_GHG_slu_storage();
        let composting       = this.wwt_KPI_GHG_slu_composting().total;
        let incineration     = this.wwt_KPI_GHG_slu_incineration().total;
        let land_application = this.wwt_KPI_GHG_slu_land_application();
        let landfilling      = this.wwt_KPI_GHG_slu_landfilling().total;
        let stockpilling     = this.wwt_KPI_GHG_slu_stockpilling();
        let transport        = this.wwt_KPI_GHG_slu_transport().total;
        let total = storage+composting+incineration+land_application+landfilling+stockpilling+transport;

        return {total,storage,composting,incineration,land_application,landfilling,stockpilling,transport}
      }

      wwd_KPI_GHG_trck(){
        let vol   = this.wwt.wwd_vol_trck;
        let fuel  = Tables.get_row('Fuel type',this.wwt.wwd_trck_typ);
        let co2   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let ch4   = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
        let n2o   = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }

      wwd_KPI_GHG_disc(){
        let ch4 = this.wwt.wwt_bod_effl*this.wwt.wwd_ch4_efac*Cts.ct_ch4_eq.value;
        let n2o = this.wwt.wwd_n2o_effl/1000*this.wwt.wwd_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
        let total = ch4+n2o;
        return {total,ch4,n2o};
      }

    //GHG wwo HERE TODO
      wwo_KPI_GHG(){
        return 0;
        //fsc containment
        //fst treatment
        //fsr reuse
      }

      wwo_KPI_GHG_unt_opd(){
        let pop   = this.Waste.Collection.fsc_open_pop;
        let ch4   = pop*this.General.bod_pday/1000*this.Days()*this.wwc.ww_ch4_efac_unt*Cts.ct_ch4_eq.value;
        let n2o   = pop*this.General.prot_con*this.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        let total = ch4+n2o;
        return {total,ch4,n2o};
      }

      wwo_KPI_GHG_unt_ons(){
        let pop   = this.Waste.Collection.fsc_onsi_pop*(this.Waste.Collection.wwc_vol_unco_unt/this.Waste.Collection.wwc_vol_unco||0);
        let ch4   = pop*this.General.bod_pday/1000*this.Days()*this.wwc.ww_ch4_efac_unt*Cts.ct_ch4_eq.value;
        let n2o   = pop*this.General.prot_con*this.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
        let total = ch4+n2o;
        return {total,ch4,n2o};
      }

      fsc_KPI_GHG(){
        return 0;
        function fsc_KPI_GHG_elec(){
          return this.wwc.fsc_nrg_cons*this.General.conv_kwh_co2;
        }
        function fsc_KPI_GHG_cont(){
          return (this.wwc.fsc_bod_infl-this.wwc.fsc_bod_rmvd)*this.wwc.fsc_ch4_efac*Cts.ct_ch4_eq.value;
        }
        function fsc_KPI_GHG_trck_co2(){
          let fuel=Tables['Fuel type'][Tables.find('fsc_trck_typ',this.wwc.fsc_trck_typ)];
          return this.wwc.fsc_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        }
        function fsc_KPI_GHG_trck_n2o(){
          let fuel=Tables['Fuel type'][Tables.find('fsc_trck_typ',this.wwc.fsc_trck_typ)];
          return this.wwc.fsc_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
        }
        function fsc_KPI_GHG_trck_ch4(){
          let fuel=Tables['Fuel type'][Tables.find('fsc_trck_typ',this.wwc.fsc_trck_typ)];
          return this.wwc.fsc_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
        }
        function fsc_KPI_GHG_trck(){return this.fsc_KPI_GHG_trck_co2()+this.fsc_KPI_GHG_trck_n2o()+this.fsc_KPI_GHG_trck_ch4()}
      }

      fs_KPI_GHG(){
        return this.fsc_KPI_GHG()
              +this.fst_KPI_GHG()
              +this.fsr_KPI_GHG();
      }

      fst_KPI_GHG(){
        return this.fst_KPI_GHG_elec()
              +this.fst_KPI_GHG_trck()
              +this.fst_KPI_GHG_biog()
              +this.fst_KPI_GHG_fuel().total
              +this.fst_KPI_GHG_tre();
      }
      fst_KPI_GHG_elec(){return this.wwo.fst_nrg_cons*this.General.conv_kwh_co2}
      fst_KPI_GHG_fuel(){
        let vol = this.wwo.fst_vol_fuel;
        let fuel=Tables.get_row('Fuel type',this.wwo.fst_fuel_typ);
        let co2 = vol*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        let n2o = vol*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        let ch4 = vol*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        let total = co2+n2o+ch4;
        return {total,co2,ch4,n2o};
      }

      fst_KPI_GHG_trck_co2(){
        let fuel=Tables['Fuel type'][Tables.find('fst_trck_typ',this.wwo.fst_trck_typ)];
        return this.wwo.fst_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      }
      fst_KPI_GHG_trck_n2o(){
        let fuel=Tables['Fuel type'][Tables.find('fst_trck_typ',this.wwo.fst_trck_typ)];
        return this.wwo.fst_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      }
      fst_KPI_GHG_trck_ch4(){
        let fuel=Tables['Fuel type'][Tables.find('fst_trck_typ',this.wwo.fst_trck_typ)];
        return this.wwo.fst_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      }
      fst_KPI_GHG_trck(){return this.fst_KPI_GHG_trck_co2()+this.fst_KPI_GHG_trck_n2o()+this.fst_KPI_GHG_trck_ch4()}
      fst_KPI_GHG_biog(){
        return (this.wwo.fst_biog_pro-this.wwo.fst_biog_val-this.wwo.fst_biog_fla+this.wwo.fst_biog_fla*Cts.ct_ch4_lo.value/100)*this.wwo.fst_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
      }
      fst_SL_GHG_avoided(){
        return this.wwo.fst_nrg_biog*this.General.conv_kwh_co2;
      }
      fst_KPI_GHG_tre_ch4(){
        return (this.wwo.fst_bod_infl-this.wwo.fst_bod_slud-this.wwo.fst_bod_effl)*this.wwo.fst_ch4_efac*Cts.ct_ch4_eq.value;
      }
      fst_KPI_GHG_tre_n2o(){
        return this.wwc.fsc_onsi_pop
          *Cts.ct_fac_ic.value
          *this.wwo.fst_n2o_efac
          *Cts.ct_n2o_eq.value
          *this.Years()
          *1e-3
      }
      fst_KPI_GHG_tre(){
        return this.fst_KPI_GHG_tre_ch4()+this.fst_KPI_GHG_tre_n2o();
      }
      fsr_KPI_GHG(){
        return this.fsr_KPI_GHG_elec()
              +this.fsr_KPI_GHG_fuel()
              +this.fsr_KPI_GHG_trck()
              +this.fsr_KPI_GHG_landapp()
              +this.fsr_KPI_GHG_landfil()
              +this.fsr_KPI_GHG_dumping()
              +this.fsr_KPI_GHG_tre()
              +this.fsr_KPI_GHG_urine();
      }
      fsr_KPI_GHG_elec(){return this.wwo.fsr_nrg_cons*this.General.conv_kwh_co2}
      fsr_KPI_GHG_fuel_co2(){
        let fuel=Tables['Fuel type'][Tables.find('fsr_fuel_typ',this.wwo.fsr_fuel_typ)];
        return this.wwo.fsr_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      }
      fsr_KPI_GHG_fuel_n2o(){
        let fuel=Tables['Fuel type'][Tables.find('fsr_fuel_typ',this.wwo.fsr_fuel_typ)];
        return this.wwo.fsr_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      }
      fsr_KPI_GHG_fuel_ch4(){
        let fuel=Tables['Fuel type'][Tables.find('fsr_fuel_typ',this.wwo.fsr_fuel_typ)];
        return this.wwo.fsr_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      }
      fsr_KPI_GHG_fuel(){return this.fsr_KPI_GHG_fuel_co2()+this.fsr_KPI_GHG_fuel_n2o()+this.fsr_KPI_GHG_fuel_ch4()}
      fsr_KPI_GHG_trck_co2(){
        let fuel=Tables['Fuel type'][Tables.find('fsr_trck_typ',this.wwo.fsr_trck_typ)];
        return this.wwo.fsr_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      }
      fsr_KPI_GHG_trck_n2o(){
        let fuel=Tables['Fuel type'][Tables.find('fsr_trck_typ',this.wwo.fsr_trck_typ)];
        return this.wwo.fsr_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      }
      fsr_KPI_GHG_trck_ch4(){
        let fuel=Tables['Fuel type'][Tables.find('fsr_trck_typ',this.wwo.fsr_trck_typ)];
        return this.wwo.fsr_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      }
      fsr_KPI_GHG_trck(){return this.fsr_KPI_GHG_trck_co2()+this.fsr_KPI_GHG_trck_n2o()+this.fsr_KPI_GHG_trck_ch4()}
      fsr_KPI_GHG_landapp(){
        let soil_type=Tables.find('fsr_soil_typ',this.wwo.fsr_soil_typ);
        let N_transformed_to_N2O=0;
        if(soil_type=="Fine-Textured (>30% clay)"  ) N_transformed_to_N2O=0.023;
        if(soil_type=="Coarse-Textured (<30% clay)") N_transformed_to_N2O=0.050;
        return this.wwo.fsr_mass_landapp*this.wwo.fsr_la_N_cont/100*N_transformed_to_N2O*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      }
      fsr_ghg_avoided_landapp(){return this.wwo.fsr_mass_landapp*Cts.ct_C_seqst.value}
      fsr_KPI_GHG_landfil_n2o(){
        let disp_type=Tables.find('fsr_disp_typ',this.wwo.fsr_disp_typ);
        let emission=this.wwo.fsr_mass_landfil*this.wwo.fsr_lf_N_cont/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value
        if(disp_type=="Landfill"){
          return emission;
        }
        if(disp_type=="Landfill (flaring)"){
          return 0.02*emission;
        }
        if(disp_type=="Landfill (with gas recovery)"){
          return 0;
        }
      }
      fsr_KPI_GHG_landfil_ch4(){
        let emission=this.wwo.fsr_mass_landfil*this.wwo.fsr_lf_TVS/100*Cts.ct_oc_vs.value*Cts.ct_DOCfra.value/100*Cts.ct_lf_unc.value*Cts.ct_ch4_C.value*Cts.ct_ch4_lf.value/100*Cts.ct_d3y_lf.value/100* Cts.ct_ch4_eq.value;
        let disp_type=Tables.find('fsr_disp_typ',this.wwo.fsr_disp_typ);
        if(disp_type=="Landfill"){
          return emission;
        }
        if(disp_type=="Landfill (flaring)"){
          return 0.02*emission;
        }
        if(disp_type=="Landfill (with gas recovery)"){
          return 0;
        }
      }
      fsr_KPI_GHG_landfil(){
        return this.fsr_KPI_GHG_landfil_n2o()+this.fsr_KPI_GHG_landfil_ch4();
      }
      fsr_ghg_avoided_landfil(){
        let fslu_type=Tables.get_row('fsr_fslu_typ_lf',this.wwo.fsr_fslu_typ_lf);
        let TVS=fslu_type.TVS;
        return this.wwo.fsr_mass_landfil*TVS*Cts.ct_oc_vs.value*Cts.ct_u_org_f.value*Cts.ct_co2_C.value;
      }
      fsr_KPI_GHG_dumping_n2o(){
        return this.wwo.fsr_vol_dumping*this.wwo.fsr_n2o_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      }
      fsr_KPI_GHG_dumping_ch4(){
        return this.wwo.fsr_vol_dumping*this.wwo.fsr_bod_conc_fs*this.wwo.fsr_ch4_efac_dumping*Cts.ct_ch4_eq.value;
      }
      fsr_KPI_GHG_dumping(){
        return this.fsr_KPI_GHG_dumping_n2o()+this.fsr_KPI_GHG_dumping_ch4();
      }
      fsr_KPI_GHG_tre_n2o(){
        return this.wwo.fsr_n2o_effl/1000*this.wwo.fsr_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
      }
      fsr_KPI_GHG_tre_ch4(){
        return this.wwo.fsr_bod_effl*this.wwo.fsr_ch4_efac*Cts.ct_ch4_eq.value;
      }
      fsr_KPI_GHG_tre(){
        return this.fsr_KPI_GHG_tre_ch4()+this.fsr_KPI_GHG_tre_n2o();
      }
      fsr_KPI_GHG_urine(){return this.wwo.fsr_N_urine*Cts.ct_n2o_co.value*0.01}
  //</>

  //All energy performance and service level indicators
    //total energy consumed
    TotalNRG(){return this.ws_nrg_cons()+this.ww_nrg_cons()}
    //SL ws
      ws_nrg_cons(){return this.wsa.wsa_nrg_cons+this.wst.wst_nrg_cons+this.wsd.wsd_nrg_cons;}
      ws_vol_fuel(){return this.wsa.wsa_vol_fuel+this.wst.wst_vol_fuel+this.wsd.wsd_vol_fuel;}
      ws_SL_serv_pop(){return 100*this.Water.Distribution.wsd_serv_pop/this.Water.ws_resi_pop;}
      ws_SL_nrg_cost(){return 100*this.Water.ws_nrg_cost/this.Water.ws_run_cost;}
      ws_SL_auth_con(){return 1e3*this.wsd.wsd_auth_con/this.Water.Distribution.wsd_serv_pop/this.Days();}
    //SL wsa
      wsa_nrg_per_abs_watr(){return this.wsa.wsa_nrg_cons/this.wsa.wsa_vol_conv;}
      wsa_nrg_per_pmp_watr(){return this.wsa.wsa_nrg_pump/this.wsa.wsa_vol_pump;}
      wsa_pmp_pw(){return this.wsa.wsa_pmp_flow*this.wsa.wsa_pmp_head*Cts.ct_gravit.value/1000;}
      wsa_KPI_std_nrg_cons(){return this.wsa.wsa_nrg_pump/(this.wsa.wsa_vol_pump*this.wsa.wsa_pmp_head/100);}
      wsa_KPI_un_head_loss(){
        return 1e3*(
          this.wsa.wsa_pmp_head
          -this.wsa.wsa_sta_head
        )/this.wsa.wsa_main_len;
      }
      wsa_KPI_nrg_elec_eff(){
        return 100*this.wsa_pmp_pw()/(
          this.wsa.wsa_pmp_volt
          *this.wsa.wsa_pmp_amps
          *Math.sqrt(3)*this.wsa.wsa_pmp_pf/1000
        );
      }
      wsa_KPI_ghg_estm_red(){
        return this.General.conv_kwh_co2*this.wsa_KPI_nrg_estm_sav();
      }
      wsa_KPI_std_nrg_newp(){
        return this.wsa_KPI_nrg_elec_eff()/
          this.wsa.wsa_pmp_exff*
          this.wsa_KPI_std_nrg_cons();
      }
      wsa_KPI_nrg_cons_new(){
        return this.wsa_KPI_nrg_elec_eff()/
          this.wsa.wsa_pmp_exff*
          this.wsa.wsa_nrg_pump;
      }
      wsa_KPI_nrg_estm_sav(){
        return this.wsa.wsa_nrg_cons - this.wsa_KPI_nrg_cons_new();
      }
    //SL wst
      wst_KPI_nrg_per_m3(){return this.wst.wst_nrg_cons/this.wst.wst_vol_trea}
      wst_KPI_slu_per_m3(){return this.wst.wst_mass_slu/this.wst.wst_vol_trea}
      wst_KPI_capac_util(){return 100*this.wst.wst_vol_trea/this.wst.wst_trea_cap}
      wst_KPI_tst_carr(){return this.wst.wst_tst_carr;}
      wst_KPI_std_nrg_cons(){return this.wst.wst_nrg_pump/(this.wst.wst_vol_pump*this.wst.wst_pmp_head/100)}
      wst_KPI_un_head_loss(){return 1e3*(this.wst.wst_pmp_head-this.wst.wst_sta_head)/this.wst.wst_coll_len}
      wst_pmp_pw(){return this.wst.wst_pmp_flow*this.wst.wst_pmp_head*Cts.ct_gravit.value/1000;}
      wst_KPI_nrg_elec_eff(){return 100*this.wst_pmp_pw()/(this.wst.wst_pmp_volt*this.wst.wst_pmp_amps*Math.sqrt(3)*this.wst.wst_pmp_pf/1000)}
      wst_KPI_std_nrg_newp(){return this.wst_KPI_nrg_elec_eff()/this.wst.wst_pmp_exff*this.wst_KPI_std_nrg_cons()}
      wst_KPI_nrg_cons_new(){return this.wst.wst_vol_pump*this.wst_KPI_std_nrg_newp()/100*this.wst.wst_pmp_head}
      wst_KPI_nrg_estm_sav(){return this.wst.wst_nrg_cons-this.wst_KPI_nrg_cons_new()}
      wst_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wst_KPI_nrg_estm_sav()}
    //SL wsd
      wsd_KPI_nrg_per_vd(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_vol_dist}
      wsd_KPI_nrg_per_m3(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_auth_con}
      wsd_SL_nr_water(){return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_bill_con)/this.wsd.wsd_vol_dist;}
      wsa_SL_GHG_nrw(){return (this.wsa_KPI_GHG() * (this.wsd.wsd_vol_dist - this.wsd.wsd_auth_con) / this.wsa.wsa_vol_conv)}
      wst_SL_GHG_nrw(){return (this.wst_KPI_GHG() * (this.wsd.wsd_vol_dist - this.wsd.wsd_auth_con) / this.wst.wst_vol_trea)}
      wsd_SL_GHG_nrw(){return (this.wsd_KPI_GHG() * (this.wsd.wsd_vol_dist - this.wsd.wsd_auth_con) / this.wsd.wsd_vol_dist)}
      wsd_SL_ghg_attr(){return this.wsa_SL_GHG_nrw()+this.wst_SL_GHG_nrw()+this.wsd_SL_GHG_nrw()}
      wsd_SL_water_loss(){return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_auth_con)/this.wsd.wsd_vol_dist;}
      wsd_pmp_pw(){return this.wsd.wsd_pmp_flow*this.wsd.wsd_pmp_head*Cts.ct_gravit.value/1000;}
      wsd_KPI_nrg_per_m3(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_auth_con}
      wsd_KPI_nrg_per_vd(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_vol_dist}
      wsd_SL_nr_water(){
        return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_bill_con)/this.wsd.wsd_vol_dist;
      }
      wsd_SL_water_loss(){
        return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_auth_con)/this.wsd.wsd_vol_dist;
      }
      wsd_SL_pres_ade(){return 100*this.wsd.wsd_deli_pts/this.wsd.wsd_ser_cons}
      wsd_SL_cont_sup(){return 100*this.wsd.wsd_time_pre/24}
      c_wsd_nrg_topo(){return Cts.ct_gravit.value*this.wsd.wsd_vol_dist*(this.wsd.wsd_hi_no_el-this.wsd.wsd_av_no_el)/3600000}
      c_wsd_nrg_natu(){return Cts.ct_gravit.value*this.wsd.wsd_vol_dist*(this.wsd.wsd_wt_el_no-this.wsd.wsd_lo_no_el)/3600000}
      c_wsd_nrg_mini(){return Cts.ct_gravit.value*this.wsd.wsd_auth_con*(this.wsd.wsd_min_pres+this.wsd.wsd_av_no_el-this.wsd.wsd_lo_no_el)/3600000}
      c_wsd_nrg_supp(){return this.wsd.wsd_nrg_cons+this.c_wsd_nrg_natu()}
      wsd_KPI_nrg_efficien(){return 100*this.c_wsd_nrg_mini()/this.c_wsd_nrg_supp()}
      wsd_KPI_nrg_topgraph(){return 100*this.c_wsd_nrg_topo()/this.c_wsd_nrg_supp()}
      wsd_KPI_std_nrg_cons(){return this.wsd.wsd_nrg_pump/(this.wsd.wsd_vol_pump*this.wsd.wsd_pmp_head/100)}
      wsd_KPI_un_head_loss(){return 1000*(this.wsd.wsd_pmp_head-this.wsd.wsd_sta_head)/this.wsd.wsd_main_len}
      wsd_KPI_water_losses(){return Math.max(0,1000*(this.wsd.wsd_vol_dist-this.wsd.wsd_auth_con)/(this.wsd.wsd_main_len))/this.Years()}
      wsd_KPI_nrg_elec_eff(){return 100*this.wsd_pmp_pw()/(this.wsd.wsd_pmp_volt*this.wsd.wsd_pmp_amps*Math.sqrt(3)*this.wsd.wsd_pmp_pf/1000)}
      wsd_KPI_std_nrg_newp(){return this.wsd_KPI_nrg_elec_eff()/this.wsd.wsd_pmp_exff*this.wsd_KPI_std_nrg_cons()}
      wsd_KPI_nrg_cons_new(){return this.wsd_KPI_nrg_elec_eff()/this.wsd.wsd_pmp_exff*this.wsd.wsd_nrg_pump}
      wsd_KPI_nrg_estm_sav(){return this.wsd.wsd_nrg_cons-this.wsd_KPI_nrg_cons_new()}
      wsd_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wsd_KPI_nrg_estm_sav()}
    //SL ww
      ww_nrg_cons(){return this.wwc.wwc_nrg_cons+this.wwt.wwt_nrg_cons+this.wwo.wwo_nrg_cons}
      ww_vol_fuel(){return this.wwc.wwc_vol_fuel+this.wwt.wwt_vol_fuel+this.wwt.wwt_fuel_dig+this.wwt.wwd_vol_fuel}
      ww_SL_nrg_cost(){return 100*this.Waste.ww_nrg_cost/this.Waste.ww_run_cost}
      ww_GHG_avoided(){
        return this.wwt_SL_GHG_avoided()+
        this.wwt_wr_C_seq_slu()+
        this.wwd_wr_GHG_avo_d()+
        this.wwd_SL_ghg_non()+
        this.wwd_wr_GHG_avo()+
        this.fst_SL_GHG_avoided()+
        this.fsr_ghg_avoided_reuse()+
        this.fsr_ghg_avoided_land();
      }
    //SL wwc
      wwc_SL_conn_pop(){return 100*this.wwc.wwc_conn_pop/this.Waste.ww_resi_pop}
      wwc_KPI_nrg_per_m3(){return this.wwc.wwc_nrg_cons/this.wwc.wwc_vol_coll_tre}
      wwc_pmp_pw(){return this.wwc.wwc_pmp_flow*this.wwc.wwc_pmp_head*Cts.ct_gravit.value/1000;}
      wwc_KPI_std_nrg_cons(){return this.wwc.wwc_nrg_pump/(this.wwc.wwc_vol_pump*this.wwc.wwc_pmp_head/100)}
      wwc_KPI_un_head_loss(){return 1000*(this.wwc.wwc_pmp_head-this.wwc.wwc_sta_head)/this.wwc.wwc_coll_len}
      wwc_KPI_nrg_elec_eff(){return 100*this.wwc_pmp_pw()/(this.wwc.wwc_pmp_volt*this.wwc.wwc_pmp_amps*Math.sqrt(3)*this.wwc.wwc_pmp_pf/1000)}
      wwc_KPI_std_nrg_newp(){return this.wwc_KPI_nrg_elec_eff()/this.wwc.wwc_pmp_exff*this.wwc_KPI_std_nrg_cons()}
      wwc_KPI_nrg_cons_new(){return this.wwc.wwc_vol_pump*this.wwc_KPI_std_nrg_newp()/100*this.wwc.wwc_pmp_head}
      wwc_KPI_nrg_estm_sav(){return this.wwc.wwc_nrg_cons-this.wwc_KPI_nrg_cons_new()}
      wwc_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wwc_KPI_nrg_estm_sav()}
    //SL wwt
      wwt_bod_rmvd(){return this.wwt.wwt_bod_infl-this.wwt.wwt_bod_effl}
      wwt_KPI_nrg_per_m3(){return this.wwt.wwt_nrg_cons/this.wwt.wwt_vol_trea}
      wwt_KPI_nrg_per_kg(){return this.wwt.wwt_nrg_cons/this.wwt_bod_rmvd()}
      wwt_SL_vol_pday(){return 1000*this.wwt.wwt_vol_trea/this.wwt.wwt_serv_pop/this.Days()}
      wwt_KPI_capac_util(){return 100*this.wwt.wwt_vol_trea/this.wwt.wwt_trea_cap}
      wwt_SL_qual_com(){return 100*this.wwt.wwt_tst_cmpl/this.wwt.wwt_tst_cond}
      wwt_KPI_nrg_per_pump(){return this.wwt.wwt_nrg_pump/this.wwt.wwt_vol_pump}
      wwt_KPI_std_nrg_cons(){return this.wwt.wwt_nrg_pump/(this.wwt.wwt_vol_pump*this.wwt.wwt_pmp_head/100)}
      wwt_KPI_un_head_loss(){return 1000*(this.wwt.wwt_pmp_head-this.wwt.wwt_sta_head)/this.wwt.wwt_coll_len}
      wwt_pmp_pw(){return this.wwt.wwt_pmp_flow*this.wwt.wwt_pmp_head*Cts.ct_gravit.value/1000;}
      wwt_KPI_nrg_elec_eff(){return 100*this.wwt_pmp_pw()/(this.wwt.wwt_pmp_volt*this.wwt.wwt_pmp_amps*Math.sqrt(3)*this.wwt.wwt_pmp_pf/1000)}
      wwt_KPI_std_nrg_newp(){return this.wwt_KPI_nrg_elec_eff()/this.wwt.wwt_pmp_exff*this.wwt_KPI_std_nrg_cons()}
      wwt_KPI_nrg_cons_new(){return this.wwt.wwt_vol_pump*this.wwt_KPI_std_nrg_newp()/100*this.wwt.wwt_pmp_head}
      wwt_KPI_nrg_estm_sav(){return this.wwt.wwt_nrg_cons-this.wwt_KPI_nrg_cons_new()}
      wwt_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wwt_KPI_nrg_estm_sav()}
      wwt_KPI_biog_x_bod(){return this.wwt.wwt_biog_pro/this.wwt_bod_rmvd()}
      c_wwt_nrg_biog(){return this.wwt.wwt_biog_val*this.wwt.wwt_ch4_biog/100*Cts.ct_ch4_nrg.value}
      wwt_KPI_nrg_biogas(){return this.wwt.wwt_nrg_biog/this.wwt.wwt_vol_trea}
      wwt_KPI_nrg_x_biog(){return 100*this.wwt.wwt_nrg_biog/this.c_wwt_nrg_biog()}
      wwt_SL_GHG_avoided(){return this.wwt.wwt_nrg_biog*this.General.conv_kwh_co2}
      wwd_wr_GHG_avo_N(){ return this.wwt.wwd_wr_N_rec*Cts.ct_cr_forN.value; }
      wwd_wr_GHG_avo_P(){ return this.wwt.wwd_wr_P_rec*Cts.ct_cr_forP.value; }
      wwd_wr_GHG_avo(){ return this.wwd_wr_GHG_avo_N() + this.wwd_wr_GHG_avo_P(); }
      wwd_wr_nrg_sav(){
        return this.wwt.wwd_wr_vol_d*(
           this.wsa_nrg_per_abs_watr()
          +this.wst_KPI_nrg_per_m3()
          +this.wsd_KPI_nrg_per_vd()
        ) - this.wwt.wwd_wr_adnrg;
      }
      wwd_wr_GHG_avo_d(){
        return this.wwd_wr_nrg_sav()*this.General.conv_kwh_co2;
      }
      wwd_SL_ghg_non(){return this.wwt.wwd_n2o_effl/1000*this.wwt.wwd_vol_nonp*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value}
      wwd_total_m3(){
        return this.wwt.wwd_vol_disc+this.wwt.wwd_vol_nonp;
      }

      //other sludge equations
      wwt_KPI_sludg_prod(){return this.wwt.wwt_mass_slu/this.wwt.wwt_vol_trea}
      wwt_KPI_dry_sludge(){return 100*this.wwt.wwt_dryw_slu/this.wwt.wwt_mass_slu}
      wwt_wr_C_seq_slu(){
        return this.wwt_slu_comp_C_seq()+
        this.wwt_slu_app_C_seq()+
        this.wwt_slu_land_C_seq();
      }

      wwt_slu_comp_C_seq(){
        return this.wwt.wwt_mass_slu_comp*Cts.ct_C_seqst.value;
      }
      wwt_slu_app_C_seq(){
        return this.wwt.wwt_mass_slu_app*Cts.ct_C_seqst.value;
      }
      wwt_slu_land_C_seq(){
        let sludge_mass = this.wwt.wwt_mass_slu_land;
        let TVS = Tables.get_row('wwt_slu_disp',this.wwt.wwt_slu_disp).TVS;
        return sludge_mass*(TVS)*(0.56)*(0.2)*(44/12);
      }
    //SL wwo
      fs_serv_pop(){ return this.wwc.fsc_onsi_pop; }
      fs_nrg_cons(){ return this.wwc.fsc_nrg_cons+this.wwo.fst_nrg_cons+this.wwo.fsr_nrg_cons; }
      fs_vol_trck(){ return this.wwc.fsc_vol_trck+this.wwo.fst_vol_trck+this.wwo.fsr_vol_trck; }
      fsc_KPI_std_nrg_cons(){return this.wwc.fsc_nrg_pump/(this.wwc.fsc_vol_pump*this.wwc.fsc_pmp_head/100)}
      fsc_KPI_un_head_loss(){return 1000*(this.wwc.fsc_pmp_head-this.wwc.fsc_sta_head)/this.wwc.fsc_coll_len}
      fsc_pmp_pw(){return this.wwc.fsc_pmp_flow*this.wwc.fsc_pmp_head*Cts.ct_gravit.value/1000;}
      fsc_KPI_nrg_elec_eff(){return 100*this.fsc_pmp_pw()/(this.wwc.fsc_pmp_volt*this.wwc.fsc_pmp_amps*Math.sqrt(3)*this.wwc.fsc_pmp_pf/1000)}
      fsc_KPI_std_nrg_newp(){return this.fsc_KPI_nrg_elec_eff()/this.wwc.fsc_pmp_exff*this.fsc_KPI_std_nrg_cons()}
      fsc_KPI_nrg_cons_new(){return this.wwc.fsc_vol_pump*this.fsc_KPI_std_nrg_newp()/100*this.wwc.fsc_pmp_head}
      fsc_KPI_nrg_estm_sav(){return this.wwc.fsc_nrg_cons-this.fsc_KPI_nrg_cons_new()}
      fsc_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.fsc_KPI_nrg_estm_sav()}
      fst_KPI_std_nrg_cons(){return this.wwo.fst_nrg_pump/(this.wwo.fst_vol_pump*this.wwo.fst_pmp_head/100)}
      fst_KPI_un_head_loss(){return 1000*(this.wwo.fst_pmp_head-this.wwo.fst_sta_head)/this.wwo.fst_coll_len}
      fst_pmp_pw(){return this.wwo.fst_pmp_flow*this.wwo.fst_pmp_head*Cts.ct_gravit.value/1000;}
      fst_KPI_nrg_elec_eff(){return 100*this.fst_pmp_pw()/(this.wwo.fst_pmp_volt*this.wwo.fst_pmp_amps*Math.sqrt(3)*this.fst_pmp_pf/1000)}
      fst_KPI_std_nrg_newp(){return this.fst_KPI_nrg_elec_eff()/this.wwo.fst_pmp_exff*this.fst_KPI_std_nrg_cons()}
      fst_KPI_nrg_cons_new(){return this.wwo.fst_vol_pump*this.fst_KPI_std_nrg_newp()/100*this.wwo.fst_pmp_head}
      fst_KPI_nrg_estm_sav(){return this.wwo.fst_nrg_cons-this.fst_KPI_nrg_cons_new()}
      fst_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.fst_KPI_nrg_estm_sav()}
      fsr_ghg_avoided_reuse_N(){return this.wwo.fsr_reused_N*Cts.ct_cr_forN.value}
      fsr_ghg_avoided_reuse_P(){return this.wwo.fsr_reused_P*Cts.ct_cr_forP.value}
      fsr_ghg_avoided_reuse(){return this.fsr_ghg_avoided_reuse_N()+this.fsr_ghg_avoided_reuse_P();}
      fsr_KPI_std_nrg_cons(){return this.wwo.fsr_nrg_pump/(this.wwo.fsr_vol_pump*this.wwo.fsr_pmp_head/100)}
      fsr_KPI_un_head_loss(){return 1000*(this.wwo.fsr_pmp_head-this.wwo.fsr_sta_head)/this.wwo.fsr_coll_len}
      fsr_pmp_pw(){return this.wwo.fsr_pmp_flow*this.wwo.fsr_pmp_head*Cts.ct_gravit.value/1000;}
      fsr_KPI_nrg_elec_eff(){return 100*this.fsr_pmp_pw()/(this.wwo.fsr_pmp_volt*this.wwo.fsr_pmp_amps*Math.sqrt(3)*this.wwo.fsr_pmp_pf/1000)}
      fsr_KPI_std_nrg_newp(){return this.fsr_KPI_nrg_elec_eff()/this.wwo.fsr_pmp_exff*this.fsr_KPI_std_nrg_cons()}
      fsr_KPI_nrg_cons_new(){return this.wwo.fsr_vol_pump*this.fsr_KPI_std_nrg_newp()/100*this.wwo.fsr_pmp_head}
      fsr_KPI_nrg_estm_sav(){return this.wwo.fsr_nrg_cons-this.fsr_KPI_nrg_cons_new()}
      fsr_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.fsr_KPI_nrg_estm_sav()}
      fsr_ghg_avoided_land(){
        return this.fsr_ghg_avoided_landapp()
              +this.fsr_ghg_avoided_landfil();
      }
  //</>
};

//TODO create classes for every stage so its easier to do substages
class Water_Abstraction{}
class Water_Treatment{}
class Water_Distribution{}
class Waste_Collection{}
class Waste_Treatment{}
class Waste_Onsite{}

//array of systems (TODO: rename Scenarios to Systems)
let Scenarios=[]

//the default system is called Global since ecam v1.0
let Global=new Ecam();
Scenarios.push(Global);
