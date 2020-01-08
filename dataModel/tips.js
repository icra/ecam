/* Random tips */
let Tips={
  list:[
    "Use the TAB key to input values faster",
    "Double click a graph to download it",
    "Export results to Excel at Main Menu/Other/Export",
    "Press &uarr; and &darr; when editing inputs to quickly increase/decrease the number",
    "Click on the 'untitled' substage header to change its name",
    "Move the mouse over inputs to highlight related outputs",
    "Move the mouse over outputs to highlight related inputs",
    "Use fullscreen mode in your browser to work more comfortably",
    "Move the mouse over an output to see its formula",
  ],

  current:"",

  random() {
    let n = Tips.list.length;
    let r = Math.floor(Math.random()*n);
    let tip = Tips.list[r];
    this.current = tip;
    if(n>1){Tips.list.splice(r,1);}
    return tip;
  },
};

//init current tip
Tips.random();
