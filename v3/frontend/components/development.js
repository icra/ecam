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
  },

  template:`
    <div id=problems>
      problem finder
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
      data_structure_viewer
    </div>
  `,
});

/*
*/
