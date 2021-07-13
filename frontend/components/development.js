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
          <div
            style="
              display:grid;
              grid-template-columns:50% 50%;
            "
          >
            <div><details open>
              <summary>
                LANGUAGE tags not found
                ({{ Object.keys(Languages.not_found_tags).length }})
                <br>
                "tags attempted to translate"
                <button @click="Languages.not_found_tags={}">reset</button>
              </summary>
              <table>
                <tr v-for="tag in Object.keys(Languages.not_found_tags)">
                  <td>
                    {{tag}}
                  </td>
                </tr>
              </table>
            </details></div>
            <div><details open>
              <summary>
                LANGUAGE tags not used for "<b>{{Languages.current}}.json</b>" file
                ({{ Languages.find_not_used_tags().length }})
                <br>
                <b>important</b>: execute automated test first to visit all pages
                and detect unused tags
              </summary>
              <table>
                <tr v-for="tag in Languages.find_not_used_tags()">
                  <td>
                    {{tag}}
                  </td>
                </tr>
              </table>
            </details></div>
          </div>
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
      #development summary{
        cursor:pointer;
      }
    </style>
  `,
});
