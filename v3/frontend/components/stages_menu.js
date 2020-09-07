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
        <div style="font-size:large;">
          Stages of the Urban Water Cycle
        </div>
        <div class=flex>
          <div v-for="l1 in Structure.filter(s=>!s.sublevel)">
            <div class="flex">
              <!--level-->
              <div style="text-align:center">
                <img
                  @click="go_to(l1.level)"
                  @mousemove="caption.show($event, translate(l1.level))"
                  @mouseout="caption.hide()"
                  :src="'frontend/img/'+(l1.alias)+(Global.Configuration.ActiveStages[l1.alias]?'':'-off')+'.png'"
                  :class="'l1 '+(is_tier_b_selected(l1.level, false)?'selected':'')"
                  :stage="l1.alias"
                >
                <div style="font-size:smaller">
                  <span v-html="format(Global[l1.prefix+'_KPI_GHG']())"></span>
                </div>
              </div>
              <!--sublevels-->
              <div v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))">
                <img
                  @click="go_to(l2.level,l2.sublevel)"
                  :class="'l2 '+(is_tier_b_selected(l2.level,l2.sublevel)?'selected':'')"
                  :stage="l2.alias"
                  @mousemove="caption.show($event, translate(l2.sublevel))"
                  @mouseout="caption.hide()"
                  :src="'frontend/img/'+(l2.alias)+(Global.Configuration.ActiveStages[l2.alias]?'':'-off')+'.svg'"
                >
                <div style=text-align:center>
                  <small
                    v-html="format(Global[l2.prefix+'_KPI_GHG']())"
                  ></small>
                </div>
              </div>
            </div>
          </div>
        </div>
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
