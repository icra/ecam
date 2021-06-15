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
      <h1 style="padding-left:0">New in version {{Global.General.version}}</h1>

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
            <b>Landing page</b>: From here, you can easily "Start your assessment" to
            evaluate your utility's energy performance or CO<sub>2</sub> footprint. Further, you
            can activiate "Tips for new users" include pop-ups that gudie you through
            the tool. The new navigation bar is placed on the top and includes the
            pages:
              <b>Configuration</b>,
              <b>Inventory</b>,
              <b>Results</b>,
              <b>Compare assessments</b>
              and 
              <b>More</b>.
            <img src="frontend/img/new_in_this_version/122024708-f7d4be00-cdc8-11eb-9ffd-c1d638bdc397.png">
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
              version allows the users to edit more than one assessment or save
              numerous assessments in one JSON file.
              <img src="frontend/img/new_in_this_version/122030818-623c2d00-cdce-11eb-9150-ffc206e3ae92.png">
            </p>

            <p>
              In addition, you can load a saved JSON file to continue your assessment
              or you can merge different json files into one file by using the button
              "Append to current list".
              <img src="frontend/img/new_in_this_version/122031047-9b749d00-cdce-11eb-9295-e74945ae6cfa.png">
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
            (<b>Water supply</b> and <b>Sanitation</b>) and respective stages (<b>Abstraction</b>,
            <b>Treatment</b>,
            <b>Distribution</b>,
            <b>Collection</b>,
            <b>Treatment</b> and
            <b>Onsite sanitation</b>)
            that you would like to assess.
            <img src="frontend/img/new_in_this_version/122032443-eba02f00-cdcf-11eb-82ff-29566dee84cf.png">
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
          <li>Overview of inputs &amp; outputs</li>
          <li>Total GHG emissions</li>
          <li>Emissions by gas (CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>)</li>
          <li>Emissions by stage in bar charts</li>
          <li>Emissions by IPCC category</li>
          <li>Total energy consumption</li>
        </ul>
      </div><hr>

      <div>
        <b style="font-size:larger">
          Reporting function
        </b>

        <p>
          You can download the <b>assessment that you are currently editing</b>
          as PDF.  You just have to click on "<b>Results</b>" in the navigation
          bar and select "<b>Report</b>". This report includes all the inputs
          and outputs as well as diagrams of your assessment.
          <img src="frontend/img/new_in_this_version/122065358-2adf7780-cdf2-11eb-9e1c-1a350e579e2b.png">
        </p>
      </div><hr>
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
