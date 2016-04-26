/* variables shown in level2 BUT not in level3 */

var Level2only = {

	list:
	[
		"ws_SL_non_revw",
	],

	isInList:function(code)
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
	},
};
