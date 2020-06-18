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
      <div id=content>
        <!--index title-->
        <div class="width_50">
          <h1 class="blue_h1" style=padding-bottom:0px>
            {{translate("a_toolkit_for_utilities")}}
          </h1>
          <h1 class="green_h1" style=font-size:32px>
            {{translate("assess_your_utility")}}
          </h1>

          <!--index text-->
          <h4 style=font-size:18px;color:#58595b>
            {{translate("index_description")}}
          </h4>
          <h4 style=font-size:18px;color:#58595b>
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
          <div style="padding:1em 0em">
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
                  v-html="translate('open')"
                ></button>
              </div>

              <!--next-->
              <div>
                <button class="button next"
                  onclick="event.stopPropagation();ecam.show('select_scenario')"
                  v-html="translate('next')"
                ></button>
              </div>
            </div>
          </div>

          <div style="
            font-size:x-large;
          ">
            <div>
              <a href="mailto:wacclim@giz.de" target=_blank>
                {{translate("contact")}}: wacclim@giz.de
              </a>
            </div>
            <div>
              <a onclick="ecam.show('help')">
                {{translate("help")}}
              </a>
            </div>
            <div>
              <a onclick="ecam.show('about')">
                {{translate("about")}}
              </a>
            </div>
          </div>

          <img
            class="license_img license_img-big"
            src="frontend/img/CC_license_small.png"
            alt=""
          >
          <br>

          {{translate("ecam_by_iwa_giz_icra")}}

          <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">
            {{translate("creative_commons_attr")}}
          </a>.

          <div style=font-size:smaller>
            {{translate("wacclim_is_part_of_IKI")}}
          </div>

        </div>

        <!--urban water cycle picture-->
        <div class="width_50" style="padding:0;text-align:center">
          <img class="img_resp" src="frontend/img/diagram.png">
        </div>
      </div>

      <!--logos-->
      <div>
        <footer id=footer>
          <img
            id=logo-wacclim
            src="frontend/img/logo-wacclim_big.png"
            style="height:120px;margin:auto"
          >
        </footer>
        <div style="
            background:white;
            margin-top:50px;
            padding:0em 10em;
            text-align:left;
          "
        >
          <img src="frontend/img/logos.png">
        </div>
      </div>
    </div>
  `,
});
