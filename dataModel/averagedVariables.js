/**
  * Some variables need to be averaged instead of summed up (in substages level)
  *
  */

var Averaged=
{
	list:[
		"wst_tst_carr",
		"wsd_time_pre",
		"wsd_min_pres",
		"wsd_hi_no_el",
		"wsd_lo_no_el",
		"wsd_av_no_el",
		"wsd_wt_el_no",
		"wwt_ch4_biog",
	],

	isAveraged:function(code)
	{
		for(var i in this.list)
		{
			if(code==this.list[i]){return true;break;}
		}
		return false;
	},
}
