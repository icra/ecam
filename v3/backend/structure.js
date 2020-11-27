//structure of stages (in a array form)
let Structure=[
  {prefix:'ws',  icon:"water.png",    level:'Water', sublevel:false,          class:Water_stages, color:'#55C3DC'},
  {prefix:'wsa', icon:"waterAbs.svg", level:'Water', sublevel:'Abstraction',  class:Water_Abstraction},
  {prefix:'wst', icon:"waterTre.svg", level:'Water', sublevel:'Treatment',    class:Water_Treatment},
  {prefix:'wsd', icon:"waterDis.svg", level:'Water', sublevel:'Distribution', class:Water_Distribution},
  {prefix:'ww',  icon:"waste.png",    level:'Waste', sublevel:false,          class:Waste_stages, color:'#ee6d56'},
  {prefix:'wwc', icon:"wasteCol.svg", level:'Waste', sublevel:'Collection',   class:Waste_Collection},
  {prefix:'wwt', icon:"wasteTre.svg", level:'Waste', sublevel:'Treatment',    class:Waste_Treatment},
  {prefix:'wwo', icon:"wasteOns.png", level:'Waste', sublevel:'Onsite',       class:Waste_Onsite},
];
