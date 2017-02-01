/** 
  TO DO:
  variables that not behave like normal ones are treated here
  they are inputs with a list of possible values that set the number

  what is different of normal dropdowns is that the user can also enter a number besides selecting an option
 **/

var Exceptions =
{
	//wrapper
	apply:function()
	{
		this.wwc_prot_con();
	},

	//make wwc_prot_con selection (which is inside its description) stay selected
	wwc_prot_con:function()
	{
		var td=document.querySelector('tr[field=wwc_prot_con] td');
		if(!td)return;

		var select=document.createElement('select');
		select.onchange=function()
		{
			Global.Waste.Collection.wwc_prot_con=parseFloat(select.value);
			Global.Configuration.Selected.wwc_prot_con=select.options[select.options.selectedIndex].getAttribute('country');
			init();
		}

		//table for prot consumption in kg/person/year
		var ww_prot_con = {
			"Albania":36.135,
			"Algeria":31.39,
			"Angola":15.695,
			"Antigua and Barbuda":29.93,
			"Argentina":34.31,
			"Armenia":25.55,
			"Australia":38.69,
			"Austria":39.055,
			"Azerbaijan":31.39,
			"Bahamas":30.66,
			"Bangladesh":17.885,
			"Barbados":34.675,
			"Belarus":32.485,
			"Belgium":35.405,
			"Belize":26.28,
			"Benin":21.535,
			"Bermuda":27.74,
			"Bolivia (Plurinational State of)":20.44,
			"Bosnia and Herzegovina":32.12,
			"Botswana":23.36,
			"Brazil":30.66,
			"Brunei Darussalam":31.755,
			"Bulgaria":28.105,
			"Burkina Faso":29.2,
			"Burundi":16.425,
			"Cambodia":20.805,
			"Cameroon":21.17,
			"Canada":38.325,
			"Cape Verde":24.82,
			"Central African Republic":16.79,
			"Chad":22.63,
			"Chile":32.12,
			"China":32.485,
			"Colombia":23.725,
			"Comoros":16.06,
			"Congo":19.345,
			"Costa Rica":27.01,
			"Côte d'Ivoire":18.25,
			"Croatia":28.835,
			"Cuba":29.2,
			"Cyprus":35.04,
			"Czech Republic":35.04,
			"Democratic People's Republic of Korea":21.17,
			"Denmark":40.515,
			"Djibouti":21.17,
			"Dominica":33.945,
			"Dominican Republic":18.98,
			"Ecuador":20.805,
			"Egypt":33.215,
			"El Salvador":25.915,
			"Eritrea":17.155,
			"Estonia":33.215,
			"Ethiopia":20.44,
			"Fiji":28.835,
			"Finland":39.055,
			"France":41.245,
			"French Polynesia":36.5,
			"Gabon":29.565,
			"Gambia":20.075,
			"Georgia":28.105,
			"Germany":36.135,
			"Ghana":21.535,
			"Greece":43.07,
			"Grenada":27.01,
			"Guatemala":20.805,
			"Guinea":19.71,
			"Guinea-Bissau":16.06,
			"Guyana":27.375,
			"Haiti":14.965,
			"Honduras":24.455,
			"Hungary":32.485,
			"Iceland":48.545,
			"India":20.44,
			"Indonesia":20.44,
			"Iran (Islamic Republic of)":30.66,
			"Ireland":40.15,
			"Israel":45.99,
			"Italy":40.88,
			"Jamaica":28.47,
			"Japan":33.58,
			"Jordan":27.74,
			"Kazakhstan":37.96,
			"Kenya":21.17,
			"Kiribati":27.01,
			"Kuwait":33.945,
			"Kyrgyzstan":30.295,
			"Lao People's Democratic Republic":22.265,
			"Latvia":32.12,
			"Lebanon":30.66,
			"Lesotho":25.185,
			"Liberia":13.14,
			"Libyan Arab Jamahiriya":28.105,
			"Lithuania":41.975,
			"Luxembourg":44.895,
			"Madagascar":17.885,
			"Malawi":20.075,
			"Malaysia":28.835,
			"Maldives":40.15,
			"Mali":25.915,
			"Malta":43.07,
			"Mauritania":31.39,
			"Mauritius":30.295,
			"Mexico":33.58,
			"Mongolia":26.28,
			"Morocco":32.485,
			"Mozambique":13.87,
			"Namibia":24.455,
			"Nepal":21.9,
			"Netherlands":38.325,
			"Netherlands Antilles":30.66,
			"New Caledonia":31.025,
			"New Zealand":34.31,
			"Nicaragua":22.63,
			"Niger":27.01,
			"Nigeria":22.63,
			"Norway":39.055,
			"Occupied Palestinian Territory":21.535,
			"Pakistan":20.805,
			"Panama":25.915,
			"Paraguay":25.55,
			"Peru":24.455,
			"Philippines":21.535,
			"Poland":36.865,
			"Portugal":41.61,
			"Republic of Korea":32.12,
			"Republic of Moldova":28.105,
			"Romania":40.515,
			"Russian Federation":35.405,
			"Rwanda":17.885,
			"Saint Kitts and Nevis":26.28,
			"Saint Lucia":33.945,
			"Saint Vincent and the Grenadines":28.835,
			"Samoa":27.74,
			"Sao Tome and Principe":21.9,
			"Saudi Arabia":31.755,
			"Senegal":21.535,
			"Serbia and Montenegro":27.375,
			"Seychelles":30.66,
			"Sierra Leone":18.98,
			"Slovakia":26.645,
			"Slovenia":36.865,
			"Solomon Islands":19.345,
			"South Africa":29.565,
			"Spain":39.42,
			"Sri Lanka":20.075,
			"Sudan":26.645,
			"Suriname":20.075,
			"Swaziland":22.995,
			"Sweden":39.055,
			"Switzerland":33.58,
			"Syrian Arab Republic":29.2,
			"Tajikistan":19.71,
			"Thailand":20.805,
			"The former Yugoslav Republic of Macedonia":27.74,
			"Timor-Leste":18.25,
			"Togo":17.885,
			"Trinidad and Tobago":24.82,
			"Tunisia":33.945,
			"Turkey":36.135,
			"Turkmenistan":31.755,
			"Uganda":17.885,
			"Ukraine":32.485,
			"United Arab Emirates":37.96,
			"United Kingdom":37.96,
			"United Republic of Tanzania":18.25,
			"United States of America":41.61,
			"Uruguay":29.2,
			"Uzbekistan":27.375,
			"Vanuatu":23.36,
			"Venezuela (Bolivarian Republic of)":25.915,
			"Viet Nam":26.28,
			"Yemen":19.71,
			"Zambia":17.52,
			"Zimbabwe":20.075,
		}

		//initial option "--select country--"
		var option = document.createElement('option');
		select.appendChild(option);
		option.innerHTML="--select country--";

		//go over all countries
		for(var country in ww_prot_con)
		{
			var option=document.createElement('option');
			select.appendChild(option);
			var cons=ww_prot_con[country];
			option.value=cons;
			option.setAttribute('country',country);
			option.innerHTML=country+" ("+cons+")";
			if(country==Global.Configuration.Selected.wwc_prot_con && cons==Global.Waste.Collection.wwc_prot_con)
			{
				option.selected='true';
			}
		}

		//put the name of the selected technology instead of the number
		td.appendChild(select);
	},
}
