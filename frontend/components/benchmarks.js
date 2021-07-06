let benchmarks = new Vue({
  el:'#benchmarks',

  data:{
    visible:false,

    Benchmarks,
    Info,
    Languages,

    variable,
  },

  methods:{
    translate,
    get_base_unit,
  },

  template:`
    <div id=benchmarks v-if="visible && Languages.ready">
      <h1 style="padding-left:0">Benchmarks ({{Object.keys(Benchmarks).length}})</h1>
      <div>
        <table border=1>
          <tr v-for="[key,obj] in Object.entries(Benchmarks)">
            <td>
              <div>
                {{translate(key+'_descr')}}
              </div>
              <div>
                <a @click="variable.view(key)">{{key}}</a>
              </div>
            </td>
            <td>
              <div
                v-html="get_base_unit(key).prettify()"
              ></div>
            </td>
            <td>
              <details>
                <summary>formula</summary>
                <code><pre class="prettyprint">{{obj}}</pre></code>
              </details>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,

  updated(){
    document.querySelectorAll(".prettyprinted").forEach(el=>{
      el.classList.remove('prettyprinted');
    });
    this.$nextTick(function() {
      PR.prettyPrint();
    });
  },

  style:`
    <style>
      #benchmarks {
        padding:0 2em;
      }
      #benchmarks td {
        vertical-align:top;
      }
    </style>
  `,
});
