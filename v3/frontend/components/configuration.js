let configuration=new Vue({
  el:"#configuration",
  data:{
    visible:false,

    are_you_editing_name:false,

    Global,
    Languages,
    Structure,
    Countries,
    GWP_reports,
    Cts,
  },
  methods:{
    translate,
    format,

    //deactivate level2 when level1 is deactivated
    check_l2_from_l1(){
      //if level1 is inactive, set related level2 inactive
      Structure.filter(l=>l.sublevel==false).forEach(l1=>{
        if(!this.Global.Configuration.ActiveStages[l1.alias]){
          //reset l1 values
          this.reset_stage(l1.alias);
          //reset l2 values
          Structure.filter(l=>(l.sublevel && l.level==l1.level))
            .forEach(l=>{
              this.Global.Configuration.ActiveStages[l.alias]=false;
              this.reset_stage(l.alias);
            });
        }
      });
    },

    //activate level1 when level2 is activated
    check_l1_from_l2(){
      //if level2 is active, set related level1 active
      Structure.filter(l=>l.sublevel).forEach(l2=>{
        if(this.Global.Configuration.ActiveStages[l2.alias]){
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
        this.Global.Configuration.ActiveStages[l.alias]=true;
      })
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
        obj = this.Global[stage.level];
      }else{
        //l2
        obj = this.Global[stage.level][stage.sublevel];
        Global.Substages[stage.level][stage.sublevel]=[]; //reset substages
      }

      //reset obj values
      for(let key in obj) {
        if(typeof(obj[key])=="number") obj[key]=0;
      }
    },

    //set variables from selected country
    set_variables_from_selected_country(){
      let country = this.Global.General.Country;

      //variables in Global.to be changed:
      [ 'conv_kwh_co2',
        'prot_con',
        'bod_pday',
        'bod_pday_fs'
      ].forEach(key=>{
        //put bod_pday value in faecal sludge as well
        let key2 = key;
        if(key=="bod_pday_fs"){ key2="bod_pday"; }
        this.Global.General[key]=Countries[country][key2];
      });
    },

    go_to_first_stage_active(){
      let level    = false;
      let sublevel = false;
      let alias = Object.entries(Global.Configuration.ActiveStages).find(([key,val])=>{
        return val==true;
      });
      if(!alias){
        alert('All water cycle stages are inactive. Activate at least one stage');
        return false;
      }
      alias = alias[0]; //only the string not the value
      let stage = Structure.find(s=>s.alias == alias);
      go_to(stage.level, stage.sublevel);
      return true;
    },

    //set constants from selected gwp report
    set_constants_from_gwp_report(){
      let index = this.Global.Configuration.Selected.gwp_reports_index;
      this.Cts.ct_ch4_eq.value = this.GWP_reports[index].ct_ch4_eq;
      this.Cts.ct_n2o_eq.value = this.GWP_reports[index].ct_n2o_eq;
    },
  },
  template:`
    <!--configuration VIEW-->
    <div id=configuration v-if="visible && Languages.ready">
      <!--system name-->
      <h1 style=text-align:center>
        <div v-if="are_you_editing_name">
          <input
            @blur="are_you_editing_name=false"
            v-model="Global.General.Name"
            maxlength=50
            placeholder="System name"
            style="border:1px solid #ccc"
          >
        </div>
        <div v-else>
          <b style="font-size:x-large">{{Global.General.Name}}</b>
          <button @click="are_you_editing_name=true">
            Change name
          </button>
        </div>
      </h1>

      <!--activate the stages which form your system-->
      <div style="text-align:center;color:#666;font-weight:bold">
        Activate the stages which form your system
      </div>

      <!--picture TODO-->
      <div>
        <hr>
        <center>
          picture
        </center>
        <hr>
      </div>

      <!--icons-->
      <div>
        <div id=select_stages
          style="
            display:grid;
            grid-template-columns:30% 30% 30%;
            grid-gap:5%;
            text-align:center;
          "
        >
          <div
            v-for="l1 in Structure.filter(l=>l.sublevel==false)"
          >
            <!--sublevels-->
            <div
              style="
                display:grid;
                grid-template-columns:33% 33% 33%;
              "
            >
              <div v-for="l2 in Structure.filter(l=>(l.sublevel && l.level==l1.level))"
                @click="Global.Configuration.ActiveStages[l2.alias]^=1"
              >
                <div>
                  <img :src="'frontend/img/'+l2.alias+(Global.Configuration.ActiveStages[l2.alias]?'':'-off')+'.png'">
                </div>
                <div :style="'color:'+(Global.Configuration.ActiveStages[l2.alias] ? l1.color : '#ccc')">
                  <b><small>{{translate(l2.sublevel)}}</small></b>
                </div>
              </div>
            </div>

            <!--level-->
            <div
              @click="Global.Configuration.ActiveStages[l1.alias]^=1"
              style="margin-top:1em"
            >
              <div :style="'padding:1em;color:white;background:'+(Global.Configuration.ActiveStages[l1.alias] ? l1.color : '#ccc')">
                <b>{{translate(l1.level)}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--rest of parameters-->
      <div
        style="
          margin-top:5em;
          display:grid;
          grid-template-columns:49% 49%;
          grid-gap:2%;
          grid-row-gap:2em;
        "
      >
        <!--assessment period-->
        <fieldset>
          <legend>Assessment period</legend>
          <div>
            <b>
              From:
              <input type=date v-model="Global.General.AssessmentPeriodStart">
            </b>
            <b>
              To:
              <input type=date v-model="Global.General.AssessmentPeriodEnd">
            </b>
            <span>
              (<span :class="Global.Days()<=0 ? 'warning':''" v-html="format(Global.Days())"></span>
              <span class=unit>{{translate('days')}}</span>)
            </span>
          </div>
        </fieldset>

        <!--select currency-->
        <fieldset>
          <legend>
            <span v-html="translate('currency')"></span>
          </legend>
          <div>
            <b>
              {{translate('configuration_new_currency')}}
            </b>
            <input
              v-model="Global.General.Currency"
              size=3 maxlength=3 placeholder="ccc"
            >
          </div>
        </fieldset>

        <!--select country-->
        <fieldset>
          <legend> Country </legend>
          <div>
            <div>
              <b>Select</b>
              &emsp;
              <select
                v-model="Global.General.Country"
                @change="set_variables_from_selected_country()"
              >
                <option value="false">--select--</option>
                <option v-for="country in Object.keys(Countries)">
                  {{country}}
                </option>
              </select>
              &emsp;
              <button onclick="ecam.show('countries')">
                More info
              </button>
            </div><hr>

            <table style="width:100%">
              <tr :class="Global.General.conv_kwh_co2<=0?'warning':''">
                <td v-html="translate('conv_kwh_co2_descr')">
                <td>
                  <input type=number class=number v-model.number="Global.General.conv_kwh_co2" style="width:95%" min=0>
                </td>
                <td>
                  kg<sub>CO<sub>2</sub></sub>/kWh
                </td>
              </tr>
              <tr :class="Global.General.prot_con<=0?'warning':''">
                <td v-html="translate('prot_con_descr')">
                <td>
                  <input type=number class=number v-model.number="Global.General.prot_con" style="width:95%" min=0>
                </td>
                <td>
                  kg/{{translate('person')}}/{{translate('year')}}
                </td>
              </tr>
              <tr :class="Global.General.bod_pday<=0?'warning':''">
                <td v-html="translate('bod_pday_descr')">
                <td>
                  <input type=number class=number v-model.number="Global.General.bod_pday" style="width:95%" min=0>
                </td>
                <td>
                  g/{{translate('person')}}/{{translate('day')}}
                </td>
              </tr>
              <tr :class="Global.General.bod_pday_fs<=0?'warning':''">
                <td v-html="translate('bod_pday_fs_descr')">
                <td>
                  <input type=number class=number v-model.number="Global.General.bod_pday_fs" style="width:95%" min=0>
                </td>
                <td>
                  g/{{translate('person')}}/{{translate('day')}}
                </td>
              </tr>
            </table>
          </div>
        </fieldset>

        <!--select assessment report-->
        <fieldset>
          <legend>
            Select Global Warming Potential Source
          </legend>
          <div>
            <div>
              <!--select gwp report which defines gwp values-->
              <b>Select</b>
              &emsp;
              <select
                v-model="Global.Configuration.Selected.gwp_reports_index"
                @change="set_constants_from_gwp_report()"
              >
                <option v-for="report,i in GWP_reports" :value="i">
                  {{report.report}}
                </option>
              </select>
              &emsp;
              <button onclick="ecam.show('gwp_table')">
                More info
              </button>
            </div><hr>

            <!--description of gwp values-->
            <p>
              <b style="padding:0.5em 0"
                v-html="translate('gwp_values_relative_to').prettify()"
              ></b>
            </p>

            <!--actual gwp values-->
            <table>
              <tr>
                <td>
                  {{translate('carbon_dioxide')}} (CO<sub>2</sub>)
                </td>
                <td align=right>1</td>
                <td>
                  CO<sub>2</sub> {{translate('equivalents')}}
                </td>
              <tr>
                <td>
                  {{translate('methane')}} (CH<sub>4</sub>)
                </td>
                <td align=right>
                  {{Cts.ct_ch4_eq.value}}
                </td>
                <td>
                  CO<sub>2</sub> {{translate('equivalents')}}
                </td>
              <tr>
                <td>
                  {{translate('nitrouns_oxide')}} (N<sub>2</sub>O)
                </td>
                <td align=right>
                  {{Cts.ct_n2o_eq.value}}
                </td>
                <td>
                  CO<sub>2</sub> {{translate('equivalents')}}
                </td>
              </tr>
            </table>
          </div>
        </fieldset>
      </div>
    </div>
  `,

  style:`
    <style>
      #configuration {
        padding:3em;
      }
      #configuration select,
      #configuration input {
        border:none;
        padding:0.5em 0.2em;
      }
      #configuration #select_stages img{width:70px;vertical-align:middle}
      #configuration fieldset{
        padding:0;
        border:none;
        background:#f6f6f6;
        display:block;
      }
      #configuration fieldset > legend {
        background:white;
        color:var(--color-level-generic);
        font-weight:bold;
        padding-bottom:0.5em;
        width:100%;
      }
      #configuration fieldset > div {
        padding:2em;
      }

      #configuration .warning {
        font-weight:bold;
        color:red;
      }
      #configuration .warning:after {
        content:" [!]";
      }
    </style>
  `,
});
