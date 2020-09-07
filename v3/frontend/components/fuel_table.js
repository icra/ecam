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
      <div>
        <h1> {{translate('Fuel types')}}</h1>
        <img src=img/fuel.png>
        <h4>{{translate('fuelInfo_description')}}</h4>
      </div>

      <!--table-->
      <table style="font-size:16px;margin-bottom:3em"> 
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
            <th>{{translate('#fuelInfo_engines')}}</th>
            <th>{{translate('#fuelInfo_vehicles')}}</th>
            <th>{{translate('#fuelInfo_engines')}}</th>
            <th>{{translate('#fuelInfo_vehicles')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fuel in Tables['Fuel types']">
            <td>{{fuel}}</td>
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
      <!--
        <script>
          (function()
          {
            for(var fuel in Tables['Fuel types']) {
              var newRow=table.insertRow(-1);
              newRow.insertCell(-1).innerHTML="<b>"+fuel+"</b>";
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFCH4.engines;
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFCH4.vehicles;
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFN2O.engines;
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFN2O.vehicles;
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFCO2;
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].FD;
              newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].NCV;
            }
          })();
        </script>
      -->
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
