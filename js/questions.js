/** 
  FUNCTIONS TO DEAL WITH QUESTIONS
  Questions hide or show variables depending on answer [yes|no]
 */

var Questions = {

	"varsPerQuestion":
	{
		"Do you have fuel engines to run pumps" :["dD1","dW1"],
		"Are you producing biogas"              :["dM1","wtV9","wV10","wtV11"],
		"Are you producing electrical energy"   :["gV5w","gV6w","aV3","gV5ww","gV6ww","wdV3","aV3","dV13","wdV3"],
		"Is your topography flat"               :["dV2","dV3","dV4","dV5","dV6","dV13",]
	},

	//HIDE VARIABLES ACCORDING TO QUESTIONS IN CONFIGURATION 
	"varsToHide":function()
	{
		var vars=[];
		for(stage in Global.Configuration.Questions)
		{
			for(question in Global.Configuration.Questions[stage])
			{
				console.log(question+"? "+Global.Configuration.Questions[stage][question]);
				if(Global.Configuration.Questions[stage][question]==0)
				{
					vars=vars.concat(Questions.varsPerQuestion[question]);
				}
			}
		}
		return vars
	},
}

