/* variables shown in level2 with a warning that cannot be calculated*/

var Level2Warnings=
{
	"wsg_KPI_std_nrg_":"Data from substages required",
	"wwg_KPI_std_nrg_":"Data from substages required",
	"wsa_KPI_std_nrg_cons":"Data from substages required",
	"wsa_KPI_std_nrg_recv":"Data from substages required",
	"wsd_KPI_std_nrg_cons":"Data from substages required",
	"wwc_KPI_std_nrg_cons":"Data from substages required",
	"wwd_KPI_std_nrg_cons":"Data from substages required",
	"wwd_KPI_std_nrg_recv":"Data from substages required",
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
