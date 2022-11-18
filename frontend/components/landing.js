let landing = new Vue({
  el:'#landing',
  data:{
    visible:true,
    Global,
    Languages,

    //tutorial tips
    include_tutorial_tips:false,
    tutorial_tips_dismissed:[],
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
        <div style="padding-top:40px">
          <h1 class="blue_h1" style="padding-bottom:0px;text-align:left">
            {{
              translate("Assess_the_carbon_footprint_and_energy_performance_of_your_urban_water_utility")
            }}
          </h1>
          <h1 style="color:#333;font-size:large;text-align:left">
            {{
              translate("ECAM_empowers_water_and_wastewater_utility_operators_to_assess_their_greenhouse_gas_emissions_and_energy_consumption.")
            }}
          </h1>
          <ul
            style="
              font-size:large;
              padding-inline-start:20px;
            "
          >
            <li>{{translate("Perfect_for_climate_reporting_needs")}}</li>
            <li>{{translate("Overview_of_system-wide_greenhouse_gas_emissions")}}</li>
            <li>{{translate("IPCC-2019_compliant_and_open-source")}}</li>
          </ul>

          <div style="width:400px">
            <button class="start" onclick="ecam.show('select_scenario')">
              {{translate("Start_your_assessment")}}
            </button>
            <div style="text-align:center;margin-top:1em;">
              <label>
                <input type=checkbox v-model="include_tutorial_tips">
                {{translate("Include_tips_for_new_users")}}
              </label>
            </div>
          </div>
        </div>
        <div>
          <img
            src="frontend/img/landing/water_cycle.svg"
            style="width:600px"
          >
        </div>
      </div>

      <!--learn more-->
      <div class="container">
        <h1 style="text-align:center">
          {{translate("Learn_more_about_the_project")}}
        </h1>
        <div
          style="
            display:grid;
            grid-template-columns:30% 30% 30%;
            grid-gap:5%;
          "
        >
          <div class=learn_more_item onclick="window.open('https://github.com/icra/ecam')">
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
              <b>{{translate("Open_source")}}</b>
              <img class=icon src="frontend/img/landing/open-source.png">
            </div>
            <p>
              {{
                translate("ECAM_is_a_free_and_open_source_tool._The_source_code_is_openly_published_for_use_and_modification_on_GitHub.")
              }}
            </p>
            <a>{{translate("Click_here_to_access_GitHub")}}</a>
          </div>

          <div class=learn_more_item onclick="ecam.show('about')">
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
              <b>{{translate("About_ECAM")}}</b>
              <img class=icon src="frontend/img/landing/about.webp">
            </div>
            <p>
              {{translate("ECAM's_web_interface_and_content_were_developed_jointly_by_ICRA,_GIZ_and_IWA.")}}
            </p>
            <a>{{translate("Click_here_to_learn_more")}}</a>
          </div>

          <div class=learn_more_item onclick="window.open('https://climatesmartwater.org')">
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
              <b>WaCCliM</b>
              <img class=icon src="frontend/img/landing/wacclim.png">
            </div>
            <p>
            {{
            translate("ECAM_was_developed_as_part_of_WaCCliM,_a_project_that_supports_water_and_wastewater_utilities_to_become_climate-smart.")
            }}
            </p>
            <a>{{translate("Click_here_to_access_wacclim.org")}}</a>
          </div>
        </div>
      </div>

      <!--questions-->
      <div id=questions>
        <div>
          {{translate("Do_you_have_questions_or_feedback?")}}
        </div>
        <button
          style="
            color:white;
            border-color:white;
            margin-top:10px;
          "
          onclick="window.open('https://github.com/icra/ecam/issues')"
        >ECAM's GitHub page</button>
      </div>

      <!--logos-->
      <footer>
        <!--creative commons image and text-->
        <div>
          <div>
            {{translate("ECAM_is_a_tool_developed_by_ICRA_for_the_WaCCliM_Project_and_holds_a_Creative_Commons_Attribution-ShareAlike_4.0_International_License.")}}
          </div>
          <div style="font-size:smaller;margin-top:10px">
            {{translate("WaCCliM_is_a_joint_initiative_between_GIZ_and_IWA._This_project_is_part_of_the_International_Climate_Initiative_(IKI)._The_German_Federal_Ministry_for_the_Environment,_Nature_Conservation_and_Nuclear_Safety_(BMU)_supports_this_initiative_on_the_basis_of_a_decision_adopted_by_the_German_Bundestag.")}}
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
