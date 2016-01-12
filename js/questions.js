/** 
  FUNCTIONS TO DEAL WITH QUESTIONS
  Questions hide or show variables depending on answer [yes|no]
 */

var Questions = {

	varsPerQuestion:
	{
		"Do you have fuel engines to run pumps" :['ws1','ws2'],
		"Are you producing biogas"              :[],
		"Are you producing electrical energy"   :[],
		"Is your topography flat"               :[],
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

