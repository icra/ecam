let development=new Vue({
  el:"#development",
  data:{
    visible:false,
    details_default_open:false,
  },

  template:`
    <div id=development v-if="visible">
      <!--title--><h1>Development</h1>
      <p style="padding-left:1em">
        Useful functions for semi-automated debugging during development.
      </p>
      <ul style="font-size:large">
        <li><a onclick="ecam.show('problems')">Problem finder</a></li>
        <li><a onclick="ecam.show('translation_problems')">Translation problems finder (TODO)</a></li>
        <li><button onclick="ecam.test()">execute automated test</button></li>
      </ul>
    </div>
  `,

  style:`
    <style>
      #development {
        padding-left:1em;
      }
    </style>
  `,
});

let problems=new Vue({
  el:"#problems",
  data:{
    visible:false,
    variable,

    Global,
    Formulas,
    Languages,
    Questions,
    Cts,
    Info,
    Benchmarks,
    Tables,
  },

  methods:{
    find_unused_inputs(){
      let unused=[];
      Structure.forEach(s=>{
        get_input_codes(s.level, s.sublevel).forEach(code=>{
          let length = Formulas.outputs_per_input(code).length;
          if(length==0){
            unused.push(code);
          }
        });
      });
      return unused;
    },

    find_inputs_without_info(){
      let found=[];
      Structure.forEach(s=>{
        get_input_codes(s.level, s.sublevel).
        concat(get_output_codes(s.level, s.sublevel)).
        forEach(code=>{
          if(!Info[code]){
            found.push(code);
          }
        });
      });
      return found;
    },

    find_unused_constants(){
      let unused=[];
      Object.keys(Cts).forEach(code=>{
        let length = Formulas.outputs_per_input(code).length;
        if(length==0){
          unused.push(code);
        }
      });
      return unused;
    },

    find_inexisting_magnitude_definitions(){
      let found=[];
      Object.keys(Info).forEach(code=>{
        if(!locate_variable(code)){
          found.push(code);
        }
      });
      return found;
    },

    find_inexisting_benchmarks(){
      let found=[];
      Object.keys(Benchmarks).forEach(code=>{
        if(!locate_variable(code)){
          found.push(code);
        }
      });
      return found;
    },

    find_unused_data_tables(){
      let found=[];
      Object.keys(Tables).forEach(key=>{
        let n = Formulas.outputs_per_input(key);
        if(n==0){
          found.push(key);
        }
      });
      return found;
    },

    translate,
    locate_variable,
  },

  template:`
    <div id=problems v-if="visible && Languages.ready">
      <!--title-->
      <h1>
        <a onclick="ecam.show('development')">Development</a>
        &rsaquo;
        Debugging utility
      </h1>

      <ul id=list_of_problems>
        <!--Global: not used inputs-->
        <li>
          <details>
            <summary>
              not used inputs
              ({{ find_unused_inputs().length }})
            </summary>
            <table>
              <tr v-for="code in find_unused_inputs()">
                <td>
                  <a @click="variable.view(code)">
                    {{code}}
                  </a>
                </td>
                <td> {{ translate(code+'_descr') }} </td>
              </tr>
            </table>
          </details>
        </li>

        <!--Constants: not used-->
        <li>
          <details>
            <summary>
              not used constants
              ({{ find_unused_constants().length }})
            </summary>
            <table>
              <tr v-for="code in find_unused_constants()">
                <td> {{ code      }} </td>
                <td> {{ Cts[code] }} </td>
              </tr>
            </table>
          </details>
        </li>

        <!--Tables: not used-->
        <li>
          <details>
            <summary>
              not used data tables
              ({{ find_unused_data_tables().length }})
            </summary>
            <table>
              <tr v-for="code in find_unused_data_tables()">
                <td> {{ code         }} </td>
                <td> {{ Tables[code] }} </td>
              </tr>
            </table>
          </details>
        </li>

        <!--questions: inexisting variables-->
        <li>
          <details>
            <summary>
              questions: inexisting variables
              ({{ Questions.find_inexisting_variables().length }})
            </summary>
            <div>
              <table>
                <tr v-for="code in Questions.find_inexisting_variables()">
                  <td>
                    <a @click="variable.view(code)">
                      {{code}}
                    </a>
                  </td>
                  <td> {{ translate(code+'_descr') }} </td>
                </tr>
              </table>
            </div>
          </details>
        </li>

        <!--questions: repeated variables-->
        <li>
          <details>
            <summary>
              repeated variables in questions
              ({{ Questions.find_repeated_variables().length }})
            </summary>
            <div>
              <table>
                <tr v-for="code in Questions.find_repeated_variables()">
                  <td>
                    <a @click="variable.view(code)">
                      {{code}}
                    </a>
                  </td>
                  <td>
                    {{
                      translate(code+'_descr')
                    }}
                  </td>
                </tr>
              </table>
            </div>
          </details>
        </li>

        <!--Global: without info-->
        <li>
          <details>
            <summary>
              variables at Global not in Info
              ({{ find_inputs_without_info().length }})
            </summary>
            <table>
              <tr v-for="code in find_inputs_without_info()">
                <td>
                  <a @click="variable.view(code)">
                    {{code}}
                  </a>
                </td>
                <td> {{ locate_variable(code) }} </td>
              </tr>
            </table>
          </details>
        </li>

        <!--Info: not in Global-->
        <li>
          <details>
            <summary>
              variables at Info not in Global
              ({{ find_inexisting_magnitude_definitions().length }})
            </summary>
            <table>
              <tr v-for="code in find_inexisting_magnitude_definitions()">
                <td>
                  <a @click="variable.view(code)">
                    {{code}}
                  </a>
                </td>
                <td> {{ Info[code] }} </td>
              </tr>
            </table>
          </details>
        </li>

        <!--benchmarks not in Global-->
        <li>
          <details>
            <summary>
              benchmarks not in Global
              ({{ find_inexisting_benchmarks().length }})
            </summary>
            <table>
              <tr v-for="code in find_inexisting_benchmarks()">
                <td>
                  <a @click="variable.view(code)">
                    {{code}}
                  </a>
                </td>
                <td> {{ Benchmarks[code] }} </td>
              </tr>
            </table>
          </details>
        </li>
      </ul>
    </div>
  `,

  style:`
    <style>
      #problems {
        padding-left:1em;
      }
      #problems details summary {
        cursor:pointer;
        font-size:large;
      }
      #problems #list_of_problems {
        list-style:none;
      }
    </style>
  `,
});

let translation_problems=new Vue({
  el:"#translation_problems",
  data:{
    visible:false,
  },
  template:`
    <div id=translation_problems v-if="visible">
      translation problem finder TODO
    </div>
  `,
});
