let fuel_table = new Vue({
  el:"#fuel_table",
  data:{
    visible:false,
    Global,
    GWP_reports,
    Languages,
    Tables,
  },
  methods:{
    translate,
  },

  template:`
    <!--fuel table VIEW-->
    <div id=fuel_table v-if="visible && Languages.ready">
      <!--title-->
      <div style="text-align:center">
        <h1> {{translate('Fuel types')}}</h1>
        <img src="frontend/img/fuel.png">
        <h4>{{translate('fuelInfo_description')}}</h4>
      </div>

      <!--table-->
      <table style="font-size:16px;margin:auto;margin-bottom:3em;max-width:80%">
        <thead>
          <tr><th colspan=8 style=text-align:center>{{translate('fuelInfo_eeff')}}</th></tr>
          <tr>
            <th rowspan=2>{{translate('fuelInfo_type')}}</th>
            <th colspan=2>EF<sub>CH<sub>4</sub></sub> (kg/TJ)</th>
            <th colspan=2>EF<sub>N<sub>2</sub>O</sub> (kg/TJ)</th>
            <th rowspan=2>EF<sub>CO<sub>2</sub></sub> (kg/TJ)</th>
            <th rowspan=2 style=cursor:help :title="translate('fuelInfo_fd')">FD   (kg/L)</th>
            <th rowspan=2 style=cursor:help :title="translate('fuelInfo_ncv')">NCV (TJ/Gg)</th>
          </tr>
          <tr>
            <th>{{translate('fuelInfo_engines')}}</th>
            <th>{{translate('fuelInfo_vehicles')}}</th>
            <th>{{translate('fuelInfo_engines')}}</th>
            <th>{{translate('fuelInfo_vehicles')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fuel in Tables['Fuel type']">
            <td>{{translate(fuel.name)}}</td>
            <td>{{fuel.EFCH4.engines}}</td>
            <td>{{fuel.EFCH4.vehicles}}</td>
            <td>{{fuel.EFN2O.engines}}</td>
            <td>{{fuel.EFN2O.vehicles}}</td>
            <td>{{fuel.EFCO2}}</td>
            <td>{{fuel.FD}}</td>
            <td>{{fuel.NCV}}</td>
          </tr>
        </tbody>
      </table>

      <!--reference-->
      <div style="font-size:smaller;width:80%;margin:auto">
        <b>References</b><br>
        <ul>
          <li>
            Introduction
            <a href="https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf" target=_blank>
              https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf
            </a>
          </li>
          <li>
            Chapter 2
            <a href="https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf" target=_blank>
              https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf
            </a>
          </li>
          <li>
            Chapter 3:
            <a href="https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf" target=_blank>
              https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf
            </a>
          </li>
          <li>
            GHG Protocol:
            <a href="https://ghgprotocol.org/sites/default/files/Emission_Factors_from_Cross_Sector_Tools_March_2017.xlsx" target=_blank>
              https://ghgprotocol.org/sites/default/files/Emission_Factors_from_Cross_Sector_Tools_March_2017.xlsx
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,

  style:`
    <style>
      #fuel_table th {
        color:white;
        background:var(--color-level-generic);
      }
      #fuel_table td.number{
        text-align:right;
      }
    </style>
  `,

});
