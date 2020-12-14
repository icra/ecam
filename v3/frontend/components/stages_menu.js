let stages_menu=new Vue({
  el:"#stages_menu",
  data:{
    visible:      false,
    current_view: null,
    show_table:   true,
    show_substages_summary: true, //not used TODO

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
      sublevel = sublevel || false;
      if(this.current_view!='tier_b') return false;
      if(level==tier_b.level && sublevel==tier_b.sublevel){
        return true;
      }
      return false;
    },

    is_level_1_selected(level){
      return tier_b.level == level;
    },

    is_substage_selected(substage){
      if(this.current_view!='tier_b') return false;
      return substage==tier_b.substage;
    },

    add_substage(level,sublevel){
      if(!level) return;
      if(!sublevel) return;
      let stage = Structure.find(s=>s.level==level&&s.sublevel==sublevel);
      let name  = `${stage.sublevel} ${this.Global[level][sublevel].length+1}`;
      let ss    = new stage.class(name);

      //set default emission factor for grid electricity
      let prefix = stage.prefix;
      ss[prefix+'_conv_kwh']=Global.General.conv_kwh_co2;

      this.Global[level][sublevel].push(ss);
      return ss;
    },

    delete_substage(level,sublevel,substage){
      //ask for confirmation only if emissions > 0
      let prefix = Structure.find(s=>s.level==level&&s.sublevel==sublevel).prefix;
      let emissions = substage[prefix+'_KPI_GHG']().total;
      if(emissions>0){
        if(!confirm(`Confirm delete substage "${substage.name}"?`))
          return;
      }

      //find index and delete substage
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
      <div style="padding:8px">
        <h1 style="padding-left:0">
          Inventory: urban water cycle stages
          <button @click="show_table^=1">show/hide table</button>
        </h1>

        <!--stages table-->
        <transition name="fade">
        <div v-if="show_table">
          <table id=main_table>
            <!--level 1-->
            <tr>
              <td
                v-for="l1 in Structure.filter(s=>!s.sublevel)"
                :colspan="Structure.filter(s=>s.level==l1.level).length-1"
                :style="{background:l1.color,padding:'10px',fontSize:'larger'}"
              >
                <div
                  @click="go_to(l1.level)"
                  :style="{
                    display:'flex',
                    justifyContent:'space-between',
                    cursor:'pointer',
                    color:'white',
                  }"
                >
                  <div :style="{textDecoration:is_tier_b_selected(l1.level)?'underline':''}">
                    {{translate(l1.level)}}
                  </div>
                  <div>
                    {{format(Global[l1.level][l1.prefix+'_KPI_GHG']().total)}}
                    <small>kgCO<sub>2</sub>eq</small>
                  </div>
                </div>
              </td>
            </tr>

            <!--level 2 stages-->
            <tr>
              <td v-for="s in Structure" v-if="s.sublevel" style="width:100px">
                <div style="display:flex;align-items:center">
                  <div>
                    <img
                      :src="'frontend/img/'+s.icon"
                      :class="'s '+(is_tier_b_selected(s.level, s.sublevel)?'selected':'')"
                    >
                  </div>
                  <div style="padding-left:5px">
                    <span>{{translate(s.sublevel)}}</span>
                  </div>
                </div>
              </td>
            </tr>

            <!--level 3 substages-->
            <tr v-if="show_substages_summary">
              <td v-for="s in Structure.filter(s=>s.sublevel)" style="vertical-align:top;border-top:1px solid #ccc;padding-top:0">
                <div v-if="Global[s.level][s.sublevel].length==0" style="text-align:center">
                  <small style="color:#666">~no substages</small>
                </div>
                <div
                  v-if="s.sublevel"
                  v-for="ss,i in Global[s.level][s.sublevel]"
                  @click="go_to_substage(ss)"
                  :selected_substage="is_substage_selected(ss)"
                  style="cursor:pointer;padding:5px 2px;border-bottom:1px solid #ccc"
                >
                  <div
                    style="
                      display:grid;
                      grid-template-columns:50% 50%;
                      align-items:center;
                    "
                  >
                    <!--substage name-->
                    <div
                      style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                      "
                    >
                      <div style="display:flex;align-items:center;">
                        <a
                          v-html="ss.name"
                        ></a>
                        &nbsp;
                        <!--delete substage btn-->
                        <div
                          @click.stop="delete_substage(s.level,s.sublevel,ss)"
                          class="delete_substage"
                          title="delete substage"
                        >
                          <img
                            src="frontend/img/viti/select_scenario/icon-delete.svg"
                            style="width:15px"
                          >
                        </div>
                      </div>
                    </div>
                    <!--ss emissions-->
                    <div class=number style="font-size:smaller">
                      <span>{{format(ss[s.prefix+'_KPI_GHG']().total)}}</span>
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
                <div style="text-align:center">
                  <button
                    style="padding:8px;width:100%;font-size:smaller;"
                    @click="add_substage(s.level,s.sublevel)"
                    v-html="'+ create substage'"
                  ></button>
                </div>
              </td>
            </tr>
          </table>
        </div>
        </transition>
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
        width:100%;
      }
      #stages_menu #main_table th,
      #stages_menu #main_table td {
        border:none;
      }
      #stages_menu img {
        width:50px;
      }

      #stages_menu div[selected_substage] {
        background:white;
      }

      #stages_menu div.delete_substage {
        cursor:pointer;
        border:none;
        padding:0;
      }
      #stages_menu div.delete_substage:hover {
        transform:scale(1.2);
        transition:all 0.1s;
      }

      #stages_menu button {
        outline:none;
      }
      #stages_menu button:hover {
        background:var(--color-level-generic);
        border-color:var(--color-level-generic);
        color:white;
      }
    </style>
  `,
});
