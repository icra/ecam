/* variables hidden in level 2, shown in level3: */

var Level3={};

Level3.list=
[
	"code1","code2","not_implemented",
];

Level3.isInList=function(code)
{
	for(var i in this.list)
	{
		if(code==this.list[i]){return true;break;}
	}
	return false;
}
