let countries = new Vue({
  el:"#countries",

  data:{
    visible:false,
    variable,

    Global,
    Countries,
    GWP_reports,
    Languages,
    Cts,
  },

  methods:{
    translate,

    //set variables from selected country
    set_variables_from_selected_country(){
      select_scenario.set_variables_from_selected_country();
    },
  },

  template:`
    <div id=countries v-if="visible && Languages.ready">
      <h1 style="text-align:center">
        <span onclick="ecam.show('select_scenario')">{{translate('configuration')}}</span>
        &rsaquo;
        <span style=color:black>{{translate('Countries')}}</span>
      </h1>
      <table style="margin:auto">
        <thead>
          <tr>
            <th rowspan=2>{{translate('Country')}}
            <th>
              {{translate('Emission_factor')}}<sup>1</sup>
              <br><a @click="variable.view('conv_kwh_co2')">(conv_kwh_co2)</a>
            </th>
            <th>
              {{translate('Annual_protein_consumption')}}<sup>2</sup>
              <br><a @click="variable.view('prot_con')">(prot_con)</a>
            </th>
            <th>
              BOD<sub>5</sub><sup>3</sup>
              <br><a @click="variable.view('bod_pday')">(bod_pday)</a>
            </th>
            <th rowspan=2>
              Currency<sup>4</sup>
            </th>
            <th rowspan=2>
              Select
            </th>
          </tr>
          <tr>
            <th>kgCO<sub>2</sub>/kWh</th>
            <th>kg/{{translate('person')}}/{{translate('year')}}</th>
            <th>g/{{translate('person')}}/{{translate('day')}}</th>
          </tr>
        </thead>
        <tr
          v-for="country,name in Countries"
          :class="Global.General.Country==name?'selected':''"
        >
          <td><b>{{name}}</b></td>
          <td class=number>{{country.conv_kwh_co2}}</td>
          <td class=number>{{country.prot_con}}</td>
          <td class=number>{{country.bod_pday}}</td>
          <td style="text-align:center">{{country.currency}}</td>
          <td>
            <button @click="Global.General.Country=name;set_variables_from_selected_country()">select</button>
          </td>
        </tr>
      </table>

      <table id=references style="margin:auto">
        <tr>
          <td colspan=2>{{translate('References')}}</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            BRANDER, M. SOOD A. WYLIE, C. HAUGHTON, A. LOVELL, J.,
            2011,Technical Paper Electricity-specific emission factors for grid
            electricity, Ecometrica,
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="frontend/docs/FAO.xls" target=_blank>
              FAO Statistics Division, 2010, Food Balance Sheets
            </a>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <a href="frontend/docs/IPCC_V5_6_Ch6_Wastewater.pdf" target=_blank>
              IPCC, 2006, Guidelines for National Greenhouse Gas Inventories
              Volume 5 Waste, Chapter 6
            </a>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <a href="https://www.countries-ofthe-world.com/world-currencies.html" target=_blank>
              https://www.countries-ofthe-world.com/world-currencies.html (checked on 2020-12-10)
            </a>
          </td>
        </tr>
      </table>
    </div>
  `,

  style:`
    <style>
      #countries th {
        color:white;
        background:var(--color-level-generic);
      }
      #countries a {
        color:white;
      }
      #countries tr.selected {
        background:yellow;
      }
      #countries td.number {
        text-align:right;
      }
      #countries #references {
        margin-top:10px;
        margin-bottom:50px;
      }
      #countries #references td {
        border:none;
        padding:2px;
        font-size:11px;
      }
      #countries #references a {
        color:blue;
      }
    </style>
  `,
});
