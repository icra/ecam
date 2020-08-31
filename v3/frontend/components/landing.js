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
          <div style="color:#58595b;font-size:large">
            The <b>ECAM tool</b> is designed for assessing the carbon emissions and
            energy consumption of the urban water cycle that are within the
            operational boundaries of water and wastewater utilities and prepare
            these utilities for future reporting needs on climate mitigation.
          </div>
        </div>

        <!--urban water cycle picture-->
        <div style=padding:2em>
          <img src="frontend/img/viti/home/home-provisional.svg" style="width:60%">
        </div>
      </div>

      <!--new and load-->
      <div id=second_container >
        <!--start-->
        <div class=button_container>
          <div>
            <img src="frontend/img/viti/home/home-icon-newuser.svg" style="width:50%">
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
            <img src="frontend/img/viti/home/home-icon-alreadyworked.svg" style="width:50%">
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
            <img src="frontend/img/viti/home/home-icon-opensource.svg" style="width:50%">
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
            <img src="frontend/img/viti/home/home-icon-aboutus.svg" style="width:50%">
            <p><b>About us</b></p>

            <div>
              The web interface and new features for the <b>ECAM tool</b>
              were developed by ICRA, IWA, and GIZ under the WaCCliM project.
              <a href=# onclick="ecam.show('about')">Learn more</a>.
            </div>
          </div>

          <div>
            <img src="frontend/img/viti/home/home-icon-wacclim.svg" style="width:50%">
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
            <img src="frontend/img/viti/home/home-screenshot.svg">
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
            ECAM is a tool developed by ICRA for the WaCCliM Project* and holds a Creative Commons Attribution-ShareAlike 4.0 International License.
          </div>
          <div style="font-size:smaller;margin-top:10px">
            *WaCCliM is a joint initiative between GIZ and IWA. This project
            is part of the International Climate Initiative (IKI). The German
            Federal Ministry for the Environment, Nature Conservation and
            Nuclear Safety (BMU) supports this initiative on the basis of a
            decision adopted by the German Bundestag.
          </div>
        </div>

        <p id=logos>
          <img src="frontend/img/viti/footer-logos/footer-logo-wacclim.svg">
          <img src="frontend/img/viti/footer-logos/footer-logo-federal.svg">
          <img src="frontend/img/viti/footer-logos/footer-logo-implemented-giz.svg">
          <img src="frontend/img/viti/footer-logos/footer-logo-iwa.svg">
          <img src="frontend/img/viti/footer-logos/footer-logo-icra.svg">
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
        padding:6em;
        padding-bottom:0;
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
        padding:6em;
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
        padding-top:0;
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
      #landing #logos {
        display:grid;
        grid-template-columns:20% 22% 20% 10% 12%;
      }
    </style>
  `,
});
