let development=new Vue({
  el:"#development",
  data:{
    visible:false,
    details_default_open:false,

    Languages,
  },

  template:`
    <div id=development v-if="visible && Languages.ready">
      <!--title--><h1>Development</h1>
      <p style="padding-left:1em">
        Work in progress elements that are in development.
      </p>

      <ul>
        <li>
          <button onclick="ecam.show('ipcc_categories')">
            IPCC categories vs ECAM equations
          </button>
        </li>
        <li>
          <button onclick="ecam.show('help')">
            help section
          </button>
        </li>

        <li>
          <a onclick="ecam.show('problems')">
            Find problems related to inputs
          </a>
        </li>

        <li>
          <a href="https://ecamtranslator.icradev.cat" target=_blank>
            Ecam translator tool (external)
          </a>
        </li>

        <li>
          <button onclick="ecam.test()">
            Execute automated test
          </button>
        </li>

        <!--language tags not used-->
        <li>
          <details open>
            <summary>
              LANGUAGE tags not used for "<b>{{Languages.current}}</b>"
              ({{ Languages.find_not_used_tags().length }})
              <br>
              <b>important</b>: execute automated to detect unused tags
            </summary>
            <table>
              <tr v-for="tag in Languages.find_not_used_tags()">
                <td>
                  {{tag}}
                </td>
              </tr>
            </table>
          </details>
        </li>
      </ul>
    </div>
  `,

  style:`
    <style>
      #development {
        padding-left:1em;
      }
      #development ul li {
        padding-bottom:15px;
      }
    </style>
  `,
});
