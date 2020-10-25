//structure of stages (in a array form)
let Structure=[
  {prefix:'ws',  alias:'water',    icon:"water.png",    level:'Water', sublevel:false,          class:Water_stages, color:'#58c1db'},
  {prefix:'wsa', alias:'waterAbs', icon:"waterAbs.svg", level:'Water', sublevel:'Abstraction',  class:Water_Abstraction},
  {prefix:'wst', alias:'waterTre', icon:"waterTre.svg", level:'Water', sublevel:'Treatment',    class:Water_Treatment},
  {prefix:'wsd', alias:'waterDis', icon:"waterDis.svg", level:'Water', sublevel:'Distribution', class:Water_Distribution},
  {prefix:'ww',  alias:'waste',    icon:"waste.png",    level:'Waste', sublevel:false,          class:Waste_stages, color:'#ed6d57'},
  {prefix:'wwc', alias:'wasteTra', icon:"wasteCol.svg", level:'Waste', sublevel:'Collection',   class:Waste_Collection},
  {prefix:'wwt', alias:'wasteTre', icon:"wasteTre.svg", level:'Waste', sublevel:'Treatment',    class:Waste_Treatment},
  {prefix:'wwo', alias:'wasteOns', icon:"wasteOns.svg", level:'Waste', sublevel:'Onsite',       class:Waste_Onsite},
];
