let linear_menu = new Vue({
  el:"#linear_menu",
  data:{
    visible:true,
    current_view:null,

    //floating windows
    stages_visible:false,
    summaries_visible:false,

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
    get_height(){
      let logo   = document.querySelector("#ecam_logo").offsetHeight;
      let linear = document.querySelector("#linear_menu").offsetHeight;
      return logo + linear;
    },
  },
  template:`
    <!--linear menu COMPONENT-->
    <div id=linear_menu v-if="visible && Languages.ready" class=flex>
      <!--landing / home-->
      <div
        onclick="ecam.show('landing')"
        :selected="current_view=='landing'"
      >
        <div>Home</div>
      </div>

      <!--systems-->
      <div
        onclick="ecam.show('select_scenario')"
        :selected="current_view=='select_scenario'"
      >
        <div>Systems</div>
      </div>

      <!--general settings-->
      <div
        onclick="ecam.show('configuration')"
        :selected="current_view=='configuration'"
      >
        <div>Configuration</div>
      </div>

      <!--stages-->
      <div
        @click="stages_visible^=1"
        style="cursor:pointer"
        :selected="current_view=='tier_b'"
      >
        <div>Stages</div>
        <div
          id=stages_menu
          @mouseenter="stages_visible=1"
          @mouseleave="stages_visible=0"
          v-if="stages_visible"
          :style="'top:'+get_height()+'px'"
        >
          <div style="font-size:large;">
            Emissions:
            <span v-html="format(Global.TotalGHG())"></span>
            <span v-html="Info.TotalGHG.unit.prettify()"></span>
            &emsp;
            in
            &emsp;
            <span v-html="format(Global.Days())"></span>
            <span class=unit>{{translate('days')}}</span>
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
                    :class="'l2 '+(is_tier_b_selected(l1.level, false)?'selected':'')"
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

      <!--summaries-->
      <div
        @click="summaries_visible^=1"
        style="cursor:pointer"
      >
        <div>
          <span style="color:inherit">
            {{translate('summaries')}}
          </span>
        </div>
        <ul
          v-if="summaries_visible"
          @mouseenter="summaries_visible=1"
          @mouseleave="summaries_visible=0"
          style="
            list-style:none;
            font-size:large;
            position:absolute;
            padding:1em;
            margin:0;
            border:1px solid #ccc;
            background:#eee;
            padding:0.5em;
            box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
          "
        >
          <li>
            <a href=# onclick="ecam.show('summary_ghg');">
              GHG summary
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('summary_nrg');">
              Energy summary
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('emission_tree');">
              All GHG emissions
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('report');">
              Report
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,

  style:`
    <style>
      #linear_menu {
        background:white;
        border-bottom:1px solid #ccc;
        padding:0 0 0 5em;
      }
      #linear_menu > div {
        color:#3c3c3b;
        margin:0 1em;
        font-size:12px;
        font-weight:bold;
        padding:0.2em;
        padding-top:2em;
        border-bottom:4px solid transparent;
        box-sizing:border-box;
      }
      #linear_menu > div[selected],
      #linear_menu > div:hover {
        color:black;
        border-color:var(--color-level-generic);
      }
      #linear_menu #stages_menu {
        position:absolute;
        left:0;
        width:100%;

        background:#f0f5fc;
        border:none;
        box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
        padding:0.5em;
        padding:1em;
      }

      #linear_menu img.l1:hover,
      #linear_menu img.l2:hover {
        border:3px solid var(--color-level-generic);
      }
      #linear_menu img {
        cursor:pointer;
        position:relative;
        z-index:2;
        vertical-align:
        middle;
        padding:0;
      } /*icons inside buttons to navigate to Level2*/
      #linear_menu img.l1 {width:42px;}
      #linear_menu img.l2 {width:42px;}
      #linear_menu img{border-radius:90%;border:3px solid transparent;}
      #linear_menu img.selected{border:3px solid #9fc231;}
      #linear_menu a:hover {text-decoration:none;}
    </style>
  `,
});
