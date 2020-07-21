let linear_menu = new Vue({
  el:"#linear_menu",
  data:{
    visible:true,
    current_view:'landing',

    ghg_emissions_visible:false,
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
  },
  template:`
    <!--linear menu COMPONENT-->
    <div id=linear_menu v-if="visible && Languages.ready" class=flex>

      <!--landing / home-->
      <div
        onclick="ecam.show('landing')"
        :selected="current_view=='landing'"
      >
        <div>
          <span style="color:inherit">
            Home
          </span>
        </div>
      </div>

      <!--systems-->
      <div
        onclick="ecam.show('select_scenario')"
        :selected="current_view=='select_scenario'"
      >
        <div>
          <span style="color:inherit">
            Systems
          </span>
        </div>
      </div>

      <!--general settings-->
      <div
        onclick="ecam.show('configuration')"
        :selected="current_view=='configuration'"
      >
        <div>
          <span style="color:inherit">
            General settings
          </span>
        </div>
      </div>

      <!--ghg emissions-->
      <div
        :selected="current_view=='tier_b'"
      >
        <div @click="ghg_emissions_visible^=true" style="cursor:pointer">
          <span>GHG emissions</span>
        </div>

        <div
          v-if="ghg_emissions_visible"
          style="
            position:absolute;
            padding:1em;
            margin:0;
            border:1px solid #ccc;
            background:#eee;
            padding:0.5em;
            box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
          "
        >
          <div style="font-size:large;text-align:center">
            <span v-html="format(Global.TotalGHG())"></span>
            <span v-html="Info.TotalGHG.unit.prettify()"></span>
          </div>
          <div class=flex>
            <div v-for="l1 in Structure.filter(s=>!s.sublevel)">
              <div style="text-align:center">
                <img
                  @click="go_to(l1.level); ghg_emissions_visible=false"
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
              <div class="flex">
                <div v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))">
                  <img
                    :class="'l2 '+(is_tier_b_selected(l2.level,l2.sublevel)?'selected':'')"
                    :stage="l2.alias"
                    @mousemove="caption.show($event, translate(l2.sublevel))"
                    @mouseout="caption.hide()"
                    :src="'frontend/img/'+(l2.alias)+(Global.Configuration.ActiveStages[l2.alias]?'':'-off')+'.png'"
                    @click="go_to(l2.level,l2.sublevel); ghg_emissions_visible=false"
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
          <div style="text-align:center">
            <button
              style="width:100%"
              @click="ghg_emissions_visible=false">
              close
            </button>
          </div>
        </div>
      </div>

      <!--energy summary-->
      <div
        :selected="current_view=='summary_nrg'"
      >
        <div
          onclick="ecam.show('summary_nrg')"
          @mousemove="caption.show($event, translate('nrg_summary'))"
          @mouseout="caption.hide()"
        >
          <span style="color:inherit">
            Energy efficiency
          </span>
        </div>
      </div>

      <!--summaries-->
      <div>
        <div
          @click="summaries_visible^=1"
          style="cursor:pointer"
        >
          <span style="color:inherit">
            {{translate('summaries')}}
          </span>
        </div>
        <ul
          v-if="summaries_visible"
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
            <a href=# onclick="ecam.show('summary_ghg')">
              GHG summary
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('emission_tree')">
              All GHG emissions
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('report')">
              Report
            </a>
          </li>
          <li>
            <button style="width:100%;" @click="summaries_visible=false">close</button>
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
        padding:2em 0 0 2em;
      }
      #linear_menu > div {
        margin:0 1em;
        font-size:12px;
        font-weight:bold;
        padding:0.2em;
        border-bottom:4px solid transparent;
      }
      #linear_menu > div[selected],
      #linear_menu > div:hover {
        color:black;
        border-color:var(--color-level-generic);
      }

      #linear_menu img.l1:hover,
      #linear_menu img.l2:hover {
        border:3px solid #9fc231;
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
