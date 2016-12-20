/* Random tips */
var Tips = [
	"Use the TAB key to input values faster",
	"Double click a graph to download it",
	"Export results to Excel at Main Menu/Summary/Export",
	"Press &uarr; and &darr; when editing inputs to quickly modify the number",
	"Click on the 'untitled' substage header to change its name",
	"Drag the mouse over inputs to highlight related outputs",
	"Drag the mouse over outputs highlight related inputs",
	"Drag the mouse over active questions to highlight related inputs and outputs",
];

Tips.random=function()
{
	var leng=Tips.length;
	if(leng==0){return}
	var rand=Math.floor(Math.random()*leng);
	var tip=Tips[rand];
	Tips.splice(rand,1);
	return tip;
}
