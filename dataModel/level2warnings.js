/* variables shown in level2 with a warning that cannot be calculated*/

var Level2Warnings=
{
	"wsg_KPI_std_nrg_":    "Advanced inputs required",
	"wwg_KPI_std_nrg_":    "Advanced inputs required",
	"wsa_KPI_std_nrg_cons":"Advanced inputs required",
	"wsa_KPI_std_nrg_recv":"Advanced inputs required",
	"wsd_KPI_std_nrg_cons":"Advanced inputs required",
	"wwc_KPI_std_nrg_cons":"Advanced inputs required",
	"wwd_KPI_std_nrg_cons":"Advanced inputs required",
	"wwd_KPI_std_nrg_recv":"Advanced inputs required",
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
