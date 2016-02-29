
//variables that not behave like normal ones are treated here

var Exceptions =
{
	//wrapper
	apply:function()
	{
		this.ww13();
		this.ww_ch4_efac();
	},

	//make ww13 selection (which is inside its description) stay selected
	ww13:function()
	{
		var options=document.querySelectorAll('#ww13options option');
		for(var i=0;i<options.length;i++)
		{
			if(parseFloat(options[i].value)==Global.Waste.ww_prot_con)
			{
				options[i].selected='true'; break;
			}
		}
	},

	ww_ch4_efac:function()
	{
		var options=document.querySelectorAll('#ww_ch4_efac_options option');
		for(var i=0;i<options.length;i++)
		{
			if(parseFloat(options[i].value)==Global.Waste.ww_ch4_efac)
			{
				options[i].selected='true'; break;
			}
		}
	},
}
