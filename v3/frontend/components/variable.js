let variable = new Vue({
  el:"#variable",

  data:{
    visible:false,
    id:"wsa_nrg_cons",  //default variable code
    question:false,     //question where id is inside

    //stage where id belongs to
    localization:{
      level:'Water',
      sublevel:'Abstraction',
    },

    //backend
    Global,
    Info,
    Structure,
    Units,
    Tables,
    Recommendations,
    Exceptions,
    Formulas,
    Questions,
    Cts,
  },

  methods:{
    translate,
    format,
    go_to,
    locate_variable,
    get_current_stage,
    get_current_unit,
    get_base_unit,
    get_variable_value,
    get_level_color,
    get_variable_type,

    /* open variable VIEW */
    view(id){
      if(Info[id]){
        this.id           = id;
        this.question     = this.Questions.is_inside(this.id);
        this.localization = this.locate_variable(id);
      }else{
        throw new Error(`Variable "${id}" does not exist`);
        return;
      }
      if(typeof(ecam)=='object'){
        ecam.show('variable');
        caption.hide();
      }
    },
  },

  template:`
    <!--variable VIEW-->
    <div id=variable v-if="visible">
      <!--variable title-->
      <h1>
        <span style=color:#999>
          {{ translate('variable_detailed_info') }}
          &rarr;
        </span>
        <code>{{id}}</code>
        <p v-if="Info[id]" style="margin-bottom:0">
          <code
            style="font-weight:bold"
            v-html="translate(id+'_descr').prettify()">
          </code>
        </p>
        <div v-else class=error>
          ERROR: Variable {{id}} not defined in backend/info.js
        </div>
      </h1>

      <!--variable table-->
      <table
        v-if="Info[id]"
        :level="localization.level"
        :style="
          'text-align:left; width:70%; margin:auto;'+
          'background:'+get_level_color(localization.level)
        "
      >
        <!--variable stage-->
        <tr>
          <th>
            {{ translate('variable_stage') }}
          </th>
          <td>
            <div v-if="localization">
              &larr;

              <span>
                <a @click="go_to(localization.level)">
                  {{ translate(localization.level) }}
                </a>
                <span v-if="localization.sublevel">
                  /
                  <a @click="go_to(localization.level, localization.sublevel)">
                    {{ translate(localization.sublevel) }}
                  </a>
                </span>
              </span>
            </div>
          </td>
        </tr>

        <!--variable explanation-->
        <tr>
          <th>
            {{ translate('variable_explanation') }}
          </th>
          <td>
            <code v-html="translate(id+'_expla').prettify()"></code>
            <span v-if="translate(id+'_expla')==''" style=color:#999>
              {{ translate('variable_nothing') }}
            </span>
          </td>
        </tr>

        <!--variable is inside a question?-->
        <tr v-if="question">
          <th>
            {{ translate("Filter that activates it") }}
          </th>
          <td>
            <div v-if="question">
              <span v-html="translate(question)+'?'"></span>
              [{{ translate( (Global.Configuration.Questions[question]) ? 'yes':'no' ) }}]
            </div>
          </td>
        </tr>

        <!--variable type-->
        <tr>
          <th>
            {{ translate('variable_type') }}
          </th>
          <td>
            <div style="font-size:large">
              {{ get_variable_type(id) ? get_variable_type(id).ucfirst() : 'Error' }}
            </div>

            <!--variable show formula and inputs involved-->
            <div v-if="get_variable_type(id)=='output'">
              <div style="border:1px solid #ccc;padding:1em">
                <div style="font-weight:bold">
                  <span style="color:#606">{{ translate('variable_formula') }}</span>:
                </div>
                <div
                  v-html="Formulas.prettify(Global[id].toString())"
                  style="
                    padding:5px 10px;
                    background:rgb(238,238,238);
                    color:black;
                    font-family:monospace;
                  "
                ></div>
              </div>

              <!--variable show inputs involved-->
              <div style="margin-top:10px">
                <b>{{ translate('variable_inputs_involved') }}</b>
              </div>

              <!--variable list inputs involved in the formula-->
              <inputs_involved_table
                :code="id"
                :current_stage="get_current_stage(id)"
              ></inputs_involved_table>
            </div>
          </td>
        </tr>

        <!--variable current value-->
        <tr>
          <th>
            {{ translate("Current value") }}
          </th>
          <td>
            <!--variable current value input element-->
            <div v-if="get_variable_type(id)=='input'">
              <!--input is an Option-->
              <div v-if="Info[id].magnitude=='Option'">
                <select v-model.number="get_current_stage(id)[id]">
                  <option v-for="obj,key in Tables[id]" :value="obj.value">
                    {{key}}
                  </option>
                </select>
              </div>
              <!--input is a number-->
              <div v-else>
                <input type=number v-model.number="get_current_stage(id)[id]">
                <span class=unit v-html="get_base_unit(id).prettify()"></span>
              </div>
            </div>
            <!--variable current value if output-->
            <div v-if="get_variable_type(id)=='output'" style="font-size:x-large">
              <span v-html="format( get_variable_value(id)/Units.multiplier(id) )">
              </span>
              <span class=unit>
                <span v-html="get_current_unit(id).prettify()"></span>
              </span>
            </div>
          </td>
        </tr>

        <!--variable magnitude-->
        <tr>
          <th>{{ translate('variable_magnitude') }}</th>
          <td>{{ Info[id].magnitude }}</td>
        </tr>

        <!--outputs that use this variable-->
        <tr>
          <th>
            {{ translate("Outputs that use this value") }}
          </th>
          <td>
            <table class=outputs_affected>
              <tbody v-for="output in Formulas.outputs_per_input(id)">
                <!--output that uses the input is an estimation-->
                <tr v-if="Recommendations[output]">
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)">
                      {{ output }} (estimation)
                    </a>
                  </td>
                  <td>
                    <div v-html="format(Recommendations[output]())">
                    </div>
                  </td>
                  <td>
                    <span class=unit v-html="get_base_unit(id).prettify()">
                    </span>
                  </td>
                </tr>
                <!--output that uses the input is normal-->
                <tr v-else>
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)">
                      {{ output }}
                    </a>
                  </td>
                  <td>
                    <div v-html="format(get_variable_value(output))">
                    </div>
                  </td>
                  <td>
                    <span class=unit v-html="get_current_unit(output).prettify()">
                    </span>
                  </td>
                </tr>
              </tbody>
              <tr v-if="Formulas.outputs_per_input(id).length==0">
                <td>
                  <span style=color:#999>{{ translate('variable_nothing') }}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!--the input has an estimation formula-->
        <tr v-if="Recommendations[id]">
          <th>
            Estimation of this input based on other inputs
          </th>
          <td>
            <div>
              <span v-html="format( Recommendations[id]() )">
              </span>
              <span v-html="Info[id].unit.prettify()" class=unit>
              </span>
            </div>

            <!--formula for recommendation-->
            <div style="border:1px solid #ccc;padding:1em">
              {{
                Formulas.prettify( Recommendations[id].toString() )
              }}
            </div>

            <!--inputs involved in the recommendations equation-->
            <inputs_involved_table
              :code="id"
              :current_stage="Recommendations"
            ></inputs_involved_table>
          </td>
        </tr>

        <!--the input is used in benchmarks?-->
        <tr>
          <th>Input is used in benchmarks?</th>
          <td>TODO</td>
        </tr>

      </table>
    </div>
  `,
});
