let landing = new Vue({
  el:'#landing',
  data:{
    visible:true,
    Global,
    Languages,

    include_tutorial_tips:true,
  },
  methods:{
    translate,
  },

  template:`
    <div id=landing v-if="visible && Languages.ready">
      <!--title-->
      <div
        class=container
        style="
          display:grid;
          grid-template-columns:50% 50%;
        "
      >
        <div
          style="padding-top:40px"
        >
          <h1 class="blue_h1" style="padding-bottom:0px;text-align:left">
            Assess the carbon footprint and energy performance of your urban water utility
          </h1>
          <h1 style="color:#333;font-size:large;text-align:left">
            ECAM empowers water and wastewater utility operators to assess their greenhouse gas emissions and energy consumption.
          </h1>
          <ul
            style="
              font-size:large;
              padding-inline-start:20px;
            "
          >
            <li>Perfect for climate reporting needs.</li>
            <li>Overview of system-wide greenhouse gas emissions.</li>
            <li>IPCC-2019 compliant and open-source.</li>
          </ul>

          <div style="width:400px">
            <button class="start" onclick="ecam.show('select_scenario')">
              Start your assessment
            </button>
            <div style="text-align:center;margin-top:1em;">
              <label>
                <input type=checkbox v-model="include_tutorial_tips">
                Include first-time-user tutorial tips
              </label>
            </div>
          </div>
        </div>
        <div>
          <img
            src="frontend/img/landing/water_cycle.png"
            style="width:600px"
          >
        </div>
      </div>

      <!--learn more-->
      <div class="container">
        <h1 style="text-align:center">Learn more about the project</h1>
        <div
          style="
            display:grid;
            grid-template-columns:30% 30% 30%;
            grid-gap:5%;
          "
        >
          <div class=learn_more_item onclick="window.open('https://github.com/icra/ecam')">
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
              <b>Open source</b>
              <img class=icon src="frontend/img/landing/open-source.png">
            </div>
            <p>
              ECAM is a free and open source
              tool. The source code is openly
              published for use and
              modification on github.
            </p>
            <a>Click here to access github</a>
          </div>

          <div class=learn_more_item onclick="ecam.show('about')">
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
              <b>About ECAM</b>
              <img class=icon src="frontend/img/landing/about.png">
            </div>
            <p>
              ECAM's web interface and
              content were developed jointly
              by ICRA, GIZ and IWA.
            </p>
            <a>Click here to learn more</a>
          </div>

          <div class=learn_more_item onclick="window.open('https://wacclim.org')">
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
              <b>WaCCliM</b>
              <img class=icon src="frontend/img/landing/wacclim.png">
            </div>
            <p>
              ECAM was developed as part of
              WaCCliM, a project that supports
              water and wastewater utilities to
              become climate-smart.
            </p>
            <a>Click here to access wacclim.org</a>
          </div>
        </div>
      </div>

      <!--questions-->
      <div id=questions>
        <div>
          Do you have questions or feedback?
        </div>
        <button
          style="
            color:white;
            border-color:white;
            margin-top:10px;
          "
          onclick="window.open('mailto:wacclim@giz.de')"
          v-html="'Contact us'"
        ></button>
      </div>

      <!--logos-->
      <footer>
        <!--links-->
        <p>
          <a href="https://wacclim.org" target=_blank>About WaCCliM</a> |
          <a href="#" onclick="ecam.show('about')">About ECAM</a> |
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
          <img src="frontend/img/viti/footer-logos/footer-logo-implemented-giz.svg" style="margin-left:7%">
          <img src="frontend/img/viti/footer-logos/footer-logo-iwa.svg" style="width:11%">
          <img src="frontend/img/viti/footer-logos/footer-logo-icra.svg" style="width:14%">
        </p>
      </footer>
    </div>
  `,

  style:`
    <style>
      #landing {
        background:#eff5fb;
        font-size:larger;
      }

      #landing h1 {
        padding-left:0;
        font-weight:700;
      }
      #landing h1.blue_h1 {
        font-size:x-large;
        color:var(--color-level-generic);
      }

      #landing button.start {
        width:100%;
        background:var(--color-level-generic);
        border-radius:20px;
        border:none;
        color:white;
        display:block;
        padding:1em;
        margin-bottom:5px;
        font-weight:bold;
        font-size:larger;
      }

      #landing button.start:hover {
        text-decoration:underline;
      }

      #landing div.container {
        padding:1em 10em 8em 8em;
        padding-bottom:2em;
      }
      #landing div.container.white {
        background:white;
      }

      #landing div.learn_more_item {
        background:white;
        box-shadow:5px 5px 10px #ccc;
        padding:1em 2em;
        margin-top:10px;
        border:1px solid transparent;
      }
      #landing div.learn_more_item:hover {
        border:1px solid #ccc;
      }
      #landing div.learn_more_item b {
        font-size:larger;
      }
      #landing div.learn_more_item img.icon {
        width:90px;
        height:71px;
        display:block;
      }

      #landing #questions {
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
        display:flex;
        justify-content:center;
        width:90%;
      }
      #landing #logos img {
        width:20%;
      }
    </style>
  `,
});
