let constant = new Vue({
  el:"#constant",

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
      <div v-html="Cts[code].descr.prettify()"
        style="text-align:center"
      >
      </div>

      <!--constant value and unit-->
      <div
        style="
          padding:2em 0;
          text-align:center;
        "
      >
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

  data:{
    visible: false,
    code:"ct_ch4_lf",
    variable,

    Cts,
    Formulas,
  },

  methods:{
    translate,
    format,

    /* open constant VIEW */
    view(code){
      if(this.Cts[code]){
        this.code = code;
      }else{
        throw new Error(`Constant "${code}" does not exist`);
        return;
      }
      if(typeof(ecam)=='object'){
        ecam.show('constant');
        caption.hide();
      }
    },
  },
});