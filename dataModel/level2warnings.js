/* variables shown in level2 with a warning that cannot be calculated*/

var Level2Warnings=
{
	wdE3:"Level 3 data is required",
	wdE5:"Level 3 data is required",
	gE2w:"Level 2 data is used",
}

Level2Warnings.isIn=function(code)
{
	for(var field in this)
	{
		if(field==code)
		{
			return true;
			break;
		}
	}
	return false;
}
