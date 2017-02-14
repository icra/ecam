
//INPUTS
wwt_mass_slu_dewat:0,                   //Input	Amount of sludge dewatered 
wwt_fuel_dig:0,                         //Input	Fuel consumed for the digester			
wwt_mass_slu_inc:0,                     //Input	Sludge incincerated			
wwt_nrg_inc:0,                          //Input	Energy for incineration			
wwt_temp_inc:0,                         //Input	Fluidized Bed Reactor Temperature			
wwt_mass_slu_sto:0,                     //Input	Sludge stored			
wwt_time_slu_sto:0,                     //Input	Storage time			
wwt_nrg_slu_dis_cons:0,                 //Input	Energy consumed at the disposal step			
wwt_mass_slu_dis:0,                     //Input	Total dry sludge disposed of			
wwt_mass_slu_comp:0,                    //Input	Sludge composted			
c_wwt_ts_slu_comp:0,                    //Input	Total solids in compost			
wwt_mass_slu_app:0,                     //Input	Sludge applied to land			
wwt_vol_fuel_app:0,                     //Input	Fuel for land application			
wwt_soil_typ:0,                         //Input	Soil Typology			
wwt_mass_slu_cov:0,                     //Input	Sludge landfilled			
wwt_vol_slu_cov_rec:0,                  //Input	Amount of recovered gas			
wwt_vol_slu_cov_val:0,                  //Input	Amount of recovered gas that is valorized			
wwt_mass_slu_stock:0,                   //Input	Amount of sludge stockpiled			
wwt_time_slu_stock:0,                   //Input	How long do you stockpile sludge for?			
wwt_mass_slu_land:0,                    //Input	Sludge landfilled			

//CALCULATED VARIABLES
c_wwt_nrg_rec_inc:0,                    //CV Energy Recovery
c_wwt_ch4_pot:0,                        //CV Methane potential
c_nrg_slu_dis_rec:0,                    //CV Energy recovered at the disposal step
c_wwt_slu_cn:0,                         //CV C:N Ratio
c_wwt_ts_slu:function(){return 0},      //CV Total solids in sludge
c_wwt_slu_c:function(){return 0},       //CV Carbon Content
c_wwt_slu_n:function(){return 0},       //CV Nitrogen Content
c_wwt_nrg_cov_gas:function(){return 0}, //CV Total energy content of gas valorized from landfill

//KPI
wwt_KPI_nrg_per_slu:function(){},       //KPI Emissions per unit sludge treated
wwt_KPI_GHG_per_m3:function(){},        //KPI Energy consumption per unit sludge treated


wwt_KPI_GHG_dig_flar_co2	kg	Amount of CO2 emissions due to flaring of biogas	wwt_nrg_dig_flar*conv_kwh_co2 
wwt_KPI_GHG_dig_flar_ch4	kg	Amount of CH4 emissions due to flaring of biogas	0.02*c_ww_biogas_flar*(wwt_ch4_biog/100)*ct_ch4_m3
wwt_KPI_GHG_dig_co2eq	kg	Amount of CO2,eq emissions related to sludge digestion operations	wwt_KPI_GHG_dig_pump_co2+wwt_KPI_GHG_dig_mix_co2+wwt_KPI_GHG_dig_flar_co2+wwt_KPI_GHG_dig_flar_ch4*ct_ch4_eq
wwt_KPI_GHG_sto_co2	kg	Amount of CO2 emissions due to sludge storage	(wwt_nrg_slu_sto*conv_kwh_co2)+(wwt_vol_fuel_inc*FD*NCV*EF*10-6)
wwt_KPI_GHG_sto_ch4	kg	Amount of CH4 emissions due to sludge storage	"IF wwt_time_slu_sto < 5 days THEN wwt_KPI_sto_ch4 = 0 

IF 5 days < wwt_time_slu_sto < 20 days THEN wwt_KPI_sto_ch4 = 0,03*c_wwt_ch4_pot

IF wwt_time_slu_sto > 20 days THEN wwt_KPI_sto = 0,05*c_wwt_ch4_pot"
N2O		PI	wwt_KPI_GHG_sto_n2o	kg	Amount of N2O emissions due to sludge storage	"IF wwt_KPI_dry_sludge > 0.55*wwt_mass_slu THEN wwt_KPI_sto_n2o = 0
IF wwt_KPI_dry_sludge < 0.55*wwt_mass_slu THEN  wwt_KPI_sto_n2o = (wwt_vol_slu_sto*0,95 m3*4,3*10-7)*103"
CO2,eq		PI	wwt_KPI_GHG_sto_co2eq	kg	Amount of CO2,eq emissions related to sludge storage	wwt_KPI_GHG_sto_co2+(wwt_KPI_GHG_sto_ch4*ct_ch4_eq)+(wwt_KPI_GHG_sto_n2o*ct_n2o_eq)
CO2		PI	wwt_KPI_GHG_comp_co2	kg	Amount of CO2 emissions due to sludge composting	(wwt_mass_slu_comp*18)/1000
CH4		PI	wwt_KPI_GHG_comp_ch4	kg	Amount of CH4 emissions due to sludge composting	"BEAM

