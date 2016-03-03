/** Main data structure */

var Global = {
	General:{
		"Name":                    "My system",
		"Location":                "Canada, Europe, Russia, Oceania",
		"Assessment Period Start": "2016-01-01",
		"Assessment Period End":   "2016-01-31",
		"Comments":                "",
		"Currency":                "USD",
		"conv_kwh_co2":            0,  /** conversion factor for grid electricity () */
		Days:function()
		{
			var startDate = new Date(Global.General["Assessment Period Start"]);
			var finalDate = new Date(Global.General["Assessment Period End"]);
			return (finalDate-startDate)/1000/60/60/24;
		},
	},

	/** Level 1 - Water Supply*/
	Water:{
		"ws_resi_pop"   :0,
		"ws_serv_pop"   :0,
		"ws_nrg_cons"   :0,
		"ws_vol_auth"   :0,
		"ws_nrg_cost"   :0,
		"ws_run_cost"   :0,
		"ws_vol_fuel"   :0,
		"ws_non_revw"   :0,
		ws_KPI_GHG_elec:function(){return this.ws_nrg_cons*Global.General.conv_kwh_co2},
		ws_KPI_GHG_ne  :function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].water]; return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+298*fuel.EFN2O.engines+34*fuel.EFCH4.engines) } ,
		ws_KPI_GHG     :function(){return this.ws_KPI_GHG_elec()+this.ws_KPI_GHG_ne()},

		ws_SL_serv_pop : function(){return 100*Global.Water.ws_serv_pop/Global.Water.ws_resi_pop},
		ws_SL_nrg_cost : function(){return 100*this.ws_nrg_cost/this.ws_run_cost},
		ws_SL_auth_con : function(){return 1000*this.ws_vol_auth/this.ws_serv_pop/Global.General.Days()},
		ws_SL_non_revw : function(){if(this.Abstraction.wsa_vol_conv==0) return this.ws_non_revw; else return 100*this.ws_vol_auth/this.Abstraction.wsa_vol_conv},
		ws_SL_qual_com : function(){return -1},
		ws_SL_pres_ade : function(){return -1},
		ws_SL_cont_sup : function(){return -1},

		"General":{
			"wsg_nrg_prod":0,
			"wsg_nrg_sold":0,
			"wsg_heat_nrg":0,
			wsg_KPI_GHG_elec:function(){return Global.Water.Abstraction.wsa_KPI_GHG_elec()+Global.Water.Treatment.wst_KPI_GHG_elec()+Global.Water.Distribution.wsd_KPI_GHG_elec()},
			wsg_KPI_vol:     function(){return Global.Water.Abstraction.wsa_vol_conv+Global.Water.Treatment.wst_vol_trea+Global.Water.Distribution.wsd_vol_dist},
			wsg_KPI_nrg_cons:function(){return Global.Water.Abstraction.wsa_nrg_cons+Global.Water.Treatment.wst_nrg_cons+Global.Water.Distribution.wsd_nrg_cons},
		},

		"Abstraction":{
			"wsa_vol_conv":0,
			"wsa_nrg_cons":0,
			"wsa_nrg_turb":0,
			wsa_KPI_GHG_elec:function(){return this.wsa_nrg_cons*Global.General.conv_kwh_co2},
			wsa_KPI_nrg_recovery : function(){return this.wsa_nrg_turb/this.wsa_vol_conv},
			/*<Level3>*/
			/*</Level3>*/
		},

		"Treatment":{
			"wst_vol_trea":0,
			"wst_nrg_cons":0,
			wst_KPI_GHG_elec:function(){return this.wst_nrg_cons*Global.General.conv_kwh_co2},
			wst_KPI_nrg_per_m3 : function(){return 100*this.wst_nrg_cons/this.wst_vol_trea},
			wst_KPI_nrg_percen : function(){return -1},
			wst_KPI_slu_per_m3 : function(){return this.wst14/this.wst1},
			wst_KPI_capac_util : function(){return 100*this.wst1/this.wst15},
			/*<Level3>*/
			/*</Level3>*/
		},

		"Distribution":{
			"wsd_vol_dist":0,
			"wsd_nrg_cons":0,
			"wsd_resi_pop":0,
			"wsd_serv_pop":0,
			"wsd_non_revw":0,
			"wsd_auth_con":0,
			wsd_KPI_GHG_elec:function(){return this.wsd_nrg_cons*Global.General.conv_kwh_co2},
			wsd_KPI_nrg_per_m3 :function(){return this.wsd_nrg_cons/this.wsd_auth_con},
			wsd_KPI_nrg_percen :function(){return -1},
			/*<Level3>*/
			/*</Level3*/
		}
	},

	/** Level 1 - Wastewater*/
	Waste:{
		"ww_resi_pop" :0,
		"ww_conn_pop" :0,
		"ww_serv_pop" :0,
		"ww_nrg_cons" :0,
		"ww_vol_coll" :0,
		"ww_vol_wwtr" :0,
		"ww_nrg_cost" :0,
		"ww_run_cost" :0,
		"ww_num_trip" :0,
		"ww_dist_dis" :0,
		"ww_n2o_effl" :0,
		"ww_vol_fuel" :0,
		"ww_prot_con" :3.2,
		"ww_bod_pday" :40,
		"ww_ch4_efac" :0.06,
		"c_ww_biogas_flar"    :function(){if(Global.Configuration["Yes/No"]["Are you valorizing biogas"]==0) return this.ww_serv_pop*this.ww_bod_pday*0.9*0.4*Global.General.Days()/1000; else return 0; },
		"c_ww_nrg_engines"    :function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].waste]; return this.ww_vol_fuel*fuel.FD/1000*fuel.NCV/1000; },
		"c_ww_nrg_tsludge"    :function(){return this.ww_num_trip*2*this.ww_dist_dis*0.25*0.84*43/1000000/1000},
		ww_KPI_GHG_elec	      : function(){return this.ww_nrg_cons*Global.General.conv_kwh_co2},
		ww_KPI_GHG_ne_ch4_wwt : function(){return ((this.Treatment.wwt_bod_infl-this.Treatment.c_wwt_bod_rmvd())*this.ww_ch4_efac+0.02*this.c_ww_biogas_flar()*0.59*0.66)*34}, //old c_ww55
		ww_KPI_GHG_ne_n2o_tre : function(){return 298*this.ww_n2o_effl*this.ww_vol_wwtr/1000*0.005*44/28}, //old c_ww53
		ww_KPI_GHG_ne_tsludge : function(){return this.c_ww_nrg_tsludge()*(74100+34*3.9+298*3.9)},       //old c_ww54
		ww_KPI_GHG_ne_ch4_unt : function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_bod_pday/1000*Global.General.Days()*0.06*34},                      //old c_ww52
		ww_KPI_GHG_ne_n2o_unt : function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_prot_con*Global.General.Days()/365*0.16*1.1*1.25*0.005*44/28*298}, //old c_ww51
		ww_KPI_GHG_ne_engines : function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].waste]; return this.c_ww_nrg_engines()*(fuel.EFCO2+34*fuel.EFCH4.engines+298*fuel.EFN2O.engines) }, //old c_ww57
		ww_KPI_GHG_ne:function(){return this.ww_KPI_GHG_ne_ch4_wwt()+this.ww_KPI_GHG_ne_n2o_tre()+this.ww_KPI_GHG_ne_tsludge()+this.ww_KPI_GHG_ne_ch4_unt()+this.ww_KPI_GHG_ne_n2o_unt()+this.ww_KPI_GHG_ne_engines()}, 
		ww_KPI_GHG:function(){return this.ww_KPI_GHG_elec()+this.ww_KPI_GHG_ne()},
		ww_SL_nrg_cost: function(){return 100*this.ww_nrg_cost/this.ww_run_cost},
		ww_SL_serv_pop: function(){return 100*Global.Waste.ww_serv_pop/Global.Waste.ww_resi_pop},
		ww_SL_vol_pday: function(){return 1000*this.ww_vol_wwtr/this.ww_serv_pop/Global.General.Days()},
		ww_SL_treat_m3: function(){return -1},
		ww_SL_qual_com: function(){return -1},
		ww_SL_dilution: function(){return -1},

		"General":{
			"wwg_nrg_prod":0,
			"wwg_nrg_sold":0,
			"wwg_heat_nrg":0,
			wwg_KPI_GHG_elec:function(){return Global.Waste.Collection.wwc_KPI_GHG_elec()+Global.Waste.Treatment.wwt_KPI_GHG_elec()+Global.Waste.Discharge.wwd_KPI_GHG_elec()},
			wwg_KPI_vol:     function(){return Global.Waste.Collection.wwc_vol_conv+Global.Waste.Treatment.wwt_vol_trea+Global.Waste.Discharge.wwd_vol_disc},
			wwg_KPI_nrg_cons:function(){return Global.Waste.Collection.wwc_nrg_cons+Global.Waste.Treatment.wwt_nrg_cons+Global.Waste.Discharge.wwd_nrg_cons},
		},

		"Collection":{
			"wwc_vol_conv":0,
			"wwc_nrg_cons":0,
			"c_wwc_dilution":function() { if(Global.Waste.Treatment.wwt_vol_trea==0) return 0; else return (Global.Waste.ww_bod_pday*Global.Waste.ww_serv_pop*Global.General.Days()/Global.Waste.Treatment.wwt_bod_infl*Global.Waste.Treatment.wwt_vol_trea/1000)-Global.Waste.ww_vol_coll*Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop },
			wwc_KPI_GHG_elec:function(){return this.wwc_nrg_cons*Global.General.conv_kwh_co2},
			wwc_KPI_nrg_per_m3   : function(){return this.wwc_nrg_cons/this.wwc_vol_conv},
			wwc_KPI_nrg_percen   : function(){return -1},
			wwc_KPI_std_nrg_co   : function(){return this.wwc_nrg_cons/1},
			/*<Level3>*/
			/*</Level3>*/
		},

		"Treatment":{
			"wwt_vol_trea" :0,
			"wwt_nrg_cons" :0,
			"wwt_bod_infl" :0,
			"wwt_bod_effl" :0,
			"wwt_tn_influ" :0,
			"wwt_tn_efflu" :0,
			"wwt_biog_pro" :0,
			"wwt_biog_val" :0,
			"wwt_nrg_biog" :0,
			"wwt_ch4_biog" :0,
			"c_wwt_biog_fla" : function(){return this.wwt_biog_pro-this.wwt_biog_val},
			"c_wwt_n2o_emis" : function(){return 298*Global.Waste.ww_serv_pop*3.2/1000*Global.General.Days()/365},
			"c_wwt_ch4_emis" : function(){return -1},
			"c_wwt_nrg_biog" : function(){return this.wwt_biog_pro*this.wwt_ch4_biog/100*10},
			"c_wwt_bod_rmvd" : function(){return this.wwt_bod_infl-this.wwt_bod_effl},
			"c_wwt_ind_neff" : function(){return 298*this.wwt_tn_influ*0.005*44/28},
			"c_wwt_n2o_untr" : function(){return 298*this.c_wwt_ann_ndis()*0.005*44/28},
			"c_wwt_nrg_fuel" : function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].wasteTre]; return Global.Waste.ww_num_trip*2*Global.Waste.ww_dist_dis*0.25*fuel.FD*fuel.NCV/1000000000},	
			"c_wwt_ann_ndis" : function(){var findcom=Global.Configuration['Yes/No']["Is any untreated industrial or commercial wastewater connected"] ? 1.25 : 1; return this.wwt_tn_efflu*(Global.Waste.Discharge.wwd_vol_disc-this.wwt_vol_trea)/this.wwt_vol_trea*1.1*findcom; },
			"c_wwt_ch4_emis" : function(){return 0.02*this.c_wwt_biog_fla()*0.59*0.66*34},
			wwt_KPI_GHG_elec   : function(){return this.wwt_nrg_cons*Global.General.conv_kwh_co2},
			wwt_KPI_nrg_per_m3 : function(){return this.wwt_nrg_cons/this.wwt_vol_trea},
			wwt_KPI_nrg_percen : function(){return -1},
			wwt_KPI_nrg_per_kg : function(){return this.wwt_nrg_cons/this.c_wwt_bod_rmvd()},
			wwt_KPI_nrg_biogas : function(){return this.wwt_nrg_biog/Global.Waste.ww_num_trip},
			wwt_KPI_biog_x_bod : function(){return this.wwt_biog_pro/this.c_wwt_bod_rmvd()},
			wwt_KPI_nrg_x_biog : function(){return this.wwt_nrg_biog/this.c_wwt_nrg_biog()},
			wwt_KPI_sludg_prod : function(){return this.wwt23/Global.Waste.ww_num_trip},
			wwt_KPI_dry_sludge : function(){var arr=Global.Substages.Waste.Treatment; return this.wwt24/arr.length; },
			wwt_KPI_capac_util : function(){return this.wwt_vol_trea/this.wwt25;},
			/*<Level3>*/
			/*</Level3>*/
		},

		"Discharge":{
			"wwd_vol_disc":0,
			"wwd_nrg_cons":0,
			"wwd_nrg_recv":0,
			wwd_KPI_GHG_elec:function(){return this.wwd_nrg_cons*Global.General.conv_kwh_co2},
			wwd_KPI_nrg_per_m3:function(){return this.wwd_nrg_cons/this.wwd_vol_disc},
			wwd_KPI_rcv_per_dw:function(){return this.wwd_nrg_recv/this.wwd_vol_disc},
			/*<Level3>*/
			/*</Level3>*/
		},
	},

	/** Substages Arrays For Level 3 */
	Substages:
	{
		"Water":{
			"Abstraction":[],
			"Treatment":[],
			"Distribution":[],
		},
		"Waste":{
			"Collection":[],
			"Treatment":[],
			"Discharge":[],
		},
	},

	/** Configuration: Active Stages, questions, Technologies and Units */
	Configuration:{
		"Active Stages":{
			"water":0,
			"waterGen":0,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteGen":0,
			"wasteCol":0,
			"wasteTre":0,
			"wasteDis":0,
		},

		Assessment:{
			Water:{
				Abstraction:"simple",
				Treatment:"simple",
				Distribution:"simple",
			},
			Waste:{
				Collection:"simple",
				Treatment:"simple",
				Discharge:"simple",
			}
		},

		Units:{ }, //custom unit selections for variables are stored here
		/** Calculated or "estimated" assumptions are added here. (calculated is default, so only estimated is added here) */
		DataQuality:{ },

		Selected:
		{
			"Fuel type":
			{
				"water":    "Gas/Diesel Oil",
				"waste":    "Gas/Diesel Oil",
				"wasteTre": "Gas/Diesel Oil",
			},
			"Country"      : "Africa",
			"Technologies" : {"waterTre":"None","wasteTre":"None"},
		},

		"Yes/No":
		{
			"Are you producing electrical energy"                                :0,
			"Do you have fuel engines to run pumps"                              :0,
			"Is your topography flat"                                            :0,
			"Are you using truck transport to convey sludge to the disposal site":0,
			"Are you producing biogas"                                           :0,
			"Are you valorizing biogas"                                          :0,
			"Is any untreated industrial or commercial wastewater connected"     :0,
		},
	},
}
