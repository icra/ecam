let tables = new Vue({
  el:"#tables",
  data:{
    visible:false,

    //backend
    Languages,
    Tables,
    Formulas,
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
          <h4 style="margin-left:0">{{name}}</h4>
          <table>
            <tr v-for="row in table">
              <td v-for="obj,key in row">
                <b>{{key}}</b>:
                {{obj}}
              </td>
            </tr>
          </table>

          {{
            Formulas.outputs_per_input(name)
          }}
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
    </style>
  `
});
