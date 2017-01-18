/** 
	Main data structure
	This object stores user inputs and has all equations.
	All inputs are saved to cookies (compressed) (see "js/updateGlobalFromCookies.js")

	After ecam v2 it would be good to separate all equations in another object
*/
var Global={
	General:{
		Name:"Untitled system",
		AssessmentPeriodStart:"2017-01-01",
		AssessmentPeriodEnd:"2018-01-01",
		Comments:"",
		Currency:"USD",
		conv_kwh_co2:0, //conversion factor for grid electricity
		Days:function(){
			var startDate=new Date(Global.General.AssessmentPeriodStart);
			var finalDate=new Date(Global.General.AssessmentPeriodEnd);
			return (finalDate-startDate)/1000/60/60/24;
		},
		Years:function(){return this.Days()/365},
		TotalGHG:function(){return Global.Water.ws_KPI_GHG()+Global.Waste.ww_KPI_GHG()},
	},

	/**Level 1 - Water Supply*/
	Water:{
		"ws_resi_pop":0,
		"ws_serv_pop":0,
		"ws_nrg_cost":0,
		"ws_run_cost":0,

		ws_KPI_GHG_elec:function(){return this.Abstraction.wsa_KPI_GHG_elec()+this.Treatment.wst_KPI_GHG_elec()+this.Distribution.wsd_KPI_GHG_elec()},
		ws_KPI_GHG_ne  :function(){return this.Abstraction.wsa_KPI_GHG_ne()+this.Treatment.wst_KPI_GHG_ne()+this.Distribution.wsd_KPI_GHG_ne()},

		ws_nrg_cons:function(){return this.Abstraction.wsa_nrg_cons+this.Treatment.wst_nrg_cons+this.Distribution.wsd_nrg_cons},
		ws_vol_fuel:function(){return this.Abstraction.wsa_vol_fuel+this.Treatment.wst_vol_fuel+this.Distribution.wsd_vol_fuel},

		ws_SL_serv_pop:function(){return 100*Global.Water.ws_serv_pop/Global.Water.ws_resi_pop},
		ws_SL_nrg_cost:function(){return 100*this.ws_nrg_cost/this.ws_run_cost},
		ws_SL_auth_con:function(){return 1000*this.Distribution.wsd_auth_con/this.ws_serv_pop/Global.General.Days()},
		ws_SL_non_revw:function(){return Math.max(0,100*(this.Abstraction.wsa_vol_conv-this.Distribution.wsd_auth_con)/this.Abstraction.wsa_vol_conv)},
		ws_SL_nrw_emis:function(){return this.ws_KPI_GHG()*this.ws_SL_non_revw()/100},
		ws_SL_auc_emis:function(){return this.ws_KPI_GHG()-this.ws_SL_nrw_emis()},

		//wsa
		"Abstraction":{
			"wsa_nrg_cons":0,
			"wsa_nrg_pump":0,
			"wsa_vol_conv":0,
			"wsa_vol_pump":0,
			"wsa_vol_fuel":0,
			"wsa_nrg_turb":0,
			"wsa_pmp_head":0,
			"wsa_main_len":0,
			"wsa_fri_loss":0,
			"wsa_watr_src":0,
			"wsa_pmp_type":0,
			"wsa_pmp_size":0,
			wsa_nrg_per_pmp_watr:function(){return this.wsa_nrg_cons/this.wsa_vol_pump},
			wsa_KPI_nrg_recovery:function(){return this.wsa_nrg_turb/this.wsa_vol_conv},
			wsa_KPI_std_elec_eff:function(){return 0.2725/this.wsa_KPI_std_nrg_cons()},
			wsa_KPI_un_head_loss:function(){return 1000*this.wsa_fri_loss/this.wsa_main_len},
			wsa_KPI_std_nrg_cons:function(){return (this.wsa_nrg_pump+this.wsa_nrg_turb)/(this.wsa_vol_pump*this.wsa_pmp_head/100)},
			wsa_SL_water_losses:function(){return 0}, //TODO
			wsa_KPI_GHG_elec:function(){return this.wsa_nrg_cons*Global.General.conv_kwh_co2},
			wsa_KPI_GHG_ne:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.wsa_engines]; 
				return this.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+Cts.ct_n2o_eq.value*fuel.EFN2O.engines+Cts.ct_ch4_eq.value*fuel.EFCH4.engines)
			},
			wsa_KPI_GHG:function(){return this.wsa_KPI_GHG_elec()+this.wsa_KPI_GHG_ne()} ,
		},

		"Treatment":{
			"wst_nrg_cons":0,
			"wst_vol_trea":0,
			"wst_vol_fuel":0,
			"wst_tst_carr":0,
			"wst_trea_cap":0, 
			"wst_mass_slu":0,
			"wst_vol_trea":0,
			"wst_treatmen":0,
			"wst_disnfctn":0,
			"wst_nrg_disn":0,
			"wst_turb_raw":0,
			"wst_turb_fin":0,
			"wst_nrg_pump":0,
			"wst_vol_pump":0,
			"wst_pmp_head":0,
			wst_KPI_nrg_per_m3:function(){return this.wst_nrg_cons/this.wst_vol_trea},
			wst_KPI_nrg_disnfc:function(){return this.wst_nrg_disn/this.wst_vol_trea},
			wst_KPI_slu_per_m3:function(){return this.wst_mass_slu/this.wst_vol_trea},
			wst_KPI_capac_util:function(){return 100*this.wst_vol_trea/this.wst_trea_cap},
			wst_KPI_std_nrg_cons:function(){return this.wst_nrg_pump/(this.wst_vol_pump*this.wst_pmp_head/100)},
			wst_KPI_GHG_elec:function(){return this.wst_nrg_cons*Global.General.conv_kwh_co2},
			wst_KPI_GHG_slud:function(){return 0},
			wst_KPI_GHG_fuel:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.wst_engines]; 
				return this.wst_vol_fuel*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+Cts.ct_n2o_eq.value*fuel.EFN2O.engines+Cts.ct_ch4_eq.value*fuel.EFCH4.engines) 
			},
			wst_KPI_GHG_ne:function(){return this.wst_KPI_GHG_slud()+this.wst_KPI_GHG_fuel();},
			wst_KPI_GHG:function(){return this.wst_KPI_GHG_elec()+this.wst_KPI_GHG_ne()},
		},

		"Distribution":{
			"wsd_nrg_cons":0,
			"wsd_nrg_pump":0,
			"wsd_vol_dist":0,
			"wsd_auth_con":0,
			"wsd_vol_fuel":0,
			"wsd_vol_trck":0,
			"wsd_deli_pts":0,
			"wsd_ser_cons":0,
			"wsd_time_pre":0,
			"wsd_min_pres":0,
			"wsd_hi_no_el":0,
			"wsd_lo_no_el":0,
			"wsd_av_no_el":0,
			"wsd_wt_el_no":0,
			"wsd_vol_pump":0,
			"wsd_pmp_head":0,
			"wsd_main_len":0,
			"wsd_fri_loss":0,
			"wsd_pmp_size":0, //dropdown
			"wsd_sta_head":0,
			c_wsd_nrg_natu:function(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_wt_el_no-this.wsd_lo_no_el)/3600000},
			c_wsd_nrg_mini:function(){return Cts.ct_gravit.value*this.wsd_auth_con*(this.wsd_min_pres+this.wsd_av_no_el-this.wsd_lo_no_el)/3600000},
			c_wsd_nrg_supp:function(){return this.wsd_nrg_cons+this.c_wsd_nrg_natu()},
			c_wsd_nrg_topo:function(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_hi_no_el-this.wsd_av_no_el)/3600000},

			wsd_KPI_nrg_efficien:function(){return 100*this.c_wsd_nrg_mini()/this.c_wsd_nrg_supp()},
			wsd_KPI_nrg_topgraph:function(){return 100*this.c_wsd_nrg_topo()/this.c_wsd_nrg_supp()},
			wsd_KPI_nrg_per_m3:function(){return this.wsd_nrg_cons/this.wsd_auth_con},
			wsd_KPI_std_nrg_cons:function(){return this.wsd_nrg_pump/(this.wsd_vol_pump*this.wsd_pmp_head/100)},
			wsd_KPI_water_losses:function(){return Math.max(0,1000*(this.wsd_vol_dist-this.wsd_auth_con)/(this.wsd_main_len))},
			wsd_KPI_un_head_loss:function(){return 1000*this.wsd_fri_loss/this.wsd_main_len},
			wsd_KPI_non_revw:function(){return 100*(this.wsd_vol_dist-this.wsd_auth_con)/this.wsd_vol_dist},
			ws_SL_auth_con:function(){return Global.Water.ws_SL_auth_con()},
			wsd_SL_pres_ade:function(){return 100*this.wsd_deli_pts/this.wsd_ser_cons},
			wsd_SL_cont_sup:function(){return 100*this.wsd_time_pre/24},
			wsd_KPI_GHG_nrw:function(){return Global.Water.ws_KPI_GHG()*Global.Water.ws_SL_non_revw()/100},
			wsd_KPI_GHG_elec:function(){return this.wsd_nrg_cons*Global.General.conv_kwh_co2},
			wsd_KPI_GHG_ne_fuel:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.wsd_engines]; 
				return this.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+Cts.ct_n2o_eq.value*fuel.EFN2O.engines+Cts.ct_ch4_eq.value*fuel.EFCH4.engines)
			},
			wsd_KPI_GHG_ne_trck:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.wsd_trucks]; 
				return this.wsd_vol_trck*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+Cts.ct_n2o_eq.value*fuel.EFN2O.engines+Cts.ct_ch4_eq.value*fuel.EFCH4.engines)
			},
			wsd_KPI_GHG_ne:function(){return this.wsd_KPI_GHG_ne_fuel()+this.wsd_KPI_GHG_ne_trck()},
			wsd_KPI_GHG:function(){return this.wsd_KPI_GHG_elec()+this.wsd_KPI_GHG_ne()},
		}
	},

	/**Level 1 - Wastewater*/
	Waste:{
		"ww_resi_pop" :0,
		"ww_conn_pop" :0,
		"ww_serv_pop" :0,
		"ww_vol_coll" :0,
		"ww_vol_wwtr" :0,
		"ww_nrg_cost" :0,
		"ww_run_cost" :0,
		"ww_bod_infl" :0,
		"ww_bod_effl" :0,
		"ww_bod_slud" :0,
		"ww_num_trip" :4,
		"ww_dist_dis" :40000,
		"ww_n2o_effl" :0,
		"ww_prot_con" :25,
		"ww_ch4_efac" :0.06,
		"ww_biog_pro":0,
		"ww_biog_val":0,
		c_ww_biogas_flar:function(){
      //TODO we consider that 100% of biogas is valorized if the user did not enter ww_biog_pro
			if(Global.Configuration["Yes/No"]["producing_biogas"])
			{
				if(this.ww_biog_pro==0)
				{
					if(Global.Configuration["Yes/No"]["valorizing_biogas"])
						return 0;
					else
						return this.ww_serv_pop * this.Collection.wwc_bod_pday * Cts.ct_bod_kg.value * Cts.ct_biog_g.value/1000 * Global.General.Days();
				}
				else
					return this.ww_biog_pro - this.ww_biog_val;
			}
			else
				return 0;
		},
		c_ww_nrg_engines     :function(){return 0}, //TODO
		c_ww_nrg_tsludge     :function(){return this.ww_num_trip*2*this.ww_dist_dis*0.25*0.84*43/1000000/1000},

		ww_SL_nrg_cost: function(){return 100*this.ww_nrg_cost/this.ww_run_cost},
		ww_SL_serv_pop: function(){return 100*Global.Waste.ww_serv_pop/Global.Waste.ww_resi_pop},
		ww_SL_vol_pday: function(){return 1000*this.ww_vol_wwtr/this.ww_serv_pop/Global.General.Days()},
		ww_SL_treat_m3: function(){return 100*this.ww_serv_pop/this.ww_conn_pop},
		ww_SL_dilution: function(){return -999},//TODO
		ww_SL_dil_emis:	function(){return -999},//TODO
		ww_nrg_cons   : function(){return this.Collection.wwc_nrg_cons+this.Treatment.wwt_nrg_cons+this.Discharge.wwd_nrg_cons},

		ww_KPI_GHG_ne_engines:function(){return 0 }, //TODO
		ww_KPI_GHG_ne_tsludge:function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.truck_transport_waste];return this.c_ww_nrg_tsludge()*(fuel.EFCO2+Cts.ct_ch4_eq.value*fuel.EFCH4.vehicles+Cts.ct_n2o_eq.value*fuel.EFN2O.vehicles)},
		ww_KPI_GHG_ne_ch4_wwt:function(){return ((this.ww_bod_infl-this.ww_bod_slud-this.ww_bod_effl)*this.ww_ch4_efac+Cts.ct_ch4_lo.value/100*this.c_ww_biogas_flar()*Cts.ct_ch4_bi.value/100*Cts.ct_ch4_m3.value)*Cts.ct_ch4_eq.value}, //old c_ww55
		ww_KPI_GHG_ne_n2o_tre:function(){return Cts.ct_n2o_eq.value*this.ww_n2o_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value}, //old c_ww53
		ww_KPI_GHG_ne_ch4_unt:function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.Collection.wwc_bod_pday/1000*Global.General.Days()*Cts.ct_ch4_ef.value*Cts.ct_ch4_eq.value},                   //old c_ww52
		ww_KPI_GHG_ne_n2o_unt:function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_prot_con*Global.General.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value }, //old c_ww51
		ww_KPI_GHG_ne_unt:    function(){return this.ww_KPI_GHG_ne_ch4_unt()+this.ww_KPI_GHG_ne_n2o_unt()},
		ww_KPI_GHG_ne_tre:    function(){return this.ww_KPI_GHG_ne_ch4_wwt()+this.ww_KPI_GHG_ne_n2o_tre()},
		ww_KPI_GHG_ne:        function(){
			return this.ww_KPI_GHG_ne_tre()+this.ww_KPI_GHG_ne_tsludge()+this.ww_KPI_GHG_ne_unt()+this.ww_KPI_GHG_ne_engines()+
			this.Collection.wwc_KPI_GHG_ne()+this.Treatment.wwt_KPI_GHG_ne()+this.Discharge.wwd_KPI_GHG_ne()
		},
		ww_KPI_GHG_elec : function(){return this.ww_nrg_cons()*Global.General.conv_kwh_co2},
		ww_KPI_GHG      : function(){return this.ww_KPI_GHG_elec()+this.ww_KPI_GHG_ne()},

		"Collection":{
			"wwc_vol_coll":0,
			"wwc_vol_conv":0,
			"wwc_prot_con":0,
			"wwc_bod_pday":0,
			"wwc_nrg_cons":0,
			"wwc_vol_pump":0,
			"wwc_vol_fuel":0,
			"wwc_pmp_type":0,
			"wwc_pmp_head":0,
			"wwc_pmp_sthd":0,
			"wwc_fri_loss":0, // Friction pipe losses
			"wwc_pmp_size":0, // Size of pump
			"wwc_comb_sew":0,
			"wwc_wet_flow":0,
			"wwc_dry_flow":0,
			"wwc_cso_incd":0,
			"wwc_coll_len":0,
			"wwc_infl_inf":0,
			"wwc_wd_ratio":0,

			//Collection SL
			ww_SL_serv_pop: function(){return Global.Waste.ww_SL_serv_pop()},
			wwc_KPI_nrg_per_m3: function(){return this.wwc_nrg_cons/this.wwc_vol_pump},
			ww_SL_treat_m3:function(){return 100*(Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop)},
			wwc_KPI_std_nrg_cons: function(){return this.wwc_nrg_cons/(this.wwc_vol_pump*this.wwc_pmp_head/100)},
			wwc_KPI_un_head_loss:function(){return 1000*this.wwc_fri_loss/this.wwc_coll_len},
			wwc_infl_infi:function(){return 100*(this.wwc_wet_flow-this.wwc_dry_flow)/this.wwc_dry_flow},
			wwc_vol_infi:function(){return this.wwc_infl_infi/100*this.wwc_dry_flow},
			//Collection GHG
			wwc_KPI_GHG_ne_unt_ch4:function(){return (Global.Waste.ww_resi_pop-Global.Waste.ww_serv_pop)*this.wwc_bod_pday/1000*Global.General.Days()*Cts.ct_ch4_ef.value*Cts.ct_ch4_eq.value },//old c_ww52
			wwc_KPI_GHG_ne_unt_n2o:function(){return (Global.Waste.ww_resi_pop-Global.Waste.ww_serv_pop)*this.wwc_prot_con*Global.General.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value },
			wwc_KPI_GHG_ne_fuel:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.wwc_engines]; 
				return this.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+Cts.ct_n2o_eq.value*fuel.EFN2O.engines+Cts.ct_ch4_eq.value*fuel.EFCH4.engines) 
			},
			wwc_KPI_GHG_elec:function(){return this.wwc_nrg_cons*Global.General.conv_kwh_co2},
			wwc_KPI_GHG_ne:function(){return this.wwc_KPI_GHG_ne_unt_ch4()+this.wwc_KPI_GHG_ne_unt_n2o()+this.wwc_KPI_GHG_ne_fuel()},
			wwc_KPI_GHG_ii:function(){return this.wwc_infl_infi()*this.wwc_vol_coll*this.wwc_nrg_cons}, 
			wwc_KPI_GHG:function(){return this.wwc_KPI_GHG_elec()+this.wwc_KPI_GHG_ne()},
		},

		"Treatment":{
			"wwt_vol_trea":0,
			"wwt_nrg_cons":0,
			"wwt_vol_fuel":0,
			"wwt_n2o_effl":0,

			"wwt_bod_infl":0,
			"wwt_bod_effl":0,
			"wwt_nrg_biog":0,
			"wwt_ch4_biog":0,
			"wwt_biog_pro":0,
			"wwt_biog_val":0,
			"wwt_tst_cmpl":0,
			"wwt_tst_cond":0,
			"wwt_mass_slu":0,
			"wwt_dryw_slu":0,
			"wwt_trea_cap":0,

			"c_wwt_nrg_biog":function(){return this.wwt_biog_val*this.wwt_ch4_biog/100*10},
			"c_wwt_bod_rmvd":function(){return this.wwt_bod_infl-this.wwt_bod_effl},

			wwt_KPI_nrg_per_m3:function(){return this.wwt_nrg_cons/this.wwt_vol_trea},
			wwt_KPI_nrg_per_kg:function(){return this.wwt_nrg_cons/this.c_wwt_bod_rmvd()},
			wwt_KPI_nrg_biogas:function(){return this.wwt_nrg_biog/this.wwt_vol_trea},
			wwt_KPI_biog_x_bod:function(){return this.wwt_biog_pro/this.c_wwt_bod_rmvd()},
			wwt_KPI_nrg_x_biog:function(){return 100*this.wwt_nrg_biog/this.c_wwt_nrg_biog()},
			wwt_KPI_sludg_prod:function(){return this.wwt_mass_slu/this.wwt_vol_trea},
			wwt_KPI_dry_sludge:function(){return 100*this.wwt_dryw_slu/this.wwt_mass_slu},
			wwt_KPI_capac_util:function(){return 100*this.wwt_vol_trea/this.wwt_trea_cap},
			ww_SL_serv_pop: function(){return Global.Waste.ww_SL_serv_pop()},
			ww_SL_vol_pday: function(){return Global.Waste.ww_SL_vol_pday()},
			ww_SL_dilution: function(){return Global.Waste.ww_SL_dilution()},
			wwt_SL_qual_com: function(){return 100*this.wwt_tst_cmpl/this.wwt_tst_cond},

			//wwt GHG
			wwt_KPI_GHG_elec:function(){return this.wwt_nrg_cons*Global.General.conv_kwh_co2},
			wwt_KPI_GHG_ne:function(){return 0},   //TODO
			wwt_KPI_GHG:function(){return this.wwt_KPI_GHG_elec()+this.wwt_KPI_GHG_ne()},
		},

		"Discharge":{
			"wwd_nrg_cons":0,
			"wwd_vol_disc":0,
			"wwd_nrg_recv":0,
			"wwd_vol_pump":0,
			"wwd_pmp_head":0,
			"wwd_vol_turb":0,
			"wwd_trb_head":0,
			wwd_KPI_nrg_per_m3:function(){return this.wwd_nrg_cons/this.wwd_vol_disc||0},
			wwd_KPI_nrg_rcv_di:function(){return this.wwd_nrg_recv/this.wwd_vol_disc},
			wwd_KPI_std_nrg_cons:function(){return (this.wwd_nrg_cons+this.wwd_nrg_recv)/(this.wwd_vol_pump*this.wwd_pmp_head/100)},
			wwd_KPI_std_nrg_recv:function(){return this.wwd_nrg_recv/(this.wwd_vol_turb*this.wwd_trb_head/100)},
			ww_SL_serv_pop: function(){return Global.Waste.ww_SL_serv_pop()},
			ww_SL_vol_pday: function(){return Global.Waste.ww_SL_vol_pday()},

			//wwd GHG
			wwd_KPI_GHG_elec:function(){return this.wwd_nrg_cons*Global.General.conv_kwh_co2},
			wwd_KPI_GHG_ne:function(){return 0},   //TODO
			wwd_KPI_GHG:function(){return this.wwd_KPI_GHG_elec()+this.wwd_KPI_GHG_ne()},
		},
	},

	/**Old "General" Level2 */ //TODO
	Energy:{
		//WS 
		ws_KPI_GHG_elec:function(){return Global.Water.ws_KPI_GHG_elec()},
		ws_KPI_GHG_ne  :function(){return Global.Water.ws_KPI_GHG_ne()},
		ws_KPI_GHG     :function(){return Global.Water.ws_KPI_GHG()},
		//WW
		ww_KPI_GHG_elec:      function(){return Global.Waste.ww_KPI_GHG_elec()},
		ww_KPI_GHG_ne_engines:function(){return Global.Waste.ww_KPI_GHG_ne_engines()}, //old c_ww57
		ww_KPI_GHG_ne_tsludge:function(){return Global.Waste.ww_KPI_GHG_ne_tsludge()},
		ww_KPI_GHG_ne_ch4_wwt:function(){return Global.Waste.ww_KPI_GHG_ne_ch4_wwt()}, //old c_ww55
		ww_KPI_GHG_ne_n2o_tre:function(){return Global.Waste.ww_KPI_GHG_ne_n2o_tre()}, //old c_ww53
		ww_KPI_GHG_ne_ch4_unt:function(){return Global.Waste.ww_KPI_GHG_ne_ch4_unt()}, //old c_ww52
		ww_KPI_GHG_ne_n2o_unt:function(){return Global.Waste.ww_KPI_GHG_ne_n2o_unt()}, //old c_ww51 
		ww_KPI_GHG_ne_unt:    function(){return Global.Waste.ww_KPI_GHG_ne_unt()},
		ww_KPI_GHG_ne_tre:    function(){return Global.Waste.ww_KPI_GHG_ne_tre()},
		ww_KPI_GHG_ne:        function(){return Global.Waste.ww_KPI_GHG_ne()}, 
		ww_KPI_GHG:           function(){return Global.Waste.ww_KPI_GHG()},

		//other
		//ws
		wsg_KPI_nrg_cons:function(){return Global.Water.Abstraction.wsa_nrg_cons + Global.Water.Treatment.wst_nrg_cons + Global.Water.Distribution.wsd_nrg_cons},
		wsg_KPI_nrg_x_ye:function(){return this.wsg_KPI_nrg_cons()/Global.General.Years()},
		wsg_KPI_nrg_x_ys:function(){return this.wsg_KPI_nrg_x_ye()/Global.Water.ws_serv_pop},
		wsg_KPI_nrg_x_m3:function(){return this.wsg_KPI_nrg_cons()/Global.Water.Distribution.wsd_auth_con},
		wsg_KPI_std_nrg_:function(){return (Global.Water.Abstraction.wsa_KPI_std_nrg_cons()+Global.Water.Distribution.wsd_KPI_std_nrg_cons())/2},
		ws_SL_nrg_cost:  function(){return Global.Water.ws_SL_nrg_cost()},
		//ww
		wwg_KPI_nrg_cons:function(){return Global.Waste.Collection.wwc_nrg_cons+Global.Waste.Treatment.wwt_nrg_cons+Global.Waste.Discharge.wwd_nrg_cons},
		wwg_KPI_nrg_x_ye:function(){return this.wwg_KPI_nrg_cons()/Global.General.Years()},
		wwg_KPI_nrg_x_ys:function(){return this.wwg_KPI_nrg_x_ye()/Global.Waste.ww_serv_pop},
		wwg_KPI_nrg_x_br:function(){return this.wwg_KPI_nrg_cons()/Global.Waste.Treatment.c_wwt_bod_rmvd()},
		wwg_KPI_std_nrg_:function(){return (Global.Waste.Collection.wwc_KPI_std_nrg_cons()+Global.Waste.Discharge.wwd_KPI_std_nrg_cons())/2},
		wwg_KPI_nrg_perc:function(){return 100*this.wwg_KPI_nrg_cons()/Global.Waste.ww_nrg_cons},
		ww_SL_nrg_cost:  function(){return Global.Waste.ww_SL_nrg_cost()},

		//rest of service level indicators
		ws_SL_serv_pop:function(){return Global.Water.ws_SL_serv_pop()},
		ws_SL_auth_con:function(){return Global.Water.ws_SL_auth_con()},
		ws_SL_non_revw:function(){return Global.Water.ws_SL_non_revw()},
		ww_SL_serv_pop:function(){return Global.Waste.ww_SL_serv_pop()},
		ww_SL_vol_pday:function(){return Global.Waste.ww_SL_vol_pday()},
		ww_SL_treat_m3:function(){return Global.Waste.ww_SL_treat_m3()},
		ww_SL_dilution:function(){return Global.Waste.ww_SL_dilution()},
	},

	/**Configuration: custom user preferences*/
	Configuration:{
		ActiveStages:{
			"water":0,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteCol":0,
			"wasteTre":0,
			"wasteDis":0,
		},
		Assessment:{//TODO to be removed
			Water:{
				Abstraction:"advanced",
				Treatment:"advanced",
				Distribution:"advanced",
			},
			Waste:{
				Collection:"advanced",
				Treatment:"advanced",
				Discharge:"advanced",
			}
		},

		Units:{ }, //custom unit selections for variables are stored here //TODO write an example

		/**Calculated or "estimated" assumptions are added here. (calculated is default, so only estimated is added here) */
		//TBD
		DataQuality:{ },

		//TODO check where this is used
		Selected:
		{
			Country_protein:"Albania", //this is for consumed protein //TODO
			ww_treatment:"None",
			FuelType:
			{
				truck_transport_waste : "Diesel",
				wsa_engines           : "Diesel",
				wst_engines           : "Diesel",
				wsd_engines           : "Diesel",
				wsd_trucks            : "Diesel",
				wwc_engines           : "Diesel",
			},
		},

		"Yes/No": //default answers for questions ("questions.js")
		{
			pumping_for_abstraction: 0,
			truck_transport_waste:   1,
			producing_biogas:        0,
			valorizing_biogas:       0,
		},
	},
};

//fix for wrapper equations, otherwise the formula appears incorrectly at variable.php
Global.Water.wsa_KPI_GHG=function(){return Global.Water.Abstraction.wsa_KPI_GHG()};
Global.Water.wst_KPI_GHG=function(){return Global.Water.Treatment.wst_KPI_GHG()};
Global.Water.wsd_KPI_GHG=function(){return Global.Water.Distribution.wsd_KPI_GHG()};
Global.Water.ws_KPI_GHG=function(){return this.wsa_KPI_GHG()+this.wst_KPI_GHG()+this.wsd_KPI_GHG()};
