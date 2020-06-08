let get_started = new Vue({
  el:"#get_started",

  data:{
    visible:false,
    Global,
  },

  methods:{
    translate,
  },

  template:`
    <div id=get_started v-if="visible">
      <h1 style=text-align:center>{{translate('getStarted_subtitle')}}</h1>

      <table style="margin:auto">
        <tr>
          <th>
            {{translate('getStarted_table_name')}}
          </th>
          <td>
            <input v-model="Global.Name">
          </td>
        </tr>
        <tr>
          <th>
            {{translate('getStarted_table_start')}}
          </th>
          <td>
            <input type=date v-model="Global.AssessmentPeriodStart">
          </td>
        </tr>
        <tr>
          <th>
            {{translate('getStarted_table_end')}}
          </th>
          <td>
            <input type=date v-model="Global.AssessmentPeriodEnd">
          </td>
        </tr>
        <tr>
          <th>{{translate('getStarted_table_period')}}</th>
          <td>{{Global.Days()}} {{translate('days')}}</td>
        </tr>
        <tr>
          <th>{{translate('currency')}}</th>
          <td>
            <div style="color:black;font-weight:bold">
              {{Global.Currency}}
            </div>
            {{translate('configuration_new_currency')}}:
            <input
              v-model="Global.Currency"
              size=3 maxlength=3 placeholder="ccc"
            >
          </td>
        </tr>
        <tr>
          <th>{{translate('getStarted_table_comments')}}</th>
          <td>
            <textarea
              v-model="Global.Comments"
              :placeholder="translate('getStarted_max_200')"
              rows=5 cols=50 maxlength=200
            ></textarea>
          </td>
        </tr>
      </table>

      <!--PREV&NEXT-->
      <div class=flex style="justify-content:center;margin-top:1em">
        <button class="button prev"
          onclick="event.stopPropagation();ecam.show('landing')">
          {{translate('previous')}}
        </button>
        <button class="button next"
          onclick="event.stopPropagation();ecam.show('configuration')">
          {{translate('next')}}
        </button>
      </div>
    </div>
  `,
});
