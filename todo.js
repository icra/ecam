/*Tasks data structure*/
var TODO = {
	Front:[//frontend
		"[LLUIS] Opportunities page as discussed with Jose",

		"[IWA] Where I should place the <a href=sankey.php>Sankey diagram</a>? (all water flows)",
		"[WAIT] Add in the <a href=help.php>help page</a> an example json file, after variable structure does not change anymore",
	],
	Back:[//backend
		"[LLUIS] In export: the formula for wsa_KPI_GHG does not appear correctly, when seen from level 1 ws, because belongs to another data structure, find solution. This happens also for analog L1 formulas also",

		"[IWA] This list of equations still have 'magic numbers' (numbers not referenced)<ul>"+
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
		"[WAIT] Translation will be done only after v2 in english is complete",
	],
	Wish:[//wishlist
		"[LLUIS] Custom Configuration to increase/decrease decimals",
		"[LLUIS] In substages some values are not added correctly, for example: wwt_ch4_efac makes wwt_KPI_GHG_tre_ch4 sum of substages not be correct",
		"[LLUIS] See formulas for 'Sources graph' (elec,co2,n2o,ch4) (add object inside Global)",
		"[LLUIS] Avoid document.write function, reimplement places where it is used for better performance",
		"[LLUIS] Function to check if two constant codes are repeated",
		"[LLUIS] Add Firefox browser compatibility implementing 'event'",
	],
};

/*list tasks inside a <ul id=Front id=Back id=Wish>*/
TODO.list=function(){
	['Front','Back','Wish'].forEach(id=>{
		var ul=document.getElementById(id);
		TODO[id].forEach(task=>{
			var li=document.createElement('li');
			li.innerHTML=task.replace(/^(\[.*\])/g,"<span style=background:yellow>$1</span>");
			ul.appendChild(li);
		});
	});
};