IF wwt_ts_slu_comp > 55% THEN wwt_KPI_comp_ch4 = 0
IF wwt_ts_slu_comp < 55% AND Sludge Type is Digested THEN wwt_KPI_comp_ch4 = 0,025*1,3*(wwt_mass_slu_comp*0.56*0.51)
IF wwt_ts_slu_comp < 55% AND Sludge Type is Primary THEN wwt_KPI_comp_ch4 = 0,025*1,3*(wwt_mass_slu_comp*0.56*0.7)

IPCC

wwt_mass_slu_comp*10-2"
N2O		PI	wwt_KPI_GHG_comp_n2o	kg	Amount of N2O emissions due to sludge composted	"
BEAM

IF c_wwt_cn_slu > 30 THEN wwt_KPI_comp_n2o = 0

IF (c_wwt_cn_slu < 30 AND wwt_ts_slu_comp >55%) THEN wwt_KPI_comp_n2o = 0

IF (c_wwt_cn_slu < 30 AND wwt_ts_slu_comp < 55%) THEN wwt_Kpi_comp_n2o = wwt_mass_slu_comp*0,04*0,015*1,57

IPCC

wwt_mass_slu_comp*6*10-4"
CO2,eq		PI	wwt_KPI_GHG_sto_co2eq	kg	Amount of CO2,eq emissions due to sludge composted	wwt_KPI_GHG_comp_co2+(wwt_KPI_GHG_comp_ch4*EF_ch4)+(wwt_KPI_GHG_comp_n2o*EF_n2o)
CO2		PI	wwt_KPI_GHG_inc_co2	kg	Amount of CO2 due to sludge incinerated	(wwt_nrg_inc*conv_kwh_co2)+(wwt_vol_fuel_inc*FD*NCV*EF*10-6)
CH4		PI	wwt_KPI_GHG_inc_ch4	kg	Amount of CH4 emissions due to sludge incinerated	"(4,85∙10-5)*wwt_mass_slu_inc
"
N2O		PI	wwt_KPI_GHG_inc_n2o	kg	Amount of N2O emissions due to sludge incinerated	0.04*c_wwt_slu_n*(161.3-(0.14T)
CO2,eq		PI	wwt_KPI_GHG_inc_co2eq	kg	Amount of CO2,eq emissions due to sludge incineration	wwt_KPI_GHG_inc_co2+(wwt_KPI_GHG_inc_ch4*ct_ch4_eq)
CO2		PI	wwt_KPI_GHG_app_co2	kg	Amount of CO2 emissions due to sludge applied to land	(wwt_nrg_app*conv_kwh_co2)+(wwt_vol_fuel_app*FD*NCV*EF*10-6)
CH4		PI	wwt_KPI_GHG_app_ch4	kg	Amount of CH4 emissions due to sludge applied to land	0
CH4		PI	wwt_KPI_GHG_app_ch4	kg	Amount of CH4 emissions due to sludge applied to land	0
N2O		PI	wwt_KPI_GHG_app_n2o	kg	Amount of N2O emissions due to sludge applied to land	"IF Sludge Type is Primary THEN

IF (Soil Typology = Fine-Textured AND wwt_cn_slu_app > 30) THEN wwt_KPI_app_n2o = 0
IF (Soil Typology = Fine-Textured AND wwt_cn_slu_app < 30) THEN wwt_KPI_app_n2o = wwt_mass_slu_app*0.04*0,023*46/14
IF (Soil Typology = Fine-Textured AND wwt_slu_dryw > 80) THEN (wwt_KPI_app_n2o = wwt_mass_slu_app*0.04*0,023*46/14)*0,5

IF (Soil Typology = Coarse-Textured AND wwt_cn_slu_app > 30) THEN wwt_KPI_app_n2o = 0
IF (Soil Typology = Coarse-Textured ANd wwt_cn_slu_app < 30) THEN wwt_KPI_app_n2o = wwt_mass_slu_app*0.04*0,05*46/14

IF Sludge Type is Digested THEN

IF (Soil Typology = Fine-Textured AND wwt_cn_slu_app > 30) THEN wwt_KPI_app_n2o = 0
IF (Soil Typology = Fine-Textured AND wwt_cn_slu_app < 30) THEN wwt_KPI_app_n2o = wwt_mass_slu_app*0.05*0,023*46/14
IF (Soil Typology = Fine-Textured AND wwt_slu_dryw > 80) THEN (wwt_KPI_app_n2o = wwt_mass_slu_app*0.05*0,023*46/14)*0,5

IF (Soil Typology = Coarse-Textured AND wwt_cn_slu_app > 30) THEN wwt_KPI_app_n2o = 0
IF (Soil Typology = Coarse-Textured AND wwt_cn_slu_app < 30) THEN wwt_KPI_app_n2o = wwt_mass_slu_app*0.05*0,05*46/14

"
CO2,eq		PI	wwt_KPI_GHG_app_co2eq	kg	Amount of CO2,eq emissions due to land application of sludge	wwt_KPI_GHG_app_co2+(wwt_KPI_GHG_app_ch4*EF_ch4)+(wwt_KPI_GHG_app_n2o*EF_n2o)
CO2,eq		PI	wwt_KPI_GHG_stock_co2eq	kg	Amount of CO2,eq emissions due to sludge stockpiling	"IF wwt_time_slu_stock < 12 THEN wwt_KPI_GHG stock_co2eq = (wwt_mass_slu_stock * 90.3*10-3)*wwt_time_slu_stock/12

IF 12 < wwt_time_slu_stock < 36 THEN wwt_KPI_GHG_stock_co2eq = 
(wwt_mass_slu_stock * 60*10-3*)*wwt_time_slu_stock/12

IF wwt_time_slu_stock > 36 THEN wwt_KPI_GHG_stock_co2eq = (wwt_mass_slu_stock * 28*10-3)**wwt_time_slu_stock/12"
CO2		PI	wwt_KPI_GHG_land_co2	kg	Amount of CO2 emissions due to sludge application to landfill	0
CH4		PI	wwt_KPI_GHG_land_ch4	kg	Amount of CH4 emissions due to sludge applied to landfill	"IPCC

 IF Sludge Type = Digested  wwt_slu_land*0.56*0.51*0.9*(3/4)*0.5*0.8*0.69

IF Sludge Type = Primary
wwt_slu_land*0.56*0.71*0.9*(3/4)*0.5*0.8*0.69

BEAM

 IF Sludge Type = Digested  wwt_slu_land*0.51*0.56*0.9*1.3*0.5*0.8

IF Sludge Type = Primary
wwt_slu_land*0.7*0.56*0.9*1.3*0.5*0.8"
N2O		PI	wwt_KPI_GHG_land_n2o	kg	Amount of N2O emissions due to sludge applied to landfill	"IF c_wwt_slu_cn > 30 THEN wwt_KPI_GHG_land_n2o = 0

IF c_wwt_slu_cn < 30 THEN {

IF Sludge Type = Primary

wwt_KPI_GHG_land_n2o = wwt_dryw_slu*0.04*1.5*46/14

IF Sludge Type = Digested

wwt_KPI_GHG_land_n2o = wwt_dryw_slu*0.05*1.5*46/14

}"
CO2,eq		PI	wwt_KPI_GHG__land_co2eq	kg	Amount of CO2,eq emissions due to landfilling of sludge	"wwt_KPI_GHG__land_co2eq = wwt_KPI_GHG_land_co2+(wwt_KPI_GHG_land_ch4*ct_ch4_eq)+(wwt_KPI_GHG_land_n2o*ct_n2o_eq

IF Disposal Type IS Covered Landfill (Flaring) THEN wwt_KPI_GHG__land_co2eq = 0.02*(wwt_KPI_GHG_land_co2+(wwt_KPI_GHG_land_ch4*ct_ch4_eq)+(wwt_KPI_GHG_land_n2o*ct_n2o_eq)

IF Disposal Type IS Covered Landfill (Gas Recovery) THEN wwt_KPI_GHG__land_co2eq = 0"


//final part
Total emissions related to sludge storage			KPI	wwt_KPI_slu_sto_co2eq	CO2eq	Total amount of GHG emissions related to sludge storage	wwt_KPI_GHG_sto_co2+(wwt_KPI_GHG_sto_ch4*EF_ch4)+(wwt_KPI_GHG_sto_n2o*EF_n2o)
Total emissions related to digestion			KPI	wwt_KPI_GHG_slu_dig_co2eq	CO2eq	Total amount of GHG emissions related to sludge digestion and biogas production	wwt_KPI_GHG_dig_pump_co2+wwt_KPI_GHG_dig_mix_co2+wwt_KPI_GHG_dig_flar_co2
Total emissions related to sludge disposal			KPI	wwt_KPI_GHG_slu_disp_co2eq	CO2eq	Total amount of GHG emissions related to sludge disposal	wwt_KPI_GHG_sto_co2eq+wwt_KPI_GHG_inc_co2eq+wwt_KPI_GHG_app_co2eq+wwt_KPI_GHG_land_co2eq
Total emissions			KPI	wwt_KPI_GHG_slu_co2eq	CO2eq	Total amount of GHG emissions for sludge management operations	wwt_KPI_GHG_slu_trans_co2eq+wwt_KPI_GHG_slu_sto_co2eq+wwt_KPI_GHG_slu_dig_co2eq+wwt_KPI_GHG_slu_disp_co2eq+wwt_KPI_GHG_slu_dewat_co2eq
