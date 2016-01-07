/** 
  FUNCTIONS TO DEAL WITH QUESTIONS
  Questions hide or show variables depending on answer [yes|no]
 */

var Questions = {

	varsPerQuestion:
	{
		"Do you have fuel engines to run pumps" :["dD1","dW1"],
		/*
			dD1: Water
			dW1: Waste
		*/
		"Are you producing biogas"              :["dM1","wtV9","wtV10","wtV11"],
		/*
			dM1:   Waste
			wtV9:  Waste.Treatment
			wtV10: Waste.Treatment
			wtV11: Waste.Treatment
		*/
		"Are you producing electrical energy"   :["gV5w","gV6w","aV3","gV5ww","gV6ww","wdV3","aV3","dV13","wdV3"],
		"Is your topography flat"               :["dV2","dV3","dV4","dV5","dV6","dV13",]
	},

	//HIDE VARIABLES ACCORDING TO QUESTIONS IN CONFIGURATION 
	varsToHide:function()
	{
		var vars=[];
		for(stage in Global.Configuration.Questions)
		{
			for(question in Global.Configuration.Questions[stage])
			{
				if(Global.Configuration.Questions[stage][question]==0)
				{
					vars=vars.concat(Questions.varsPerQuestion[question]);
				}
			}
		}
		return vars;
	},

	/**
	 * Hide <tr field="field"> according to Questions.varsToHide()
	 */
	hideFields:function()
	{
		Questions.varsToHide().forEach(function(field)
		{
			console.log("Questions: hiding variable "+field+" located in "+JSON.stringify(locateVariable(field)))
			var elements = document.querySelectorAll('tr[field='+field+']')
			for(var i=0;i<elements.length;elements[i++].style.backgroundColor='pink'){}
		})
	}
}

