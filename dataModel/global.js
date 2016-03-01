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
		"ws_serv_pop"   :0,
		"ws_resi_pop"   :0,
		"ws_nrg_cost"   :0,
		"ws_run_cost"   :0,
		"ws_nrg_cons"   :0,
		"ws_vol_auth"   :0,
		"ws_non_revw"   :0,
		"ws_vol_fuel"   :0,
		"c_ws_nrg_fuel" :function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].water]; return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000; },
		"c_ws_co2_engi" :function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].water]; return this.c_ws_nrg_fuel()*(fuel.EFCO2+298*fuel.EFN2O.engines+34*fuel.EFCH4.engines); },

		ws_KPI_nrg_cost :function(){return 100*this.ws_nrg_cost/this.ws_run_cost||0},
		ws_KPI_GHG_elec :function(){return this.ws_nrg_cons*Global.General.conv_kwh_co2},
		ws_KPI_GHG_ne   :function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].water]; return this.c_ws_nrg_fuel()*(fuel.EFCO2+298*fuel.EFN2O.engines+34*fuel.EFCH4.engines)} ,

		"General":{
			"wsg_nrg_prod":0,
			"wsg_nrg_sold":0,
			"wsg_heat_nrg":0,
		},

		"Abstraction":{
			"wsa_nrg_cons":0,
			"wsa_vol_conv":0,
			"wsa_nrg_turb":0,
			wsa_KPI_std_nrg_cons : function(){return this.wsa1/this.c_wsa50()||0},
			wsa_KPI_nrg_recovery : function(){return this.wsa3/this.wsa2||0},
			wsa_KPI_std_nrg_recv : function(){return this.wsa3/this.wsa6||0},
			wsa_KPI_water_losses : function(){return this.wsa8/Global.General.Days()/this.wsa9||0},
			wsa_KPI_un_head_loss : function(){return this.wsa10/this.wsa9||0},

			/*<Level3>*/
				"wsa4"  : 0,
				"wsa5"  : 0,
				"wsa6"  : 0,
				"wsa7"  : 0,
				"wsa8"  : 0,
				"wsa9"  : 0,
				"wsa10" : 0,
				c_wsa50:function(){return this.wsa5*this.wsa4/100},
			/*</Level3>*/
		},

		"Treatment":{
			"wst_vol_trea":0,
			"wst_nrg_cons":0,

			wst_KPI_nrg_per_m3 : function(){return 100*this.wst_nrg_cons/this.wst_vol_trea||0},
			wst_KPI_nrg_percen : function(){return -1},
			wst_KPI_slu_per_m3 : function(){return this.wst14/this.wst1||0},
			wst_KPI_capac_util : function(){return 100*this.wst1/this.wst15||0},

			tE01	  : function(){return 100*this.wst8 /this.wst1||0},
			tE02	  : function(){return 100*this.wst9 /this.wst1||0},
			tE03	  : function(){return 100*this.wst10/this.wst1||0},
			tE04	  : function(){return 100*this.wst11/this.wst1||0},
			tE05	  : function(){return 100*this.wst12/this.wst1||0},
			tE06	  : function(){return 100*this.wst13/this.wst1||0},

			/*<Level3>*/
				"wst3":0,
				"wst4":0,
				"wst5":0,
				"wst6":0,
				"wst7":0,
				"wst8":0,
				"wst9":0,
				"wst10":0,
				"wst11":0,
				"wst12":0,
				"wst13":0,
				"wst14":0,
				"wst15":0,
				"wst16":0,
				c_wst50:function(){return 100*this.wst16/this.wst4||0},
			/*</Level3>*/
		},

		"Distribution":{

			"wsd_nrg_cons":0,
			"wsd_resi_pop":0,
			"wsd_serv_pop":0,
			"wsd_vol_dist":0,
			"wsd_non_revw":0,
			"wsd_auth_con":0,

			wsd_KPI_nrg_per_m3 :function(){return -1},
			wsd_KPI_nrg_percen :function(){return -1},

			dE3 : function(){return this.wsd_nrg_cons/this.c_wsd54()||0},
			dE4 : function(){return 100*this.c_wsd51()/(this.c_wsd52()-this.wsd17)||0},
			dE5 : function(){return 100*this.c_wsd53()/(this.c_wsd52()-this.wsd17)||0},
			dE6 : function(){return (this.wsd9-this.wsd4)/Global.General.Days()/this.wsd18||0},
			dE7 : function(){return this.wsd19/this.wsd18||0},

			/*<Level3>*/
				"wsd2":0,
				"wsd3":0,
				"wsd4":0,
				"wsd9":0,
				"wsd10":0,
				"wsd11":0,
				"wsd12":0,
				"wsd13":0,
				"wsd14":0,
				"wsd15":0,
				"wsd16":0,
				"wsd17":0,
				"wsd18":0,
				"wsd19":0,
				c_wsd50:function(){return 9810*this.wsd9*(this.wsd14-this.wsd12)},
				c_wsd51:function(){return 9810*Global.Water.ws_vol_auth*(this.wsd10+this.wsd13-this.wsd12)},
				c_wsd52:function(){return this.wsd_nrg_cons+this.c_wsd50()},
				c_wsd53:function(){return 9810*this.wsd9*(this.wsd11-this.wsd13)},
				c_wsd54:function(){return this.wsd15*this.wsd16/100},
			/*</Level3*/
		}
	},

	/** Level 1 - Wastewater*/
	Waste:{
		"ww_nrg_cost" :0,
		"ww_run_cost" :0,
		"ww_nrg_cons" :0,
		"ww_vol_coll" :0,
		"ww_resi_pop" :0,
		"ww_conn_pop" :0,
		"ww_serv_pop" :0,
		"ww_num_trip" :0,
		"ww_dist_dis" :0,
		"ww_n2o_effl" :0,
		"ww_vol_fuel" :0,
		"ww_prot_con" :3.2,
		"ww_bod_pday" :40,
		"ww_vol_wwtr" :0,
		"ww_ch4_efac" :0.06,

		"c_ww_biogas_flar":function(){if(Global.Configuration["Yes/No"]["Are you valorizing biogas"]==0) return this.ww_serv_pop*this.ww_bod_pday*0.9*0.4*Global.General.Days()/1000; else return 0; },
		"c_ww_nrg_engines":function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].waste]; return this.ww_vol_fuel*fuel.FD/1000*fuel.NCV/1000; },
		"c_ww_nrg_tsludge":function(){return this.ww_num_trip*2*this.ww_dist_dis*0.25*0.84*43/1000000/1000},

	ww_KPI_nrg_cost	      : function(){return 100*this.ww_nrg_cost/this.ww_run_cost||0},
	ww_KPI_GHG_elec	      : function(){return this.ww_nrg_cons*Global.General.conv_kwh_co2},
	ww_KPI_GHG_ne_ch4_wwt : function(){return ((this.Treatment.wwt_bod_infl-this.Treatment.c_wwt_bod_rmvd())*this.ww_ch4_efac+0.02*this.c_ww_biogas_flar()*0.59*0.66)*34}, //old c_ww55
	ww_KPI_GHG_ne_n2o_tre : function(){return 298*this.ww_n2o_effl*this.ww_vol_wwtr/1000*0.005*(44/28)}, //old c_ww53
	ww_KPI_GHG_ne_tsludge : function(){return this.c_ww_nrg_tsludge()*(74100+34*3.9+298*3.9)},       //old c_ww54
	ww_KPI_GHG_ne_ch4_unt : function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_bod_pday/1000*Global.General.Days()*0.06*34},                      //old c_ww52
	ww_KPI_GHG_ne_n2o_unt : function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_prot_con*Global.General.Days()/365*0.16*1.1*1.25*0.005*44/28*298}, //old c_ww51
	ww_KPI_GHG_ne_engines : function(){ var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].waste]; return this.c_ww_nrg_engines()*(fuel.EFCO2+34*fuel.EFCH4.engines+298*fuel.EFN2O.engines) }, //old c_ww57

		"General":{
			"wwg_nrg_prod":0,
			"wwg_nrg_sold":0,
			"wwg_heat_nrg":0,
		},

		"Collection":{

			"wwc_vol_conv":0,
			"wwc_nrg_cons":0,
			"c_wwc_dilution":function() { if(Global.Waste.Treatment.wwt_vol_trea==0) return 0; else return (Global.Waste.ww_bod_pday*Global.Waste.ww_serv_pop*Global.General.Days()/Global.Waste.Treatment.wwt_bod_infl*Global.Waste.Treatment.wwt_vol_trea/1000)-Global.Waste.ww_vol_coll*Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop||0 },

			wwc_KPI_nrg_per_m3   : function(){return this.wwc_nrg_cons/this.wwc_vol_conv||0},
			wwc_KPI_nrg_percen   : function(){return -1},
			wwc_KPI_std_nrg_co   : function(){return this.wwc_nrg_cons/this.c_wwc50()||0},

			/*<Level3>*/
				"wwc3":0,
				"wwc4":0,
				c_wwc50:function(){return this.wwc3*this.wwc4/100},
			/*</Level3>*/
		},

		"Treatment":{
			"wwt_bod_infl" :0,
			"wwt_biog_pro" :0,
			"wwt_biog_val" :0,
			"wwt_tn_influ" :0,
			"wwt_tn_efflu" :0,
			"wwt_vol_trea" :0,
			"wwt_nrg_cons" :0,
			"wwt_bod_effl" :0,
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
			"c_wwt_ann_ndis" : function(){var findcom=Global.Configuration['Yes/No']["Is any untreated industrial or commercial wastewater connected"] ? 1.25 : 1; return this.wwt_tn_efflu*(Global.Waste.Discharge.wwd1-this.wwt_vol_trea)/this.wwt_vol_trea*1.1*findcom||0; },
			"c_wwt_ch4_emis" : function(){return 0.02*this.c_wwt_biog_fla()*0.59*0.66*34},

			wwt_KPI_nrg_per_m3 : function(){return this.wwt_nrg_cons/this.wwt_vol_trea||0},
			wwt_KPI_nrg_percen : function(){return -1},
			wwt_KPI_nrg_per_kg : function(){return this.wwt_nrg_cons/this.c_wwt_bod_rmvd()||0},
			wwt_KPI_nrg_biogas : function(){return this.wwt_nrg_biog/Global.Waste.ww_num_trip||0},
			wwt_KPI_biog_x_bod : function(){return this.wwt_biog_pro/this.c_wwt_bod_rmvd()||0},
			wwt_KPI_nrg_x_biog : function(){return this.wwt_nrg_biog/this.c_wwt_nrg_biog()||0},
			wwt_KPI_sludg_prod : function(){return this.wwt23/Global.Waste.ww_num_trip||0},
			wwt_KPI_dry_sludge : function(){var arr=Global.Substages.Waste.Treatment; return this.wwt24/arr.length||0; },
			wwt_KPI_capac_util : function(){return this.wwt_vol_trea/this.wwt25||0;},

			wtE01     : function(){return 100*this.wwt17/this.wwt_vol_trea||0},
			wtE02     : function(){return 100*this.wwt18/this.wwt_vol_trea||0},
			wtE03     : function(){return 100*this.wwt19/this.wwt_vol_trea||0},
			wtE04     : function(){return 100*this.wwt20/this.wwt_vol_trea||0},
			wtE05     : function(){return 100*this.wwt21/this.wwt_vol_trea||0},
			wtE06     : function(){return 100*this.wwt26/this.wwt_vol_trea||0},

			/*<Level3>*/
				"wwt15":0,
				"wwt16":0,
				"wwt17":0,
				"wwt18":0,
				"wwt19":0,
				"wwt20":0,
				"wwt21":0,
				"wwt22":0,
				"wwt23":0,
				"wwt24":0,
				"wwt25":0,
				c_wwt61:function(){return 100*this.wwt15/this.wwt16||0},
			/*</Level3>*/
		},

		"Discharge":{
			"wwd1":0,
			"wwd3":0,
			"wwd4":0,
			wdE1  : function(){return this.wwd3/this.wwd1||0},
			wdE2  : function(){return -1},
			wdE3  : function(){if(this.wwd5==0) return 0; else return this.wwd3/this.c_wwd50()||0; },
			wdE4  : function(){return this.wwd4/this.wwd1||0},
			wdE5  : function(){if(this.wwd7==0) return 0; else return this.wwd4/this.c_wwd51()||0; },

			/*<Level3>*/
				"wwd5":0,
				"wwd6":0,
				"wwd7":0,
				"wwd8":0,
				c_wwd50:function(){return this.wwd5*this.wwd6/100},
				c_wwd51:function(){return this.wwd7*this.wwd8/100},
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
			"Are you producing biogas"                                           :0,
			"Are you valorizing biogas"                                          :0,
			"Are you producing electrical energy"                                :0,
			"Do you have fuel engines to run pumps"                              :0,
			"Are you using truck transport to convey sludge to the disposal site":0,
			"Is your topography flat"                                            :0,
			"Is any untreated industrial or commercial wastewater connected"          :0,
		},
	},

}

/* +================+ */
/* | Service levels | */
/* +================+ */

	Global.Water.ws_SL_qual_com = function(){return -1}
	Global.Water.ws_SL_pres_ade = function(){return -1}
	Global.Water.ws_SL_cont_sup = function(){return -1}
	Global.Water.ws_SL_serv_pop = function(){return 100*this.ws_serv_pop/this.ws_resi_pop||0}
	Global.Water.ws_SL_non_revw = function(){return -1}
	Global.Water.ws_SL_auth_con = function(){return this.ws_vol_auth/this.ws_serv_pop/Global.General.Days()||0}

	Global.Waste.ww_SL_serv_pop = function(){return -1}
	Global.Waste.ww_SL_treat_m3 = function(){return -1}
	Global.Waste.ww_SL_qual_com = function(){return -1}
	Global.Waste.ww_SL_dilution = function(){return -1}
	Global.Waste.ww_SL_vol_pday = function(){return -1}
