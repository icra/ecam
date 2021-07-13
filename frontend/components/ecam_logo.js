let ecam_logo=new Vue({
  el:"#ecam_logo",
  data:{
    visible:false,
    Global,
    Languages,
  },
  methods:{
    translate,
    is_linear_menu_visible(){
      return linear_menu.visible;
    },
    is_dev_mode_on(){
      return debug;
    },
  },
  template:`
    <div id=ecam_logo v-if="visible && Languages.ready">
      <!--logo-->
      <div id=logo onclick="ecam.show('landing')">
        <div style="margin-right:10px">ECAM</div>
        <div style="font-size:12px">{{translate('navbar_title')}}</div>
      </div>

      <!--version-->
      <div style="font-family:monospace;padding:1px">
        <a href="https://github.com/icra/ecam" target=_blank title="version">
          v{{Global.General.version}}
        </a>
      </div>

      <!--debug mode menu-->
      <div v-if="is_dev_mode_on()"
        style="
          padding:2px;
          border-radius:5px;
          border:1px solid white;
        "
      >
        <b>DEV MODE ON</b>

        <!--disable dev mode-->
        <button
          onclick="debug=false;Languages.current='en';ecam.show('landing');ecam.elements.ecam_logo.$forceUpdate()"
          style="background:white;padding:2px"
        >disable dev mode
        </button>

        <!--open github issues-->
        <button
          onclick="window.open('https://github.com/icra/ecam/issues')" target=_blank
          style="background:white;padding:2px"
        >github issues
        </button>

        <!--dev utils page-->
        <button
          onclick="ecam.show('development')"
          style="background:white;padding:2px"
        >development
        </button>
      </div>

      <!--language-->
      <div id=lang>
        <!--current language-->
        <div style="width:20px">{{Languages.current.toUpperCase()}}</div>

        <!--all languages-->
        <div id=select>
          <div
            v-for="lang in Languages.list"
            @click="Languages.current=lang;"
            :lang="lang"
            :current="Languages.current==lang"
            v-html="lang"
          ></div>

          <!--null (only language tags)-->
          <div lang=null
            @click="Languages.current='null'"
            :current="Languages.current=='null'"
            v-if="is_dev_mode_on()"
            v-html="'null (tags only, for development)'"
          ></div>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #ecam_logo {
        background:var(--color-level-generic);
        box-shadow:0 1px 2px rgba(0,0,0,.5);
        color:white;
        padding:5px;
        padding-left:2em;
        padding-right:3em;
        padding-top:1em;
        padding-bottom:0.5em;

        align-items:center;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
      }
      #ecam_logo a{color:white;}
      #ecam_logo a:hover{text-decoration:none}
      #ecam_logo #burger {
        cursor:pointer;
        font-size:30px;
        line-height:0px;
      }
      #ecam_logo #burger:hover{color:#666}
      #ecam_logo #logo {
        font-weight:bold;
        font-size:30px;
        padding-right:10px;
        display:flex;
        align-items:center;
      }
      #ecam_logo #lang{
        cursor:pointer;
      }

      /* select element */
      #ecam_logo #lang #select{
        transform:translate(-180px,0);
        position:absolute;
        visibility:hidden;
        border:1px solid #ccc;
        width:200px;
        background:white;
        box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 5px 10px 15px 5px rgba(0,0,0,.1);
        text-align:left;
        z-index:999;
        transition:all 0.2s;
        font-size:12px;
      }

      /* show select element */
      #ecam_logo #lang:hover #select{
        visibility:visible;
        height:auto;
        transition:all 0s;
      }

      /* languages */
      #ecam_logo #lang #select div[lang] {
        color:black;
        display:block;
        padding:0.5em;
      }

      #ecam_logo #lang #select div[lang][current] {
        font-weight:bold;
        background:var(--color-level-generic);
        color:white;
      }

      /* languages mouse over */
      #ecam_logo #lang #select div[lang]:hover {
        background:var(--color-level-generic);
        color:white;
      }
    </style>
  `,
});
