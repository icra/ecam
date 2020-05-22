let development=new Vue({
  el:"#development",

  data:{
    visible: true,
  },

  template:`
    <div id=development v-if="visible">
      <!--title--><h1 style=color:black>Development/debugging utilities for development</h1>
      <ul style="font-size:18px;">
        <li><a onclick="ecam.show('problems')">Problem finder</a></li>
        <li><a onclick="ecam.show('translation_problems')">Translation problems finder</a></li>
        <li><a onclick="ecam.show('validate_json')">Current JSON file validator</a></li>
        <li><a onclick="ecam.show('data_structure_viewer')">Data structure viewer</a></li>
        <li><a onclick="ecam.show('benchmarks')">Benchmarks summary</a></li>
        <li><a onclick="ecam.show('graphs')">Graphs summary</a></li>
      </ul>
    </div>
  `,
});

let problems=new Vue({
  el:"#problems",

  data:{
    visible:false,
    variable,

    Global,
    Formulas,
  },

  methods:{
    //get unused inputs
    //TODO search benchmarks also
    get_unused_inputs(obj){
      obj=obj||Global;
      let unused=[];

      for(let field in obj) {

        switch(typeof(obj[field])) {
          case 'number':
            let n=Formulas.outputs_per_input(field).length;
            if(n==0) unused.push(field);
            break;
          case 'object':
            //recursive call
            unused = unused.concat(this.get_unused_inputs(obj[field]));
            break;
        }

      }
      return unused;
    },
  },

  template:`
    <div id=problems v-if="visible">
      <!--title-->
      <h1>
        <a onclick="ecam.show('development')">Development</a>
        &rsaquo;
        Debugging utility
      </h1>

      <!--note: issues are in github-->
      <p style=text-align:center>
        This is an automatic problem finder.
        Issues (requests/bugs) are here:
        <a href='https://github.com/icra/ecam/issues'>github issues</a>
      </p>

      <ul>
        <li>
          not used inputs
          <table>
            <tr v-for="field in get_unused_inputs()">
              <td>
                <a @click="variable.view(field)">
                  {{field}}
                </a>
              </td>
            </tr>
          </table>
        </li>

        <li>questions: look for inexisting variables</li>
        <li>variables in Global not at Info</li>
        <li>variables at Info that are not in Global</li>
        <li>variables benchmarked not in Global</li>
        <li>repeated variables in questions</li>
        <li>not used constants</li>
      </ul>

    </div>
  `,
});

let translation_problems=new Vue({
  el:"#translation_problems",

  data:{
    visible:false,
  },

  template:`
    <div id=translation_problems>
      translation problem finder
    </div>
  `,

});

let validate_json=new Vue({
  el:"#validate_json",

  data:{
    visible:false,
  },

  template:`
    <div id=validate_json>
      validate json
      <!--current json-->include'currentJSON.php'
    </div>
  `,
});

let data_structure_viewer=new Vue({
  el:"#data_structure_viewer",

  data:{
    visible:false,
  },

  template:`
    <div id=data_structure_viewer>
      data_structure_viewer
    </div>
  `,
});

let benchmarks=new Vue({
  el:"#benchmarks",

  data:{
    visible:false,
  },

  template:`
    <div id=benchmarks>
      benchmarks
    </div>
  `,
});

let graphs=new Vue({
  el:"#graphs",

  data:{
    visible:false,
  },

  template:`
    <div id=graphs>
      graphs
    </div>
  `,
});

/*
*/
