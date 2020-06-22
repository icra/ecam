let constant = new Vue({
  el:"#constant",

  data:{
    visible: false,
    code:"ct_ch4_lf",

    Cts,
    Formulas,

    variable,
  },

  methods:{
    format,
    translate,

    /* open constant VIEW */
    view(code, no_history_entry){
      if(!code){
        let err = "constant code not specified"
        throw new Error(err);
        return false;
      }

      if(this.Cts[code]){
        this.code = code;
      }else{
        throw new Error(`constant "${code}" does not exist`);
        return;
      }

      ecam.show('constant', no_history_entry);
    },
  },

  template:`
    <!--constant VIEW-->
    <div id=constant v-if="visible">
      <h1 style="text-align:center">
        <a onclick="ecam.show('constants')">
          All constants
        </a> &rsaquo;
        <span style=color:black>
          Constant <b>{{code}}</b>
        </span>
      </h1>

      <!--constant description-->
      <div style="text-align:center;font-size:large">
        <b v-html="Cts[code].descr.prettify()"></b>
      </div>

      <!--constant value and unit-->
      <div
        style="
          padding:2em 0;
          text-align:center;
        "
      >
        <span v-html="code"></span>
        =
        <span v-html="format(Cts[code].value)"
          style="font-size:42px"
        ></span>
        <span v-html="Cts[code].unit.prettify()"></span>
      </div>

      <!--constant used in-->
      <div style="margin-bottom:1em;text-align:center">
        This constant is used in the following equations:
      </div>
      <table style=margin:auto>
        <tr v-for="output in Formulas.outputs_per_input(code)">
          <td>
            <a @click="variable.view(output)">
              {{output}}
            </a>
          </td>
          <td v-html="translate(output+'_descr').prettify()">
          </td>
        </tr>
        <tr v-if="Formulas.outputs_per_input(code).length==0">
          <td style=color:#666>~Constant not used. Consider removing it</td>
        </tr>
      </table>
    </div>
  `,

});
