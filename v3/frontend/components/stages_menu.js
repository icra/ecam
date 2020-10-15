let stages_menu=new Vue({
  el:"#stages_menu",
  data:{
    visible                : false,
    current_view           : null,
    show_substages_summary : true,

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
      return ss;
    },

    delete_substage(level,sublevel,substage){
      if(!confirm(`Confirm delete substage "${substage.name}"?`)) return;
      let index = this.Global[level][sublevel].indexOf(substage);
      if(index+1){
        this.Global[level][sublevel].splice(index,1);
      }
      //if this substage was the current being edited navigate to superior level
      if(substage == tier_b.substage){
        go_to(level);
      }
    },
  },

  template:`
    <!--linear menu COMPONENT-->
    <div id=stages_menu v-if="visible && Languages.ready">
      <div style="padding:2px">
        <!--checkbox show substages-->
        <div style="text-align:center;padding:10px">
          <label style="user-select:none;font-size:larger">
            <input type=checkbox v-model="show_substages_summary">
            show substages
          </label>
        </div>

        <!--stages table-->
        <div>
          <table id=main_table>
            <!--level 1-->
            <tr>
              <td v-for="l1 in Structure.filter(s=>!s.sublevel)" :colspan="Structure.filter(s=>s.level==l1.level).length-1"
                class=l1
                :style="{background:l1.color,padding:'10px'}"
                :selected="is_tier_b_selected(l1.level,false)"
              >
                <a
                  @click="go_to(l1.level)"
                  style="color:white"
                >
                  {{translate(l1.level)}}
                  ({{format(Global[l1.level][l1.prefix+'_KPI_GHG']())}} <small>kg CO<sub>2</sub>eq</small>)
                </a>
              </td>
            </tr>

            <!--level 2 stages-->
            <tr>
              <td v-for="s in Structure" v-if="s.sublevel" style="width:100px">
                <div style="text-align:center">
                  <a @click="go_to(s.level,s.sublevel)">
                    <div>
                      <img
                        :src="'frontend/img/'+s.icon"
                        :class="'s '+(is_tier_b_selected(s.level, s.sublevel)?'selected':'')"
                        :stage="s.alias"
                      >
                    </div>
                    <div>
                      <b>{{translate(s.sublevel)}}</b>
                    </div>
                    <div v-if="show_substages_summary" style="border-bottom:1px solid #ccc"></div>
                  </a>
                </div>
              </td>
            </tr>

            <!--level 3 substages-->
            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)" style="vertical-align:top">
                <div v-if="Global[s.level][s.sublevel].length==0" style="text-align:center">
                  <small style="color:#666">~no stages</small>
                </div>
                <div
                  v-if="s.sublevel"
                  v-for="ss,i in Global[s.level][s.sublevel]"
                  style="padding:5px 0;border-bottom:1px solid #ccc"
                >
                  <div
                    style="
                      display:grid;
                      grid-template-columns:50% 50%;
                    "
                  >
                    <!--substage name-->
                    <div>
                      <a @click="go_to_substage(ss)"
                        :selected_substage="is_substage_selected(ss)"
                        style="font-size:smaller"
                        v-html="ss.name"
                      ></a>
                      <!--delete substage btn-->
                      <button
                        style="font-size:x-small"
                        @click="delete_substage(s.level,s.sublevel,ss)">X
                      </button>
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

            <!--total ghg of substages-->
            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)">
                <div class=flex style="justify-content:space-between;font-size:smaller;">
                  <div>
                    Total {{s.sublevel}}
                  </div>
                  <div style="font-weight:bold">
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
      #stages_menu #main_table {
        width:95%;
        margin:auto;
      }
      #stages_menu #main_table th,
      #stages_menu #main_table td {
        border:none;
      }
      #stages_menu img {
        margin: -10px;
        cursor:pointer;
        padding:0;
        width:70px;
        border:3px solid transparent;
      }
      #stages_menu img.selected {
        /*
        border:3px solid var(--color-level-generic);
        */
      }
      #stages_menu td.l1{
        text-align:center;
      }
      #stages_menu td.l1[selected] a{
        text-decoration:underline;
        font-weight:bold;
      }
      #stages_menu a[selected_substage]{
        text-decoration:underline;
        font-weight:bold;
      }
    </style>
  `,
});
