/** 
*
	Info: one-level-depth object that stores magnitudes and units for all inputs and outputs
		descriptions in english are inside languages/en.php
		descriptions in spanish are inside languages/es.php

	Format:
		"code": { "magnitude": string, "unit": string }
*/

var Info = {
	//GENERAL
	"Days":{magnitude:"Time",unit:"days"},
	"Years":{magnitude:"Time",unit:"years"},
	"conv_kwh_co2":{magnitude:"Conversion",unit:"kg CO<sub>2</sub>/kWh"},
	TotalGHG :{magnitude:"Mass",unit:"kg CO<sub>2</sub>"},
	content_C:{magnitude:"Mass",unit:"kg C"},
	content_N:{magnitude:"Mass",unit:"kg N"},

	/* +============+ */
	/* | Fuel types |
	/* +============+ */
	"wsa_fuel_typ":{magnitude:"Option",unit:"Fuel type"},
	"wst_fuel_typ":{magnitude:"Option",unit:"Fuel type"},
	"wsd_fuel_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwc_fuel_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwt_fuel_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwd_fuel_typ":{magnitude:"Option",unit:"Fuel type"},
	"wsd_trck_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwt_trck_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwd_trck_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwt_dige_typ":{magnitude:"Option",unit:"Fuel type"},
	"wwt_appl_typ":{magnitude:"Option",unit:"Fuel type"},

	/* +================+ */
	/* | Service levels | */
	/* +================+ */
	//Water Supply
	ws_SL_serv_pop :{magnitude:"Percentage",unit:"%"},
	ws_SL_non_revw :{magnitude:"Percentage",unit:"%"},	
	ws_SL_auth_con :{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day"},
	ws_SL_nrg_cost :{magnitude:"Percentage",unit:"%"},
	ws_SL_nrw_emis :{magnitude:"Mass",unit:"kg CO<sub>2</sub>"},
	ws_SL_auc_emis :{magnitude:"Mass",unit:"kg CO<sub>2</sub>"},

	//Wastewater
	ww_SL_serv_pop :{magnitude:"Percentage",unit:"%"},
	ww_SL_treat_m3 :{magnitude:"Percentage",unit:"%"},
	ww_SL_vol_pday :{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day"},
	ww_SL_nrg_cost :{magnitude:"Percentage",unit:"%"},

	//L1 Water Supply
	"ws_resi_pop":{magnitude:"People",unit:"People"},
	"ws_serv_pop":{magnitude:"People",unit:"People"},
	"ws_nrg_cons":{magnitude:"Energy",unit:"kWh"},
	"ws_vol_fuel":{magnitude:"Volume",unit:"L"},
	"ws_nrg_cost":{magnitude:"Currency",unit:"USD"},
	"ws_run_cost":{magnitude:"Currency",unit:"USD"},
	ws_KPI_GHG :{magnitude:"Mass",unit:"kg CO<sub>2</sub>"},

	//L1 Wastewater
	"ww_nrg_cost" :{magnitude:"Currency",unit:"USD"},
	"ww_run_cost" :{magnitude:"Currency",unit:"USD"},
	"ww_nrg_cons" :{magnitude:"Energy",unit:"kWh"},
	"ww_resi_pop" :{magnitude:"People",unit:"People"},
	"ww_conn_pop" :{magnitude:"People",unit:"People"},
	"ww_serv_pop" :{magnitude:"People",unit:"People"},
	"ww_vol_fuel" :{magnitude:"Volume",unit:"L"},
	ww_KPI_GHG            :{magnitude:"Mass",unit:"kg CO<sub>2</sub>"},

	//L1 ENERGY SUMMARY 
		//Water Supply
			wsg_KPI_nrg_cons:{magnitude:"Energy",unit:"kWh"},
			wsg_KPI_nrg_x_ye:{magnitude:"Energy/Time",unit:"kWh/year"},
			wsg_KPI_nrg_x_ys:{magnitude:"Energy/Time/People",unit:"kWh/year/person"},
			wsg_KPI_nrg_x_m3:{magnitude:"Energy/Volume",unit:"kWh/m3"},
			wsg_KPI_std_nrg_:{magnitude:"Energy/Headloss",unit:"kWh/m3/100"},
		//Wastewater
			wwg_KPI_nrg_cons:{magnitude:"Energy",unit:"kWh"},
			wwg_KPI_nrg_x_ye:{magnitude:"Energy/Time",unit:"kWh/year"},
			wwg_KPI_nrg_x_ys:{magnitude:"Energy/Time/People",unit:"kWh/year/person"},
			wwg_KPI_nrg_x_br:{magnitude:"Energy/Mass",unit:"kWh/kg"},
			wwg_KPI_std_nrg_:{magnitude:"Energy/Headloss",unit:"kWh/m3/100"},
			wwg_KPI_nrg_perc:{magnitude:"Percentage",unit:"%"},

	//L2 Water Abstraction
	"wsa_nrg_cons":{magnitude:"Energy",unit:"kWh"},
	"wsa_nrg_pump":{magnitude:"Energy",unit:"kWh"},
	"wsa_vol_conv":{magnitude:"Volume",unit:"m3"},
	"wsa_nrg_turb":{magnitude:"Energy",unit:"kWh"},
	"wsa_vol_pump":{magnitude:"Volume",unit:"m3"},
	"wsa_vol_fuel":{magnitude:"Volume",unit:"L"},
	wsa_KPI_nrg_recovery:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wsa_KPI_std_nrg_cons:{magnitude:"Energy",unit:"kWh/m<sup>3</sup>/100m"},
	"wsa_pmp_head":{magnitude:"Head",unit:"m"},
	"wsa_sta_head":{magnitude:"Head",unit:"m"},
	"wsa_main_len":{magnitude:"Distance",unit:"km"},
	wsa_KPI_std_elec_eff:{magnitude:"Percentage",unit:"%"},
	wsa_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wsa_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_KPI_GHG_fuel:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_nrg_per_pmp_watr:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	"wsa_pmp_type":{magnitude:"Option",unit:"Pump type"},
	"wsa_pmp_size":{magnitude:"Option",unit:"Pump size"},

	wsa_pmp_flow:{magnitude:"Flow",unit:"L/s"},
	wsa_pmp_volt:{magnitude:"Voltage",unit:"V"},
	wsa_pmp_amps:{magnitude:"Intensity",unit:"A"},
	wsa_pmp_exff:{magnitude:"Efficiency",unit:"%"},
	c_wsa_pmp_pw:{magnitude:"Power",unit:"kW"},
	wsa_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
	wsa_KPI_std_nrg_newp:{magnitude:"Energy",unit:"kWh/m3/100m"},
	wsa_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
	wsa_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
	wsa_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kg CO2 eq"},

	//L2 Water Treatment
	"wst_vol_trea":{magnitude:"Volume",unit:"m3"},
	"wst_vol_fuel":{magnitude:"Volume",unit:"L"},
	"wst_nrg_cons":{magnitude:"Energy",unit:"kWh"},
	"wst_nrg_pump":{magnitude:"Energy",unit:"kWh"},
	"wst_tst_carr":{magnitude:"Percentage",unit:"%"},
	"wst_mass_slu":{magnitude:"Mass",unit:"kg"},
	"wst_trea_cap":{magnitude:"Volume",unit:"m3"},
	//"wst_disnfctn":{magnitude:"Option",unit:"Technology"},HIDDEN
	"wst_treatmen":{magnitude:"Option",unit:"Technology"},
	//"wst_turb_raw":{magnitude:"BOD",unit:"ntu"},HIDDEN
	//"wst_turb_fin":{magnitude:"BOD",unit:"ntu"},HIDDEN
	"wst_nrg_disn":{magnitude:"Energy",unit:"kWh"},
	"wst_vol_pump":{magnitude:"Volume",unit:"m3"},
	"wst_pmp_head":{magnitude:"Head",unit:"m"},

	wst_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wst_KPI_slu_per_m3:{magnitude:"Mass/Volume",unit:"kg/m<sup>3</sup>"},
	wst_KPI_capac_util:{magnitude:"Percentage",unit:"%"},
	wst_KPI_nrg_disnfc:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wst_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wst_KPI_std_elec_eff:{magnitude:"Percentage",unit:"%"},
	wst_KPI_tst_carr:{magnitude:"Percentage",unit:"%"},

	wst_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_fuel:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Water Distribution
	"wsd_nrg_cons" :{magnitude:"Energy",unit:"kWh"},
	"wsd_nrg_pump":{magnitude:"Energy",unit:"kWh"},
	"wsd_vol_dist" :{magnitude:"Volume",unit:"m3"},
	"wsd_auth_con" :{magnitude:"Volume",unit:"m3"},
	"wsd_deli_pts" :{magnitude:"Number",unit:"number"},
	"wsd_ser_cons" :{magnitude:"Number",unit:"number"},
	"wsd_time_pre" :{magnitude:"% Time",unit:"hours/day"},
	"wsd_min_pres" :{magnitude:"Pressure",unit:"m"},
	"wsd_hi_no_el" :{magnitude:"Distance",unit:"m asl"},
	"wsd_lo_no_el" :{magnitude:"Distance",unit:"m asl"},
	"wsd_av_no_el" :{magnitude:"Distance",unit:"m asl"},
	"wsd_wt_el_no" :{magnitude:"Distance",unit:"m"},
	"wsd_vol_pump" :{magnitude:"Volume",unit:"m3"},
	"wsd_pmp_head" :{magnitude:"Head",unit:"m"},
	"wsd_main_len" :{magnitude:"Distance",unit:"km"},
	"wsd_vol_fuel":{magnitude:"Volume",unit:"L"},
	"wsd_vol_trck":{magnitude:"Volume",unit:"L"},
	wsd_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wsd_SL_pres_ade :{magnitude:"Percentage",unit:"%"},
	wsd_SL_cont_sup :{magnitude:"Percentage",unit:"%"},

	c_wsd_nrg_natu:{magnitude:"Energy",unit:"kWh"},
	c_wsd_nrg_mini:{magnitude:"Energy",unit:"kWh"},
	c_wsd_nrg_supp:{magnitude:"Energy",unit:"kWh"},
	c_wsd_nrg_topo:{magnitude:"Energy",unit:"kWh"},

	wsd_KPI_nrg_efficien:{magnitude:"Percent",unit:"%"},
	wsd_KPI_nrg_topgraph:{magnitude:"Percent",unit:"%"},
	wsd_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wsd_KPI_water_losses:{magnitude:"Volume/Distance",unit:"m<sup>3</sup>/km"},
	wsd_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	"wsd_pmp_size":{magnitude:"Option",unit:"Pump size"},
	"wsd_sta_head":{magnitude:"Head",unit:"m"},
	wsd_KPI_non_revw:{magnitude:"Percentage",unit:"%"},

	wsd_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_fuel:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_trck:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_SL_GHG_nrw:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Wastewater Collection
	"wwc_vol_conv":{magnitude:"Volume",unit:"m3"},
	"wwc_nrg_cons":{magnitude:"Energy",unit:"kWh"},
	"wwc_prot_con":{magnitude:"Annual per capita consumption",unit:"kg/person/year"},
	"wwc_bod_pday":{magnitude:"Mass/inhab/time",unit:"g/person/day"},
	"wwc_vol_pump":{magnitude:"Volume",unit:"m3"},
	"wwc_nrg_pump":{magnitude:"Energy",unit:"kWh"},
	"wwc_pmp_head":{magnitude:"Head",unit:"m"},
	"wwc_sta_head":{magnitude:"Head",unit:"m"},
	"wwc_vol_fuel":{magnitude:"Volume",unit:"L"},
	//"wwc_pmp_type":{magnitude:"Option",unit:"Pump type"},HIDDEN
	//"wwc_comb_sew":{magnitude:"Percentage",unit:"%"}, HIDDEN
	"wwc_wet_flow":{magnitude:"Flow",unit:"m3/day"},
	"wwc_dry_flow":{magnitude:"Flow",unit:"m3/day"},
	//"wwc_cso_incd":{magnitude:"Number",unit:"incidences"}, HIDDEN
	"wwc_coll_len":{magnitude:"Distance",unit:"km"},
	//"wwc_infl_inf":{magnitude:"Percentage",unit:"%"}, HIDDEN
	"wwc_wd_ratio":{magnitude:"Ratio",unit:"adimensional"},
	//"wwc_pmp_size":{magnitude:"Option",unit:"Size"}, HIDDEN

	wwc_SL_conn_pop:{magnitude:"Percentage",unit:"%"},
	wwc_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwc_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwc_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwc_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	//wwc_infl_infi:{magnitude:"Percentage",unit:"%"}, HIDDEN
	//wwc_vol_infi:{magnitude:"Volume",unit:"m3"}, HIDDEN
	wwc_SL_GHG_ii:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	wwc_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_unt_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_unt_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_fuel:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Wastewater Treatment
	"wwt_biog_pro":{magnitude:"Volume",unit:"m3"},
	"wwt_biog_val":{magnitude:"Volume",unit:"m3"},
	"wwt_vol_trea":{magnitude:"Volume",unit:"m3"},
	"wwt_nrg_cons":{magnitude:"Energy",unit:"kWh"},
	"wwt_vol_fuel":{magnitude:"Volume",unit:"L"},
	"wwt_bod_infl":{magnitude:"Mass",unit:"kg"},
	"wwt_bod_effl":{magnitude:"Mass",unit:"kg"},
	"wwt_nrg_biog":{magnitude:"Energy",unit:"kWh"},
	"wwt_ch4_biog":{magnitude:"Percentage",unit:"%"},
	"wwt_tst_cmpl":{magnitude:"Number",unit:"number"},
	"wwt_tst_cond":{magnitude:"Number",unit:"number"},
	"wwt_mass_slu":{magnitude:"Mass",unit:"kg"},
	"wwt_dryw_slu":{magnitude:"Mass",unit:"kg"},
	"wwt_trea_cap":{magnitude:"Volume",unit:"m3"},
	"wwt_dist_dis":{magnitude:"Distance",unit:"km"},
	"wwt_num_trip":{magnitude:"Number",unit:"Trips"},
	"wwt_type_tre":{magnitude:"Option",unit:"Technology"},

	"wwt_pmp_type":{magnitude:"Option",unit:"Type"},
	"wwt_vol_pump":{magnitude:"Volume",unit:"m3"},
	"wwt_nrg_pump":{magnitude:"Energy",unit:"kWh"},
	"wwt_pmp_head":{magnitude:"Head",unit:"m"},

	"wwt_slu_disp":{magnitude:"Option",unit:"Sludge type disposed of"},
	"wwt_slu_type":{magnitude:"Option",unit:"Disposal type"},

	c_wwt_ch4_efac:{magnitude:"Mass/Mass",unit:"kgCH<sub>4</sub>/kgBOD"},
	c_wwt_nrg_biog:{magnitude:"Energy",unit:"kWh"},
	c_wwt_bod_rmvd:{magnitude:"Mass",unit:"kg"},
	c_wwt_biog_fla:{magnitude:"Volume",unit:"m3"},

	wwt_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwt_KPI_nrg_per_kg:{magnitude:"Energy/Mass",unit:"kWh/Kg BOD removed"},
	wwt_KPI_biog_x_bod:{magnitude:"Volume/Mass",unit:"Nm<sup>3</sup>/kg BOD removed"},
	wwt_KPI_nrg_biogas:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwt_KPI_nrg_x_biog:{magnitude:"Percent",unit:"%"},
	wwt_KPI_sludg_prod:{magnitude:"Mass/Volume",unit:"kg/m<sup>3</sup>"},
	wwt_KPI_dry_sludge:{magnitude:"Percent",unit:"% DW"},
	wwt_KPI_capac_util:{magnitude:"Percent",unit:"%"},
	wwt_SL_qual_com :{magnitude:"Percentage",unit:"%"},

	wwt_KPI_nrg_per_pump:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wwt_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwt_KPI_std_elec_eff:{magnitude:"Percentage",unit:"%"},

	wwt_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_fuel:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_tsludge:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_tre_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_tre_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_biog:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//sludge mgmt
	"wwt_fuel_dig":{magnitude:"Volume",unit:"L"},
	"wwt_mass_slu_app":{magnitude:"Mass",unit:"kg"},
	"wwt_mass_slu_comp":{magnitude:"Mass",unit:"kg"},
	"wwt_mass_slu_inc":{magnitude:"Mass",unit:"kg"},
	"wwt_mass_slu_land":{magnitude:"Mass",unit:"kg"},
	"wwt_mass_slu_sto":{magnitude:"Mass",unit:"kg"},
	"wwt_mass_slu_stock":{magnitude:"Mass",unit:"kg"},
	"wwt_nrg_inc":{magnitude:"Energy",unit:"kWh"},
	"wwt_temp_inc":{magnitude:"Temperture",unit:"K"},
	"wwt_time_slu_sto":{magnitude:"Time",unit:"day"},
	"wwt_vol_fuel_app":{magnitude:"Volume",unit:"L"},
	"wwt_soil_typ":{magnitude:"Option",unit:"Soil type"},
	"wwt_nrg_app":{magnitude:"Energy",unit:"kWh"},
	"c_wwt_ch4_pot":{magnitude:"Mass",unit:"kg CH4"},

	"wwt_KPI_GHG_dig_fuel":{magnitude:"Mass",unit:"kg"},

	"wwt_slu_storage_ch4":{magnitude:"Mass",unit:"kg CH4"},
	"wwt_KPI_GHG_sto_co2eq":{magnitude:"Mass",unit:"kg CO2 eq"},

	"wwt_slu_composting_co2":{magnitude:"Mass",unit:"kg CO2"},
	"wwt_slu_composting_ch4":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_slu_composting_n2o":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_KPI_GHG_comp_co2eq":{magnitude:"Mass",unit:"kg CO2 eq"},

	"wwt_slu_inciner_co2":{magnitude:"Mass",unit:"kg CO2"},
	"wwt_slu_inciner_ch4":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_slu_inciner_n2o":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_KPI_GHG_inc_co2eq":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_slu_landapp_co2":{magnitude:"Mass",unit:"kg CO2"},
	"wwt_slu_landapp_n2o":{magnitude:"Mass",unit:"kg N2O"},
	"wwt_KPI_GHG_app_co2eq":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_slu_landfill_ch4":{magnitude:"Mass",unit:"kg CH4"},
	"wwt_slu_landfill_n2o":{magnitude:"Mass",unit:"kg N2O"},
	"wwt_KPI_GHG_land_co2eq":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_KPI_GHG_stock_co2eq":{magnitude:"Mass",unit:"kg CO2 eq"},
	"wwt_KPI_GHG_slu":{magnitude:"Mass",unit:"kg CO2 eq"},

	//L2 Wastewater Discharge
	"wwd_vol_disc":{magnitude:"Volume",unit:"m3"},
	"wwd_nrg_cons":{magnitude:"Energy",unit:"kWh"},
	"wwd_nrg_pump":{magnitude:"Energy",unit:"kWh"},
	"wwd_vol_pump":{magnitude:"Volume",unit:"m3"},
	"wwd_pmp_head":{magnitude:"Head",unit:"m"},
	"wwd_trb_head":{magnitude:"Head",unit:"m3"},
	"wwd_vol_fuel":{magnitude:"Volume",unit:"L"},
	"wwd_vol_trck":{magnitude:"Volume",unit:"L"},
	"wwd_vol_nonp":{magnitude:"Volume",unit:"m3"},
	"wwd_reus_typ":{magnitude:"Option",unit:"Discharge/Reuse type"},
	"wwd_main_len":{magnitude:"Distance",unit:"km"},
	"wwd_n2o_effl":{magnitude:"Mass/Volume",unit:"mg/L"},

	wwd_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwd_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwd_KPI_ghg_red:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_nrg_sav:{magnitude:"Energy",unit:"kWh"}, 

	wwd_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_fuel:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_trck:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_tre_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
}
