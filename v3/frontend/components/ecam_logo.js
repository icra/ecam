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
  },

  template:`
    <div id=ecam_logo v-if="visible && Languages.ready">
      <!--3 lines menu symbol "burger"-->
      <div id=burger onclick="event.stopPropagation();sidebar.visible^=1">
        &#9776;
      </div>

      <!--logo-->
      <div id=logo_container onclick="ecam.show('landing')">
        <div id=logo>ECAM</div>
        <div>
          {{translate('navbar_title')}}
        </div>
      </div>

      <!--version-->
      <div style="font-family:monospace">
        <a href="//github.com/icra/ecam" target=_blank>
          v{{Global.General.version}}
        </a>
      </div>

      <!--current system name-->
      <div style="font-size:larger" onclick="ecam.show('select_scenario')">
        {{Global.General.Name}}
      </div>

      <!--show linear menu button-->
      <div>
        <button onclick="linear_menu.visible^=true"
          style="width:100%">
          <span v-if="is_linear_menu_visible()">&#9206;&#9206;&#9206;</span>
          <span v-else>&#9207;&#9207;&#9207;</span>
        </button>
      </div>

      <!--language-->
      <div id=lang>
        <!--current language-->
        <img :src="'frontend/img/flags/'+Languages.current+'.png'">

        <!--all languages-->
        <div id=select>
          <div
            v-for="lang in Languages.list"
            :lang="lang"
            @click="Languages.current=lang"
          >
            <img :src="'frontend/img/flags/'+lang+'.png'">
            {{lang}}
          </div>

          <!--null (only language tags)-->
          <div lang=null @click="Languages.current='null'">
            <img src="frontend/img/flags/null.png">
            null (tags only)
          </div>

          <!--language problem finder-->
          <div :lang="Languages.current">
            <a style=color:blue onclick="alert('TODO')">
              language debugging tool
            </a>
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
        align-items:center;

        /*css grid*/
        display:grid;
        grid-template-columns:5% 50% 10% 20% 10% 5%; /*sum: 85%*/
        /*                    b   l   v   s   b  l
                              u   o   e   y   t  a
                              r   g   r   s   n  n
                              g   o   s   t      g
                              e       i   e   m  u
                              r       o   m   e  a
                                      n       n  g
                                              u  e
        */
      }
      #ecam_logo a{color:white;}
      #ecam_logo a:hover{text-decoration:none}
      #ecam_logo img{vertical-align:middle}
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
      }

      #ecam_logo #lang > img {
        display:block;
        margin:auto;
      }

      /* select element */
      #ecam_logo #lang #select{
        position:absolute;
        top:3%;
        right:1%;
        visibility:hidden;
        border:1px solid #ccc;
        width:200px;
        background:#eeece4;
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

      /* languages mouse over */
      #ecam_logo #lang #select div[lang]:hover {
        background:orange;
      }
      #ecam_logo #lang #select div[lang] img {
        width:20px;
      }
    </style>
  `,
});
