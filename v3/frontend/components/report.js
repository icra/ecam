let report = new Vue({
  el:"#report",

  data:{
    visible:false,
  },

  methods:{
  },

  template:`
    <div id=report v-if="visible">
      <h1 style="text-align:center">Report (in development)</h1>

      <div style="
        display:grid;
        grid-template-columns:50% 50%;
      ">
        <div>
          <embed src="dev/report_disseny.pdf" width="100%" height="2100px">
        </div>
        <div>
          implementation here
        </div>
      </div>

    </div>
  `,
});
