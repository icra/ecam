/**
  * BENCHMARKING
  * Outputs reference values for considering them as "good","acceptable","bad",etc
  *
  */

var RefValues = 
{
	//wsa: 2 variables benchmarked
		wsa_KPI_std_nrg_cons:function(obj) {
			var value=obj.wsa_KPI_std_nrg_cons();

			//find type of pump for current object
			var pmp_type; //will be a string
			for(var op in Tables.wsa_pmp_type)
			{
				if(obj.wsa_pmp_type==Tables.wsa_pmp_type[op].value)
				{
					pmp_type=op;
				}
			}

			//find pump size for current object
			var pmp_size; //will be a string
			for(var op in Tables.wsa_pmp_size)
			{
				if(obj.wsa_pmp_size==Tables.wsa_pmp_size[op].value)
				{
					pmp_size=op;
				}
			}

			//different values depending on pump type (Submersible or External)
			if(pmp_type=="Submersible")
			{
				if(pmp_size=="5.6 - 15.7 kW")
				{
					if      (value  >= 0.7877)           return "Unsatisfactory";
					else if (0.7877 >  value && value > 0.5013)   return "Acceptable";
					else if (value  <= 0.5013)           return "Good";
				}
				else if(pmp_size=="15.7 - 38 kW")
				{
					if      (value  >= 0.5866)           return "Unsatisfactory";
					else if (0.5866 >  value && value > 0.4447)   return "Acceptable";
					else if (value  <= 0.4447)           return "Good";
				}
				else if(pmp_size=="39 - 96 kW")
				{
					if      (value  >= 0.4837)           return "Unsatisfactory";
					else if (0.4837 >  value && value > 0.4115)   return "Acceptable";
					else if (value  <= 0.4115)           return "Good";
				}
				else if(pmp_size=="> 96 kW")
				{
					if      (value  >= 0.4673)           return "Unsatisfactory";
					else if (0.4673 >  value && value > 0.4054)   return "Acceptable";
					else if (value  <= 0.4054)           return "Good";
				}
				else return "Out of range";
			}
			else if(pmp_type=="External")
			{
				if(pmp_size=="5.6 - 15.7 kW")
				{
					if      (value  >= 0.5302)           return "Unsatisfactory";
					else if (0.5302 >  value && value > 0.3322)   return "Acceptable";
					else if (value  <= 0.3322)           return "Good";
				}
				else if(pmp_size=="15.7 - 38 kW")
				{
					if      (value  >= 0.4923)           return "Unsatisfactory";
					else if (0.4923 >  value && value > 0.3169)   return "Acceptable";
					else if (value  <= 0.3169)           return "Good";
				}
				else if(pmp_size=="39 - 96 kW")
				{
					if      (value  >= 0.4595)           return "Unsatisfactory";
					else if (0.4595 >  value && value > 0.3080)   return "Acceptable";
					else if (value  <= 0.3080)           return "Good";
				}
				else if(pmp_size=="> 96 kW")
				{
					if      (value  >= 0.4308)           return "Unsatisfactory";
					else if (0.4308 >  value && value > 0.3080)   return "Acceptable";
					else if (value  <= 0.3080)           return "Good";
				}
				else return "Out of range";
			}
			else return "Out of range";
		},

		wsa_KPI_un_head_loss:function(obj) {
			//Good: value ≤ 2, Acceptable: 2 < value ≤ 4, Unsatisfactory: value > 4
			var value=obj.wsa_KPI_un_head_loss();
			if      (value <= 2)                   return "Good";
			else if (2     <  value && value <= 4) return "Acceptable";
			else if (value >  4)                   return "Unsatisfactory";
			else                                   return "Out of range";
		},
	//wst: 3 variables benchmarked
		wst_KPI_capac_util:function(obj) {
			//Capacity util: Good: 90 ≤ tE4 ≤ 70, Acceptable: 100 ≤ tE4 < 90 and 70 < tE4 ≤ 50, Unsatisfactory: tE4 > 100 and tE4 < 50,
			var value=obj.wst_KPI_capac_util();
			if      (70 <= value && value <= 90)                                   { return "Good" }
			else if ((90 <  value && value <= 100) || (50 <= value && value < 70)) { return "Acceptable" }
			else if ((value > 100)||(value < 50))                                  { return "Unsatisfactory" }
			else                                                                   { return "Out of range" }
		},
		wst_KPI_nrg_per_m3:function(obj) {
			//this is the most complex
			/*
			WTP > 5000 m3/d - Good: tE1 ≤ 0.025; Acceptable: 0.025 < tE1 ≤ 0.04; Unsatisfactory: tE1 > 0.04                                                          
			WTP <= 5000 m3/d  - Good: tE1 ≤ 0.04; Acceptable: 0.04 < tE1 ≤ 0.055; Unsatisfactory: tE1 > 0.055                                                        
			WTP with Pre-ox > 5000 m3/d  - Good: tE1 ≤ 0.055; Acceptable: 0.055 < tE1 ≤ 0.07; Unsatisfactory: tE1 > 0.07                                 
			WTP with Pre-ox <= 5000 m3/d  - Good: tE1 ≤ 0.07; Acceptable: 0.07 < tE1 ≤ 0.085; Unsatisfactory: tE1 > 0.085
			WTP (with raw and treated water pumping) - Good: tE1 ≤ 0.4; Acceptable: 0.4 < tE1 ≤ 0.5; Unsatisfactory: tE1 > 0.5  
			*/
			return "Implementation needs revision";
		},
		wst_KPI_slu_per_m3:function(obj) {
			//tE3: Good: tE3 ≤ 0.06, Acceptable: 0.06 < tE3 ≤ 0.10, Unsatisfactory: tE3 > 0.10
			var value=obj.wst_KPI_slu_per_m3();
			if      (value <= 0.06)                   return "Good";
			else if (0.06  <  value && value <= 0.10) return "Acceptable";
			else if (value >  0.10)                   return "Unsatisfactory";
			else                                      return "Out of range";
		},
	//wsd
		wsd_KPI_std_nrg_cons:function(obj)
		{
			//dE3: Good: 0.2725 ≤ dE3 ≤ 0.40 , Acceptable: 0.40 < dE3 ≤ 0.54, Unsatisfactory: dE3 > 0.54,
			var value=obj.wsd_KPI_std_nrg_cons();

			//find pump size for current object
			var pmp_size; //will be a string
			for(var op in Tables.wsd_pmp_size)
			{
				if(obj.wsd_pmp_size==Tables.wsd_pmp_size[op].value)
				{
					pmp_size=op;
				}
			}

			//different values depending on pump size
			if(pmp_size=="5.6 - 15.7 kW")
			{
				if      (value  >= 0.5302)                    return "Unsatisfactory";
				else if (0.5302 >  value && value > 0.3322)   return "Acceptable";
				else if (value  <= 0.3322)                    return "Good";
			}
			else if(pmp_size=="15.7 - 38 kW")
			{
				if      (value  >= 0.4923)                    return "Unsatisfactory";
				else if (0.4923 >  value && value > 0.3169)   return "Acceptable";
				else if (value  <= 0.3169)                    return "Good";
			}
			else if(pmp_size=="39 - 96 kW")
			{
				if      (value  >= 0.4595)                    return "Unsatisfactory";
				else if (0.4595 >  value && value > 0.3080)   return "Acceptable";
				else if (value  <= 0.3080)                    return "Good";
			}
			else if(pmp_size=="> 96 kW")
			{
				if      (value  >= 0.4308)                    return "Unsatisfactory";
				else if (0.4308 >  value && value > 0.3080)   return "Acceptable";
				else if (value  <= 0.3080)                    return "Good";
			}
			else return "Out of range";
		},

		wsd_KPI_water_losses:function(obj)
		{
			//dE6: Good: dE6 ≤ 6 , Acceptable: 6 < dE6 ≤ 12, Unsatisfactory: dE6 > 12,
			var value=obj.wsd_KPI_water_losses();
			if      (value <= 6)                   { return "Good" }
			else if (6     < value && value <= 12) { return "Acceptable" }
			else if (value > 12)                   { return "Unsatisfactory" }
			else                                   { return "Out of range" }
		},

		wsd_KPI_un_head_loss:function(obj)
		{
			//dE7: Good: dE7 ≤ 2, Acceptable: 2 < dE7 ≤ 4, Unsatisfactory: dE7 > 4,
			var value=obj.wsd_KPI_un_head_loss();
			if      (value <= 2)                  { return "Good" }
			else if (2     < value && value <= 4) { return "Acceptable" }
			else if (value > 4)                   { return "Unsatisfactory" }
			else                                  { return "Out of range" }
		},

		wsd_KPI_un_head_loss:function(obj)
		{
			var value=obj.wsd_KPI_un_head_loss();
			if      (value <= 2)                  { return "Good" }
			else if (2     < value && value <= 4) { return "Acceptable" }
			else if (value > 4)                   { return "Unsatisfactory" }
			else                                  { return "Out of range" }
		},
	//wwc
		wwc_KPI_std_nrg_cons:function(obj)
		{
			//wcE3: Good: 0.2725 ≤ wcE3 ≤ 0.45, Acceptable: 0.45 < wcE3 ≤ 0.68, Unsatisfactory: wcE3 > 0.68
			var value=obj.wwc_KPI_std_nrg_cons();
			if      (0.2725 <= value && value <= 0.45) { return "Good" }
			else if (0.45   <  value && value <= 0.68) { return "Acceptable" }
			else if (value  > 0.68)                    { return "Unsatisfactory" }
			else                                       { return "Out of range" }
		},
	//wwt
		wwt_KPI_nrg_per_kg:function(obj)
		{
			//wtE3: Good: wtE3 ≤ 2 , Acceptable: 2 < wtE3 ≤ 10, Unsatisfactory: wtE3 > 10,
			var value=obj.wwt_KPI_nrg_per_kg();
			if(value <= 2)                         { return "Good" }
			else if(2     <  value && value <= 10) { return "Acceptable" }
			else if(value > 10)                    { return "Unsatisfactory" }
			else                                   { return "Out of range" }
		},

		wwt_KPI_nrg_biogas:function(obj)
		{
			//wtE4: Good: wtE4 ≥ 0.0009 BOD5 , Acceptable: 0.0009 BOD5 > wtE4 ≥ 0.0007 BOD5, Unsatisfactory: wtE4 < 0.0007 BOD5, note: BOD5 = influent BOD (mg/L) = wtV15,
			var value=obj.wwt_KPI_nrg_biogas();
			if(value  >= 0.0009)                        { return "Good" }
			else if(0.0009 >  value && value >= 0.0007) { return "Acceptable" }
			else if(value  <  0.0007)                   { return "Unsatisfactory" }
			else                                        { return "Out of range" }
		},

		wwt_KPI_sludg_prod:function(obj)
		{
			//wtE7: Good: wtE7 ≤ 0.8 , Acceptable: 0.8 < wtE7 ≤ 1.5, Unsatisfactory: wtE7 > 1.5,
			var value=obj.wwt_KPI_sludg_prod();
			if(value <= 0.8)                       return "Good";
			else if(0.8   < value && value <= 1.5) return "Acceptable";
			else if(value > 1.5)                   return "Unsatisfactory";
			else                                   return "Out of range";
		},

		wwt_KPI_dry_sludge:function(obj)
		{
			//wtE8: Good: wtE8 ≥ 20 , Acceptable: 20 < wtE8 ≤ 12, Unsatisfactory: wtE8 < 12,
			var value=obj.wwt_KPI_dry_sludge();
			if(value >= 20)                        return "Good";
			else if(20    >  value && value >= 12) return "Acceptable";
			else if(value < 12)                    return "Unsatisfactory";
			else                                   return "Out of range";
		},

		wwt_KPI_capac_util:function(obj)
		{
			//wtE9: Good: 95 ≤ wtE9 ≤ 70, Acceptable: 100 ≤ wtE9 < 95 and 70 < wtE9 ≤ 50, Unsatisfactory: wtE9 > 100 and wtE9 < 50,
			//NEED CORRECTION TBD
			var value=obj.wwt_KPI_capac_util();
			if      (70 <= value && value <= 95)                            return "Good";
			else if ((95 < value && value <= 100) || (50<value&&value<70) ) return "Acceptable";
			else if (value > 100 || value < 50)                             return "Unsatisfactory";
			else                                                            return "Out of range";
		},

		wwt_KPI_nrg_per_m3:function(obj)
		{
			return "Implementation needs revision";
			/*
			TF or aerated lagoons- Good: wtE1 ≤ 0.185 + 1127/TW; Acceptable: 0.185 + 1127/TW < wtE1 < 0.231 + 1409/TW; Unsatisfactory: wtE1 ≥ 0.231 + 1409/TW
			AS - Good: wtE1 ≤ 0.280 + 1192/TW; Acceptable: 0.280 + 1192/TW < wtE1 < 0.350 + 1490/TW; Unsatisfactory: wtE1 ≥ 0.350 + 1490/TW
			AS + C/F - Good: wtE1 ≤ 0.325 + 1384/TW; Acceptable: 0.325 + 1384/TW < wtE1 < 0.406 + 1730/TW; Unsatisfactory: wtE1 ≥ 0.406 + 1730/TW
			AS w/ nitrification + C/F - Good: wtE1 ≤ 0.424 + 1362/TW; Acceptable: 0.424 + 1362/TW < wtE1 < 0.530 + 1703/TW; Unsatisfactory: wtE1 ≥ 0.530 + 1703/TW
			note: TW = Treated wastewater (m3/d)
			*/
		},

		wwt_KPI_nrg_x_biog:function(obj)
		{
			//Below 15%= red -	15 to 25% = orange -	Above 25%= green
			var value=obj.wwt_KPI_nrg_x_biog();
		 	if      (value < 15)                    return "Unsatisfactory";
			else if (15   <=  value && value <= 25) return "Acceptable";
			else if (value > 25)                    return "Good";
		},
	//wwd
		wwd_KPI_std_nrg_cons:function(obj)
		{
			//wdE3: Good: 0.2725 ≤ wdE3 ≤ 0.40 , Acceptable: 0.40 < wdE3 ≤ 0.54, Unsatisfactory: wdE3 > 0.54,
			var value=obj.wwd_KPI_std_nrg_cons();
			if      (0.2725 <= value && value <= 0.40) return "Good";
			else if (0.40   <  value && value <= 0.54) return "Acceptable";
			else if (value  > 0.54)                    return "Unsatisfactory";
			else                                       return "Out of range";
		},

		wwd_KPI_std_nrg_recv:function(obj)
		{
			//wdE5: Good: 0.2725 > wdE5 ≥ 0.19 , Acceptable: 0.19 > wdE5 ≥ 0.12, Unsatisfactory: wdE5 < 0.12,
			var value=obj.wwd_KPI_std_nrg_recv();
			if      (0.19 <= value && value < 0.2725) return "Good";
			else if (0.12 <= value && value < 0.19)   return "Acceptable";
			else if (value < 0.12)                    return "Unsatisfactory";
			else                                      return "Out of range";
		},
	//w{sw}g
		wsg_KPI_std_nrg_:function(obj)
		{
			var value=obj.wsg_KPI_std_nrg_();
			if      (0.2725 <= value && value <= 0.40) return "Good";
			else if (0.40   <  value && value <= 0.54) return "Acceptable";
			else if (value  >  0.54)                   return "Unsatisfactory";
			else                                       return "Out of range";
		},

		wwg_KPI_std_nrg_:function(obj)
		{
			var value=obj.wwg_KPI_std_nrg_();
			if      (0.2725 <= value && value <= 0.40) return "Good";
			else if (0.40   <  value && value <= 0.54) return "Acceptable";
			else if (value  > 0.54)                    return "Unsatisfactory";
			else                                       return "Out of range";
		},
}
