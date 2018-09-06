Global.Estimations = {
  estm_wwt_biog_pro:function(){
    return Global.Waste.ww_serv_pop()*Global.General.bod_pday*Cts.ct_bod_kg.value*Cts.ct_biog_g.value*Global.General.Days()/1000; //<br>
  },
  estm_wwt_ch4_biog:function(){ return 59; },

  estm_wwt_bod_infl:function(){
    return Global.General.bod_pday/1000*Global.Waste.ww_serv_pop()*Global.General.Days();//<br>
  },
  estm_wwt_bod_effl:function(){
    return 0.10*Global.Waste.Treatment.wwt_bod_infl;//<br>
  },
  estm_wwt_bod_slud:function(){
    var type_tre=Tables.find('wwt_type_tre',Global.Waste.Treatment.wwt_type_tre);//<br>
    var percent=Tables.wwt_type_tre[type_tre].bod_rmvd_as_sludge_estm;//<br>
    return percent*Global.Waste.Treatment.wwt_bod_infl;//<br>
  },

  estm_wwt_ch4_efac:function(){
    var type_tre=Tables.find('wwt_type_tre',Global.Waste.Treatment.wwt_type_tre);//<br>
    return Tables.wwt_type_tre[type_tre].ch4_efac;//<br>
  },

  estm_wwt_mass_slu:function(){
    var b=1;//<br>
    if(Global.Configuration['Yes/No'].wwt_producing_biogas){//<br>
      b=0.6;//<br>
    }//<br>
    return b*0.55*Global.General.bod_pday*Global.Waste.ww_serv_pop()*(1-0.1)*1e-3*1.176*Global.General.Days();//<br>
  },
  estm_wwt_dryw_slu:function(){
    return 0.04*Global.Waste.Treatment.wwt_mass_slu;
  },
  estm_wwt_mass_slu_comp:function(){
    if(Global.Configuration.Selected.sludge_estimation_method=="comp")//<br>
      return this.estm_wwt_dryw_slu();//<br>
    else return 0;//<br>
  },
  estm_wwt_mass_slu_inc:function(){
    if(Global.Configuration.Selected.sludge_estimation_method=="inc")//<br>
      return this.estm_wwt_dryw_slu();//<br>
    else return 0;
  },
  estm_wwt_mass_slu_app:function(){
    if(Global.Configuration.Selected.sludge_estimation_method=="app")//<br>
      return this.estm_wwt_dryw_slu();//<br>
    else return 0;
  },
  estm_wwt_mass_slu_land:function(){
    if(Global.Configuration.Selected.sludge_estimation_method=="land")//<br>
      return this.estm_wwt_dryw_slu();//<br>
    else return 0;
  },
  estm_wwt_mass_slu_stock:function(){
    if(Global.Configuration.Selected.sludge_estimation_method=="stock")//<br>
      return this.estm_wwt_dryw_slu();//<br>
    else return 0;
  },
  estm_wwt_temp_inc:function(){
    return 1023;
  },
};

//trick: add same descriptions and units
for(var code in Global.Estimations){
  var original=code.replace('estm_','');
  if(typeof lang!="undefined"){
    lang["#"+code+'_descr']=translate(original+'_descr')+" (estimation)";
    lang["#"+code+'_expla']="Estimation";
  }
  Info[code]=Info[original];
}
