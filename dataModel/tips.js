/* Random tips */

var Tips = [
	"Use the TAB key to input faster",
	"Double click a graph to download it as a file",
	"Export results to Excel at &#9776;/Summary/Export",
	"Press &uarr; and &darr; when editing an input to quickly modify the number",
];

Tips.random=function()
{
	var leng = Tips.length;
	var rand = Math.floor(Math.random()*leng)
	return Tips[rand];
}
