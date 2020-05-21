let constants = new Vue({
  el:"#constants",

  data:{
    visible:false,
    constant,

    Cts,
    Languages,
  },

  methods:{
    translate,
    format,
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
            <th>{{translate('Description')}}</th>
            <th>{{translate('Unit')       }}</th>
          </tr>
          <tr v-for="obj,key in Cts">
            <td>
              <a @click="constant.view(key)" style="font-weight:bold">{{ key }}</a>
            </td>
            <td align=right :title="obj.value">
              {{ format(obj.value) }}
            </td>
            <td style=font-size:smaller v-html="obj.descr.prettify()"></td>
            <td                         v-html="obj.unit.prettify()"></td>
          </tr>
        </table>
      </div>
    </div>
  `,
});
