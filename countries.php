<!doctype html><html><head>
  <?php include'imports.php'?>
</head><body><center>

<?php
  include'sidebar.php';
  include'navbar.php';
  include'linear.php';
?>

<!--vue template ecam v3-->
<div id=countries>
  <h1>{{translate('Countries')}}</h1>
  <table>
    <tr>
      <th rowspan=2>{{translate('Country')}}
      <th>
        {{translate('Emission_factor')}}<sup>1</sup>
        <br><a href=variable.php?id=conv_kwh_co2>(conv_kwh_co2)</a>
      </th>
      <th>
        {{translate('Annual_protein_consumption')}}<sup>2</sup>
        <br><a href=variable.php?id=prot_con>(prot_con)</a>
      </th>
      <th>
        BOD<sub>5</sub><sup>3</sup>
        <br><a href=variable.php?id=bod_pday>(bod_pday)</a>
      </th>
    </tr>
    <tr>
      <th>kgCO<sub>2</sub>/kWh
      <th>kg/{{translate('person')}}/{{translate('year')}}
      <th>g/{{translate('person')}}/{{translate('day')}}
    </tr>
    <tr v-for="country,name in Countries"
      :class="Global.General.Country==name?'selected':''"
    >
      <td><b>{{name}}</b>
      <td class=number>{{country.conv_kwh_co2}}
      <td class=number>{{country.prot_con}}
      <td class=number>{{country.bod_pday}}
    </tr>
  </table>

  <table id=references>
    <tr><td colspan=2>{{translate('References')}}
    <tr><td>1<td>BRANDER, M. SOOD A. WYLIE, C. HAUGHTON, A. LOVELL, J., 2011,Technical Paper Electricity-specific emission factors for grid electricity, Ecometrica,
    <tr><td>2<td>
      <a href="docs/FAO.xls" target=_blank>
        FAO Statistics Division, 2010, Food Balance Sheets
      </a>
    <tr>
    <tr><td>3<td>
      <a href="docs/IPCC_V5_6_Ch6_Wastewater.pdf" target=_blank>
        IPCC, 2006, Guidelines for National Greenhouse Gas Inventories
        Volume 5 Waste, Chapter 6
      </a>
    </tr>
  </table>
</div>

<style>
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

<!--vue model ecam v3-->
<script>
  let countries = new Vue({
    el:"#countries",
    data:{
      Global,
      Countries,
    },
    methods:{
      translate,
    },
  });
</script>
