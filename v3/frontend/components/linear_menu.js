let linear_menu = new Vue({
  el:"#linear_menu",

  data:{
    visible:true,
    current_view: null,
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
      <!--linear select scenario button-->
      <div onclick="ecam.show('select_scenario')">
        <div>
          <span style="color:inherit">
            Systems
          </span>
        </div>
        <img
          :class="'l1 '+(current_view=='select_scenario'?'selected':'')"
          src=frontend/img/getStarted.png
          @mousemove="caption.show($event, 'Systems')"
          @mouseout="caption.hide()"
        >
      </div>

      <!--linear configuration-->
      <div onclick="ecam.show('configuration')">
        <div>
          <a style="color:inherit">
            {{translate('configuration')}}
          </a>
        </div>
        <img
          :class="'l1 '+(current_view=='configuration'?'selected':'')"
          src=frontend/img/dashboard.png
          @mousemove="caption.show($event, translate('configuration'))"
          @mouseout="caption.hide()"
        >
      </div>

      <!--linear population-->
      <div onclick="ecam.show('population')">
        <div>
          <a style="color:inherit">
            {{translate('population')}}
          </a>
        </div>
        <img
          :class="'l1 '+(current_view=='population'?'selected':'')"
          src=frontend/img/inhabitants.png
          @mousemove="caption.show($event, translate('population'))"
          @mouseout="caption.hide()"
        >
      </div>

      <!--linear tier B-->
      <div>
        <div>
          <span style="color:inherit" v-html="translate('tier_B')">
          </span>:
          <span>
            <span v-html="format(Global.TotalGHG())"></span>
            <span v-html="Info.TotalGHG.unit.prettify()"></span>
          </span>
        </div>

        <div class=flex>
          <div v-for="l1 in Structure.filter(s=>!s.sublevel)">
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
            <div class="flex">
              <div v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))">
                <img
                  :class="'l2 '+(is_tier_b_selected(l2.level,l2.sublevel)?'selected':'')"
                  :stage="l2.alias"
                  @mousemove="caption.show($event, translate(l2.sublevel))"
                  @mouseout="caption.hide()"
                  :src="'frontend/img/'+(l2.alias)+(Global.Configuration.ActiveStages[l2.alias]?'':'-off')+'.png'"
                  @click="go_to(l2.level,l2.sublevel)"
                >
                <div>
                  <small
                    v-html="format(Global[l2.prefix+'_KPI_GHG']())"
                  ></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--linear summaries button-->
      <div>
        <div>
          <span style="color:inherit">
            {{translate('summaries')}}
          </span>
        </div>
        <img
          :class="'l1 '+(current_view=='summary_ghg'?'selected':'')"
          src=frontend/img/sources.png
          onclick="ecam.show('summary_ghg')"
          @mousemove="caption.show($event, translate('ghg_summary'))"
          @mouseout="caption.hide()"
        >
        <img
          :class="'l1 '+(current_view=='emission_tree'?'selected':'')"
          src=frontend/img/all-emissions.png
          onclick="ecam.show('emission_tree')"
          @mousemove="caption.show($event, 'All GHG emissions')"
          @mouseout="caption.hide()"
          style="transform: rotate(-90deg)"
        >
        <img
          :class="'l1 '+(current_view=='summary_nrg'?'selected':'')"
          src=frontend/img/energy.png
          onclick="ecam.show('summary_nrg')"
          @mousemove="caption.show($event, translate('nrg_summary'))"
          @mouseout="caption.hide()"
        >
        <img
          :class="'l1 '+(current_view=='report'?'selected':'')"
          src=frontend/img/report.png
          onclick="ecam.show('report')"
          @mousemove="caption.show($event, 'Report')"
          @mouseout="caption.hide()"
        >
      </div>
    </div>
  `,

  style:`
    <style>
      #linear_menu {
        background:#f5f5f5;
        background:linear-gradient(#f5f5f5,#ddd);
        border-bottom:1px solid #e5e5e5;
        padding:0.4em 0 0.2em 0;
        box-shadow:0 1px 2px rgba(0,0,0,.5);
        text-align:center;
        justify-content:center;
      }
      #linear_menu > div {
        margin:0 4px;
        font-size:12px;
        vertical-align:middle;
        padding:0.2em;
        border-radius:0.5em;
        color:rgba(0,0,0,0.55);
      }
      #linear_menu > div:hover {
        background:#e6e6e6;
        color:black;
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
