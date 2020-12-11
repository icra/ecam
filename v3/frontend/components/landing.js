let landing = new Vue({
  el:'#landing',
  data:{
    visible:true,
    Global,
    Languages,
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
        <div>
          <h1 class="blue_h1" style="padding-bottom:0px">
            Assess the carbon footprint and energy performance of your urban water utility
          </h1>
          <h1 style="color:#333;font-size:large">
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

          <div>
            <button class="start" onclick="ecam.show('select_scenario')">
              Start your assessment
            </button>
          </div>
          <div>
            <button class="start" onclick="alert('tutorial in development')" style="background:var(--color-level-generic-secondary)">
              Are you a new user?
            </button>
          </div>
        </div>
        <div>
          <img
            src="frontend/img/landing/water_cycle.png"
            style="width:100%"
          >
        </div>
      </div>

      <!--laptop-->
      <div
        class="container white"
        style="
          display:grid;
          grid-template-columns:50% 50%;
        "
      >
        <div>
          <img
            src="frontend/img/landing/laptop.png"
            style="width:100%"
          >
        </div>
        <div>
          <h1 class=blue_h1>
            Overview of greenhouse gas emissions at utility level? Possible with ECAM!
          </h1>

          <button class=start 
            style="
              border:2px solid black;
              background:white;
              color:black;
            "
            onclick="alert('in development')"
          >
            Take a look at our video tutorials
          </button>

          <p>
            Simply get started without previous knowledge: Take an assessment
            of your water and wastewater utillity to receive an overview of
            direct and indirect greenhouse gas emissions at a system-wide level
            and identify areas of improvement.
          </p>
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
              <img src="frontend/img/landing/open-source.png">
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
              <img src="frontend/img/landing/about.png">
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
              <b>WaCClim</b>
              <img src="frontend/img/landing/wacclim.png">
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
          Do you have questions?
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
        background:var(--color-level-generic);
        border-radius:20px;
        border:none;
        color:white;
        display:block;
        padding:1em 2em;
        width:50%;
        margin-bottom:5px;
        font-weight:bold;
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
      #landing div.learn_more_item img {
        width:100px;
        width:90px;
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
      }
    </style>
  `,
});
