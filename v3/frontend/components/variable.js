let variable = new Vue({
  el:"#variable",

  data:{
    visible:false,
    id:"wsa_nrg_cons",  //default variable code
    question:false,     //question where id belongs

    //stage where id belongs to
    localization:{
      level:'Water',
      sublevel:'Abstraction',
    },

    //backend
    Global,
    Languages,
    Info,
    Structure,
    Units,
    Tables,
    Estimations,
    Exceptions,
    Formulas,
    Questions,
    Cts,
    Benchmarks,
  },

  updated(){
    document.querySelectorAll(".prettyprinted").forEach(el=>{
      el.classList.remove('prettyprinted');
    });
    this.$nextTick(function() {
      PR.prettyPrint();
    });
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
    view(id, no_history_entry){
      if(!id){
        let err = "variable id not specified"
        throw new Error(err);
        return false;
      }

      if(Info[id] || this.Global[id]){
        this.id           = id;
        this.question     = this.Questions.is_inside(this.id);
        this.localization = this.locate_variable(id);
      }else{
        throw new Error(`variable "${id}" does not exist`);
        return;
      }

      ecam.show('variable', no_history_entry);
    },
  },

  template:`
    <!--variable VIEW-->
    <div id=variable v-if="visible && Languages.ready">
      <!--variable title-->
      <h1>
        <span style=color:#999>
          {{ translate('variable_detailed_info') }}
          &rarr;
        </span>
        <code>{{id}}</code>

        <p v-if="Info[id] || Global[id]" style="margin-bottom:0">
          <code
            style="font-weight:bold"
            v-html="translate(id+'_descr').prettify()">
          </code>
        </p>
        <div v-else class=error>
          ERROR: Variable {{id}} not defined
        </div>
      </h1>

      <!--variable table-->
      <table
        v-if="Info[id] || Global[id]"
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
            <div v-if="localization"> &larr;
              <a @click="go_to(localization.level)">
                {{ translate(localization.level) }}
              </a>
              <span v-if="localization.sublevel"> /
                <a @click="go_to(localization.level, localization.sublevel)">
                  {{ translate(localization.sublevel) }}
                </a>
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
                <code>
                <pre
                  v-html="Formulas.prettify(Global[id].toString())"
                  class="prettyprint"
                ></pre>
                </code>
              </div>

              <!--variable show inputs involved-->
              <div style="margin-top:10px">
                <b>{{ translate('variable_inputs_involved') }}</b>
              </div>

              <!--variable list inputs involved in the formula-->
              <inputs_involved_table
                :code="id"
                :obj="Global"
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
              <div v-if="Info[id] && Info[id].magnitude=='Option'">
                <select v-model.number="get_current_stage(id)[id]">
                  <option v-for="obj,i in Tables[id]" :value="i">
                    {{obj.name}}
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
          <td>{{ Info[id] ? Info[id].magnitude : "magnitude not defined"}}</td>
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
                <tr v-if="Estimations[output]">
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)" :style="{color:get_level_color(locate_variable(output).level)}">
                      {{ output }} (estimation)
                    </a>
                  </td>
                  <td>
                    <div v-html="format(Estimations[output]())">
                    </div>
                  </td>
                  <td>
                    <span class=unit v-html="get_base_unit(output).prettify()">
                    </span>
                  </td>
                </tr>

                <!--output that uses the input is normal-->
                <tr v-else>
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)" :style="{color:get_level_color(locate_variable(output).level)}">
                      {{ output }}
                    </a>
                  </td>
                  <td>
                    <div v-html="format(get_variable_value(output)/Units.multiplier(output))">
                    </div>
                  </td>
                  <td>
                    <span class=unit v-html="get_current_unit(output).prettify()">
                    </span>
                  </td>
                </tr>

                <!--output that uses the input has a benchmark-->
                <tr v-if="Benchmarks[output]">
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)" :style="{color:get_level_color(locate_variable(output).level)}">
                      {{ output }} (benchmark)
                    </a>
                  </td>
                  <td>
                    <div v-html="Benchmarks[output](get_current_stage(output),Global[output]())"></div>
                  </td>
                  <td>
                    <span class=unit v-html="get_base_unit(output).prettify()"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="Formulas.outputs_per_input(id).length==0">
              <span style=color:#999>{{ translate('variable_nothing') }}</span>
            </div>
          </td>
        </tr>

        <!--the input has an estimation formula-->
        <tr v-if="Estimations[id]">
          <th>
            Estimation of this input based on other inputs
          </th>
          <td>
            <div>
              <span v-html="format( Estimations[id]() )"></span>
              <span v-html="Info[id].unit.prettify()" class=unit></span>
            </div>

            <!--formula for estimations-->
            <div style="border:1px solid #ccc;padding:1em">
              <pre
                class=prettyprint
                v-html="Formulas.prettify( Estimations[id].toString() )"
              ></pre>
            </div>

            <!--inputs involved in the estimations equation-->
            <inputs_involved_table
              :code="id"
              :obj="Estimations"
            ></inputs_involved_table>
          </td>
        </tr>

        <!--the input is used in benchmarks?-->
        <tr>
          <th>
            Is this variable in
            <a
              v-html="'benchmarks'"
              style="text-decoration:underline;color:white"
              onclick="ecam.show('benchmarks')">
            </a>
            ?
          </th>
          <td v-if="Benchmarks[id]">
            Yes
            <details open>
              <summary>formula</summary>
              <div>
                <code><pre class=prettyprint v-html="Formulas.prettify(Benchmarks[id])"></pre></code>
              </div>
            </details>
          </td>
          <td v-else style=color:#999>{{translate('no')}}</td>
        </tr>
      </table>
    </div>
  `,

  style:`
    <style>
      #variable h1 {
        text-align:center;
      }

      #variable td {
        padding:1em;
        background:white;
      }
      #variable th {
        padding:1em;
        background:inherit;
        color:white;
        vertical-align:top;
      }

      #variable input[type=number] {
        background:#eee;
        border: none;
        cursor: cell;
        height: 40px;
        padding: 0 0.2em;
        text-align:right;
      }
      #variable input[type=number]:focus {
        background:white;
      }

      #variable table.inputs_involved td {
        padding: 5px;
        border:none;
      }
      #variable table.outputs_affected td {
        padding: 5px;
        border:none;
      }
      #variable summary {
        cursor:pointer;
      }
    </style>
  `,
});
