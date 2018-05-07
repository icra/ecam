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
	},

	wwt_ch4_efac:function() {
		var td=document.querySelector('tr[field=wwt_ch4_efac] td');
		if(!td)return;

		var select=document.createElement('select');
		td.innerHTML+=" ";
		td.appendChild(select);

		select.onchange=function() {
			Global.Waste.Treatment.wwt_ch4_efac=parseFloat(select.value);
			Global.Configuration.Selected.wwt_ch4_efac=select.options[select.options.selectedIndex].getAttribute('treatment');
			init();
		}

		//table for prot consumption in kg/person/year
		var wwt_ch4_efac = {}
		for(var treatment in Tables.wwt_type_tre) {
			wwt_ch4_efac[treatment]=Tables.wwt_type_tre[treatment].ch4_efac;
		}

		//initial option "--select treatment--"
		var option = document.createElement('option');
		select.appendChild(option);
		option.innerHTML="--select treatment--";

		//go over all countries
		for(var treatment in wwt_ch4_efac)
		{
			var option=document.createElement('option');
			select.appendChild(option);
			var cons=wwt_ch4_efac[treatment];
			option.value=cons;
			option.setAttribute('treatment',treatment);
			option.innerHTML=treatment+" ("+cons+")";
			if(treatment==Global.Configuration.Selected.wwt_ch4_efac && cons==Global.Waste.Treatment.wwt_ch4_efac)
			{
				option.selected='true';
			}
		}
	},
}
