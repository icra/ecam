let stages_menu=new Vue({
  el:"#stages_menu",
  data:{
    visible:      false,
    current_view: null,

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

    //copy save file function from select_scenario
    save_to_file(){
      select_scenario.save_to_file();
    },

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

      //add substage to the correct stage array
      this.Global[level][sublevel].push(ss);

      //if you are viewing tier b, go directly to the newly created substage
      if(ecam.views.tier_b.visible){
        this.go_to_substage(ss);
      }

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
      <div style="padding:0 16px">
        <!--title-->
        <h1 style="padding-left:0">
          <div style="
            display:flex;
            justify-content:space-between;
          ">
            <div>
              Inventory: stages of the urban water cycle
            </div>
            <div>
              <button
                @click="save_to_file()"
                title="Save the current list of assessments as a JSON file"
                style="cursor:pointer;float:right;"
              >
                <div style="display:flex;align-items:center">
                  <img
                    class=icon
                    src="frontend/img/viti/select_scenario/icon-save.svg"
                    style="margin-right:5px;width:15px"
                  >
                  <div>Save file</div>
                </div>
              </button>
            </div>
          </div>
        </h1>

        <!--stages table-->
        <div>
          <table id=main_table>
            <!--level 1-->
            <tr>
              <td
                v-for="l1 in Structure.filter(s=>!s.sublevel)"
                :colspan="Structure.filter(s=>s.level==l1.level).length-1"
                :style="{background:l1.color}"
                class=level_name
              >
                <div
                  @click="go_to(l1.level)"
                  :style="{
                    display:'flex',
                    justifyContent:'center',
                  }"
                >
                  <div :style="{textDecoration:is_tier_b_selected(l1.level)?'underline':'',display:'flex',alignItems:'center'}"
                  >
                    <img :src="'frontend/img/stages_menu-'+l1.prefix+'.svg'"
                      style="width:50px;margin-right:10px"
                    >
                    {{translate(l1.level)}}
                  </div>
                  <!--
                  <div>
                    {{format(Global[l1.level][l1.prefix+'_KPI_GHG']().total)}}
                    <small>kgCO<sub>2</sub>eq</small>
                  </div>
                  -->
                </div>
              </td>
            </tr>

            <!--level 2 stages-->
            <tr>
              <td
                v-for="s in Structure"
                v-if="s.sublevel"
                @click="go_to(s.level,s.sublevel)"
                :style="{background:'var(--color-level-'+s.level+'-secondary)'}"
                class=stage_name
              >
                <div style="display:flex;align-items:center">
                  <div>
                    <img :src="'frontend/img/'+s.icon" >
                  </div>
                  <div style="padding-left:5px">
                    <a :style="{color:'var(--color-level-'+s.level+')'}">
                      <b>
                        {{translate(s.sublevel)}}
                        ({{Global[s.level][s.sublevel].length}})
                      </b>
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <!--level 3 substages-->
            <tr>
              <td v-for="s in Structure.filter(s=>s.sublevel)"
                style="
                  vertical-align:top;
                  border-top:1px solid #ccc;
                  padding:0;
                "
              >
                <div
                  v-if="Global[s.level][s.sublevel].length==0"
                  style="text-align:center;padding:0.5em"
                >
                  <small
                    style="color:#666"
                    title="Create substages to insert further information"
                    v-html="'~no substages'"
                  ></small>
                </div>
                <div
                  v-if="s.sublevel"
                  v-for="ss,i in Global[s.level][s.sublevel]"
                  @click="go_to_substage(ss)"
                  :selected_substage="is_substage_selected(ss)"
                  class=substage
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
                          style="white-space:nowrap;"
                          v-html="ss.name.prettify()"
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
                      <span>{{ format(ss[s.prefix+'_KPI_GHG']().total, 0) }}</span>
                      <span class=unit>
                        kg<sub>CO<sub>2</sub>eq</sub>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <!--total ghg of substages-->
            <tr>
              <td v-for="s in Structure.filter(s=>s.sublevel)">
                <div style="font-size:smaller;margin-top:10px;text-align:center">
                  <span>Total {{s.sublevel}}:</span>
                  <b v-html="format(get_sum_of_substages(s.level, s.sublevel, s.prefix+'_KPI_GHG'), 0)"></b>
                  <span class=unit>kgCO<sub>2</sub>eq</span>
                </div>
              </td>
            </tr>

            <!--btn add substage-->
            <!-- -->
            <tr>
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
      </div>
    </div>
  `,

  style:`
    <style>
      #stages_menu {
        background:#f0f5fc;
        padding-top:1px;
        padding-bottom:1.5em;
      }
      #stages_menu #main_table {
        width:100%;
      }
      #stages_menu #main_table th,
      #stages_menu #main_table td {
        border:none;
      }
      #stages_menu #main_table td.level_name{
        padding:8px;
        font-size:15px;
        cursor:pointer;
        color:white;
      }
      #stages_menu #main_table td.stage_name{
        padding:2px 10px;
        font-size:12px;
        cursor:pointer;
      }
      #stages_menu #main_table td.level_name:hover > div,
      #stages_menu #main_table td.stage_name:hover > div{
        transform: matrix(1.03,0,0,1.03,5,0);
        transition:all 0.15s;
        text-decoration:underline;
        /*
        padding:0px 0px;
        font-size:13px;
        */
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
      #stages_menu div.substage {
        cursor:pointer;
        padding:7px;
        border-bottom:1px solid #ccc;
      }
      #stages_menu div.substage:hover a {
        text-decoration:underline;
      }
    </style>
  `,
});
