/*Tasks data structure*/
var TODO = {
	Front:[//frontend
		"[LLUIS] make formulas hide 'Table.find(code,value)', only show 'code' ",
		"[LLUIS] Opportunities page as discussed with Jose",
		"[LLUIS] add 'tabs' in summary co2 for toggling graph and table",
		"[DONE] [TBD] new page to display authorized consumption per person per day indicators (good,acceptable,bad)",
		"[TBD] Where goes the Sankey diagram? (all water flows)",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
	],
	Back:[//backend
		"[LLUIS] [!!] in substages some values are not added correctly, for example: wwt_ch4_efac makes wwt_KPI_GHG_tre_ch4 sum of substages not be correct",
		"[LLUIS] in export: the formula for wsa_KPI_GHG does not appear correctly, when seen from level 1 ws, find why. For analog L1 formulas also.",
		"[IWA] Review list of equations that still have 'magic numbers' (numbers not referenced)<ul>"+
			"<li>c_wwt_nrg_biog (10)"+
			"<li>c_wwt_ch4_pot (0.65)"+
			"<li>wwt_slu_inciner_n2o (0.03, 161.3, 0.14, 0.01)"+
			"<li>wwt_slu_landapp_n2o (30, 0.03, 0.023, 0.005)"+
			"<li>wwt_slu_landfill_ch4 (0.9, 0.5, 0.8, 0.69)"+
			"<li>wwt_slu_landfill_n2o (0.03, 0.04, 0.015)"+
			"<li>wwt_KPI_ghg_land_co2eq (0.02)"+
			"<li>wwt_slu_composting_n2o (0.03, 0.015 )"+
			"<li>wwt_slu_storage_ch4 (5, 20, 0.03, 0.05)"+
		"</ul>",
		"[LLUIS] process task list from last meeting (6-7-17, 7-7-17) from paper notes",
		"[WAIT] Translation will be done after v2 in english is complete (IWA should say this)",
		"[IDEA] Add an object inside Global for sources (elec,co2,n2o,ch4)",
		"[IDEA] Avoid document.write function when possible",
		"[IDEA] function to check if two constant codes are repeated",
		"[IDEA] a pair of buttons to increase/decrease decimals",
		"[IDEA] support firefox implementing 'event' ",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){
	arr.forEach(function(task){
		document.write("<li>"+task.replace(/^(\[.*\])/g,"<span style=background:yellow>$1</span>"))
	})
};
