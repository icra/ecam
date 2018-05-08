/**
  * Some variables need to be averaged instead of summed up (in substages level)
  *
  */

var Averaged={
	list:[
    //wsa
		"wsa_pmp_exff",
    //wst
		"wst_tst_carr",
    //wsd
		"wsd_time_pre",
		"wsd_min_pres",
		"wsd_hi_no_el",
		"wsd_lo_no_el",
		"wsd_av_no_el",
		"wsd_wt_el_no",
		"wsd_pmp_exff",
    //wwc
		"wwc_pmp_exff",
    //wwt
		"wwt_ch4_biog",
		"wwt_temp_inc",
		"wwt_ch4_efac",
    //wwd
		"wwd_n2o_effl",
	],

	isAveraged:function(code){
		if(this.list.indexOf(code)+1)
			return true;
		else
			return false;
	},
}
