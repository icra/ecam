//structure of stages (in a array form)

let Structure=[
  //level1
  {prefix:'ws',  alias:'water',    level:'Water', sublevel:false, color:'#00aff1'},
  {prefix:'ww',  alias:'waste',    level:'Waste', sublevel:false, color:'#d71d24'},
  {prefix:'fs',  alias:'faecl',    level:'Faecl', sublevel:false, color:'#95c11f'},

  //level2
  {prefix:'wsa', alias:'waterAbs', level:'Water', sublevel:'Abstraction' },
  {prefix:'wst', alias:'waterTre', level:'Water', sublevel:'Treatment'   },
  {prefix:'wsd', alias:'waterDis', level:'Water', sublevel:'Distribution'},
  {prefix:'wwc', alias:'wasteCol', level:'Waste', sublevel:'Collection'  },
  {prefix:'wwt', alias:'wasteTre', level:'Waste', sublevel:'Treatment'   },
  {prefix:'wwd', alias:'wasteDis', level:'Waste', sublevel:'Discharge'   },
  {prefix:'fsc', alias:'faeclCon', level:'Faecl', sublevel:'Containment' },
  {prefix:'fst', alias:'faeclTre', level:'Faecl', sublevel:'Treatment'   },
  {prefix:'fsr', alias:'faeclReu', level:'Faecl', sublevel:'Reuse'       },
];
