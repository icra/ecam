let stages_menu=new Vue({
  el:"#stages_menu",
  data:{
    visible                : false,
    current_view           : null,
    show_substages_summary : true,

    //frontend
    caption,

    //backend
    Global,
    Info,
    Structure,
    Languages,
  },

  methods:{
    format,
    translate,
    go_to,
    go_to_substage,
    get_sum_of_substages,

    //frontend effect to mark selected stage
    is_tier_b_selected(level, sublevel){
      if(this.current_view!='tier_b') return false;
      if(level==tier_b.level && sublevel==tier_b.sublevel){
        return true;
      }
      return false;
    },

    is_substage_selected(substage){
      if(this.current_view!='tier_b') return false;
      return substage==tier_b.substage;
    },

    add_substage(level,sublevel){
      if(!level) return;
      if(!sublevel) return;
      let stage = Structure.find(s=>s.level==level&&s.sublevel==sublevel);
      let name = `${stage.sublevel} ${this.Global[level][sublevel].length+1}`;
      let ss = new stage.class(name);
      this.Global[level][sublevel].push(ss);
      go_to_substage(ss);
    }
  },

  template:`
    <!--linear menu COMPONENT-->
    <div id=stages_menu v-if="visible && Languages.ready">
      <div style="padding:2px">
        <!--checkbox show substages-->
        <div style="text-align:center">
          <label style="user-select:none;font-size:larger">
            <input type=checkbox v-model="show_substages_summary">
            show substages
          </label>
        </div>

        <!--stages table-->
        <div>
          <table style="width:100%;">
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
              <td v-for="s in Structure.filter(s=>s.sublevel)" style="vertical-align:top">
                <div v-if="Global[s.level][s.sublevel].length==0" style="text-align:center">
                  <small style="color:#666">~no stages</small>
                </div>
                <div
                  v-if="s.sublevel"
                  v-for="ss,i in Global[s.level][s.sublevel]"
                  style="padding:5px 0;"
                >
                  <div
                    style="
                      display:grid;
                      grid-template-columns:70% 29%;
                      grid-gap:1%
                    "
                  >
                    <!--substage name-->
                    <div>
                      <a @click="go_to_substage(ss)" :selected_substage="is_substage_selected(ss)">
                        {{ss.name}}
                      </a>
                    </div>
                    <!--ss emissions-->
                    <div class=number style="font-size:smaller">
                      <span>{{format(ss[s.prefix+'_KPI_GHG']())}}</span>
                      <span class=unit>kgCO<sub>2</sub>eq</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)">
                <div class=flex style="justify-content:space-between;font-size:smaller;">
                  <div>
                    Total {{s.sublevel}}
                  </div>
                  <div>
                    <span v-html="format(get_sum_of_substages(s.level, s.sublevel, s.prefix+'_KPI_GHG'))"></span>
                    <span class=unit>kgCO<sub>2</sub>eq</span>
                  </div>
                </div>
              </td>
            </tr>

            <!--btn add substage-->
            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)">
                <div>
                  <button
                    style="width:100%;font-size:smaller;"
                    @click="add_substage(s.level,s.sublevel)"
                    v-html="'add substage'"
                  ></button>
                </div>
              </td>
            </tr>
          </table>
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
      #stages_menu a[selected_substage]{
        text-decoration:underline;
        font-weight:bold;
      }
    </style>
  `,
});
