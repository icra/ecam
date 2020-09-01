let summary_nrg = new Vue({
  el:"#summary_nrg",

  data:{
    visible:false,
    Global,
    Structure,
  },

  methods:{
    translate,
    format,
    go_to,
    get_variable_value,
  },

  template:`
    <!--summary nrg VIEW-->
    <div id=summary_nrg v-if="visible">
      <summaries current_view=summary_nrg></summaries>

      <!--summary nrg title-->
      <h1 style="text-align:center;color:black">Energy consumption</h1>

      <!--summary nrg table-->
      <table style="margin:auto;width:80rem">
        <tbody v-for="l1 in Structure.filter(s=>!s.sublevel)">
          <!--level 1-->
          <tr>
            <td colspan=2 :style="{background:l1.color,color:'white',padding:'2em 0'}">
              <div style="display:flex;justify-content:center;align-items:center;font-size:large;">
                <div style="margin-right:2em">
                  <a @click="go_to(l1.level)" style="color:white;">
                    {{ translate(l1.level) }}
                  </a>
                </div>
                <div style="
                  display:grid;
                  grid-template-columns:30% 30% 30%;
                  grid-gap:5px;
                  text-align:center;
                  min-width:50%;
                ">
                  <div style="font-size:small;">kWh</div>
                  <div style="font-size:small;">kWh/{{translate('year')}}</div>
                  <div style="font-size:small;">kWh/{{translate('year')}}/serv.pop.</div>
                  <div
                    class=l1_number_placeholder :style="{color:l1.color}"
                    v-html="format(Global[l1.prefix+'_nrg_cons']())">
                  </div>
                  <div
                    class=l1_number_placeholder :style="{color:l1.color}"
                    v-html="format(Global[l1.prefix+'_nrg_cons']() / Global.Years())">
                  </div>
                  <div
                    class=l1_number_placeholder :style="{color:l1.color}"
                    v-html="format(Global[l1.prefix+'_nrg_cons']() / Global.Years() / get_variable_value(l1.prefix+'_serv_pop'))">
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!--level 2-->
          <tr v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
            v-if="Global.Configuration.ActiveStages[l2.alias]"
          >
            <td :style="{background:'var(--color-level-'+l1.level+'-secondary)'}">
              <img :src="'frontend/img/'+l2.alias+'.svg'" style="width:100px;display:block;margin:auto">
            </td>
            <td>
              <div style="display:flex;align-items:center;font-size:large;">
                <div :style="{color:l1.color, marginRight:'1em', width:'20%'}">
                  {{translate(l2.sublevel)}}
                </div>
                <div
                  style="
                    display:grid;
                    grid-template-columns:30% 30% 30%;
                    grid-gap:5px;
                    min-width:50%;
                    text-align:center;
                  "
                >
                  <div style="font-size:x-small;">kWh</div>
                  <div style="font-size:x-small;">kWh/{{translate('year')}}</div>
                  <div style="font-size:x-small;">kWh/{{translate('year')}}/serv.pop.</div>
                  <div class=l2_number_placeholder :style="{color:l1.color, border:'1px solid '+l1.color}" v-html="format(Global[l2.level][l2.sublevel][l2.prefix+'_nrg_cons'])"></div>
                  <div class=l2_number_placeholder :style="{color:l1.color, border:'1px solid '+l1.color}" v-html="format(Global[l2.level][l2.sublevel][l2.prefix+'_nrg_cons'] / Global.Years())"></div>
                  <div class=l2_number_placeholder :style="{color:l1.color, border:'1px solid '+l1.color}" v-html="format(Global[l2.level][l2.sublevel][l2.prefix+'_nrg_cons'] / Global.Years() / get_variable_value(l1.prefix+'_serv_pop'))"></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,

  style:`
    <style>
      #summary_nrg {
        background:#f6f6f6;
      }
      #summary_nrg table {
        border-collapse:separate;
        border-spacing:3px;
      }
      #summary_nrg table th,
      #summary_nrg table td {
        border:none;
        background:white;
      }
      #summary_nrg div.l1_number_placeholder {
        font-weight:bold;
        background:white;
        padding:0.5em 0;
      }
      #summary_nrg div.l2_number_placeholder {
        font-weight:bold;
        padding:0.5em 0;
      }
    </style>
  `
});
