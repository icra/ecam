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
      <div id=first_container>
        <!--title and introduction-->
        <div>
          <h1 class="blue_h1" style="padding-bottom:0px">
            A tool for water and wastewater utilities
          </h1>
          <h1 style="color:#333;font-size:x-large">
            {{translate("assess_your_utility")}}
          </h1>

          <!--ecam is designed for blablabla-->
          <div style="color:#58595b;">
            The <b>ECAM tool</b> is designed for assessing the carbon emissions and
            energy consumption of the urban water cycle that are within the
            operational boundaries of water and wastewater utilities and prepare
            these utilities for future reporting needs on climate mitigation.
          </div>
        </div>

        <!--urban water cycle picture-->
        <div style=padding:2em>
          <img src="frontend/img/diagram.png" style="width:50%">
        </div>
      </div>

      <!--new and load-->
      <div id=second_container >
        <!--start-->
        <div class=button_container>
          <div>
            users icon
          </div>
          <h1 style="color:var(--color-level-generic);">
            Are you a new user?
          </h1>
          <div>
            Learn about ECAM and all you can do with it!
          </div>

          <p>
            <button
              onclick="event.stopPropagation();ecam.show('select_scenario')"
              v-html="'Start a new system'"
            ></button>
          </p>
        </div>

        <!--load/open-->
        <div class=button_container>
          <div>
            folder icon
          </div>
          <h1 style="color:var(--color-level-generic);">
            Have you already worked with ECAM?
          </h1>
          <div>
            Continue editing and comparing results
          </div>

          <p>
            <button
              class=""
              onclick="document.getElementById('loadfile').click()"
              disabled
              v-html="'Load your file'"
            ></button>
            <input type=file
              id=loadfile
              accept=".json"
              onchange="loadFile(event)"
              style=display:none
            >
          </p>
        </div>
      </div>

      <!--learn more-->
      <div id=third_container>
        <p style="font-size:x-large;color:var(--color-level-generic);text-align:center">
          <b>Learn more about us</b>
        </p>

        <!--grid 3-->
        <div style="display:grid;grid-template-columns:30% 30% 30%;grid-gap:5%">
          <div>
            <p>computer icon</p>
            <p><b>Open source</b></p>
            <div>
              The <b>ECAM tool</b> is a free and open source tool.
              The source code lives at
              <a target=_blank href=//github.com/icra/ecam>
                github
              </a>.
            </div>
          </div>

          <div>
            <p>hello icon</p>
            <p><b>About us</b></p>

            <div>
              The web interface and new features for the <b>ECAM tool</b>
              were developed by ICRA, IWA, and GIZ under the WaCCliM project.
              <a href=# onclick="ecam.show('about')">Learn more</a>.
            </div>
          </div>

          <div>
            <p>wacclim icon</p>
            <p><b>WaCCliM</b></p>
            <div>
              The tool is developed as part of the
              <a target=_blank href=//wacclim.org/>
                WaCCliM project
              </a>.
            </div>
          </div>
        </div>
      </div>

      <!--very powerful-->
      <div id=fourth_container>
        <div>
          <div style="
            border:1px solid #ccc;
            position:relative;
            width:400px;
            height:300px;
            margin:auto;
            margin-top:-3em;
            margin-bottom:3em;
            background:white;
            box-shadow:0px 0px 12px #ccc;
          "
          >
            video
          </div>
        </div>
        <div>
          <h1 style="font-size:x-large">Very powerful, really easy to use</h1>
          <h1 style="font-size:large;color:#333">Take a look on our tutorials</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
          </p>
          <p>
            <button>Discover the tool!</button>
          </p>
        </div>
      </div>

      <!--questions-->
      <div id=fifth_container>
        Do you have any question? &emsp;
        <button
          style="
            color:white;
            border-color:white;
          "
          onclick="window.open('mailto:wacclim@giz.de')"
          v-html="'Contact us'"
        ></button>
      </div>

      <!--logos-->
      <footer>
        <!--links-->
        <p>
          <a href="https://wacclim.org" target=_blank>WaCCliM</a> |
          <a href="#" onclick="ecam.show('about')">About us</a> |
          <a href="#" onclick="ecam.show('help')">Help</a> |
          <a href="mailto:wacclim@giz.de" target=_blank>Contact</a>
        </p>

        <!--creative commons image and text-->
        <div>
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

        <p id=logos>
          <div> logo wacclim </div>
          <div> logo bmub </div>
          <div> logo giz </div>
          <div> logo iwa </div>
          <div> logo icra </div>
        </p>
      </footer>
    </div>
  `,

  style:`
    <style>
      #landing {
        background:#eff5fb;
      }
      #landing #first_container {
        padding:3em;

        display:grid;
        grid-template-columns:40% 58%;
        grid-gap:2%;
      }
      #landing h1 {
        padding-left:0;
        font-weight:700;
      }
      #landing #first_container .blue_h1 {
        font-size:xx-large;
        color: var(--color-level-generic);
      }

      #landing #second_container {
        padding:3em;
        padding-top:1em;
        text-align:center;

        display:grid;
        grid-template-columns:49% 49%;
        grid-gap:2%;
      }
      #landing #second_container .button_container {
        background:white;
        box-shadow:0px 0px 10px #ccc;
        padding:2em;
      }

      #landing #third_container {
        text-align:center;
        background:white;
        padding:3em;
        padding-bottom:6em;
      }

      #landing #fourth_container {
        display:grid;
        grid-template-columns:49% 49%;
        grid-gap:2%;
      }

      #landing #fifth_container {
        font-size:large;
        text-align:center;
        padding:3em;
        background:var(--color-level-generic);
        color:white;
      }

      #landing footer {
        text-align:center;
        color:white;
        background:#575756;
        padding:0.5em 10em 0.5em 10em;
      }
      #landing footer a {
        color:white;
        font-weight:bold;
      }
    </style>
  `,
});
