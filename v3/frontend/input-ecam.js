//-----------------------------------------------------------------------------
//COMPONENTS (= reusable code)
//-----------------------------------------------------------------------------
Vue.component('input-ecam',{
  props:[
    'code',
    'current_stage',
  ],
  data:function(){
    return {
      ecam,
      Global,
      Info,
      Structure,
      Tips,
      Units,
      Tables,
      Recommendations,
      Exceptions,
      Normalization,
      Formulas,
      Questions,
    };
  },
  methods:{
    translate,
    format,
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
    //get current unit for specific variable
    get_current_unit(key){
      if(Info[key].magnitude=='Currency'){
        return Global.General.Currency;
      }
      if(undefined===this.Global.Configuration.Units[key]){
        this.Global.Configuration.Units[key] = this.Info[key].unit;
      }
      return this.Global.Configuration.Units[key];
    },
  },
  template:`<tr style="border:none;width:100%">
    <!--input name-->
    <td :caption="translate(code+'_expla')">
      <div class=flex style="justify-content:space-between">
        <div v-html="translate(code+'_descr')"></div>
        <div v-if="Recommendations[code]">
          <button
            @click="current_stage[code] = Recommendations[code]()"
            style="font-size:smaller;float:right"
            :caption="'Estimation formula:<br>\$\{Formulas.prettify(Recommendations[code])\}'"
          >
            Estimation:
            <span v-html="format(Recommendations[code]()/Units.multiplier(code))"></span>
            <span v-html="get_current_unit(code)"></span>
            &rarr;
          </button>
        </div>
      </div>
      <div>
        (<a onclick="alert('TODO')">{{code}}</a>)
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
    </td>

    <!--input value-->
    <!--dropdowns and numbers-->
    <td v-if="Info[code] && Info[code].magnitude=='Option'" colspan=2>
      <select v-model="current_stage[code]">
        <option
          v-for="obj,op in Tables[code]"
          :value="parseInt(Tables[code][op].value)"
        >
          ({{Tables[code][op].value}})
          {{translate(op)}}
        </option>
      </select>
    </td>
    <td v-else
      class=input
      :caption="translate('edit_click_to_modify')"
      style="text-align:right"
    >
      <input
        :value="format(current_stage[code]/Units.multiplier(code))"
        @focus="focus_input(current_stage, code, $event)"
        @blur="blur_input(current_stage, code, $event)"
      >
    </td>

    <!--input unit select-->
    <td v-if="Info[code] && Info[code].magnitude!='Option'">
      <!--select unit-->
      <div v-if="Units[Info[code].magnitude]">
        <select @change="select_unit(code, $event)">
          <option
            v-for="mul,unit in Units[Info[code].magnitude]"
            :selected="get_current_unit(code) == unit"
            v-html="unit"
          ></option>
        </select>
      </div>
      <div v-else>
        <span v-html="Info[code].unit"></span>
      </div>
    </td>
  </tr>`,
});
