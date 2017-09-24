<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		"use strict";
		// Opportunities: potential GHG reductions
		var opps = {
			// share vars //
			g_nrw_water_vol_opps : 0,
			g_nrw_water_vol_opps_em : 0,
      g_end_user_consumption_opps : 0,
      g_end_user_consumption_opps_em : 0,
			g_water_reuse_opps : 0,
			g_water_reuse_opps_em : 0,
			g_dw_energy_consumption_opps : 0,
			g_dw_energy_consumption_opps_em : 0,
			g_ww_infl_opps : 0,
			g_ww_infl_opps_em : 0,
			g_ww_grid_energy_consumption_opps : 0,
			g_ww_grid_energy_consumption_opps_em : 0,
			g_ww_slu_opps : 0,
			g_ww_slu_opps_em : 0,
			g_ww_water_reuse_opps : 0,
			g_ww_water_reuse_opps_em : 0,
			g_ww_biogas_opps : 0,
			g_ww_biogas_opps_em : 0,
			// share sum function //
			g_update_total : function() {
				var ghg_sum = this.g_nrw_water_vol_opps_em +
									    this.g_end_user_consumption_opps_em +
				              this.g_water_reuse_opps_em +
											this.g_dw_energy_consumption_opps_em +
											this.g_ww_infl_opps_em +
											this.g_ww_grid_energy_consumption_opps_em +
											this.g_ww_slu_opps_em +
											this.g_ww_water_reuse_opps_em +
											this.g_ww_biogas_opps_em;

				var total = Global.General.TotalGHG() - ghg_sum;
				var percent = ((Global.General.TotalGHG() - total) / Global.General.TotalGHG()) * 100;
				document.querySelector('#measure-footer-reduction').innerHTML=format(ghg_sum);
				document.querySelector('#measure-footer-total').innerHTML=format(total);
				document.querySelector('#measure-footer-percent-reduction').innerHTML=format(percent.toFixed(2));
				updateResult();
			},

			tbl_opps : {
				"header" : { "title" : "Opportunities", "col1" : "kg CO<sub>2</sub>e reduction <br> per 1% change <br> of current value</th>"},
				"body" : [
					{ "type" : "ws",
						"title" : "Non Revenue Water Volume",
						"ghg_em" : function() {
							var wsd_kpi_ghg_s = Global.Water.Distribution.wsd_KPI_GHG() / Global.Water.Distribution.wsd_vol_dist;
						  var wst_kpi_ghg_s = Global.Water.Treatment.wst_KPI_GHG() / Global.Water.Treatment.wst_vol_trea;
						  var wsa_kpi_ghg_s = Global.Water.Abstraction.wsa_KPI_GHG() / Global.Water.Abstraction.wsa_vol_conv;
						  var kpi_ghg_s = wsd_kpi_ghg_s + wst_kpi_ghg_s + wsa_kpi_ghg_s;
							opps.g_nrw_water_vol_opps = (Global.Water.Distribution.wsd_vol_dist - Global.Water.Distribution.wsd_bill_con) * kpi_ghg_s;
							var emissions = 0.01 * opps.g_nrw_water_vol_opps;
							return emissions;
						}
					},
					{ "type" : "ws",
						"title" : "End-user consumption",
						"ghg_em" : function() {
							var wsd_kpi_ghg_s = Global.Water.Distribution.wsd_KPI_GHG() / Global.Water.Distribution.wsd_vol_dist;
						  var wst_kpi_ghg_s = Global.Water.Treatment.wst_KPI_GHG() / Global.Water.Treatment.wst_vol_trea;
						  var wsa_kpi_ghg_s = Global.Water.Abstraction.wsa_KPI_GHG() / Global.Water.Abstraction.wsa_vol_conv;
						  var kpi_ghg_s = wsd_kpi_ghg_s + wst_kpi_ghg_s + wsa_kpi_ghg_s;
							opps.g_end_user_consumption_opps = Global.Water.Distribution.wsd_bill_con * kpi_ghg_s;
						  var emissions = 0.01 * opps.g_end_user_consumption_opps;
							return emissions;
						}
					},
					{ "type" : "ws",
						"title" : "*Water reuse (to replace potable water for non-potable purposes)",
						"ghg_em" : function() {
							var wsd_kpi_ghg_s = Global.Water.Distribution.wsd_KPI_GHG() / Global.Water.Distribution.wsd_vol_dist;
							var wst_kpi_ghg_s = Global.Water.Treatment.wst_KPI_GHG() / Global.Water.Treatment.wst_vol_trea;
							var wsa_kpi_ghg_s = Global.Water.Abstraction.wsa_KPI_GHG() / Global.Water.Abstraction.wsa_vol_conv;
							var kpi_ghg_s = wsd_kpi_ghg_s + wst_kpi_ghg_s + wsa_kpi_ghg_s;
							opps.g_water_reuse_opps = Global.Water.Distribution.wsd_bill_con * kpi_ghg_s;
							var emissions = 0.01 * opps.g_water_reuse_opps;
							return emissions;
						}
					},
					{ "type" : "ws",
						"title" : "Drinking water grid energy consumption",
						"ghg_em" : function() {
							opps.g_dw_energy_consumption_opps = Global.Water.ws_nrg_cons() * Global.General.conv_kwh_co2;
							var emissions = 0.01 * opps.g_dw_energy_consumption_opps;
							return emissions;
						}
					},
					{ "type" : "ww",
						"title" : "Infiltration/Inflow",
						"ghg_em" : function() {
							var wwc_kpi_ghg_s = (Global.Waste.Collection.wwc_vol_conv == (null || 0)) ? 0 : (Global.Waste.Collection.wwc_KPI_GHG() / Global.Waste.Collection.wwc_vol_conv);
							var wwt_kpi_ghg_s = (Global.Waste.Treatment.wwt_vol_trea == (null || 0))  ? 0 : (Global.Waste.Treatment.wwt_KPI_GHG() / Global.Waste.Treatment.wwt_vol_trea);
							var wwd_kpi_ghg_s = (Global.Waste.Discharge.wwd_vol_disc == (null || 0))  ? 0 : (Global.Waste.Discharge.wwd_KPI_GHG() / Global.Waste.Discharge.wwd_vol_disc);
							var kpi_ghg_s = wwc_kpi_ghg_s + wwt_kpi_ghg_s + wwd_kpi_ghg_s;
							opps.g_ww_infl_opps = Global.Waste.Collection.c_wwc_vol_infl() * kpi_ghg_s;
							var emissions = 0.01 * opps.g_ww_infl_opps;
							return emissions;
						}
					},
					{ "type" : "ww",
						"title" : "Wastewater grid energy consumption",
						"ghg_em" : function() {
							opps.g_ww_grid_energy_consumption_opps = Global.Waste.ww_nrg_cons() * Global.General.conv_kwh_co2;
							var emissions = 0.01 * opps.g_ww_grid_energy_consumption_opps;
							return emissions;
						}
					},
					{ "type" : "ww",
						"title" : "Sludge Disposed",
						"ghg_em" : function() {
							var wwt_kpi_ghg_sto_co2eq_s   = (Global.Waste.Treatment.wwt_mass_slu_sto   == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_ghg_sto_co2eq() / Global.Waste.Treatment.wwt_mass_slu_sto);
							var wwt_kpi_ghg_comp_co2eq_s  = (Global.Waste.Treatment.wwt_mass_slu_comp  == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_ghg_comp_co2eq() / Global.Waste.Treatment.wwt_mass_slu_comp);
							var wwt_kpi_ghg_inc_co2eq_s   = (Global.Waste.Treatment.wwt_mass_slu_inc   == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_ghg_inc_co2eq() / Global.Waste.Treatment.wwt_mass_slu_inc);
							var wwt_kpi_ghg_app_co2eq_s   = (Global.Waste.Treatment.wwt_mass_slu_app   == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_ghg_app_co2eq() / Global.Waste.Treatment.wwt_mass_slu_app);
							var wwt_kpi_ghg_land_co2eq_s  = (Global.Waste.Treatment.wwt_mass_slu_land  == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_ghg_land_co2eq() / Global.Waste.Treatment.wwt_mass_slu_land);
							var wwt_kpi_ghg_stock_co2eq_s = (Global.Waste.Treatment.wwt_mass_slu_stock == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_ghg_stock_co2eq() / Global.Waste.Treatment.wwt_mass_slu_stock);
							var slu_kpi_ghg = ( wwt_kpi_ghg_sto_co2eq_s +
							                    wwt_kpi_ghg_comp_co2eq_s +
																  wwt_kpi_ghg_inc_co2eq_s +
																  wwt_kpi_ghg_app_co2eq_s +
																  wwt_kpi_ghg_land_co2eq_s +
																	wwt_kpi_ghg_stock_co2eq_s );
							opps.g_ww_slu_opps = Global.Waste.Treatment.wwt_dryw_slu * slu_kpi_ghg;
							var emissions = 0.01 * opps.g_ww_slu_opps;
							return emissions;
						}
					},
					{ "type" : "ww",
						"title" : "Water Reuse (to avoid discharge to water body)",
						"ghg_em" : function() {
							opps.g_ww_water_reuse_opps = Global.Waste.Discharge.wwd_vol_disc *
																           (Global.Waste.Discharge.wwd_KPI_GHG() / Global.Waste.Discharge.wwd_vol_disc);
							var emissions = 0.01 * opps.g_ww_water_reuse_opps;
							return emissions;
						}
					},
					{ "type" : "ww",
						"title" : "Reduce Biogas Flared",
						"ghg_em" : function() {
							var biog_kpi_ghg = (Global.Waste.Treatment.c_wwt_biog_fla() == (null || 0)) ? 0 : (Global.Waste.Treatment.wwt_KPI_GHG_biog() / Global.Waste.Treatment.c_wwt_biog_fla());
							opps.g_ww_biogas_opps = Global.Waste.Treatment.c_wwt_biog_fla() * biog_kpi_ghg;
							var emissions = 0.01 * opps.g_ww_biogas_opps;
							return emissions;
						}
					}
				]
			},

      tbl_stage : {
				"header" : { "title" : "Stage", "col1" : "Current Total GHG Emission (kg CO<sub>2</sub>e)"},
				"body" : [
					{ "type" : "wsa", "title" : "Drinking Water Abstraction", "ghg_em" : function() { return Global.Water.Abstraction.wsa_KPI_GHG(); } },
					{ "type" : "wst", "title" : "Drinking Water Treatment", "ghg_em" : function() { return Global.Water.Treatment.wst_KPI_GHG(); } },
					{ "type" : "wsd", "title" : "Drinking Water Distribution", "ghg_em" : function() { return Global.Water.Distribution.wsd_KPI_GHG(); } },
					{ "type" : "wwc", "title" : "Wastewater Collection", "ghg_em" : function() { return Global.Waste.Collection.wwc_KPI_GHG(); } },
					{ "type" : "wwt", "title" : "Wastewater Treatment", "ghg_em" : function() { return Global.Waste.Treatment.wwt_KPI_GHG(); } },
					{ "type" : "wwd", "title" : "Wastewater Discharge", "ghg_em" : function() { return Global.Waste.Discharge.wwd_KPI_GHG(); } }
				],
				"footer" : { "title" : "Total System-Wide", "ghg_total" : function() {
					return Global.Water.Abstraction.wsa_KPI_GHG() +
					       Global.Water.Treatment.wst_KPI_GHG() +
								 Global.Water.Distribution.wsd_KPI_GHG() +
								 Global.Waste.Collection.wwc_KPI_GHG() +
								 Global.Waste.Treatment.wwt_KPI_GHG() +
								 Global.Waste.Discharge.wwd_KPI_GHG();
				} }
			},

			tbl_measure : {
				"header" : {
					"title" : "Measure",
					"col1" : "Desired Percent Change",
					"col2" : "GHG Emission Reduction (kg CO<sub>2</sub>e)",
					"col3" : "New Total System-Wide GHG Emission (kg CO<sub>2</sub>e)",
					"col4" : "Percent GHG Reduction"
				},
				"body" : [
					{ "type" : "ws",
						"title" : "Non Revenue Water Volume",
						"dper" : function() { return Global.Opps.g_nrw_water_vol_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_nrw_water_vol_opps_em = ((percent / 100) * opps.g_nrw_water_vol_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_nrw_water_vol_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_nrw_water_vol_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_nrw_water_vol_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ws",
						"title" : "End-user consumption",
						"dper" : function() { return Global.Opps.g_end_user_consumption_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_end_user_consumption_opps_em = ((percent / 100) * opps.g_end_user_consumption_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_end_user_consumption_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_end_user_consumption_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_end_user_consumption_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ws",
						"title" : "*Water reuse (to replace potable water for non-potable purposes)",
						"dper" : function() { return Global.Opps.g_water_reuse_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_water_reuse_opps_em = ((percent / 100) * opps.g_water_reuse_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_water_reuse_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_water_reuse_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_water_reuse_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ws",
						"title" : "Drinking water grid energy consumption",
						"dper" : function() { return Global.Opps.g_dw_energy_consumption_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_dw_energy_consumption_opps_em = ((percent / 100) * opps.g_dw_energy_consumption_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_dw_energy_consumption_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_dw_energy_consumption_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_dw_energy_consumption_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ww",
						"title" : "Infiltration/Inflow",
						"dper" : function() { return Global.Opps.g_ww_infl_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_ww_infl_opps_em = ((percent / 100) * opps.g_ww_infl_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_ww_infl_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_ww_infl_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_ww_infl_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ww",
						"title" : "Wastewater grid energy consumption",
						"dper" : function() { return Global.Opps.g_ww_grid_energy_consumption_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_ww_grid_energy_consumption_opps_em = ((percent / 100) * opps.g_ww_grid_energy_consumption_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_ww_grid_energy_consumption_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_ww_grid_energy_consumption_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_ww_grid_energy_consumption_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ww",
						"title" : "Sludge Disposed",
						"dper" : function() { return Global.Opps.g_ww_slu_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_ww_slu_opps_em = ((percent / 100) * opps.g_ww_slu_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_ww_slu_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_ww_slu_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_ww_slu_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ww",
						"title" : "Water Reuse (to avoid discharge to water body)",
						"dper" : function() { return Global.Opps.g_ww_water_reuse_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_ww_water_reuse_opps_em = ((percent / 100) * opps.g_ww_water_reuse_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_ww_water_reuse_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_ww_water_reuse_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_ww_water_reuse_dper = percent;
							opps.g_update_total();
						}
					},
					{ "type" : "ww",
						"title" : "Reduce Biogas Flared",
						"dper" : function() { return Global.Opps.g_ww_biogas_dper; },
						"ghg_em" : function(percent,i) {
							opps.g_ww_biogas_opps_em = ((percent / 100) * opps.g_ww_biogas_opps);
							var total_nrw = Global.General.TotalGHG() - opps.g_ww_biogas_opps_em;
							var total_nrw_percent = ((Global.General.TotalGHG() - total_nrw) / Global.General.TotalGHG()) * 100;
							document.querySelector('#measure-body-reduction' + '-'.concat(i)).innerHTML = format(opps.g_ww_biogas_opps_em);
							document.querySelector('#measure-body-total' + '-'.concat(i)).innerHTML = format(total_nrw);
							document.querySelector('#measure-body-percent-reduction' + '-'.concat(i)).innerHTML = format(total_nrw_percent);
							Global.Opps.g_ww_biogas_dper = percent;
							opps.g_update_total();
						}
					}
				],
				"footer" : {
					"title" : "Measure Total",
					"ghg_em" : function() {
						opps.g_update_total();
					}
				}
			}
		};

		// Render Opportunities Table //
		function renderOppsTemplate(opps_tbl) {
			if('content' in document.createElement('template')) {
					// HEADER
					var col1 = document.getElementById('opps-col-1');
					col1.innerHTML = opps_tbl.header.col1;

					// BODY
					opps_tbl.body.forEach(function (val, i) {
						var tmpl = document.getElementById('opps-body-template').content.cloneNode(true);
						var title = tmpl.getElementById('opps-body-title');
						title.style.background = (val.type.toString().substring(0,2) === 'ws') ? "#00adef" : "#d71d24";
						title.innerHTML = val.title;

						var ghg = tmpl.getElementById('opps-body-ghg');
						ghg.style.textAlign = 'right';
						ghg.innerHTML = format(val.ghg_em()) + " kg CO<sub>2</sub>e" ;
						document.getElementById('opps-body').appendChild(tmpl);
					});
			}else {
				console.log("==browser has no template support==");
			}
		}

		// Render Stage Table //
		function renderStageTemplate(stage_tbl) {
			if ('content' in document.createElement('template')) {
				// HEADER
				var col1 = document.getElementById('stage-col-1');
				col1.innerHTML = stage_tbl.header.col1;

				// BODY
				stage_tbl.body.forEach(function (val, i) {
					var tmpl = document.getElementById('stage-body-template').content.cloneNode(true);
					var title = tmpl.getElementById('stage-body-title');

					title.style.background = (val.type.toString().substring(0,2) === 'ws') ? "#00adef" : "#d71d24";
					title.innerText = val.title;

					var ghg = tmpl.getElementById('stage-body-ghg');
					ghg.style.textAlign = 'right';
					ghg.innerText = format(val.ghg_em());
					document.getElementById('stage-body').appendChild(tmpl);
				});

				// FOOTER
				var title = document.getElementById('stage-footer-title');
				title.innerHTML = stage_tbl.footer.title;

				var ghg_total = document.getElementById('stage-footer-ghg');
				ghg_total.innerHTML = format(stage_tbl.footer.ghg_total());

			}else {
				console.log("==browser has no template support==");
			}
		}

		// Render Measure Table //
		function renderMeasureTemplate(measure_tbl) {
			if('content' in document.createElement('template')) {
					// HEADER
					document.getElementById('measure-col-1').innerHTML = measure_tbl.header.col1;
					document.getElementById('measure-col-2').innerHTML = measure_tbl.header.col2;
					document.getElementById('measure-col-3').innerHTML = measure_tbl.header.col3;
					document.getElementById('measure-col-4').innerHTML = measure_tbl.header.col4;

					// BODY
					measure_tbl.body.forEach(function (val, i) {
						var tmpl = document.getElementById('measure-body-template').content.cloneNode(true);
						var title = tmpl.getElementById('measure-body-title');
						title.style.background = (val.type.toString().substring(0,2) === 'ws') ? "#00adef" : "#d71d24";
						title.innerHTML = val.title;

						var input = tmpl.getElementById('measure-body-input');
						input.value = val.dper();

						var reduction = tmpl.getElementById('measure-body-reduction');
						reduction.id += '-' + i;
					  reduction.style.textAlign = 'right';
						reduction.innerHTML = "-";
						var total = tmpl.getElementById('measure-body-total');
						total.id += '-' + i;
					  total.style.textAlign = 'right';
						total.innerHTML = "-";
						var percent = tmpl.getElementById('measure-body-percent-reduction');
						percent.id += '-' + i;
					  percent.style.textAlign = 'right';
						percent.innerHTML = "-";

						input.onchange = function(event) { val.ghg_em(parseFloat(event.target.value), i) };    // attach onchange callback

						document.getElementById('measure-body').appendChild(tmpl);

						val.ghg_em(parseFloat(input.value), i);    // invoke on init table
					});

					// FOOTER
					var title = document.getElementById('measure-footer-title');
					title.innerHTML = measure_tbl.footer.title;
					var reduction = document.getElementById('measure-footer-reduction');
					reduction.style.textAlign = 'right';
					reduction.innerHTML = "-";
					var total = document.getElementById('measure-footer-total');
					total.style.textAlign = 'right';
					total.innerHTML = "-";
					var percent = document.getElementById('measure-footer-percent-reduction');
					percent.style.textAlign = 'right';
					percent.innerHTML = "-";

			}else {
				console.log("==browser has no template support==");
			}
		}

		function init(){
			document.getElementById('TotalGHG').innerHTML=format(Global.General.TotalGHG());
			renderOppsTemplate(opps.tbl_opps);
			renderStageTemplate(opps.tbl_stage);
			renderMeasureTemplate(opps.tbl_measure);
			opps.g_update_total();
			updateResult();
		}

	</script>

	<style>
		#root #container_TotalGHG {
			font-size:18px;
  	#}

		.body-title {
			text-align: left;
		}

		.body-ghg {
			text-align: right;
		}
	</style>

</head><body onload=init()><center>
<!--includes-->
	<!--sidebar--><?php include'sidebar.php'?>
	<!--navbar--><?php include'navbar.php'?>
	<!--linear--><?php include'linear.php'?>
<!--/includes-->
<div style="textAlign: center">
	<h1>Opportunities to reduce GHG emissions</h1>

	<!-- including link to catalogue of solutions -->
	<a href="http://www.iwa-network.org/water-climate-energy-solutions/public/"
		style="font-weight: bold; color: grey;">[Catalogue of Solutions]
	</a>
</div>

<div id=root>

	<!--total ghg indicator-->
	<p id=container_TotalGHG>
		System wide GHG emissions:
		<span id=TotalGHG>Loading...</span>
		kg CO<sub>2</sub>e
	</p>

	<!-- div for opps & stage (~30% width) -->
	<div class="inline" style="width:28%">

		<!-- opps card -->
		<div class="card" id="opps_table">
			<?php cardMenu("Opportunities") ?>
			<table>
				<thead>
					<tr>
						<th style="background:#d7bfaf">Opportunities</th>
						<th id="opps-col-1" style="text-align: center; color: black; background: #f5ecce;">Loading....</th>
					</tr>
				</thead>
				<tbody id="opps-body">
					<template id="opps-body-template">
						<tr>
							<td class="body-title" id="opps-body-title">Loading....</td>
							<td class="body-ghg" id="opps-body-ghg">Loading....</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>

		<!-- stages card -->
		<div class="card" id="stage_table">
			<?php cardMenu("Stage") ?>
			<table>
				<thead>
					<tr>
						<th style="background:#d7bfaf">Stage</th>
						<th id="stage-col-1" style="text-align: center; color: black; background: #f5ecce;">Loading....</th>
					</tr>
				</thead>
			  <tbody id="stage-body">
				  <template id="stage-body-template">
						<tr>
					  	<td class="body-title" id="stage-body-title">Loading....</td>
							<td class="body-ghg" id="stage-body-ghg">Loading....</td>
						</tr>
					</template>
		 	  </tbody>
				<tfoot>
					<tr>
						<td class="footer-title" id="stage-footer-title" style="background: #8cc63f;">Loading....</td>
						<td class="footer-ghg" id="stage-footer-ghg" style="text-align: right;">Loading....</td>
					</tr>
				</tfoot>
			</table>
		</div>

	</div>

	<!-- div (~70% width) -->
	<div class="inline" style="width: 70%">

		<!-- measure card -->
		<div class="card" id="measure_table">
			<?php cardMenu("Measures") ?>
			<table>
				<thead>
					<tr>
						<th style="background:#d7bfaf" class="head-title">Measures</th>
						<th class="head-col" id="measure-col-1" style="text-align: center; color: black; background: #f5ecce;">Loading....</th>
						<th class="head-col" id="measure-col-2" style="text-align: center; color: black; background: #f5ecce;">Loading....</th>
						<th class="head-col" id="measure-col-3" style="text-align: center; color: black; background: #f5ecce;">Loading....</th>
						<th class="head-col" id="measure-col-4" style="text-align: center; color: black; background: #f5ecce;">Loading....</th>
					</tr>
				</thead>
			  <tbody id="measure-body">
				  <template id="measure-body-template">
						<tr>
					  	<td class="body-title" id="measure-body-title">Loading....</td>
							<td style="text-align: center;" class="body-ghg" id="measure-body-percent">
								<input type=number
									     style="text-align: center; width: 68%; outline-width: 0;"
											 id='measure-body-input'
									     step='0.1' />
								<span>%</span>
							</td>
							<td class="body-ghg" id="measure-body-reduction">Loading....</td>
							<td class="body-ghg" id="measure-body-total">Loading....</td>
							<td class="body-ghg" id="measure-body-percent-reduction">Loading....</td>
						</tr>
					</template>
		 	  </tbody>
				<tfoot>
					<tr>
						<td colspan="2" class="footer-title" id="measure-footer-title" style="background: #8cc63f;">Loading....</td>
						<td class="footer-ghg" id="measure-footer-reduction" style="text-align: right;">Loading....</td>
						<td class="footer-ghg" id="measure-footer-total" style="text-align: right;">Loading....</td>
						<td class="footer-ghg" id="measure-footer-percent-reduction" style="text-align: right;">Loading....</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>

</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
