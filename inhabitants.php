<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init() {
      Caption.listeners();
      {//focus first input element if its value is zero
        let first_input=document.querySelector('#population input');
        if(first_input && first_input.value==0){
          first_input.focus();
        }
      }
    }
  </script>
</head><body onload="init()"><center>
<?php
  include'sidebar.php';
  include'navbar.php';
  include'linear.php';
  include'caption.php';
  include'currentJSON.php';
?>

<!--vue template ecam v3-->
<div id=population>
  <h1>{{translate('population')}}</h1>

  <h4 style=margin:0;margin-bottom:1em>
    {{translate("Enter the population living at each level of your system")}}
  </h4>

  <table style="font-size:16px;margin:1em;width:50%">
    <tbody v-for="l1 in Structure.filter(s=>s.sublevel==false)">
      <tr>
        <th colspan=3 :style=`background:${l1.color};text-align:left`>
        <img :src="`img/${l1.alias}.png`" width=25 style="line-height:4em;vertical-align:middle">
        {{translate(l1.level)}}
      </tr>
      <tr v-if="!Global.Configuration.ActiveStages[l1.alias]">
        <td colspan=3 inactive>{{translate('birds_stage_not_active')}}
      </tr>
      <tr v-else v-for="pop in Population.filter(p=>p.level==l1.level)">
        <td :caption="translate(pop.code+'_expla')">
          {{translate(pop.code+'_descr')}}
        </td>
        <td class=input_container>
          <input
            :value="format(pop.stage[pop.code])"
            @focus="focus_input(pop, $event)"
            @blur="blur_input(pop, $event)"
            :tabindex="Population.indexOf(pop)+1"
            style="text-align:right"
          >
        </td>
        <td><small>{{translate('people')}}</small></td>
      </tr>
    </tbody>
  </table>

  <!--prev next buttons-->
  <div>
    <button class="button prev" onclick="event.stopPropagation();window.location='configuration.php'">
      {{translate('previous')}}
    </button>
    <button class="button next" onclick="event.stopPropagation();window.location='birds.php'">
      {{translate('next')}}
    </button>
  </div>
</div>

<!--css ecam v3-->
<style>
  /*indication "stage not active"*/
  #population td[inactive]{
    color:#999;
    background:#eee;
    font-size:smaller;
  }

  #population td.input_container {
    width:70px;
    border:1px solid #aaa;
    color:#666;
    background:#eee;
    padding:0 !important;
    text-align:right;
    cursor:cell;
  }
  #population td.input_container input {
    background:inherit;
    border:none;
    text-align:right;
    line-height:1em;
    width:70px;
    height:24px;
  }
  #population td.input_container input:focus {
    background:white;
  }
</style>

<!--vue model ecam v3-->
<script>
  let population=new Vue({
    el:'#population',
    data:{
      Global,
      Structure,
      Population:[
        {level:'Water', stage:Global.Water,            code:'ws_resi_pop'},
        {level:'Water', stage:Global.Water,            code:'ws_serv_pop'},
        {level:'Waste', stage:Global.Waste,            code:'ww_resi_pop'},
        {level:'Waste', stage:Global.Waste.Collection, code:'wwc_conn_pop'},
        {level:'Waste', stage:Global.Waste.Treatment,  code:'wwt_serv_pop'},
        {level:'Faecl', stage:Global.Faecl,            code:'fs_resi_pop'},
        {level:'Faecl', stage:Global.Faecl,            code:'fs_onsi_pop'},
      ],
    },
    methods:{
      translate,
      format,
      updateResult,
      focus_input(pop, event){
        let input = event.target;
        input.value = pop.stage[pop.code]
        input.select();
      },
      blur_input(pop, event){
        let input = event.target;
        let value = parseFloat(input.value) || 0;
        pop.stage[pop.code] = value;
        input.value=format(pop.stage[pop.code]);
        updateResult();
      },
    }
  });
</script>
