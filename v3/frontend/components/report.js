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

      <div style="">
        <div style="text-align:center">
          <embed src="dev/report_disseny.pdf" width="80%" height="2100px">
        </div>
      </div>

    </div>
  `,
});
