//-----------------------------------------------------------------------------
// input field for inputs in tier B
//-----------------------------------------------------------------------------

Vue.component('input_ecam',{
  template:`
    <div style="display:grid;grid-template-columns:60% 30% 10%">
      <!--input name-->
      <div
        @mousemove="caption.show($event, translate(code+'_expla').prettify())"
        @mouseout="caption.hide()"
      >
        <div class=flex style="justify-content:space-between;padding-right:5px">
          <div v-html="translate(code+'_descr').prettify()"></div>
          <div v-if="Recommendations[code]">
            <button
              @click="current_stage[code] = Recommendations[code]()"
              style="float:right"
              @mousemove="caption.show($event, \`Estimation formula:<br>\$\{Formulas.prettify(Recommendations[code])\}\`)"
              @mouseout="caption.hide()"
              :disabled="isNaN(Recommendations[code]())"
            >
              Estimation:
              <span v-html="format(Recommendations[code]()/Units.multiplier(code))"></span>
              <span v-html="get_current_unit(code)"></span>
              &rarr;
            </button>
          </div>
        </div>
        <div>
          (<a @click="variable.view(code)">{{code}}</a>)
        </div>
        <div v-if="Exceptions[code]">
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
      </div>

      <!--input value: numbers and dropdowns-->
      <div v-if="Info[code] && Info[code].magnitude=='Option'" style="line-height:3em">
        <select v-model="current_stage[code]">
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
        @mousemove="caption.show($event, translate('edit_click_to_modify'))"
        @mouseout="caption.hide()"
        style="text-align:right;padding:0"
      >
        <input
          :value="format(current_stage[code]/Units.multiplier(code))"
          @focus="focus_input(current_stage, code, $event)"
          @blur="blur_input(current_stage, code, $event)"
        >
      </div>

      <!--input unit select-->
      <div v-if="Info[code] && Info[code].magnitude!='Option'"
        style="text-align:left;padding-left:5px;line-height:3em"
      >
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
  `,

  props:[
    'code',
    'question',
    'current_stage',
  ],

  data:function(){
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
    };
  },
  methods:{
    translate,
    format,
    get_current_unit,

    focus_input(stage, key, event){
      let input = event.target;
      input.value = stage[key]/Units.multiplier(key);
      input.select();
    },

    blur_input(stage, key, event){
      let input = event.target;
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
