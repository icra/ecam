let development=new Vue({
  el:"#development",
  data:{
    visible:false,
  },
  template:`
    <div id=development v-if="visible">
      <!--title--><h1 style=color:black>Development/debugging utilities for development</h1>
      <ul style="font-size:18px;">
        <li><button onclick="ecam.test()">automated test</button></li>
        <li><a onclick="ecam.show('problems')">Problem finder</a></li>
        <li><a onclick="ecam.show('translation_problems')">Translation problems finder</a></li>
        <li><a onclick="ecam.show('validate_json')">Current JSON file validator</a></li>
      </ul>
    </div>
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

      <ul>
        <li>
          <details open>
            <summary>
              not used inputs
            </summary>
            <div>
              <table>
                <tr v-for="code in find_unused_inputs()">
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

        <li>
          <details open>
            <summary>
              not used constants
            </summary>
            <div>
              <table>
                <tr v-for="code in find_unused_constants()">
                  <td>
                    {{
                      Cts[code]
                    }}
                  </td>
                </tr>
              </table>
            </div>
          </details>
        </li>

        <li>
          <details open>
            <summary>
              questions: inexisting variables
            </summary>
            <div>
              <table>
                <tr v-for="code in Questions.find_inexisting_variables()">
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

        <li>
          <details open>
            <summary>
              repeated variables in questions
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

        <!--variables at Global not in Info-->
        <li>
          <details open>
            <summary>
              variables at Global not in Info
            </summary>
            <div>
              <table>
                <tr v-for="code in find_inputs_without_info()">
                  <td>
                    <a @click="variable.view(code)">
                      {{code}}
                    </a>
                  </td>
                  <td>
                    {{
                      locate_variable(code)
                    }}
                  </td>
                </tr>
              </table>
            </div>
          </details>
        </li>

        <!--variables at Info not in Global-->
        <li>
          <details open>
            <summary>
              variables at Info not in Global
            </summary>
            <div>
              <table>
                <tr v-for="code in find_inexisting_magnitude_definitions()">
                  <td>
                    <a @click="variable.view(code)">
                    {{code}}
                    </a>
                  </td>
                  <td>
                    {{
                      Info[code]
                    }}
                  </td>
                </tr>
              </table>
            </div>
          </details>
        </li>

        <!--benchmarks not in Global-->
        <li>
          <details open>
            <summary>
              benchmarks not in Global
            </summary>
            <div>
              <table>
                <tr v-for="code in find_inexisting_benchmarks()">
                  <td>
                    <a @click="variable.view(code)">
                    {{code}}
                    </a>
                  </td>
                  <td>
                    {{
                      Benchmarks[code]
                    }}
                  </td>
                </tr>
              </table>
            </div>
          </details>
        </li>
      </ul>
    </div>
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

let validate_json=new Vue({
  el:"#validate_json",
  data:{
    visible:false,
  },
  template:`
    <div id=validate_json v-if="visible">
      validate json TODO
    </div>
  `,
});
