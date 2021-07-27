//-----------------------------------------------------------------------------
// input field for inputs in tier B
//-----------------------------------------------------------------------------
Vue.component('input_ecam',{
  props:[
    'code',
    'current_stage',
    'level',
  ],

  template:`
    <tr
      :class="is_highlighted() ? 'highlighted':'' "
      @mouseenter="highlight_outputs()"
      @mouseleave="highlight_outputs(true)"
    >
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

          <!--estimation button-->
          <div v-if="Estimations[code]">
            <button
              @click="current_stage[code]=Estimations[code](current_stage)"
              @mousemove="caption.show($event, translate('Estimation formula')+':<br><pre>'+Formulas.prettify(Estimations[code])+'</pre>')"
              @mouseout="caption.hide()"
              :disabled="isNaN(Estimations[code](current_stage))"
              class="btn_estimation"
              tabindex="-1"
              :style="{borderColor:(current_stage[code]==Estimations[code](current_stage)?'green':'')}"
            >
              <div>{{translate("Estimation")}}:&nbsp;</div>
              <div style="display:flex;align-items:center">
                <div v-html="format(Estimations[code](current_stage)/Units.multiplier(code))"></div>
                <div v-html="get_current_unit(code,Global).prettify()" style="margin-left:2px"></div>
              </div>
            </button>
          </div>
        </div>

        <!--link to variable description-->
        <div><a @click="variable.view(code)"><small>{{code}}</small></a></div>

        <!--<select> element for exceptions ('suggestions')-->
        <div
          v-if="Exceptions[code]"
          style="text-align:left;margin-top:5px;"
        >
          <!--case 1: selection is a percent of something else-->
          <select
            v-if="Exceptions[code].percent_of"
            v-model.number="current_stage[code]"
            style="width:100%"
            tabindex="-1"
          >
            <option
              v-for="obj,i in Tables[Exceptions[code].table]"
              :value="calculate_percent_from_table(current_stage,code,i)"
            >
              {{translate(obj.name)}}
              [{{ format(100*obj[Exceptions[code].table_field(current_stage)]) }} %]
              ({{ format(obj[Exceptions[code].table_field(current_stage)]*Exceptions[code].percent_of(current_stage)/Units.multiplier(code) )}}
              {{get_current_unit(code,Global)}})
            </option>
            <option :value="current_stage[code]">
              {{translate('Custom value')}}
            </option>
          </select>

          <!--case 2: selection has to be converted-->
          <select
            v-else-if="Exceptions[code].conversion"
            v-model.number="current_stage[code]"
            style="width:100%"
            tabindex="-1"
          >
            <option
              v-for="obj,i in Tables[Exceptions[code].table]"
              :value="calculate_conversion_from_table(current_stage,code,i)"
            >
              {{translate(obj.name)}}
              &rarr;
              [{{obj[Exceptions[code].table_field(current_stage)]}} {{Exceptions[code].table_field_unit(current_stage)}}]
              &rarr;
              ({{ format(    obj[Exceptions[code].table_field(current_stage)]*Exceptions[code].conversion(current_stage)/Units.multiplier(code) )}}
              {{get_current_unit(code,Global)}})
            </option>
            <option :value="current_stage[code]">custom value</option>
          </select>

          <!--case 3: selection is a fixed value-->
          <select v-else
            v-model.number="current_stage[code]"
            style="width:100%"
            tabindex="-1"
          >
            <option
              v-for="obj in Tables[Exceptions[code].table]"
              :value="parseFloat(obj[Exceptions[code].table_field(current_stage)])"
            >
              {{translate(obj.name)}}
              ({{ format(obj[Exceptions[code].table_field(current_stage)]) }})
            </option>
            <option :value="current_stage[code]">custom value</option>
          </select>
        </div>

        <!--indicator of "variable not filtered"-->
        <div v-if="!is_code_in_any_filter(code)">
          <code style=background:yellow>[warning:no-filter {{code}}]</code>
        </div>
      </td>

      <!--input value: numbers and dropdowns-->
      <td
        style="
          padding:0;
          background:#eee;
          width:10em;
        "
      >
        <!--inputs whose magnitude is "Option"-->
        <div v-if="Info[code] && Info[code].magnitude=='Option' && Info[code].table" style="line-height:3em">
          <select v-model="current_stage[code]"
            style="
              display:block;
              margin:auto;
              max-width:250px;
            "
          >
            <option
              v-for="obj,i in Tables[Info[code].table]"
              :value="parseInt(i)"
            >
              ({{i}})
              {{translate(obj.name)}}
            </option>
          </select>
        </div>
        <!--inputs with numeric value-->
        <div v-else
          class=input
          :title="translate('edit_click_to_modify')"
          style="text-align:right;padding:0"
        >
          <input
            :value="format(current_stage[code]/Units.multiplier(code))"
            @focus         = "focus_input(current_stage, code, $event)"
            @blur          = "blur_input(current_stage, code, $event)"
            @keyup.enter   = "$event.target.blur()"
            :equal_to_zero = "current_stage[code]==0"
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
              tabindex="-1"
            >
              <option
                v-for="mul,unit in Units[Info[code].magnitude]"
                :selected="get_current_unit(code,Global) == unit"
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

  data(){
    return{
      caption,
      variable,

      Global,
      Info,
      Units,
      Tables,
      Estimations,
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

    //calculate a value from an exception input that uses a percent
    calculate_percent_from_table(stage, code, index){
      let row       = Tables[Exceptions[code].table][index];
      let field     = Exceptions[code].table_field(stage);
      let new_value = row[field]*Exceptions[code].percent_of(stage);
      return parseFloat(new_value)||0;
    },

    //calculate a value from an exception input that uses a conversion in a table
    calculate_conversion_from_table(stage, code, index){
      let row       = Tables[Exceptions[code].table][index];
      let field     = Exceptions[code].table_field(stage);
      let new_value = row[field]*Exceptions[code].conversion(stage);
      return parseFloat(new_value)||0;
    },

    focus_input(stage, key, event){
      let input = event.target;
      input.setAttribute('type','number');
      input.value = stage[key]/Units.multiplier(key);
      input.select();
    },

    blur_input(stage, key, event){
      let input   = event.target;
      input.setAttribute('type','');
      let value   = parseFloat(input.value)||0;
      stage[key]  = value*Units.multiplier(key);
      input.value = format(stage[key]/Units.multiplier(key));
    },

    /*UNITS*/
    /*select unit for a specific variable and save it to configuration*/
    select_unit(key, event){
      let select = event.target;
      let newUnit = select.value;
      this.Global.Configuration.Units[key]=newUnit;
      this.$forceUpdate();
    },

    //highlight related outputs
    highlight_outputs(off){
      off=off||false;
      if(off){
        tier_b.highlighted.outputs=[];
        return
      }
      if(tier_b.highlight){
        tier_b.highlighted.outputs = Formulas.outputs_per_input(this.code);
      }
    },

    is_highlighted(){
      return (tier_b.highlight && tier_b.highlighted.inputs.indexOf(this.code)+1);
    },
  },
});
