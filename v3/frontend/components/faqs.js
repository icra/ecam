let faqs = new Vue({
  el:'#faqs',
  data:{
    visible:false,
    Languages,

    current_faq:{
      category:false,
      index:-1,
    },
    categories:{
      "general" : "General questions",
      "ecam"    : "ECAM-related questions",
    },

    questions:[
      {
        q:"What is the 'Global Warming Potential' (GWP)?",
        a:`The Global Warming Potential (GWP) allows comparisons of the global warming
        impacts of different gases. It is a measure of how much energy the emissions of
        1 ton of a gas will be absorbed over a given period of time. The foundation of
        this is the potential of carbon dioxide to absorb heat, which is standardized
        to the value “1”, whereas the other gases are compared to carbon dioxide. The
        larger the GWP, the more the gas warms the Earth compared to CO2 over that time
        period. The IPCC will update the GWP values they use according to updated
        scientific estimates of the energy absorption or lifetime of the gases.`,
        link:{
          onclick:function(){ecam.show("gwp_table")},
          text:"More info",
        },
        category:"general",
      },
      {
        q:"What are 'Climate-Carbon Feedbacks' (CCF)?",
        a:`The Climate-Carbon Feedback (CCF) refers to the effect that a changing climate
          has on the carbon cycle, which impacts atmospheric CO2 and turn changes the
          climate further. In concrete terms: when CO2 is emitted, the atmospheric CO2
          pool increases. A fraction of this excess atmospheric CO2 is taken up by the
          ocean and the terrestrial biosphere (the “carbon sinks”), but as long as a part
          of the excess CO2 stays in the atmosphere, it warms the climate. In turn, this
          warming climate slows down the uptake of the atmospheric CO2 by the sinks. This
          slowing-down constitutes a positive feedback – i.e. a warming climate is warmed
          further through the feedback.
        `,
        link:{
          href:"https://www.researchgate.net/publication/340503493_Carbon_and_Other_Biogeochemical_Cycles",
          text:"Ciais et al., 2013",
        },
        category:"general",
      },
      {
        q:"Do all energy sources result in carbon emissions?",
        a:`No. Renewable sources of electricity such as hydropower, wind and solar are
        carbon-free. The emission factor for grid electricity measures the kilograms
        (kg) of carbon dioxide (CO2) emitted per kWh of electricity generated from
        fossil fuels per IPCC guideline (2006). The emission factors for electricity
        delivered to customers from a mix of generation sources usually take into
        account the average annual contribution of the different sources (from fossil
        fuels and renewables).`,
        category:"general",
      },
      {
        q:"What is biogas valorisation?",
        a:[
          `
            Biogas consists primarily of methane (CH4; typically between 50-75%) and carbon
            dioxide (CO2). These gases are produced during anaerobic digestion; the formula
            below shows the chemical reaction that takes place in an anaerobic digester:
          `,
          `C6H12O6 → 3CO2 + 3CH4`,
          `
            The released gases can be used as fuel. With gas engines, the biogas
            can be converted to electricity and heat, so that the wastewater
            treatment plant can produce its own energy. This process is called
            biogas valorisation; it is the transformation of biomass to valuable
            materials and energy. Throughout this process it is possible to
            create energy neutral or even energy friendly wastewater treatment
            facilities.
          `,
        ],
        category:"general",
      },
      {
        q:"What is an ‘Emission Factor' (EF)?",
        a:`
          The emission factor is a coefficient to convert e.g. the consumption of grid
          electricity into GHG emissions (kgCO2/kWh), which will be associated with each
          unit of electricity provided by an electricity system. It is a parameter to
          determine the baseline emissions.
        `,
        category:"general",
      },

      {
        q:"What is ECAM?",
        a:[
          `The “Energy Performance and Carbon Emissions Assessment and Monitoring Tool”
          (ECAM) offers unique capabilities for assessing greenhouse gas emissions and
          energy consumption at a system-wide level. Gain greater insights by identifying
          areas to reduce greenhouse gas emissions, increase energy savings and improve
          overall efficiencies to reduce costs.`,
          `ECAM was developed by the Catalan Institute for Water Research (ICRA) within
          the scope of the project “Water and Wastewater Companies for Climate
          Mitigation” (WaCCliM), a joint initiative between the Deutsche Gesellschaft für
          Internationale Zusammenarbeit (GIZ) GmbH and the International Water
          Association (IWA). WaCCliM is part of the International Climate Initiative
          (IKI). The German Federal Ministry for the Environment, Nature Conservation and
          Nuclear Safety (BMU) supports this initiative on the basis of a decision
          adopted by the German Bundestag.`,
        ],
        category:"ecam",
      },
      {
        q:"Who should use ECAM?",
        a:`ECAM is meant for water and wastewater utility managers,
        technicians, consultants, climate change experts, academics and
        policy makers working on issues regarding water, energy and climate
        change. ECAM may be used by anyone who is interested in assessing an
        utility's energy performance and greenhouse gas emissions to identify
        areas of improvement.`,
        category:"ecam",
      },
      {
        q:"Do I need to register to use ECAM?",
        a:`No. ECAM is free and can be accessed by anybody without registration. No
        information is stored on servers. All data inserted is processed locally and
        only stored on your computer during the assessment.`,
        category:"ecam",
      },
      {
        q:"How do I start an assessment?",
        steps:true,
        a:[
          'Click on "Start your assessment".',
          'Choose a name for your assessment e.g. "Utility X 2020".',
          'Select the assessment period. This input will be the basis for the calculations.',
          'Select the country the utility is located in.',
          `
            If needed, adapt values of emission factor for grid electricity,
            annual protein consumption per capita or BOD5 generation.
          `,
          'Click on "Access inventory" to insert your input data.',
        ],
        img:"frontend/img/faqs/how-do-i-start-an-assessment.gif",
        category:"ecam",
      },
    ],
  },

  methods:{
    translate,
    set_current_faq(category,index){
      if(
        this.current_faq.category == category &&
        this.current_faq.index    == index
      ){
        this.current_faq.category=false;
        this.current_faq.index=-1;
      }else{
        this.current_faq.category=category;
        this.current_faq.index=index;
      }
    },
  },

  template:`
    <div id=faqs v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        Frequently Asked Questions
      </h2>

      <div
        style="
          display:grid;
          width:70%;
          grid-template-columns:50% 50%;
          margin:auto;
        "
      >
        <div
          v-for="category,i in Object.keys(categories)"
          style="
            padding:5px;
            margin-right:5px;
            border:1px solid #ddd;
          "
        >
          <div
            style="
            "
          >
            <b>{{categories[category]}}</b>
          </div>

          <div v-for="obj,i in questions.filter(q=>q.category==category)">
            <!--question-->
            <div
              @click="set_current_faq(category,i)"
              class=question
            >
              <div :style="{transform:(current_faq.category!=category || current_faq.index!=i)?'rotate(-90deg)':''}">▼</div>
              <div class=text v-html="obj.q.prettify()"></div>
            </div>
            <!--answer-->
            <transition name="fade">
            <div v-if="current_faq.category==category && current_faq.index==i" class=answer>
              <div v-if="obj.a.constructor===Array">
                <ol v-if="obj.steps">
                  <li v-for="item in obj.a" class=step>
                    <span v-html="item.prettify()"></span>
                  </li>
                </ol>
                <div v-if="!obj.steps">
                  <p
                    v-for="item in obj.a"
                    v-html="item.prettify()"
                  ></p>
                </div>
              </div>
              <div v-else>
                <p v-html="obj.a.prettify()"></p>
              </div>

              <div v-if="obj.img">
                <img :src="obj.img" style="width:100%;border:1px solid #ccc;box-shadow:0 0 5px #ccc">
              </div>

              <div v-if="obj.link">
                <a
                  v-if="obj.link.href"
                  :href="obj.link.href"
                  target=_blank
                  v-html="obj.link.text.prettify()"
                ></a>

                <a
                  v-if="obj.link.onclick"
                  href="#"
                  @click="obj.link.onclick()"
                  v-html="obj.link.text.prettify()"
                ></a>
              </div>
            </div>
            </transition>
          </div>
        </div>
      </div>

    </div>
  `,

  style:`
    <style>
      #faqs div.question {
        display:flex;
        align-items:center;
        font-size:larger;
        cursor:pointer;
        margin-top:1em;
      }
      #faqs div.question div.text {
        margin-left:5px;
      }
      #faqs div.question:hover div.text {
        text-decoration:underline;
      }
      #faqs div.answer {
        background:var(--color-level-generic-background);
        padding:1em;
        text-align:justify;
      }
      #faqs div.answer ol li.step {
        margin-bottom:10px;
      }
    </style>
  `,
});
