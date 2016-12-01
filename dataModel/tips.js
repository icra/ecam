/* Random tips */

var Tips = [
	"Use the TAB key to input values faster",
	"Double click a graph to download it",
	"Export results to Excel at Main Menu/Summary/Export",
	"Press &uarr; and &darr; when editing inputs to quickly modify the number",
	"Click on the 'untitled' substage header to change its name",
];

Tips.random=function()
{
	var leng = Tips.length;
	var rand = Math.floor(Math.random()*leng)
	return Tips[rand];
}
