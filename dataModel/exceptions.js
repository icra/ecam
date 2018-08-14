/**
  TO DO:
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
    for(var treatment in Tables.fsc_type_tre) {
      fsc_ch4_efac[treatment]=Tables.fsc_type_tre[treatment].ch4_efac;
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
}
