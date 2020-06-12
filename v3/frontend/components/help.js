let help = new Vue({
  el:"#help",

  data:{
    visible:false,
  },

  methods:{
    translate,
  },

  template:`
    <div id=help v-if="visible">
      <h1 style=text-align:center>
        <span onclick="ecam.show('landing')">Start</span>
        &rsaquo;
        <span style=color:black>{{translate('help')}}</span>
      </h1>

      <h4><b>ECAM v3 docs</b></h4>

      <h4><b>ECAM v2 docs</b></h4>
      <table style=margin:auto>
        <tr>
          <td><a target=_blank href="frontend/docs/help_pdf/ECAM V2 FAQ_Aug2017.pdf">Frequently Asked Questions (pdf)</a></td>
        </tr>
        <tr>
          <td><a target=_blank href="frontend/docs/help_pdf/ECAM-Methodology-Guide-Jan-2019.pdf">Methodology (pdf)</a></td>
        </tr>
        <tr>
          <td><a target=_blank href="frontend/docs/help_pdf/ECAM_2.0_Manual_170822.pdf">Manual (pdf)</a></td>
        </tr>
        <tr>
          <td><a target=_blank href="frontend/docs/help_pdf/ECAMV2 Example.json" download>Example json file (json)</a></td>
        </tr>
      </table>

      <h4><b>Screencasts</b></h4>
      <a href="https://vimeopro.com/iwahq/tutorials-ecam-tool" target=_blank>https://vimeopro.com/iwahq/tutorials-ecam-tool</a>

      <img
        id=logo-wacclim
        src="frontend/img/logo-wacclim_big.png"
        style="display:block;height:120px;margin:1em auto"
      >
    </div>
  `,
});
