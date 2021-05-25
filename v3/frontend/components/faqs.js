let faqs = new Vue({
  el:'#faqs',
  data:{
    visible:false,
    Languages,

    questions:[
      {q:"Question 1?", a:"Answer 1"},
      {q:"Question 2?", a:"Answer 2"},
      {q:"Question 3?", a:"Answer 3"},
    ],
  },
  methods:{
    translate,
  },
  template:`
    <div id=faqs v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        Frequent Asked Questions
      </h2>

      <div style="width:50%;margin:auto">
        <details v-for="obj in questions">
          <summary>{{obj.q}}</summary>
          <div>
            {{obj.a}}
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
    </style>
  `,
});
