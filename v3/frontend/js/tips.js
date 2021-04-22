/* Random tips */
let Tips={
  list:[
    "Use the TAB key to input values faster",
    "Press &uarr; and &darr; when editing inputs to quickly increase/decrease the number",
    "Export results to Excel at Configuration/Export",
    "Enable 'highlight mode' to highlight related inputs and outputs when moving the mouse over inputs or outputs",
    "Use fullscreen mode in your browser (F11) to work more comfortably",
    "Click the code of an input to see more info about that input",
    "Click the code of on output to see more info about that output",
  ],

  current:"",

  random(){
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
