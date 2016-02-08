
//variables that not behave like normal ones are treated here
//ww13: annual per capita protein consumption selected from a list

var Exceptions =
{
	//wrapper
	apply:function()
	{
		this.ww13();
	},

	//make ww13 selection (which is inside its description) stay selected
	ww13:function()
	{
		var options=document.querySelectorAll('#ww13options option');
		for(var i=0;i<options.length;i++)
		{
			if(parseFloat(options[i].value)==Global.Waste.ww13)
			{
				options[i].selected='true'; break;
			}
		}
	},
}
