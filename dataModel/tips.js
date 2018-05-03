/* Random tips */
var Tips=[
	"Use the TAB key (&rarrb;) to input values faster",
	"Double click a graph to download it",
	"Export results to Excel at Main Menu/Other/Export",
	"Press &uarr; and &darr; when editing inputs to quickly increase/decrease the number",
	"Click on the 'untitled' substage header to change its name",
	"Move the mouse over inputs to highlight related outputs",
	"Move the mouse over outputs to highlight related inputs",
	"Use fullscreen mode in your browser to work more comfortably",
	"Move the mouse over an output to see its formula",
];

Tips.random=function() {
	var leng=Tips.length;
	var rand=Math.floor(Math.random()*leng);
	var tip=Tips[rand];
	if(leng>1){Tips.splice(rand,1);}
	return tip;
}
