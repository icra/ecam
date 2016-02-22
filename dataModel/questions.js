/**
	This object stores in arrays the codes of variables that are hidden if answer is NO
*/

var Questions = 
{
	
	"Are you producing biogas": ["wwt2","c_wwt50","c_ww50"],

	"Are you valorizing biogas":["wwt3","c_wwt53","wwt11","wwt12"],

	"Are you producing electrical energy":["wsg1","wsg2","wsg3","wsg4","wsa3","wwg1","wwg2","wwg3","wwg4","wwd4"],

	"Do you have fuel engines to run pumps":["ww23","ww11","ws16","ws9"],

	"Are you using truck transport to convey sludge to the disposal site":["ww24","ww9"],

	"Is your topography flat":["wsd10","wsd11","wsd12","wsd13","wsd14"],
}

Questions.isHidden = function(field)
{
	//go over all questions
	for(var question in this)
	{
		//if answer is yes, next question
		if(Global.Configuration['Yes/No'][question]==1) continue;

		//if answer is no, look for the field inside
		for(var i in this[question])
		{
			var code=this[question][i];
			if(code==field)
				return true;
		}
	}
	return false;
}
