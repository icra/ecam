/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[DONE] Graphs requests, add here from paper notes after meeting",

		"[LLUIS] new page to display authorized consumption per person per day indicators (good,acceptable,bad)",

		"[WAIT] Sankey diagram (all water flows) (at 'graphs.js')",
		"[WAIT] Add references (page, chapter, book) to equations (IPCC, BEAM...?)",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
	],
	Back://back-end
	[
		"[DONE] Add estimations for biogas produced and valorised",

		"[DONE] Fix non revenue water formulas. I've moved them to Distribution",

		"[LLUIS] Variables that have 'magic numbers' (numbers not referenced)<ul>"+
			"<li>[TODO] c_wwt_nrg_biog"+
			"<li>[TODO] c_wwt_slu_composting_ch4"+
			"<li>[TODO] c_wwt_biog_fla"+
			"<li>[TODO] c_wwt_ch4_pot"+
			"<li>[TODO] wwt_slu_inciner_n2o"+
			"<li>[TODO] wwt_slu_landapp_n2o"+
			"<li>[TODO] wwt_slu_landfill_ch4"+
			"<li>[TODO] wwt_slu_landfill_n2o"+
			"<li>[TODO] wwt_KPI_ghg_land_co2eq"+
			"<li>[TODO] wwt_slu_storage_ch4"+
		"</ul>",
		"[LLUIS] add an object inside Global for estimations",
		"[LLUIS] add an object inside Global for sources (elec,co2,n2o,ch4)",
		"[LLUIS] add tasks from last meeting (6-7-17, 7-7-17) from paper notes",

		"[WAIT] Translation will be done after v2 in english is complete (IWA should say this)",

		"[IDEA] Avoid document.write function when possible",
		"[IDEA] function to check if two constant codes are repeated",
		"[IDEA] a pair of buttons to increase/decrease decimals",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
