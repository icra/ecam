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
        {{translate('help')}}
      </h1>

      <ul class=tabs>
        <li>
          Video tutorials
        </li>
        <li>
          Manuals and materials (pdf)
        </li>
        <li>
          FAQs
        </li>
      </ul>

      <div style="background:var(--color-level-generic-background)">
        TODO - in development

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

        <h4><b>Screencasts (v2)</b></h4>
        <a href="https://vimeopro.com/iwahq/tutorials-ecam-tool" target=_blank>https://vimeopro.com/iwahq/tutorials-ecam-tool</a>
      </div>

    </div>
  `,

  style:`
    <style>
      #help {
        text-align:center;
      }
    </style>
  `,
});
