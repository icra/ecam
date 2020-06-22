let landing = new Vue({
  el:'#landing',

  data:{
    visible:false,

    Global,
    Languages,
  },

  methods:{
    translate,
  },

  template:`
    <div id=landing v-if="visible && Languages.ready">
      <main>
        <!--title and introduction-->
        <div>
          <h1 class="blue_h1" style=padding-bottom:0px>
            {{translate("a_toolkit_for_utilities")}}
          </h1>
          <h1 class="green_h1" style=font-size:32px>
            {{translate("assess_your_utility")}}
          </h1>

          <!--index text-->
          <h4 style="font-size:18px;color:#58595b;margin-left:0">
            {{translate("index_description")}}
          </h4>
          <h4 style="font-size:18px;color:#58595b;margin-left:0">
            {{translate("ecam_is_a_free_and")}}
            <a target=_blank href=//github.com/icra/ecam>
              {{translate("open_source")}}
            </a>
            {{translate("tool_developed_as_part_of_the")}}
            <a target=_blank href=//wacclim.org/>
              {{translate("wacclim_project")}}
            </a>
          </h4>

          <!--MENU BUTTONS-->
          <div style="padding:1em 0">
            <div class=flex id=menu_buttons>
              <!--load/open-->
              <div>
                <input type=file
                  id=loadfile
                  accept=".json"
                  onchange="loadFile(event)"
                  style=display:none
                >
                <button
                  class="button edit"
                  onclick="document.getElementById('loadfile').click()"
                  disabled
                  v-html="'Load JSON file'"
                ></button>
              </div>

              <!--next-->
              <div>
                <button class="button next"
                  onclick="event.stopPropagation();ecam.show('select_scenario')"
                  v-html="'Start'"
                ></button>
              </div>
            </div>
          </div>

          <!--links: about help contact-->
          <div class=links_under_buttons>
            <div>
              <a onclick="ecam.show('about')">
                {{translate("about")}}
              </a>
            </div>
            <div class=separator>|</div>
            <div>
              <a onclick="ecam.show('help')">
                {{translate("help")}}
              </a>
            </div>
            <div class=separator>|</div>
            <div>
              <a href="mailto:wacclim@giz.de" target=_blank>
                {{translate('contact')}}: wacclim@giz.de
              </a>
            </div>
          </div>

          <!--creative commons image and text-->
          <div>
            <img
              class="license_img license_img-big"
              src="frontend/img/CC_license_small.png"
              alt=""
              style="margin-bottom:5px"
            >
            <div>
              {{translate("ecam_by_iwa_giz_icra")}}
            </div>
            <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">
              {{translate("creative_commons_attr")}}
            </a>.
            <div style=font-size:smaller>
              {{translate("wacclim_is_part_of_IKI")}}
            </div>
          </div>
        </div>

        <!--urban water cycle picture-->
        <div style="padding:0;text-align:center">
          <img class="img_resp" src="frontend/img/diagram.png">
        </div>
      </main>

      <!--logos-->
      <footer>
        <img
          src="frontend/img/logo-wacclim_big.png"
          style="height:120px"
        >
        <img
          src="frontend/img/logos.png"
          style="height:140px"
        >
      </footer>
    </div>
  `,

  style:`
    <style>
      #landing main {
        padding:0 10em;
        display:grid;
        grid-template-columns:50% 50%;
      }
      #landing .img_resp{
        width: 100%;
        padding-top: 1em;
      }
      #landing .green_h1{
        color: #9fc231;
        padding-left:0;
      }
      #landing .blue_h1{
        font-size: 42px;
        font-weight: 700;
        color: var(--color-level-generic);
        padding-left:0;
      }
      #landing .links_under_buttons {
        padding:0.5em 0 1em 0;
        display:flex;
        flex-wrap:wrap;
        font-size:large;
      }
      #landing .links_under_buttons > div.separator {
        color:#ccc;
        margin:0 20px;
      }
      #landing .license_img{
        width: 20px;
        height: auto;
      }
      #landing .license_img-big{
        width: 90px;
      }
      #landing #menu_buttons button {
        display:block;
        margin-left:0;
        margin-top:0;
        margin-bottom:0;
      }
      #landing footer{
        margin-top:30px;
        padding:0.5em 10em 0.5em 10em;
      }
    </style>
  `,
});
