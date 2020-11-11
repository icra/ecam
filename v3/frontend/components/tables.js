let tables = new Vue({
  el:"#tables",
  data:{
    visible:false,
    Languages,
    Tables,
    Formulas,

    variable,
  },

  methods:{
    translate,
    format,
  },

  template:`
    <div id=tables v-if="visible && Languages.ready">
      <!--title-->
      <h1 style="padding-left:0">Data tables</h1>
      <p>
        Data tables are used in several input value selectors, equations and estimations.
      </p><hr>

      <!--all tables-->
      <div v-for="table,name in Tables">
        <div v-if="typeof(table)=='object'">
          <details open>
            <summary>{{name}}</summary>
            <div>
              <table>
                <tr v-for="row in table">
                  <td v-for="obj,key in row">
                    <b>{{key}}</b>:
                    {{obj}}
                  </td>
                </tr>
              </table>

              <div style="margin-top:10px;padding-left:8px">
                Used in:
                <table>
                  <tr v-for="code in Formulas.outputs_per_input(name)">
                    <td>
                      <a @click="variable.view(code)">{{code}}</a>
                    </td>
                    <td>
                      {{translate(code+'_descr')}}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #tables {
        padding-left:2em;
        padding-bottom:6em;
      }
      #tables details summary {
        cursor:pointer;
        font-size:larger;
      }
      #tables details {
        margin-bottom:10px;
      }
    </style>
  `
});
