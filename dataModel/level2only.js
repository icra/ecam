/* variables shown in level2 BUT not in level3 */

var Level2only= {};

Level2only.list=
[
	"not implemented",
]

Level2only.isInList=function(code)
{
	for(var i in this.list)
	{
		if(this.list[i]==code)
		{
			return true;
			break;
		}
	}
	return false;
}
