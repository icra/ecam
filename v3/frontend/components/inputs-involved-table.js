//-----------------------------------------------------------------------------
// table that lists inputs involved in a formula
//-----------------------------------------------------------------------------
Vue.component('inputs_involved_table',{
  template:`<div>
    <table class=inputs_involved>
      <tbody v-for="match in Formulas.ids_per_formula(obj[code].toString())">
        <!--input involved is a constant-->
        <tr v-if="Cts[match]" :title="'CONSTANT: '+Cts[match].descr">
          <!--involved constant code-->
          <td>
            <a
              style="color:grey;font-weight:bold"
              @click="constant.view(match)"
              v-html="match"
            ></a>
          </td>

          <!--involved constant value-->
          <td :title="Cts[match].value">
            {{ format(Cts[match].value) }}
          </td>

          <!--involved constant unit-->
          <td class=unit v-html="Cts[match].unit.prettify()"></td>
        </tr>

        <!--input involved is an Option-->
        <tr v-else-if="Info[match] && Info[match].magnitude=='Option'">
          <!--input involved code-->
          <td :title="translate(match+'_descr')">
            <a @click="variable.view(match)" :style="{color:get_level_color(locate_variable(match).level)}">{{match}}</a>
          </td>

          <!--input involved value-->
          <td colspan=2>
            {{
              Tables.get_row(match, get_current_stage(match,Global)[match]).name
            }}
          </td>
        </tr>

        <!--input involved is a normal one (input or output)-->
        <tr v-else>
          <td :title="translate(match+'_descr')">
            <a @click="variable.view(match)" :style="{color:get_level_color(locate_variable(match).level)}">{{match}}</a>
          </td>

          <td 
            v-if="get_variable_type(match)=='input'" 
            v-html="format(get_current_stage(match,Global)[match])">
          </td>
          <td 
            v-if="get_variable_type(match)=='output'" 
            v-html="format(get_output_value(match,Global))">
          </td>

          <div v-if="get_variable_type(match)=='input'">
            <td class=unit v-html="get_base_unit(match).prettify()"></td>
          </div>
          <div v-else>
            <td class=unit v-html="Info[match] ? Info[match].unit.prettify() : 'unit not defined'"></td>
          </div>
        </tr>
      </tbody>
    </table>
  </div>`,

  props:[
    'code',
    'obj'
  ],

  data:function(){
    return{
      variable,
      constant,

      Global,
      Info,
      Tables,
      Formulas,
      Cts,
    };
  },

  methods:{
    translate,
    format,
    get_level_color,
    locate_variable,
    get_current_stage,
    get_variable_type,
    get_output_value,
    get_base_unit,
  },
});
