let population = new Vue({
  el:"#population",

  data:{
    visible:false,
    caption,
    Population:[
      {level:'Water', stage:Global.Water,            code:'ws_resi_pop'},
      {level:'Water', stage:Global.Water,            code:'ws_serv_pop'},
      {level:'Waste', stage:Global.Waste,            code:'ww_resi_pop'},
      {level:'Waste', stage:Global.Waste.Collection, code:'wwc_conn_pop'},
      {level:'Waste', stage:Global.Waste.Treatment,  code:'wwt_serv_pop'},
      {level:'Faecl', stage:Global.Faecl,            code:'fs_resi_pop'},
      {level:'Faecl', stage:Global.Faecl,            code:'fs_onsi_pop'},
    ],

    Global,
    Structure,
  },

  methods:{
    translate,
    format,
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
    },
  },

  template:`
    <div id=population v-if="visible">
      <h1 style="text-align:center">{{translate('population')}}</h1>

      <h4 style="text-align:center;margin:0;margin-bottom:1em">
        {{translate("Enter the population living at each level of your system")}}
      </h4>

      <table style="font-size:16px;margin:auto;width:50%">
        <tbody v-for="l1 in Structure.filter(s=>s.sublevel==false)">
          <tr>
            <th colspan=3 :style="'background:'+l1.color+';text-align:left'">
              <img :src="'frontend/img/'+l1.alias+'.png'" width=25 style="line-height:4em;vertical-align:middle">
              {{translate(l1.level)}}
            </th>
          </tr>
          <tr v-if="!Global.Configuration.ActiveStages[l1.alias]">
            <td colspan=3 inactive>{{translate('birds_stage_not_active')}}</td>
          </tr>
          <tr v-else v-for="pop in Population.filter(p=>p.level==l1.level)">
            <td
              @mousemove="caption.show($event, translate(pop.code+'_expla'))"
              @mouseout="caption.hide()"
            >
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
      <div class=flex style="justify-content:center;margin-top:1em">
        <button class="button prev"
          onclick="event.stopPropagation();ecam.show('configuration')">
          {{translate('previous')}}
        </button>
        <button class="button next"
          onclick="event.stopPropagation();ecam.show('tier_a')">
          {{translate('next')}}
        </button>
      </div>
    </div>
  `,
});