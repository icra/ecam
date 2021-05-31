let faqs = new Vue({
  el:'#faqs',
  data:{
    visible:false,
    Languages,

    questions:[
      {
        q:"How do I start an assessment?",
        a:[
          'Click on "Start your assessment".',
          'Choose a name for your assessment e.g. "Utility X 2020".',
          'Select the assessment period. This input will be the basis for the calculations.',
          'Select the country the utility is located in.',
          'If needed, adapt values of emission factor for grid electricity, annual protein consumption per capita or BOD5 generation.',
          'Click on "Access inventory" to insert your input data.',
        ],
        img:"frontend/img/faqs/how-do-i-start-an-assessment.gif",
      },
    ],
  },
  methods:{
    translate,
  },
  template:`
    <div id=faqs v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        Frequently Asked Questions
      </h2>

      <div style="width:50%;margin:auto">
        <details v-for="obj in questions">
          <summary>{{obj.q}}</summary>
          <div v-if="obj.a.constructor===Array">
            <ol>
              <li v-for="item in obj.a" class=step>
                <span v-html="item.prettify()"></span>
              </li>
            </ol>
          </div>
          <div v-else>{{obj.a}}</div>

          <div v-if="obj.img">
            <img :src="obj.img">
          </div>
        </details>
      </div>
    </div>
  `,

  style:`
    <style>
      #faqs details summary {
        font-size:larger;
        cursor:pointer;
        margin-top:1em;
      }
      #faqs ol li.step {
        margin-bottom:10px;
      }
    </style>
  `,
});
