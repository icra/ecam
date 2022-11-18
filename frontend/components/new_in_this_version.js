let new_in_this_version = new Vue({
  el:'#new_in_this_version',
  data:{
    visible:false,
    Languages,
    Global,
  },
  methods:{
    translate,
  },
  template:`
    <div id=new_in_this_version v-if="visible && Languages.ready">
      <h1 style="padding-left:0">
        New in version {{Global.General.version}}
      </h1>

      <div>
        <b style="font-size:larger">
          Modified user interface
        </b>

        <p>
          The reason why we have changed the user interface was to make ECAM more
          <b>user-friendly</b> and <b>easy-to-use</b>. To achieve this, there are
          some major changes that have been applied to the user interface of
          ECAM:
        </p>

        <ul>
          <li>
            <b>Landing page</b>: From here, you can easily "Start your
            assessment" to evaluate your utility's energy performance or
            CO<sub>2</sub> footprint. Further, you can activiate "Tips for new
            users" to include pop-ups that gudie you through the tool. The new
            navigation bar is placed on the top and includes the pages:
              <b>Configuration</b>,
              <b>Inventory</b>,
              <b>Results</b>,
              <b>Compare assessments</b>
              and
              <b>More</b>.
            <img src="frontend/img/new_in_this_version/122024708-f7d4be00-cdc8-11eb-9ffd-c1d638bdc397.webp">
          </li>
          <li>
            <b>Configuration</b>: One of the biggest changes that we applied to
            ECAM is the possibility to manage and edit several assessments in the
            tool. Until now, when you started assessing the greenhouse gas
            emissions or energy consumption of your utility in ECAM 2.2, the tool
            only allowed you to make one assessment at a time. Hence, only one
            assessment could be saved in a JSON file.

            <p>
              Now, to make things easier and more compact, the updated ECAM
              version allows the users to edit and save more than one
              assessment in a single JSON file.
              <img src="frontend/img/new_in_this_version/122030818-623c2d00-cdce-11eb-9150-ffc206e3ae92.webp">
            </p>

            <p>
              In addition, you can load a saved JSON file to continue your assessment
              or you can merge different JSON files into one file by using the button
              "Append to current list".
              <img src="frontend/img/new_in_this_version/122031047-9b749d00-cdce-11eb-9295-e74945ae6cfa.webp">
            </p>

            <p>
              Another novelty is the function "Load assessment from Excel file".
              <p>Steps:</p>
              <ol>
                <li>Download ECAM input template.</li>
                <li>Fill out template file.</li>
                <li>Upload filled file.</li>
              </ol>
            </p>
          </li>
        </ul>
      </div><hr>

      <div>
        <b style="font-size:larger">
          Urban water cycle stages
        </b>

        <ul>
          <li>
            <b>Inventory</b>: To evaluate your CO<sub>2</sub> footprint or energy
            performance, you must insert the required input data for the systems
            (<b>Water supply</b> and <b>Sanitation</b>) and respective stages
            (<b>Abstraction</b>,
            <b>Treatment</b>,
            <b>Distribution</b>,
            <b>Collection</b>,
            <b>Treatment</b> and
            <b>Onsite sanitation</b>)
            that you would like to assess.
            <img src="frontend/img/new_in_this_version/122032443-eba02f00-cdcf-11eb-82ff-29566dee84cf.webp">
          </li>
          <li>
            <b>Faecal sludge management</b>: Users who worked with the feacal
            sludge management (FSM) component in ECAM 2.2 might have realized
            that we have applied major changes here. Now, FSM falls under
            "Onsite sanitation". The inputs almost completely remained the
            same.
          </li>
        </ul>
      </div><hr>

      <div>
        <b style="font-size:larger">
          Compare assessments
        </b>
        <p>
          The option "Compare assessments" allows the user to compare assessments
          of different time periods or different utilities. You can visualize the
          greenhouse gas emissions and energy consumption in different ways:
        </p>
        <ul>
          <li>
            Total GHG emissions
            <img src="frontend/img/new_in_this_version/122194162-79921d80-ce95-11eb-82ac-0c06f8428784.webp">
          </li>
          <li>
            Emissions by gas (CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>)
            <img src="frontend/img/new_in_this_version/122194970-397f6a80-ce96-11eb-8562-a1572e40efcb.webp">
          </li>
          <li>
            Emissions by stage in bar charts
            <img src="frontend/img/new_in_this_version/122195201-6e8bbd00-ce96-11eb-94ca-29412b11f8b3.webp">
          </li>
          <li>
            Emissions by IPCC category
            <img src="frontend/img/new_in_this_version/122194768-05a44500-ce96-11eb-8472-83a8445327c7.webp">
          </li>
          <li>
            Total energy consumption
            <img src="frontend/img/new_in_this_version/122194825-15238e00-ce96-11eb-9a2e-c2839ab6f8ad.webp">
          </li>
        </ul>
      </div><hr>

      <div>
        <b style="font-size:larger">
          Reporting function
        </b>

        <p>
          You can download the <b>assessment that you are currently editing</b>
          as a PDF file.  You just have to click on "<b>Results</b>" in the
          navigation bar and select "<b>Report</b>". This report includes all
          the inputs and outputs as well as diagrams of your assessment.
          <img src="frontend/img/new_in_this_version/122065358-2adf7780-cdf2-11eb-9e1c-1a350e579e2b.webp">
        </p>

        <p>
          Use the <b>sankey diagram</b> to visualize the emission flow path:
          <img src="frontend/img/new_in_this_version/122197667-b7447580-ce98-11eb-85b3-d45c6448232a.webp">
        </p>
      </div><hr>

      <div>
        <b style="font-size:larger">
          2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse
          Gas Inventories
        </b>
        <p>
          The world has committed to reducing greenhouse gas emissions to tackle
          climate change. IPCC's inventory guidelines enable all countries to
          estimate levels and trends of greenhouse gas emissions. Even though the
          IPCC Guidelines were first published in 2006, they continue to provide
          a technically sound methodolgical basis for preparing national
          greenhouse gas inventories. The 2019 Refinement updates and supplements
          the 2006 IPCC Guidelines.  ECAM 3.0 takes into account emission factors
          and other parameters that have been updated in the 2019 Refinement.
          Notable changes can be found in the guidance on CH<sub>4</sub> and
          N<sub>2</sub>O emissions from wastewater.
        </p>
      </div><hr>

      <div>
        <b style="font-size:larger">
          Programming language
        </b>
        <p>
          ECAM 3.0 is 100% coded in JavaScript. Original PHP language has been
          entirely replaced, this way the tool can run 100% in the user-side,
          without needing a server storing session information. This way,
          deploying an instance of ECAM using any web server program will work
          (e.g. Apache, Nginx). NodeJS is also not required.
        </p>
      </div>
    </div>
  `,

  style:`
    <style>
      #new_in_this_version{
        margin:auto;
        padding-left:2em;
        padding-right:1em;
        text-align:justify;
        width:80%;
      }
      #new_in_this_version img{
        display:block;
        margin:10px 0;
        box-shadow:rgb(204, 204, 204) 0px 0px 5px;
        max-width:100%;
      }
    </style>
  `,
});
