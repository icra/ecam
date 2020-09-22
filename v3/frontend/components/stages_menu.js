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
    is_tier_b_selected(level, sublevel){
      if(this.current_view!='tier_b') return false;

      if(level==tier_b.level && sublevel==tier_b.sublevel){
        return true;
      }

    },
    get_offset_height(){
      if(this.current_view=='tier_b'){
        return 0;
      }else{
        let logo   = document.querySelector("#ecam_logo").offsetHeight;
        let linear = document.querySelector("#linear_menu").offsetHeight;
        return logo + linear;
      }
    },
  },
  template:`
    <!--linear menu COMPONENT-->
    <div id=stages_menu v-if="visible && Languages.ready">
      <div>
        <div style="font-size:large;text-align:center">
          Stages of the Urban Water Cycle
        </div>
        <table border=1 style="margin:auto">
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
                Discharge
              </div>
            </td>
          </tr>
          <!--sludge-->
          <tr>
            <td v-for="l2 in Structure">
              <div v-if="l2.sludge" style=text-align:center>
                Sludge
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
