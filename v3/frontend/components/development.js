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
        Functions for debugging during development and/or work in progress new pages.
      </p>

      <ul
        style="
          font-size:large;
          list-style:none;
        "
      >
        <li>
          <button onclick="ecam.show('ipcc_categories')">
            IPCC categories vs ECAM equations
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
        padding-bottom:20px;
      }
    </style>
  `,
});
