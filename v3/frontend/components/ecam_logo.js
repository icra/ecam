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
    is_debug_mode_enabled(){
      return debug;
    },
  },
  template:`
    <div id=ecam_logo v-if="visible && Languages.ready">
      <!--logo-->
      <div id=logo_container>
        <div id=logo onclick="ecam.show('landing')">ECAM</div>
        <div>
          <span>{{translate('navbar_title')}}</span>
          <span>&mdash;</span>
          <!--version-->
          <span style="font-family:monospace" title="version">
            <a href="dev/pending.txt" target=_blank>
              v{{Global.General.version}}
            </a>
            -
            <!---->
            <a href="https://github.com/icra/ecam/issues" target=_blank>
              issues
            </a>

            <!---->
            <span v-if="is_debug_mode_enabled()">
              <button
                onclick="ecam.show('development')"
                style="
                  background:white;
                "
              >
                dev utils
              </button>
            </span>
          </span>
        </div>
      </div>

      <!--language-->
      <div id=lang v-if="is_debug_mode_enabled()">
        <!--current language-->
        <div>{{Languages.current}}</div>

        <!--all languages-->
        <div id=select>
          <div
            v-for="lang in Languages.list"
            :lang="lang"
            @click="Languages.current=lang"
            v-html="lang"
            :current="Languages.current==lang"
          ></div>

          <!--null (only language tags)-->
          <div lang=null @click="Languages.current='null'">
            null (for development - tags only)
          </div>
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
        min-height:50px;
        padding:5px;
        padding-left:3em;
        align-items:center;

        /*css grid*/
        display:grid;
        grid-template-columns:80% 10%;
        /*                    l   l
                              o   a
                              g   n
                              o   g
                                  u
                                  a
                                  g
                                  e
        */
      }
      #ecam_logo a{color:white;}
      #ecam_logo a:hover{text-decoration:none}
      #ecam_logo #burger {
        cursor:pointer;
        font-size:30px;
        line-height:0px;
      }
      #ecam_logo #burger:hover{color:#666}
      #ecam_logo #logo_container {
        display: flex;
        flex-wrap:wrap;
        align-items:center;
      }
      #ecam_logo #logo {
        font-weight:bold;
        font-size:30px;
        padding-right:20px;
      }
      #ecam_logo #lang{
        cursor:pointer;
        text-align:right;
      }

      /* select element */
      #ecam_logo #lang #select{
        position:absolute;
        top:3%;
        right:1%;
        visibility:hidden;
        border:1px solid #ccc;
        width:200px;
        background:white;
        box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 5px 10px 15px 5px rgba(0,0,0,.1);
        text-align:left;
        z-index:999;
        transition:all 0.4s;
        font-size:12px;
      }

      /* show select element */
      #ecam_logo #lang:hover #select {
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
