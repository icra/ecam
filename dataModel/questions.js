/** 
  FUNCTIONS TO DEAL WITH QUESTIONS
  Questions hide or show variables depending on answer [yes|no]
 */

var Questions = {

	//All questions, unsorted. sorting is in Global.Configuration.Questions
	varsPerQuestion:
	{
		"Do you have fuel engines to run pumps" :[],
		"Are you producing biogas"              :[],
		"Are you producing electrical energy"   :[],
		"Is your topography flat"               :[],
	},

	//get a list of variables that have to be hidden according to configuration
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

