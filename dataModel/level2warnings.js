/* variables shown in level2 with a warning that cannot be calculated*/

var Level2Warnings=
{
	wx_code_here:"Data required",
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
