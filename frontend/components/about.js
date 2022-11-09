let about=new Vue({
  el:'#about',
  data:{
    visible:false,
    Languages,
  },
  methods:{
    translate,
  },

  template:`
    <div id=about v-if="visible && Languages.ready">
      <div style="background:#eff5fb;">
        <!--title-->
        <h1>{{translate("About_ECAM")}}</h1>
        <!--image with text-->
        <div style="
          background-image:url('frontend/img/about/laptop.png');
          background-size:contain;
          background-repeat:no-repeat;
          color:white;
          font-size:large;
          padding:3em 3em;
          height:200px;
        ">
          <div style="width:50%;">
            <div style="font-size:30px">
              <b>ECAM v3.0</b>
            </div><br>
            <div style="font-size:14px">
              {{translate('navbar_title')}}
            </div><br>
            <div style="font-size:12px">
              {{translate("ECAM is a cornerstone of the WaCCliM approach.")}}
            </div>
          </div>
        </div>

        <!--paragraphs under image-->
        <div style="max-width:1013px">
          <div>
            <p>
              {{translate("The 'Energy Performance and Carbon Emissions Assessment and Monitoring Tool' (ECAM) offers unique capabilities for assessing greenhouse gas emissions and energy consumption at a system-wide level. Gain greater insights by identifying areas to reduce greenhouse gas emissions, increase energy savings and improve overall efficiencies to reduce costs.")}}
            </p>
            <p>
              {{translate("ECAM was developed by the Catalan Institute for Water Research (ICRA) within the scope of the project 'Water and Wastewater Companies for Climate Mitigation' (WaCCliM), a joint initiative between the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH and the International Water Association (IWA).  WaCCliM is part of the International Climate Initiative (IKI). The German Federal Ministry for the Environment, Nature Conservation and Nuclear Safety (BMU) supports this initiative on the basis of a decision adopted by the German Bundestag.")}}
            </p>
            <p>
              {{translate("The first version of this tool was developed in 2015 as an Excel tool by the consortium Urban Water Commons (LNEC and ITA, Universitat Politècnica de València) in collaboration with Cobalt Water Global. The Excel version laid the foundation and basic equations for the web-tool.")}}
            </p>
            <p>
              {{translate("ECAM is free and open source")}} (2015-{{(new Date()).getFullYear()}}
              <a target=_blank href='LICENSE'>{{translate('about_license')}}</a>).
            </p>

            <p>
              {{translate("Links")}}:
              <a target=_blank href='http://www.icra.cat/'>ICRA</a> |
              <a target=_blank href='http://www.iwa-network.org'>IWA</a> |
              <a target=_blank href='https://www.giz.de/en/html/index.html'>GIZ</a> |
              <a target=_blank href='https://climatesmartwater.org'>Climate smart water website</a> |
              <a target=_blank href='http://www.lnec.pt/pt/'>LNEC</a> |
              <a target=_blank href='http://www.ita.upv.es/index-es.php'>ITA, Universitat Politècnica de València</a> |
              <a target=_blank href='http://www.cobaltwater-global.com/'>Cobalt Water Global</a> |
              <a target=_blank href="https://www.international-climate-initiative.com/">International Climate Initiative (IKI)</a>
            </p>
          </div>

          <!--icons-->
          <div style="
            display:grid;
            grid-template-columns:30% 30% 30%;
            grid-gap:5%;
            margin-top:30px;
          ">
            <div style="text-align:center">
              <img class=icon src="frontend/img/about/chart.svg"><br>
              <b>{{translate("Based on IPCC")}}</b>
              <p style="text-align:left">
                {{translate("ECAM was developed to be consistent with the IPCC Guidelines for National Greenhouse Gas Inventories and peer-reviewed literature.")}}
              </p>
            </div>
            <div style="text-align:center">
              <img class=icon src="frontend/img/about/wrench.svg"><br>
              <b>{{translate("Free and Open Source")}}</b>
              <p style="text-align:left">
                {{translate("ECAM can be freely used, copied or changed. Its source code is openly available on GitHub. We encourage people to improve or make suggestions on how to improve the tool.")}}
              </p>
            </div>
            <div style="text-align:center">
              <img class=icon src="frontend/img/about/lock.svg"><br>
              <b>{{translate("Secure")}}</b>
              <p style="text-align:left">
                {{translate("ECAM is secure and trustworthy. No information is stored on servers. All data inserted and processed during the ECAM assessment are merely on your personal computer.")}}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--FAQs link-->
      <div>
        <button onclick="ecam.show('faqs')"
          style="
            width:400px;
            color: white;
            background-image: url(frontend/img/more/btn-bg.png);
            background-size: cover;
            text-align: center;
            padding: 2em;
            border: none;
            border: 3px solid white;
          "
        >{{translate("FAQs")}}</button>
      </div>

      <!--special acknowledgements-->
      <div style="max-width:1013px">
        <h1 style="padding-left:0">
          {{translate("Special acknowledgements")}}
        </h1>
        <p>
          <div>
            {{translate("ECAM tool is the result of a collaborative effort. WaCCliM project team thanks:")}}
          </div>
          <ul>
            <li>
              {{translate("Members of the WaCCliM taskforce.")}}
            </li>
            <li>
              {{translate("Water professionals with their their voluntary contribution, providing scientific input and peer-review of ECAM.")}}
            </li>
            <li>
              {{translate("REaCH project (CTM2015-66892-R (MINECO/FEDER, UE), funded by the Spanish Ministry of Economy and Competitiveness and FEDER, for their support to ICRA.")}}
            </li>
          </ul>
        </p>
        <div style="display:flex;align-items:center;">
          <div><img src="frontend/img/CC_license_big.png" alt=""></div>
          <div style="margin-left:20px">
            ECAM by IWA and GIZ, implemented by ICRA for WaCCliM Project* is licensed under
            a <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>. Based on a work
            at WaCCliM project.
          </div>
        </div>
      </div>
    </div>
  `,
  style:`
    <style>
      #about > div {
        padding:2em 6em;
        text-align:justify;
        line-height:2em;
      }
      #about > div > h1 {
        padding-left:0;
        font-weight:bold;
      }
      #about img.icon {
        display:block;
        margin:auto;
        height:46px;
      }
    </style>
  `,
});
