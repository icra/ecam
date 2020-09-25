let stages_menu  = new Vue({
  el:"#stages_menu ",
  data:{
    visible:false,
    current_view:null,
    caption,
    Global,
    Info,
    Structure,
    Languages,
  },
  methods:{
    format,
    translate,
    go_to,

    //frontend effect: remark selected stage
    is_tier_b_selected(level, sublevel){
      if(this.current_view!='tier_b') return false;
      if(level==tier_b.level && sublevel==tier_b.sublevel){
        return true;
      }
    },

    //quick filter buttons (discharge and sludge)
    go_to_discharge(level,sublevel){
      this.go_to(level,sublevel);
      tier_b.filters_on=true;
      tier_b.disable_all_filters();
      tier_b.filters_active['Discharge']=true;
    },
    go_to_sludge(level,sublevel){
      this.go_to(level,sublevel);
      tier_b.filters_on=true;
      tier_b.disable_all_filters();
      tier_b.filters_active['Sludge management']=true;
    },
  },
  template:`
    <!--linear menu COMPONENT-->
    <div id=stages_menu v-if="visible && Languages.ready">
      <div>
        <div style="font-size:large;text-align:center">
          Stages of the Urban Water Cycle
        </div>
        <table style="margin:auto">
          <!--level 1 and level2-->
          <tr>
            <td v-for="s in Structure">
              <div style="text-align:center">{{translate(s.sublevel?s.sublevel:s.level)}}</div>
              <div style="text-align:center">
                <img
                  @click="go_to(s.level,s.sublevel)"
                  @mousemove="caption.show($event, translate(s.sublevel?s.sublevel:s.level))"
                  @mouseout="caption.hide()"
                  :src="'frontend/img/'+s.icon"
                  :class="'s '+(is_tier_b_selected(s.level, s.sublevel)?'selected':'')"
                  :stage="s.alias"
                >
                <div style="font-size:smaller">
                  <span v-html="format(Global[s.prefix+'_KPI_GHG']())"></span>
                </div>
              </div>
            </td>
          </tr>
          <!--discharge-->
          <tr>
            <td v-for="l2 in Structure">
              <div v-if="l2.discharge" style=text-align:center>
                <button @click="go_to_discharge(l2.level,l2.sublevel)">
                  Discharge
                </button>
              </div>
            </td>
          </tr>
          <!--sludge-->
          <tr>
            <td v-for="l2 in Structure">
              <div v-if="l2.sludge" style=text-align:center>
                <button @click="go_to_sludge(l2.level,l2.sublevel)">
                  Sludge
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,

  style:`
    <style>
      #stages_menu {
        background:#f0f5fc;
        padding:1em;
        border-bottom:1px solid #ccc;
      }
      #stages_menu img {
        cursor:pointer;
        position:relative;
        vertical-align:middle;
        padding:0;
        width:70px;
        border-radius:90%;
        border:3px solid transparent;
      }
      #stages_menu img:hover,
      #stages_menu img.selected {
        border:3px solid var(--color-level-generic);
      }
    </style>
  `,
});
