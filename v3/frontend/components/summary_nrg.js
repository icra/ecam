let summary_nrg = new Vue({
  el:"#summary_nrg",

  data:{
    visible:false,
    Global,
    Structure,
  },

  methods:{
    translate,
    format,
    go_to,
  },

  template:`
    <!--summary nrg VIEW-->
    <div id=summary_nrg v-if="visible">
      <summaries current_view=summary_nrg></summaries>

      <!--summary nrg title-->
      <h1 style="text-align:center;color:black">
        Energy summary is merged to GHG emissions summary
        <br>
        TODO remove this view
      </h1>
    </div>
  `,

  style:`
    <style>
      #summary_nrg {
        background:#f6f6f6;
      }
      #summary_nrg table {
        border-collapse:separate;
        border-spacing:3px;
      }
      #summary_nrg table th,
      #summary_nrg table td {
        border:none;
        background:white;
      }
      #summary_nrg div.l1_number_placeholder {
        font-weight:bold;
        background:white;
        padding:0.5em 0;
      }
      #summary_nrg div.l2_number_placeholder {
        font-weight:bold;
        padding:0.5em 0;
      }
    </style>
  `
});
