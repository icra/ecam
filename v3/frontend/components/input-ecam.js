//-----------------------------------------------------------------------------
// input field for inputs in tier B
//-----------------------------------------------------------------------------
Vue.component('input_ecam',{
  template:`
    <tr>
      <!--description and link-->
      <td
        @mousemove="caption.show($event, translate(code+'_expla').prettify())"
        @mouseout="caption.hide()"
        :style="{
          background:'var(--color-level-'+level+'-secondary)',
        }"
      >
        <div class=flex style="justify-content:space-between">
          <div>
            <span v-html="translate(code+'_descr').prettify()"></span>
          </div>

          <!--recommendation button-->
          <div v-if="Recommendations[code]">
            <button
              @click="current_stage[code] = Recommendations[code]()"
              @mousemove="caption.show($event, \`Estimation formula:<br>\$\{Formulas.prettify(Recommendations[code])\}\`)"
              @mouseout="caption.hide()"
              :disabled="isNaN(Recommendations[code]())"
              style="font-size:smaller"
            >
              Estimation:
              <span v-html="format(Recommendations[code]()/Units.multiplier(code))"></span>
              <span v-html="get_current_unit(code).prettify()"></span>
            </button>
          </div>
        </div>

        <!--link to variable description-->
        <div><a @click="variable.view(code)"><small>{{code}}</small></a></div>

        <!--<select> element for exceptions-->
        <div v-if="Exceptions[code]"
          style="text-align:left;margin-top:5px;"
        >
          <!--case 1: selection is a percent of something else-->
          <select v-if="Exceptions[code].percent_of" v-model="current_stage[code]">
            <option
              v-for="obj,option in Tables[Exceptions[code].table]"
              :value="parseFloat(obj[Exceptions[code].table_field()]*Exceptions[code].percent_of())"
            >
              {{translate(option)}}
              [{{        100*obj[Exceptions[code].table_field()] }} %]
              ({{ format(    obj[Exceptions[code].table_field()]*Exceptions[code].percent_of()/Units.multiplier(code) )}}
              {{get_current_unit(code)}})
            </option>
          </select>
          <!--case 2: selection is a fixed value-->
          <select v-else v-model="current_stage[code]">
            <option
              v-for="obj,option in Tables[Exceptions[code].table]"
              :value="parseFloat(obj[Exceptions[code].table_field()])"
            >
              {{translate(option)}}
              ({{ format(obj[Exceptions[code].table_field()]) }})
            </option>
          </select>
        </div>

        <!--indicator of "variable not filtered"-->
        <div v-if="!is_code_in_any_filter(code)">
          <code style=background:yellow>[warning:no-filter]</code>
        </div>
      </td>

      <!--input value: numbers and dropdowns-->
      <td style="padding:0;background:#eee">
        <!--inputs whose magnitude is "Option"-->
        <div v-if="Info[code] && Info[code].magnitude=='Option'" style="line-height:3em">
          <select v-model="current_stage[code]"
            style="
              display:block;
              margin:auto;
            "
          >
            <option
              v-for="obj,op in Tables[code]"
              :value="parseInt(Tables[code][op].value)"
            >
              ({{Tables[code][op].value}})
              {{translate(op)}}
            </option>
          </select>
        </div>
        <div v-else
          class=input
          :title="translate('edit_click_to_modify')"
          style="text-align:right;padding:0"
        >
          <input
            :value="format(current_stage[code]/Units.multiplier(code))"
            @focus="focus_input(current_stage, code, $event)"
            @blur="blur_input(current_stage, code, $event)"
            :equal_to_zero="current_stage[code]==0"
          >
        </div>
      </td>

      <!--unit-->
      <td :style="{background:'var(--color-level-'+level+'-secondary)'}">
        <div v-if="Info[code]"
          style="text-align:left;padding-left:5px;"
        >
          <div v-if="Info[code].magnitude=='Currency'">
            <span v-html="Global.General.Currency"></span>
          </div>
          <div v-else-if="Info[code].magnitude!='Option'">
            <!--select unit-->
            <select
              v-if="Units[Info[code].magnitude]"
              @change="select_unit(code, $event)"
            >
              <option
                v-for="mul,unit in Units[Info[code].magnitude]"
                :selected="get_current_unit(code) == unit"
                v-html="unit"
              ></option>
            </select>
            <div v-else>
              <span v-html="Info[code].unit.prettify()"></span>
            </div>
          </div>
        </div>
        <div v-else>no unit</div>
      </td>
    </tr>
  `,

  props:[
    'code',
    'current_stage',
    'level',
  ],

  data(){
    return{
      caption,
      variable,

      Global,
      Info,
      Units,
      Tables,
      Recommendations,
      Exceptions,
      Formulas,
      Questions,
      Filters,
    };
  },

  methods:{
    translate,
    format,
    get_current_unit,
    is_code_in_any_filter,

    focus_input(stage, key, event){
      let input = event.target;
      input.setAttribute('type','number');
      input.value = stage[key]/Units.multiplier(key);
      input.select();
    },

    blur_input(stage, key, event){
      let input = event.target;
      input.setAttribute('type','');
      let value = parseFloat(input.value) || 0;
      stage[key] = value*Units.multiplier(key);
      input.value=format(stage[key]/Units.multiplier(key));
    },


    /*UNITS*/
    /*select unit for a specific variable and save it to configuration*/
    select_unit(key, event){
      let select = event.target;
      let newUnit = select.value;
      this.Global.Configuration.Units[key]=newUnit;
      this.$forceUpdate();
    },
  },
});
