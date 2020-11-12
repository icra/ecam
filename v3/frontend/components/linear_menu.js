let linear_menu = new Vue({
  el:"#linear_menu",
  data:{
    visible      : true,
    current_view : 'landing',

    Global,
    Languages,
    Info,
  },
  methods:{
    translate,
    format,

    is_summaries_menu_visible(){
      return summaries_menu.visible;
    },
  },

  template:`
    <!--linear menu COMPONENT-->
    <div id=linear_menu v-if="visible && Languages.ready">
      <div id=select_view class=flex>
        <!--landing / home-->
        <div
          onclick="ecam.show('landing')"
          :selected="current_view=='landing'"
        >
          <div>Home</div>
        </div>

        <!--layouts-->
        <div
          onclick="ecam.show('select_scenario')"
          :selected="current_view=='select_scenario'"
        >
          <div>Layouts</div>
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
          onclick="ecam.show('tier_b')"
          :selected="current_view=='tier_b'"
        >
          <div>Stages</div>
        </div>

        <!--overview-->
        <div
          onclick="ecam.show('overview')"
          :selected="is_summaries_menu_visible()"
        >
          <div>Overview</div>
        </div>

        <!--more (old sidebar)-->
        <div
          onclick="ecam.show('more')"
          :selected="current_view=='more'"
        >
          <div>More</div>
        </div>
      </div>

      <!--current layout-->
      <div onclick="ecam.show('configuration')">
        <div>
          <b style="color:#aaa">You are editing</b>
          <b>{{Global.General.Name}}</b>
        </div>
        <div>
          <span v-html="format(Global.TotalGHG())"></span>
          <span class=unit v-html="Info.TotalGHG.unit.prettify()"></span>
          &nbsp;
          <span :style="{color:(Global.Days()<=0?'red':'')}">
            <span v-html="format(Global.Days())"></span>
            <span class=unit v-html="translate('days')"></span>
          </span>
          &nbsp;
          <span :style="{color:(Global.General.conv_kwh_co2<=0?'red':'')}">
            <span v-html="format(Global.General.conv_kwh_co2)"></span>
            <span class=unit v-html="Info.conv_kwh_co2.unit.prettify()"></span>
          </span>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #linear_menu {
        background:white;
        border-bottom:1px solid #ccc;
        padding:0 2em 0 5em;
        display:flex;
        justify-content:space-between;
        align-items:flex-end; /*align to bottom*/
      }
      #linear_menu {
        display:flex;
      }
      #linear_menu #select_view > div {
        color:#3c3c3b;
        font-size:12px;
        font-weight:bold;
        padding:2em 1em 0.2em 1em;
        border-bottom:4px solid transparent;
        box-sizing:border-box;
      }
      #linear_menu #select_view > div[selected],
      #linear_menu #select_view > div:hover {
        color:black;
        border-color:var(--color-level-generic);
      }
      #linear_menu #select_view a:hover {
        text-decoration:none;
      }
    </style>
  `,
});
