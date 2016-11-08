/* variables shown only in level2 an not in level3 */

var Level2only = {

	list:
	[
		"wsa_KPI_GHG_elec",
		"wsa_KPI_GHG_ne",
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
