/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[WAIT]    Discuss graphs with IWA",
		"[WAIT]    Translation after v2 in english is complete",
		"[WAIT]    Add in the help page an example json file, after I/O structure does not change anymore",
		"[IDEA]    Add the sankey diagram (all water flows) (at 'graphs.js')",
		"[IDEA]    Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[DONE] merge inputs and outputs from the filters in wwd Discharge",
		"[DONE] modify the name of type of reuse (wwd_reus_typ)",
		"[DONE] removed wwd_trb_head (turbine head)",
		"[DONE] name change in volume of wastewater dischared 'to water body'",
		"[DONE] hidden energy for incineration and outputs related",
		"[DONE] rearranged filters for wwc Collection",
		"[DONE] changed name for filter 'are you producing biogas'",
		"[DONE] implemented wwt_bod_slud estimation from table of percents",
		"[DONE] Change EF in CH4 from uncollected wastewater from 0.06 kg CH4/kg BOD to 0.3 kg CH4/kg BOD",
		"[DONE] Change the EF for Aerated Lagoon from 0.18 to 0.06",
		"[DONE] Rename 'Global GHG Assessment' to 'Initial GHG Asessment'",
		"[PENDING] wwt Treatment - hide energy for land application, fuel for land application and related outputs (long)",
		"[PENDING] wwt Treatment - hide CO2 for each disposal method",
		"[PENDING] Energy summary only for consumption (easy, but time consuming)",
		"[PENDING] GHG summary, modify units (easy, but time consuming)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
