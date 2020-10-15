Vue.component('summaries',{
  template:`
    <div id=summaries>
      <div
        style="
          background:white;
          border-bottom:1px solid #ccc;
          display:flex;
          font-weight:bold;
          padding-bottom:4px;
          padding-left:4em;
          padding-top:2em;
          text-align:center;
        "
      >
        <div :style=summary_item :selected="current_view=='summary_ghg'">
          <a href=# onclick="ecam.show('summary_ghg')">
            GHG emmissions
          </a>
        </div>
        <div :style=summary_item :selected="current_view=='report'">
          <a href=# onclick="ecam.show('report')">
            Report
          </a>
        </div>
      </div>
    </div>
  `,

  data(){
    return{
      //css summaries item
      summary_item:{
        padding:"0 1em",
      },
    };
  },

  props:[
    'current_view',
  ],
});
