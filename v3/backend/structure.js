//structure of stages (in a array form)
let Structure=[
  //Water Supply
  {prefix:'ws',  alias:'water',    level:'Water', sublevel:false, color:'#58c1db'},
  {prefix:'wsa', alias:'waterAbs', level:'Water', sublevel:'Abstraction'         },
  {prefix:'wst', alias:'waterTre', level:'Water', sublevel:'Treatment'           },
  {prefix:'wsd', alias:'waterDis', level:'Water', sublevel:'Distribution'        },

  //Wastewater
  {prefix:'ww',  alias:'waste',    level:'Waste', sublevel:false, color:'#ed6d57'},
  {prefix:'wwc', alias:'wasteCol', level:'Waste', sublevel:'Collection'          },
  {prefix:'wwt', alias:'wasteTre', level:'Waste', sublevel:'Treatment'           },
  {prefix:'wwd', alias:'wasteDis', level:'Waste', sublevel:'Discharge'           },

  //Faecal Sludge Management
  {prefix:'fs',  alias:'faecl',    level:'Faecl', sublevel:false, color:'#95c11f'},
  {prefix:'fsc', alias:'faeclCon', level:'Faecl', sublevel:'Containment'         },
  {prefix:'fst', alias:'faeclTre', level:'Faecl', sublevel:'Treatment'           },
  {prefix:'fsr', alias:'faeclReu', level:'Faecl', sublevel:'Reuse'               },
];
