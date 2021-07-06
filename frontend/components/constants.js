let constants = new Vue({
  el:"#constants",

  data:{
    visible:false,
    constant,

    Cts,
    Languages,
    Formulas,
  },

  methods:{
    translate,
    format,

    get_constants_keys(){
      return Object.keys(Cts).sort((a,b)=>{
        if(a>b) return 1;
        else return -1;
      });
    },
  },

  template:`
    <div id=constants v-if="visible && Languages.ready">
      <!--constants title-->
      <h1 style="text-align:center">{{ translate('constants') }}</h1>

      <!--constants table-->
      <div style="font-family:monospace">
        <table style="margin:auto">
          <tr>
            <th>{{translate('Code')       }}</th>
            <th>{{translate('Value')      }}</th>
            <th>{{translate('Unit')       }}</th>
            <th>{{translate('Description')}}</th>
            <th>equations</th>
          </tr>
          <tr v-for="key in get_constants_keys()">
            <td>
              <a @click="constant.view(key)" style="font-weight:bold">{{ key }}</a>
            </td>
            <td align=right :title="Cts[key].value">
              {{ format(Cts[key].value) }}
            </td>
            <td                         v-html="Cts[key].unit.prettify()"></td>
            <td style=font-size:smaller v-html="Cts[key].descr.prettify()"></td>
            <td style="text-align:center">
              <div
                v-for="n in [Formulas.outputs_per_input(key).length]"
                :style="{background:n<2?'red':''}"
                v-html="n"
              ></div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,

  style:`
    <style>
      #constants table th{
        color:white;
        background:var(--color-level-generic);
      }
    </style>
  `,
});
