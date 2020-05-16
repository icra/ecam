//defaults for v3 development

Global.General.anyFuelEngines= 1;

//components
linear_menu.visible  = true;

/* VIEWS */
index.visible        = 0; //landing
tier_a.visible       = 0; //tier A
tier_b.visible       = 0; //tier B

variable.visible      = 0; //variable
variable.id           = "wsa_KPI_GHG_fuel_ch4";
variable.localization = {
  level:'Water',
  sublevel:'Abstraction',
};
variable.question     = false;

summary_ghg.visible  = 0; //summary GHG
summary_nrg.visible  = 0; //summary NRG

constants.visible = true;
