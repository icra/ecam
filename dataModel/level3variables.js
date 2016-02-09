/* variables hidden in level 2, shown in level3: */

var Level3={};

Level3.list=
[
	"wsa4","wsa5","wsa6","wsa7","wsa8","wsa9","wsa10","c_wsa50",
	"wst3","wst4","wst5","wst6","wst7","wst8","wst9","wst10","wst11","wst12","wst13","wst14","wst15","wst16","c_wst50",
	"wsd2","wsd3","wsd4","wsd9","wsd10","wsd11","wsd12","wsd13","wsd14","wsd15","wsd16","wsd17","wsd18","wsd19","c_wsd50","c_wsd51","c_wsd52","c_wsd53","c_wsd54",
	"wwc3","wwc4","c_wwc50",
	"wwt15","wwt16","wwt17","wwt18","wwt19","wwt20","wwt21","wwt22","wwt23","wwt24","wwt25","c_wwt61",
	"wwd5","wwd6","wwd7","wwd8","c_wwd50","c_wwd51",
	"aE3","aE5","aE6","aE7",
	"tE01","tE02","tE03","tE04","tE05","tE06","tE4",
	"dE3","dE4","dE5","dE6","dE7",
];

Level3.isInList=function(code)
{
	for(var i in this.list)
	{
		if(code==this.list[i]){return true;break;}
	}
	return false;
}
