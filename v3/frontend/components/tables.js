let tables = new Vue({
  el:"#tables",
  data:{
    visible:false,
    tables_folded:[],

    variable,

    Languages,
    Tables,
    Formulas,
    Info,
    Exceptions,
    Benchmarks,
  },

  methods:{
    translate,
    format,
    get_variable_type,

    toggle_folding(table_name){
      let index = this.tables_folded.indexOf(table_name);
      if(index==-1){
        this.tables_folded.push(table_name);
      }else{
        this.tables_folded.splice(index,1);
      }
    },
  },

  template:`
    <div id=tables v-if="visible && Languages.ready">
      <!--title-->
      <h1 style="padding-left:0">Data tables</h1>
      <b>
        The following tables are used as options, suggestions, estimations or
        equations
      </b><hr>

      <!--all tables-->
      <div
        v-for="table,name in Tables"
        v-if="typeof(table)=='object'"
        style="margin-bottom:10px"
      >
        <div>
          <div @click="toggle_folding(name)" class=summary>
            <div :style="{transform:tables_folded.indexOf(name)+1?'rotate(-90deg)':''}">▼</div>
            <div style="margin-left:5px" class=table_name>{{name}}</div>
          </div>
          <div v-if="tables_folded.indexOf(name)==-1">
            <!--render data table-->
            <table>
              <tr v-for="row in table">
                <td v-for="obj,key in row">
                  <b>{{key}}</b>:
                  <span v-if="typeof(obj)=='string'">
                    "{{translate(obj)}}"
                  </span>
                  <span v-else>
                    {{obj}}
                  </span>
                </td>
              </tr>
            </table>

            <!--this data table is used in-->
            <div style="margin-top:10px;padding-left:20px">
              The rows of this table are the options for the following inputs:
              <table style="margin-bottom:10px">
                <tr v-for="code in Object.keys(Info).filter(key=>Info[key].table==name).sort()">
                  <td><a @click="variable.view(code)" style="font-family:monospace">{{code}}</a></td>
                  <td>
                    <span v-html="translate(code+'_descr').prettify()"></span>
                  </td>
                </tr>
              </table>

              This table is used to suggest values for the following inputs:
              <table style="margin-bottom:10px">
                <tr v-for="code in Object.keys(Exceptions).filter(key=>Exceptions[key].table==name).sort()">
                  <td><a @click="variable.view(code)" style="font-family:monospace">{{code}}</a></td>
                  <td>
                    <span v-html="translate(code+'_descr').prettify()"></span>
                  </td>
                  <td>column: "{{Exceptions[code].table_field()}}"</td>
                </tr>
              </table>

              This table is used in the code of the following outputs:
              <table>
                <tr
                  v-for="code in Formulas.outputs_per_input(name).sort()"
                  v-if="get_variable_type(code)=='output'"
                >
                  <td>
                    <a @click="variable.view(code)" style="font-family:monospace">
                      {{code}}
                      <span v-if="Benchmarks[code]">
                        (benchmark)
                      </span>
                    </a>
                  </td>
                  <td>
                    <span v-html="translate(code+'_descr').prettify()"></span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
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
      #tables div.summary{
        display:flex;
        cursor:pointer;
        font-size:larger;
        font-weight:bolder;
        margin-bottom:5px;
      }
      #tables div.summary:hover div.table_name{
        text-decoration:underline;
      }
    </style>
  `
});
