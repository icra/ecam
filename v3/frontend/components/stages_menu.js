let stages_menu=new Vue({
  el:"#stages_menu",
  data:{
    visible:false,
    current_view:null,
    show_substages_summary:true,
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
  },
  template:`
    <!--linear menu COMPONENT-->
    <div id=stages_menu v-if="visible && Languages.ready">
      <div class=flex style="justify-content:center">
        <div>
          <table style="margin:auto">
            <!--level 1 and level2-->
            <tr>
              <td v-for="l1 in Structure.filter(s=>!s.sublevel)" :colspan="Structure.filter(s=>s.level==l1.level).length-1"
                class=l1
                :style="{background:l1.color}"
                :selected="is_tier_b_selected(l1.level,false)"
              >
                <a
                  style="color:white"
                  v-html="translate(l1.level)"
                  @click="go_to(l1.level)"
                ></a>
              </td>
            </tr>

            <tr>
              <td v-for="s in Structure" v-if="s.sublevel" style="width:100px">
                <div style="text-align:center">
                  <a @click="go_to(s.level,s.sublevel)">
                    <img
                      @mousemove="caption.show($event, translate(s.sublevel?s.sublevel:s.level))"
                      @mouseout="caption.hide()"
                      :src="'frontend/img/'+s.icon"
                      :class="'s '+(is_tier_b_selected(s.level, s.sublevel)?'selected':'')"
                      :stage="s.alias"
                    >
                  </a>
                </div>
              </td>
            </tr>

            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)">
                <div v-if="s.sublevel" v-for="ss,i in [{},{}]" style="font-size:smaller;border-bottom:1px solid #ccc">
                  <div class=flex style="justify-content:space-between">
                    <div>
                      Substage {{i}}
                    </div>
                    <div>
                      0
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)">
                <div style="font-size:smaller;text-align:right">
                  <span v-html="format(Global[s.prefix+'_KPI_GHG']())"></span>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div>
          <label style="user-select:none">
            <input type=checkbox v-model="show_substages_summary">
            substages
          </label>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #stages_menu {
        background:#f0f5fc;
        padding-top:1px;
        border-bottom:1px solid #ccc;
      }
      #stages_menu img {
        cursor:pointer;
        padding:0;
        width:70px;
        border:3px solid transparent;
      }
      #stages_menu img.selected {
        border:3px solid var(--color-level-generic);
      }
      #stages_menu td.l1{
        text-align:center;
      }
      #stages_menu td.l1[selected]{
        text-decoration:underline;
      }
    </style>
  `,
});
