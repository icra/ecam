/**
  variables that not behave like normal ones are treated here
  they are inputs with a list of possible values that set the number
  what is different of normal dropdowns is that the user can also enter a number besides selecting an option
**/

var Exceptions = {
  list:{
    ww_ch4_efac_unt:function() {
      var td=document.querySelector('tr[field=ww_ch4_efac_unt] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';select.style.display='block';
      td.appendChild(select);
      select.onchange=function(){
        Global.Waste.ww_ch4_efac_unt=parseFloat(select.value);
        Global.Configuration.Selected.ww_ch4_efac_unt=select.options[select.options.selectedIndex].getAttribute('key');
        init();
      };

      //go over options
      Object.keys(Tables.ww_ch4_efac).forEach(key=>{
        var option=document.createElement('option');
        select.appendChild(option);
        var value=Tables.ww_ch4_efac[key].ch4_efac;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ("+format(value)+")";
        if(key==Global.Configuration.Selected.ww_ch4_efac_unt){ option.selected='true'; }
      });
    },
    ww_ch4_efac_unc:function() {
      var td=document.querySelector('tr[field=ww_ch4_efac_unc] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';select.style.display='block';
      td.appendChild(select);

      select.onchange=function(){
        Global.Waste.ww_ch4_efac_unc=parseFloat(select.value);
        Global.Configuration.Selected.ww_ch4_efac_unc=select.options[select.options.selectedIndex].getAttribute('key');
        init();
      };

      //go over options
      Object.keys(Tables.ww_ch4_efac).forEach(key=>{
        var option=document.createElement('option');
        select.appendChild(option);
        var value=Tables.ww_ch4_efac[key].ch4_efac;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ("+format(value)+")";
        if(key==Global.Configuration.Selected.ww_ch4_efac_unc){ option.selected='true'; }
      });
    },

    wwt_ch4_efac:function() {
      var td=document.querySelector('tr[field=wwt_ch4_efac] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Waste.Treatment.wwt_ch4_efac=parseFloat(select.value);
        Global.Configuration.Selected.wwt_ch4_efac=select.options[select.options.selectedIndex].getAttribute('treatment');
        init();
      }

      var wwt_ch4_efac = {}
      for(var treatment in Tables.wwt_type_tre) {
        wwt_ch4_efac[treatment]=Tables.wwt_type_tre[treatment].ch4_efac;
      }

      //go over treatment types
      for(var treatment in wwt_ch4_efac) {
        var option=document.createElement('option');
        select.appendChild(option);
        var cons=wwt_ch4_efac[treatment];
        option.value=cons;
        option.setAttribute('treatment',treatment);
        option.innerHTML=translate(treatment)+" ("+cons+")";
        if(treatment==Global.Configuration.Selected.wwt_ch4_efac && cons==Global.Waste.Treatment.wwt_ch4_efac) {
          option.selected='true';
        }
      }
    },

    wwt_bod_slud:function(){
      var td=document.querySelector('tr[field=wwt_bod_slud] td');
      if(!td)return;

      var select=document.createElement('select');
      td.appendChild(select);
      select.style.fontSize='smaller';
      select.style.display='block';
      select.onchange=function(){
        Global.Waste.Treatment.wwt_bod_slud=parseFloat(select.value);
        Global.Configuration.Selected.wwt_bod_slud=select.options[select.options.selectedIndex].getAttribute('key');
        init();
      }

      //go over options
      Object.keys(Tables.wwt_type_tre).forEach(key=>{
        var option=document.createElement('option');
        select.appendChild(option);
        var value=Global.Waste.Treatment.wwt_bod_infl*Tables.wwt_type_tre[key].bod_rmvd_as_sludge_estm;
        var bod_rmvd_perc=Tables.wwt_type_tre[key].bod_rmvd_as_sludge_estm*100;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
        if(key==Global.Configuration.Selected.wwt_bod_slud){
          option.selected='true';
        }
      });
    },

    fsc_ch4_efac:function() {
      var td=document.querySelector('tr[field=fsc_ch4_efac] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Faecl.Containment.fsc_ch4_efac=parseFloat(select.value);
        Global.Configuration.Selected.fsc_ch4_efac=select.options[select.options.selectedIndex].getAttribute('treatment');
        init();
      }

      var fsc_ch4_efac = {};
      var is_flooded = Global.Faecl.Containment.fsc_flooding;
      for(var treatment in Tables.fsc_type_tre) {

        fsc_ch4_efac[treatment]= is_flooded ? 
          Tables.fsc_type_tre[treatment].ch4_efac_flooding :
          Tables.fsc_type_tre[treatment].ch4_efac ;

      }

      //go over treatment types
      for(var treatment in fsc_ch4_efac) {
        var option=document.createElement('option');
        select.appendChild(option);
        var cons=fsc_ch4_efac[treatment];
        option.value=cons;
        option.setAttribute('treatment',treatment);
        option.innerHTML=translate(treatment)+" ("+cons+")";
        if(treatment==Global.Configuration.Selected.fsc_ch4_efac){
          option.selected='true';
        }
      }
    },

    fsc_fdensity:function() {
      var td=document.querySelector('tr[field=fsc_fdensity] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Faecl.Containment.fsc_fdensity=parseFloat(select.value);
        Global.Configuration.Selected.fsc_fdensity=select.options[select.options.selectedIndex].getAttribute('key');
        init();
      }

      //go over options
      Object.keys(Tables.fsc_type_tre).forEach(key=>{
        var option=document.createElement('option');
        select.appendChild(option);
        var value=Tables.fsc_type_tre[key].fs_density;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ("+value+")";
        if(key==Global.Configuration.Selected.fsc_fdensity && value==Global.Faecl.Containment.fsc_fdensity){
          option.selected='true';
        }
      });
    },

    fsc_bod_conc_fs:function() {
      var td=document.querySelector('tr[field=fsc_bod_conc_fs] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Faecl.Containment.fsc_bod_conc_fs=parseFloat(select.value);
        Global.Configuration.Selected.fsc_bod_conc_fs=select.options[select.options.selectedIndex].getAttribute('treatment');
        init();
      }

      var options = {};
      for(var treatment in Tables.fsc_type_tre) {
        options[treatment] = Tables.fsc_type_tre[treatment].BOD_conc_FS;
      }

      //go over treatment types
      for(var treatment in options) {
        var option=document.createElement('option');
        select.appendChild(option);
        var cons=options[treatment];
        option.value=cons;
        option.setAttribute('treatment',treatment);
        option.innerHTML=translate(treatment)+" ("+cons+")";
        if(treatment==Global.Configuration.Selected.fsc_bod_conc_fs && cons==Global.Faecl.Containment.fsc_bod_conc_fs) {
          option.selected='true';
        }
      }
    },

    fst_ch4_efac:function() {
      var td=document.querySelector('tr[field=fst_ch4_efac] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Faecl.Treatment.fst_ch4_efac=parseFloat(select.value);
        Global.Configuration.Selected.fst_ch4_efac=select.options[select.options.selectedIndex].getAttribute('treatment');
        init();
      }

      var fst_ch4_efac = {};
      for(var treatment in Tables.fst_type_tre) {
        fst_ch4_efac[treatment]=Tables.fst_type_tre[treatment].ch4_efac;
      }

      //go over treatment types
      for(var treatment in fst_ch4_efac) {
        var option=document.createElement('option');
        select.appendChild(option);
        var cons=fst_ch4_efac[treatment];
        option.value=cons;
        option.setAttribute('treatment',treatment);
        option.innerHTML=translate(treatment)+" ("+cons+")";
        if(treatment==Global.Configuration.Selected.fst_ch4_efac && cons==Global.Faecl.Treatment.fst_ch4_efac) {
          option.selected='true';
        }
      }
    },

    fst_bod_slud:function(){
      var td=document.querySelector('tr[field=fst_bod_slud] td');
      if(!td)return;

      var select=document.createElement('select');
      td.appendChild(select);
      select.style.fontSize='smaller';
      select.style.display='block';
      select.onchange=function(){
        Global.Faecl.Treatment.fst_bod_slud=parseFloat(select.value);
        Global.Configuration.Selected.fst_bod_slud=select.options[select.options.selectedIndex].getAttribute('key');
        init();
      }

      //go over options
      Object.keys(Tables.fst_type_tre).forEach(key=>{
        var option=document.createElement('option');
        select.appendChild(option);
        var value=Global.Faecl.Treatment.fst_bod_infl*Tables.fst_type_tre[key].bod_rmvd_as_sludge_estm;
        var bod_rmvd_perc = Tables.fst_type_tre[key].bod_rmvd_as_sludge_estm*100;
        option.value=value;
        option.setAttribute('key',key);
        option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
        if(key==Global.Configuration.Selected.fst_bod_slud){
          option.selected='true';
        }
      });
    },

    fsr_ch4_efac:function() {
      var td=document.querySelector('tr[field=fsr_ch4_efac] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Faecl.Reuse.fsr_ch4_efac=parseFloat(select.value);
        Global.Configuration.Selected.fsr_ch4_efac=select.options[select.options.selectedIndex].getAttribute('treatment');
        init();
      }

      var fsr_ch4_efac = {};
      for(var treatment in Tables.fsr_dumping_pth) {
        fsr_ch4_efac[treatment]=Tables.fsr_dumping_pth[treatment].ch4_efac;
      }

      //go over treatment types
      for(var treatment in fsr_ch4_efac) {
        var option=document.createElement('option');
        select.appendChild(option);
        var cons=fsr_ch4_efac[treatment];
        option.value=cons;
        option.setAttribute('treatment',treatment);
        option.innerHTML=translate(treatment)+" ("+cons+")";
        if(treatment==Global.Configuration.Selected.fsr_ch4_efac && cons==Global.Faecl.Reuse.fsr_ch4_efac) {
          option.selected='true';
        }
      }
    },

    fsr_bod_conc_fs:function() {
      var td=document.querySelector('tr[field=fsr_bod_conc_fs] td');
      if(!td)return;

      var select=document.createElement('select');
      select.style.fontSize='smaller';
      select.style.display='block';
      td.appendChild(select);

      select.onchange=function() {
        Global.Faecl.Reuse.fsr_bod_conc_fs=parseFloat(select.value);
        Global.Configuration.Selected.fsr_bod_conc_fs=select.options[select.options.selectedIndex].getAttribute('treatment');
        init();
      }

      var options = {};
      for(var treatment in Tables.fsc_type_tre) {
        options[treatment] = Tables.fsc_type_tre[treatment].BOD_conc_FS;
      }

      //go over treatment types
      for(var treatment in options) {
        var option=document.createElement('option');
        select.appendChild(option);
        var cons=options[treatment];
        option.value=cons;
        option.setAttribute('treatment',treatment);
        option.innerHTML=translate(treatment)+" ("+cons+")";
        if(treatment==Global.Configuration.Selected.fsr_bod_conc_fs && cons==Global.Faecl.Reuse.fsr_bod_conc_fs) {
          option.selected='true';
        }
      }
    },
  },

  //wrapper
  apply:function(){Object.keys(this.list).forEach(key=>{this.list[key]()});}, //call all the functions inside 'list'
};

Global.Exceptions=Exceptions;

//create an empty string for Exceptions, to avoid warning "types do not match" when updating Global from Cookies
Object.keys(Exceptions.list).forEach(key=>{
  Global.Configuration.Selected[key]="";
});
