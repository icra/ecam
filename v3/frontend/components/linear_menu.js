let linear_menu = new Vue({
  el:"#linear_menu",

  data:{
    visible: true,
    current_view: null,
    caption,

    Global,
    Structure,
    Languages,
  },

  methods:{
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
      <!--linear general info-->
      <div onclick="ecam.show('get_started')">
        <div>
          <a style="color:inherit">
            {{translate('getStarted_general_info')}}
          </a>
        </div>
        <img
          :class="'l1 '+(current_view=='get_started'?'selected':'')"
          src=frontend/img/getStarted.png
          @mousemove="caption.show($event, translate('getStarted_general_info'))"
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

      <!--linear tier A-->
      <div onclick="ecam.show('tier_a')">
        <div>
          <a style="color:inherit" v-html="translate('tier_A')"></a>
        </div>
        <img
          :class="'l1 '+(current_view=='tier_a'?'selected':'')"
          src=frontend/img/birds.png
          @mousemove="caption.show($event, translate('tier_A'))"
          @mouseout="caption.hide()"
        >
      </div>

      <!--linear tier B-->
      <div>
        <div>
          <span style="color:inherit"
            v-html="translate('tier_B')"
          ></span>
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
            </div>
            <img v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
              :class="'l2 '+(is_tier_b_selected(l2.level,l2.sublevel)?'selected':'')"
              :stage="l2.alias"
              @mousemove="caption.show($event, translate(l2.sublevel))"
              @mouseout="caption.hide()"
              :src="'frontend/img/'+(l2.alias)+(Global.Configuration.ActiveStages[l2.alias]?'':'-off')+'.png'"
              @click="go_to(l2.level,l2.sublevel)"
            >
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
      </div>

      <!--linear select scenario button-->
      <div>
        <div>
          <span style="color:inherit">
            Scenarios
          </span>
        </div>
        <button
          onclick="ecam.show('select_scenario')"
          @mousemove="caption.show($event, 'Select Scenario')"
          @mouseout="caption.hide()"
          v-html="'Select Scenario'"
        ></button>
      </div>

    </div>
  `,
});
