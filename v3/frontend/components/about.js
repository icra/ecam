let about = new Vue({
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
      <h1 style=text-align:center>
        {{translate('about')}}
      </h1>

      <!--paragraph-->
      <div style=margin:auto;max-width:40%;text-align:justify;line-height:2em>
        <p>
          The web interface and new features for the ECAM tool were developed by
          <a target=_blank href='http://www.icra.cat/'>ICRA</a>,
          <a target=_blank href='http://www.iwa-network.org'>IWA</a>, and
          <a target=_blank href='https://www.giz.de/en/html/index.html'>GIZ</a> under the
          <a target=_blank href='http://www.iwa-network.org/WaCCliM/es/'>WaCCliM project</a>.
        </p>

        <p>
          This tool was first developed within the project in 2015 as an Excel tool by the consortium Urban Water Commons
          (<a target=_blank href='http://www.lnec.pt/pt/'>LNEC</a> and
          <a target=_blank href='http://www.ita.upv.es/index-es.php'>ITA, Universitat Politècnica de València)</a> in collaboration with
          <a target=_blank href='http://www.cobaltwater-global.com/'>Cobalt Water Global</a>.
          The Excel tool laid the foundation and basic equations for the web-tool.
        </p>

        <p>
          WaCCliM project is part of the <a target=_blank href="https://www.international-climate-initiative.com/">International Climate Initiative (IKI)</a>.
          The German Federal Ministry for the Environment, Nature Conservation,
          Building and Nuclear Safety (BMU) supports this initiative on the basis of a decision adopted by the German Bundestag.
        </p>

        <p>
          This software is free and <a href=https://github.com/icra/ecam>open source</a>.
        </p>

        <p>
          2015-{{(new Date()).getFullYear()}} <a href='license.txt'>{{translate('about_license')}}</a>.
        </p>
      </div>

      <div style="background:#ccc">
        <h3 style=padding-left:0>Special acknowledgements</h3>

        <p>
          <div>
            ECAM tool is the result of a collaborative effort. WaCCliM project team thanks:
          </div>
          <ul>
            <li>Members of the WaCCliM Taskforce and WaCCliM Expert pool for
            their voluntary contribution, providing scientific input and
            peer-review of ECAM.</li>
            <li>REaCH project (CTM2015-66892-R (MINECO/FEDER, UE), funded by the
            Spanish Ministry of Economy and Competitiveness and FEDER, for their
            support to ICRA.</li>
            <li>Technical support by Komptenzzentrum Wasser Berlin gGmbH.</li>
          </ul>
        </p>

        <img class="license_img license_img-big" src="frontend/img/CC_license_big.png" alt="">

        <br><br>

        ECAM by IWA and GIZ, implemented by ICRA for WaCCliM Project* is licensed under
        a <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>. Based on a work
        at <a target="_blank" href="www.wacclim.org">www.wacclim.org</a>. Permissions beyond the scope of this license may be available
        at <a target="_blank" href="mailto:wacclim@giz.de">wacclim@giz.de</a>.
      </div>

      <div>
        footer
      </div>
    </div>
  `,

  style:`
    <style>
      #about{
      }
    </style>
  `,
});
