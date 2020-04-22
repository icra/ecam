/*
  - 'exceptions' are variables that not behave like normal ones are treated
    here. They are inputs with a list of possible values that set the number
    what is different of normal dropdowns is that the user can also enter a
    number besides selecting an option
  - each selection is stored in Configuration.Selected
*/

let Exceptions={
  //grouped by similarty rather than stage
  //all functions are almost equal
  ////they can be generalised as ~ 
  //function(code, table, field_name_in_table) TODO
  list_v2:{
    //CH4 emission factors
      ww_ch4_efac_unt:function(){ //done
        var td=document.querySelector('tr[field=ww_ch4_efac_unt] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function(){
          Global.Waste.Collection.ww_ch4_efac_unt=parseFloat(select.value);
          Global.Configuration.Selected.ww_ch4_efac_unt=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.ww_ch4_efac).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.ww_ch4_efac[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.ww_ch4_efac_unt){ option.selected='true'; }
        });
      },
      ww_ch4_efac_unc:function(){ //done
        var td=document.querySelector('tr[field=ww_ch4_efac_unc] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function(){
          Global.Waste.Collection.ww_ch4_efac_unc=parseFloat(select.value);
          Global.Configuration.Selected.ww_ch4_efac_unc=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.ww_ch4_efac).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.ww_ch4_efac[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.ww_ch4_efac_unc){option.selected='true';}
        });
      },
      wwt_ch4_efac:function(){ //done
        var td=document.querySelector('tr[field=wwt_ch4_efac] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function() {
          Global.Waste.Treatment.wwt_ch4_efac=parseFloat(select.value);
          Global.Configuration.Selected.wwt_ch4_efac=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.wwt_type_tre).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.wwt_type_tre[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.wwt_ch4_efac){option.selected='true';}
        });
      },
      wwd_ch4_efac:function(){ //done
        var td=document.querySelector('tr[field=wwd_ch4_efac] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function(){
          Global.Waste.Discharge.wwd_ch4_efac=parseFloat(select.value);
          Global.Configuration.Selected.wwd_ch4_efac=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.ww_ch4_efac).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.ww_ch4_efac[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.wwd_ch4_efac){ option.selected='true'; }
        });
      },
      fsc_ch4_efac:function(){ //TODO
        var td=document.querySelector('tr[field=fsc_ch4_efac] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function() {
          Global.Faecl.Containment.fsc_ch4_efac=parseFloat(select.value);
          Global.Configuration.Selected.fsc_ch4_efac=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fsc_type_tre).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value = Tables.fsc_type_tre[key][(Global.Faecl.Containment.fsc_flooding?"ch4_efac_flooding":"ch4_efac")];
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fsc_ch4_efac){option.selected='true';}
        });
      },
      fst_ch4_efac:function(){ //done
        var td=document.querySelector('tr[field=fst_ch4_efac] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function(){
          Global.Faecl.Treatment.fst_ch4_efac=parseFloat(select.value);
          Global.Configuration.Selected.fst_ch4_efac=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fst_type_tre).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.fst_type_tre[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fst_ch4_efac){option.selected='true';}
        });
      },
      fsr_ch4_efac:function(){ //done
        var td=document.querySelector('tr[field=fsr_ch4_efac] td');if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function() {
          Global.Faecl.Reuse.fsr_ch4_efac=parseFloat(select.value);
          Global.Configuration.Selected.fsr_ch4_efac=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fsr_ch4_efac).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.fsr_ch4_efac[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fsr_ch4_efac){option.selected='true';}
        });
      },
      fsr_ch4_efac_dumping:function(){ //done
        var td=document.querySelector('tr[field=fsr_ch4_efac_dumping] td'); if(!td)return;

        var select=document.createElement('select');select.style.fontSize='smaller';select.style.display='block';td.appendChild(select);
        select.onchange=function() {
          Global.Faecl.Reuse['fsr_ch4_efac_dumping']=parseFloat(select.value);
          Global.Configuration.Selected['fsr_ch4_efac_dumping']=select.options[select.options.selectedIndex].getAttribute('key');
        }

        Object.keys(Tables.fsr_dumping_pth).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.fsr_dumping_pth[key].ch4_efac;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fsr_ch4_efac_dumping){ option.selected='true'; }
        });
      },

    //BOD removed as sludge
      wwt_bod_slud:function(){
        var td=document.querySelector('tr[field=wwt_bod_slud] td'); if(!td)return;

        var select=document.createElement('select'); select.style.fontSize='smaller'; select.style.display='block'; td.appendChild(select);
        select.onchange=function(){
          Global.Waste.Treatment.wwt_bod_slud=parseFloat(select.value);
          Global.Configuration.Selected.wwt_bod_slud=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.wwt_type_tre).forEach(key=>{
          var option=document.createElement('option'); select.appendChild(option);
          var value=Global.Waste.Treatment.wwt_bod_infl*Tables.wwt_type_tre[key].bod_rmvd_as_sludge_estm;
          var bod_rmvd_perc=Tables.wwt_type_tre[key].bod_rmvd_as_sludge_estm*100;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
          if(key==Global.Configuration.Selected.wwt_bod_slud){ option.selected='true'; }
        });
      },
      fst_bod_slud:function(){
        var td=document.querySelector('tr[field=fst_bod_slud] td');if(!td)return;

        var select=document.createElement('select'); select.style.fontSize='smaller'; select.style.display='block'; td.appendChild(select);
        select.onchange=function(){
          Global.Faecl.Treatment.fst_bod_slud=parseFloat(select.value);
          Global.Configuration.Selected.fst_bod_slud=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fst_type_tre).forEach(key=>{
          var option=document.createElement('option'); select.appendChild(option);
          var value=Global.Faecl.Treatment.fst_bod_infl*Tables.fst_type_tre[key].bod_rmvd_as_sludge_estm;
          var bod_rmvd_perc = Tables.fst_type_tre[key].bod_rmvd_as_sludge_estm*100;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
          if(key==Global.Configuration.Selected.fst_bod_slud){ option.selected='true'; }
        });
      },

    //FS density
      fsc_fdensity:function(){ //done
        var td=document.querySelector('tr[field=fsc_fdensity] td'); if(!td)return;

        var select=document.createElement('select'); select.style.fontSize='smaller'; select.style.display='block'; td.appendChild(select);
        select.onchange=function(){
          Global.Faecl.Containment.fsc_fdensity=parseFloat(select.value);
          Global.Configuration.Selected.fsc_fdensity=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fsc_type_tre).forEach(key=>{
          var option=document.createElement('option'); select.appendChild(option);
          var value=Tables.fsc_type_tre[key].fs_density;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fsc_fdensity){option.selected='true';}
        });
      },

    //BOD concentration
      fsc_bod_conc_fs:function(){
        var td=document.querySelector('tr[field=fsc_bod_conc_fs] td'); if(!td)return;

        var select=document.createElement('select'); select.style.fontSize='smaller'; select.style.display='block'; td.appendChild(select);
        select.onchange=function(){
          Global.Faecl.Containment.fsc_bod_conc_fs=parseFloat(select.value);
          Global.Configuration.Selected.fsc_bod_conc_fs=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fsc_type_tre).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value=Tables.fsc_type_tre[key].BOD_conc_FS;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fsc_bod_conc_fs){option.selected='true';}
        });
      },
      fsr_bod_conc_fs:function(){
        var td=document.querySelector('tr[field=fsr_bod_conc_fs] td'); if(!td)return;

        var select=document.createElement('select'); select.style.fontSize='smaller'; select.style.display='block'; td.appendChild(select);
        select.onchange=function(){
          Global.Faecl.Reuse.fsr_bod_conc_fs=parseFloat(select.value);
          Global.Configuration.Selected.fsr_bod_conc_fs=select.options[select.options.selectedIndex].getAttribute('key');
        };

        Object.keys(Tables.fsc_type_tre).forEach(key=>{
          var option=document.createElement('option');select.appendChild(option);
          var value = Tables.fsc_type_tre[key].BOD_conc_FS;
          option.value=value;
          option.setAttribute('key',key);
          option.innerHTML=translate(key)+" ("+format(value)+")";
          if(key==Global.Configuration.Selected.fsr_bod_conc_fs){option.selected='true';}
        });
      },
  },

  //CH4 emission factors
    ww_ch4_efac_unt:{
      level:"Waste",
      sublevel:"Collection",
      table:"ww_ch4_efac",
      table_field:"ch4_efac",
    },
    ww_ch4_efac_unc:{
      level:"Waste",
      sublevel:"Collection",
      table:"ww_ch4_efac",
      table_field:"ch4_efac",
    },
    wwt_ch4_efac:{
      level:"Waste",
      sublevel:"Treatment",
      table:"wwt_type_tre",
      table_field:"ch4_efac",
    },
    wwd_ch4_efac:{
      level:"Waste",
      sublevel:"Discharge",
      table:"ww_ch4_efac",
      table_field:"ch4_efac",
    },
    fsc_ch4_efac:{ //TODO
      level:"Faecl",
      sublevel:"Containment",
      table:"fsc_type_tre",
      /*
      var value = Tables.fsc_type_tre[key][(Global.Faecl.Containment.fsc_flooding?"ch4_efac_flooding":"ch4_efac")];
      */
    },
    fst_ch4_efac:{
      level:"Faecl",
      sublevel:"Treatment",
      table:"fst_type_tre",
      table_field:"ch4_efac",
    },
    fsr_ch4_efac:{
      level:"Faecl",
      sublevel:"Reuse",
      table:"fsr_ch4_efac",
      table_field:"ch4_efac",
    },
    fsr_ch4_efac_dumping:{
      level:"Faecl",
      sublevel:"Reuse",
      table:"fsr_dumping_pth",
      table_field:"ch4_efac",
    },

  //BOD removed as sludge
    wwt_bod_slud:{ //TODO
      level:"Waste",
      sublevel:"Treatment",
      table:"wwt_type_tre",
      table_field:"",

      /*
      Object.keys(Tables.wwt_type_tre).forEach(key=>{
        var value=Global.Waste.Treatment.wwt_bod_infl*Tables.wwt_type_tre[key].bod_rmvd_as_sludge_estm;
        var bod_rmvd_perc=Tables.wwt_type_tre[key].bod_rmvd_as_sludge_estm*100;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
        if(key==Global.Configuration.Selected.wwt_bod_slud){ option.selected='true'; }
      });
      */
    },

    fst_bod_slud:{ //TODO
      level:"Faecl",
      sublevel:"Treatment",
      table:"fst_type_tre",
      table_field:"",

      /*
      Object.keys(Tables.fst_type_tre).forEach(key=>{
        var value=Global.Faecl.Treatment.fst_bod_infl*Tables.fst_type_tre[key].bod_rmvd_as_sludge_estm;
        var bod_rmvd_perc = Tables.fst_type_tre[key].bod_rmvd_as_sludge_estm*100;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
        if(key==Global.Configuration.Selected.fst_bod_slud){ option.selected='true'; }
      });
      */
    },

  //FS density
    fsc_fdensity:{
      level:"Faecl",
      sublevel:"Containment",
      table:"fsc_type_tre",
      table_field:"fs_density",
    },

  //BOD concentration
    fsc_bod_conc_fs:{
      level:"Faecl",
      sublevel:"Containment",
      table:"fsc_type_tre",
      table_field:"BOD_conc_FS",
    },
    fsr_bod_conc_fs:{
      level:"Faecl",
      sublevel:"Reuse",
      table:"fsc_type_tre",
      table_field:"BOD_conc_FS",
    },
};

//save exceptions inside global to make them searchable for the function 'outputsPerInput' (in 'formulas.js')
Global.Exceptions=Exceptions;

//initialize with empty string inside Configuration.Selected for Exceptions to avoid warning "types do not match"
Object.keys(Exceptions.list).forEach(key=>{Global.Configuration.Selected[key]=""});

//default values for exceptions
Global.Configuration.Selected.ww_ch4_efac_unt="Sea and aerobic water bodies";
Global.Configuration.Selected.ww_ch4_efac_unc="Stagnant sewer and anaerobic water bodies";
