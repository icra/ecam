Vue.component('configuration',{
  data:function(){
    Global,
    Structure,
    Countries,
    GWP_reports,
    Cts,
  },

  methods:{
    translate,
    updateResult,

    //deactivate level2 when level1 is deactivated
    check_l2_from_l1(){
      //if level1 is inactive, set related level2 inactive
      Structure.filter(l=>l.sublevel==false).forEach(l1=>{
        if(!Global.Configuration.ActiveStages[l1.alias]){
          //reset l1 values
          this.reset_stage(l1.alias);
          //reset l2 values
          Structure.filter(l=>(l.sublevel && l.level==l1.level))
            .forEach(l=>{
              Global.Configuration.ActiveStages[l.alias]=false;
              this.reset_stage(l.alias);
            });
        }
      });
    },

    //activate level1 when level2 is activated
    check_l1_from_l2(){
      //if level2 is active, set related level1 active
      Structure.filter(l=>l.sublevel).forEach(l2=>{
        if(Global.Configuration.ActiveStages[l2.alias]){
          Structure.filter(l=>(l.sublevel==false && l.level==l2.level))
            .forEach(l=>{
              Global.Configuration.ActiveStages[l.alias]=true;
            });
        }else{
          this.reset_stage(l2.alias);
        }
      });
    },

    //activate all stages
    activate_all_stages(){
      Structure.forEach(l=>{
        Global.Configuration.ActiveStages[l.alias]=true;
      })
      updateResult();
    },

    //reset a stage:
    //1) set all variables to zero
    //2) reset substages (only level2)
    reset_stage(alias){
      let stage=Structure.find(s=>s.alias==alias);
      if(!stage) throw `stage '${alias}' not found`

      let obj = null; //stage object inside Global

      if(stage.sublevel==false){
        //l1
        obj = Global[stage.level];
      }else{
        //l2
        obj = Global[stage.level][stage.sublevel];
        Substages[stage.level][stage.sublevel]=[]; //reset substages
      }

      //reset obj values
      for(let key in obj) {
        if(typeof(obj[key])=="number") obj[key]=0;
      }

      updateResult();
    },

    //set variables from selected country
    set_variables_from_selected_country(){
      let country = Global.General.Country;
      Global.Configuration.Selected.prot_con=country;
      //variables in Global.General to be changed:
      [ 'conv_kwh_co2',
        'prot_con',
        'bod_pday',
        'bod_pday_fs'
      ].forEach(key=>{
        //put bod_pday value in faecal sludge as well
        let key2 = key;
        if(key=="bod_pday_fs"){ key2="bod_pday"; }
        Global.General[key]=Countries[country][key2];
      });
      updateResult();
    },

    //answer fuel engines question
    answerAnyFuelEngines(){
      let ans=parseInt(Global.General.anyFuelEngines);
      Global.General.anyFuelEngines = ans;
      console.log({ans});
      Global.Configuration['Yes/No'].wsa_engines=ans;
      Global.Configuration['Yes/No'].wst_engines=ans;
      Global.Configuration['Yes/No'].wsd_engines=ans;
      Global.Configuration['Yes/No'].wwc_engines=ans;
      Global.Configuration['Yes/No'].wwt_engines=ans;
      Global.Configuration['Yes/No'].wwd_engines=ans;
      Global.Configuration['Yes/No'].fst_engines=ans;
      if(!ans){
        //reset stage values
        Global.Water.Abstraction .wsa_vol_fuel=0;
        Global.Water.Treatment   .wst_vol_fuel=0;
        Global.Water.Distribution.wsd_vol_fuel=0;
        Global.Waste.Collection  .wwc_vol_fuel=0;
        Global.Waste.Treatment   .wwt_vol_fuel=0;
        Global.Waste.Discharge   .wwd_vol_fuel=0;
        Global.Faecl.Treatment   .fst_vol_fuel=0;
        //reset substage values
        Substages.Water.Abstraction .forEach(s=>{s.wsa_vol_fuel=0});
        Substages.Water.Treatment   .forEach(s=>{s.wst_vol_fuel=0});
        Substages.Water.Distribution.forEach(s=>{s.wsd_vol_fuel=0});
        Substages.Waste.Collection  .forEach(s=>{s.wwc_vol_fuel=0});
        Substages.Waste.Treatment   .forEach(s=>{s.wwt_vol_fuel=0});
        Substages.Waste.Discharge   .forEach(s=>{s.wwd_vol_fuel=0});
        Substages.Faecl.Treatment   .forEach(s=>{s.fst_vol_fuel=0});
      }
      updateResult();
    },

    //set constants from selected gwp report
    set_constants_from_gwp_report(){
      let index = Global.Configuration.Selected.gwp_reports_index;
      Cts.ct_ch4_eq.value = GWP_reports[index].ct_ch4_eq;
      Cts.ct_n2o_eq.value = GWP_reports[index].ct_n2o_eq;
      updateResult();
    },
  },

  template:`
    <div id=configuration>
      <h1>{{ translate('configuration') }}</h1>
      <div class=flex style=justify-content:center>
        <!--configuration left-->
        <div style="max-width:50%">
          <h4 style=margin:0;margin-bottom:1em>
            {{translate('configuration_subtitle')}}
          </h4>
          <table id=select_stages>
            <tr>
              <th>{{translate('quick_assessment')}}
              <th>{{translate('energy_performance')}}
            </tr>
            <tbody v-for="l1 in Structure.filter(l=>l.sublevel==false)">
              <tr>
                <td
                  rowspan=4
                  :style="Global.Configuration.ActiveStages[l1.alias]?'background:lightgreen':''"
                >
                  <label>
                    <input type=checkbox
                      v-model="Global.Configuration.ActiveStages[l1.alias]"
                      @change="check_l2_from_l1();updateResult()"
                    >
                    <img :src="`img/${l1.alias}.png`">
                    {{translate(l1.level)}}<br>
                  </label>
                </td>
              </tr>
              <tr v-for="l2 in Structure.filter(l=>(l.sublevel && l.level==l1.level))">
                <td
                  :style="Global.Configuration.ActiveStages[l2.alias]?'background:lightgreen':''"
                >
                  <label>
                    <input type=checkbox
                      v-model="Global.Configuration.ActiveStages[l2.alias]"
                      @change="check_l1_from_l2();updateResult()"
                    >
                    <img :src="`img/${l2.alias}.png`">
                    {{translate(l2.sublevel)}}<br>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <button class=button
            @click="activate_all_stages()">
              {{translate('configuration_activate_all')}}
          </button>
        </div>

        <!--configuration right-->
        <div style="max-width:45%;padding:0em 1em 1em 1em">
          <!--select country-->
          <fieldset>
            <legend>{{translate('select_country')}}
              <select
                v-model="Global.General.Country"
                @change="set_variables_from_selected_country()"
              >
                <option value="false">--select--</option>
                <option v-for="country in Object.keys(Countries)">
                  {{country}}
                </option>
              </select>
              <a href="countries.php">Info</a>
            </legend>

            <table>
              <tr>
                <td v-html="translate('conv_kwh_co2_descr')">
                <td>
                  <input v-model.number="Global.General.conv_kwh_co2"
                    @change="updateResult"
                  >
                <td>kg<sub>CO<sub>2</sub></sub>/kWh
              <tr>
                <td v-html="translate('prot_con_descr')">
                <td>
                  <input v-model.number="Global.General.prot_con"
                    @change="updateResult"
                  >
                <td>kg/{{translate('person')}}/{{translate('year')}}
              <tr>
                <td v-html="translate('bod_pday_descr')">
                <td>
                  <input v-model.number="Global.General.bod_pday"
                    @change="updateResult"
                  >
                <td>g/{{translate('person')}}/{{translate('day')}}
              <tr>
                <td v-html="translate('bod_pday_fs_descr')">
                <td>
                  <input v-model.number="Global.General.bod_pday_fs"
                    @change="updateResult"
                  >
                <td>g/{{translate('person')}}/{{translate('day')}}
              </tr>
            </table>
          </fieldset>

          <!--fuel engines in any stage-->
          <fieldset>
            <legend>{{translate('do_you_have_engines')}}
            </legend>
            <label>
              {{translate('no')}}
              <input type=radio
                name=anyFuelEngines
                v-model.number="Global.General.anyFuelEngines"
                value=0
                @change=answerAnyFuelEngines()
              >
            </label> &emsp;
            <label>
              {{translate('yes')}}
              <input type=radio
                name=anyFuelEngines
                v-model.number="Global.General.anyFuelEngines"
                value=1
                @change=answerAnyFuelEngines()
              >
            </label>
          </fieldset>

          <div>
            <!--select assessment report-->
            <fieldset>
              <legend>
                {{translate('select_gwp_source')}}
                <!--select gwp report which defines gwp values-->
                <select
                  v-model="Global.Configuration.Selected.gwp_reports_index"
                  @change="set_constants_from_gwp_report()"
                >
                  <option v-for="report,i in GWP_reports" :value="i">
                    {{report.report}}
                  </option>
                </select>
                <a href=gwp_table.php>Info</a>
              </legend>

              <!--description of gwp values-->
              <div style="padding:0.5em 0"
                v-html="translate('gwp_values_relative_to')"
              ></div>

              <!--actual gwp values-->
              <table>
                <tr>
                  <td>{{translate('carbon_dioxide')}} (CO<sub>2</sub>)
                  <td align=right>1
                  <td>CO<sub>2</sub> {{translate('equivalents')}}
                <tr>
                  <td>{{translate('methane')}} (CH<sub>4</sub>)
                  <td align=right>{{Cts.ct_ch4_eq.value}}
                  <td>CO<sub>2</sub> {{translate('equivalents')}}
                <tr>
                  <td>{{translate('nitrouns_oxide')}} (N<sub>2</sub>O)
                  <td align=right>{{Cts.ct_n2o_eq.value}}
                  <td>CO<sub>2</sub> {{translate('equivalents')}}
                </tr>
              </table>
            </fieldset>
          </div>
        </div>
      </div>

      <!--prev & next buttons-->
      <div style="margin:1em">
        <button class="button prev"
          onclick="event.stopPropagation();window.location='getStarted.php'">
          {{translate('previous')}}
        </button>
        <button class="button next"
          onclick="event.stopPropagation();window.location='inhabitants.php'">
          {{translate('next')}}
        </button>
      </div>
    </div>
  `,
});
