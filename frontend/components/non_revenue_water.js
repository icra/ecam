let non_revenue_water = new Vue({
  el:"#non_revenue_water",
  data:{
    visible:false,
    Languages,
  },

  methods:{
    translate,
  },

  template:`
    <div id=non_revenue_water v-if="visible && Languages.ready">
      <!--title-->
      <h1 style="text-align:center">{{translate('About non revenue water')        }}</h1>
      <h3 style="text-align:center;margin-top:0">{{translate('Water injected to distribution') }}</h3>

      <!--table-->
      <table border=1 style="margin:auto">
        <tr class=nrw><td rowspan=17>{{translate("System input volume")}}</td></tr>
          <tr><td rowspan=8>{{translate("Authorised consumption")}}</td></tr>
            <tr class=nrw><td rowspan=4>{{translate("Billed authorised consumption")}}</td></tr>
              <tr class=nrw>
                <td>{{translate("Billed water exported")}}</td>
                <td rowspan=3> {{translate("Revenue water")}}</td>
              </tr>
              <tr class=nrw><td>{{translate("Billed metered consumption")}}</td></tr>
              <tr class=nrw><td>{{translate("Billed unmetered consumption")}}</td></tr>
            <tr class=rw><td rowspan=3>{{translate("Unbilled authorised consumption")}}</td></tr>
              <tr class=rw>
                <td>{{translate("Unbilled metered consumption")}}</td>
                <td rowspan=10>{{translate("Non-revenue water")}}</td>
              </tr>
              <tr class=rw><td>{{translate("Unbilled unmetered consumption")}}</td></tr>
          <tr> <td rowspan=8>{{translate("Water losses")}}</td></tr>
            <tr class=rw><td rowspan=3>{{translate("Apparent losses")}}</td></tr>
              <tr class=rw><td>{{translate("Unauthorized consumption")}}</td></tr>
              <tr class=rw><td>{{translate("Customer meter inaccuracies and data handling errors")}}</td></tr>
            <tr class=rw><td rowspan=4>{{translate("Real losses")}}</td></tr>
              <tr class=rw><td>{{translate("Leakage on transmissions and distribution mains")}}</td></tr>
              <tr class=rw><td>{{translate("Leakage and overflows at storage tanks")}}</td></tr>
              <tr class=rw><td>{{translate("Leakage on service connections up to point of customer meter")}}</td></tr>
      </table>

      <p style="text-align:center">
        <code>
          Lambert, A. O. y Hirner, W., Losses from Water Supply Systems: Standard Terminology and
          Recommended Performance Measures. International Water Association, 2000.
        </code>
      </p>
    </div>
  `,

  style:`
    <style>
      #non_revenue_water table td {
        border-color:var(--color-level-Water);
        border-width:2px;
        font-family:Calibri;
        font-size:larger;
      }
      #non_revenue_water table td[rowspan] {
        font-weight:bold;
      }
      #non_revenue_water tr.nrw { background:#ddeefa; }
      #non_revenue_water tr.rw  { background:#f3fafe; }
    </style>
  `
});
