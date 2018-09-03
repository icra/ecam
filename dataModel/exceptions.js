/**
  variables that not behave like normal ones are treated here
  they are inputs with a list of possible values that set the number
  what is different of normal dropdowns is that the user can also enter a number besides selecting an option
**/

var Exceptions = {
  //wrapper
  apply:function() {
    this.wwt_ch4_efac();
    this.fsc_ch4_efac();
    this.fst_ch4_efac();
    this.fsr_ch4_efac();
    this.fsc_fdensity();
    this.fsr_bod_conc_fs();
    this.fsc_bod_conc_fs();
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
    Object.keys(Tables.fsc_fdensity).forEach(key=>{
      var option=document.createElement('option');
      select.appendChild(option);
      var value=Tables.fsc_fdensity[key].fs_density;
      option.value=value;
      option.setAttribute('key',key);
      option.innerHTML=translate(key)+" ("+value+")";
      if(key==Global.Configuration.Selected.fsc_fdensity && value==Global.Faecl.Containment.fsc_fdensity){
        option.selected='true';
      }
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
      if(treatment==Global.Configuration.Selected.fsc_ch4_efac && cons==Global.Faecl.Containment.fsc_ch4_efac) {
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
}

Global.Exceptions=Exceptions;//for searching inside formulas (some inputs are only used in exceptions)
