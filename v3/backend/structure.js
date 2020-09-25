//structure of stages (in a array form)
let Structure=[
  {prefix:'ws',  alias:'water',    icon:"water.png",    level:'Water', sublevel:false, color:'#58c1db'},
  {prefix:'wsa', alias:'waterAbs', icon:"waterAbs.svg", level:'Water', sublevel:'Abstraction',  discharge:0, sludge:0},
  {prefix:'wst', alias:'waterTre', icon:"waterTre.svg", level:'Water', sublevel:'Treatment',    discharge:0, sludge:1},
  {prefix:'wsd', alias:'waterDis', icon:"waterDis.svg", level:'Water', sublevel:'Distribution', discharge:0, sludge:0},
  {prefix:'ww',  alias:'waste',    icon:"waste.png",    level:'Waste', sublevel:false, color:'#ed6d57'},
  {prefix:'wwc', alias:'wasteTra', icon:"wasteCol.svg", level:'Waste', sublevel:'Transport',    discharge:1, sludge:0},
  {prefix:'wwt', alias:'wasteTre', icon:"wasteTre.svg", level:'Waste', sublevel:'Treatment',    discharge:1, sludge:1},
  {prefix:'wwo', alias:'wasteOns', icon:"wasteOns.svg", level:'Waste', sublevel:'Onsite',       discharge:1, sludge:1},
];
