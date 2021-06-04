//main view controller
let ecam={
  //elements of the user interface: ecam_logo, etc (Vue objects)
  elements:{
    ecam_logo,
    caption,
    linear_menu,
    stages_menu,
  },

  //views (==pages, Vue objects)
  views:{
    landing,
    select_scenario,
    countries,
    population,
    gwp_table,
    more,
    help,
    about,
    tier_b,
    overview,
    summary_ghg,
    variable,
    constants,
    constant,
    report,
    benchmarks,
    non_revenue_water,
    equations,
    tables,
    sankey_ghg,
    diagram,
    compare_scenarios,
    summaries_menu,
    docs,
    faqs,

    development,
    problems,
  },

  //show a view (==open a page)
  //view:             string
  //no_history_entry: boolean
  show(view, no_history_entry){
    no_history_entry = no_history_entry || false;

    if(!this.views[view]){
      let e = new Error(`view '${view}' not found`);
      alert(e);
      throw(e);
    }

    this.hide_all();
    this.views[view].visible=true; //make "view" visible

    //other settings (misc)
    stages_menu.visible      = view=='tier_b';
    stages_menu.current_view = view;
    linear_menu.current_view = view;
    caption.hide();

    window.scrollTo(0,0);

    //history manipulation
    if(!no_history_entry){
      let state_obj={view};
      let title=view;
      if(view=='tier_b'){
        let level       = tier_b.level;
        let sublevel    = tier_b.sublevel;
        state_obj.level = level;
        title           = translate(level);
        if(sublevel){
          state_obj.sublevel = sublevel;
          title             += ' '+translate(sublevel);
        }
      }else if(view=='variable'){
        state_obj.id = variable.id;
        title        = variable.id;
      }else if(view=='constant'){
        state_obj.code = constant.code;
        title          = constant.code;
      }
      history.pushState(state_obj,''); // https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
      document.title=title;
    }

    //return promise for Vue._isMounted TODO
    return this.views[view]._isMounted;
  },

  //hide all views
  hide_all(){
    Object.entries(this.views).forEach(([key,view])=>{
      //console.log(key);
      if(view.constructor===Vue && view.visible){
        view.visible=false;
      }
    });
  },

  //automated test
  //TODO test all languages also
  test(){
    //prepare clicking everywhere
    //TODO improve this part with async promises
    let _this    = this;
    let timer    = 1;   //counter
    let interval = 100; //millisecons

    //visit every page (=view)
    Object.keys(this.views).forEach(key=>{
      setTimeout( ()=>{
        console.log(`Visiting ${key}`);
        _this.show(key);
      }, interval*timer++);
    });

    //visit every tier b stage
    Structure.forEach(s=>{
      setTimeout(()=>{go_to(s.level, s.sublevel)}, interval*timer++);
    });

    //visit every variable
    Structure.forEach(s=>{
      [ //concat inputs and outputs
        ...get_input_codes( s.level, s.sublevel),
        ...get_output_codes(s.level, s.sublevel),
      ].forEach(code=>{
        setTimeout(
          function(){
            variable.view(code)
          },
          interval*timer++,
        );
      });
    });

    //visit every constant
    Object.keys(Cts).forEach(code=>{
      setTimeout(()=>{constant.view(code)}, interval*timer++);
    });
  },

  //append <style> elements to <body> for each vue object that has styles in it
  add_styles(){
    Object.values(this.elements).concat(
    Object.values(this.views)).forEach(vue_obj=>{
      if(vue_obj.$options.style){
        let el = document.createElement('style');
        document.body.appendChild(el);
        el.outerHTML = vue_obj.$options.style;
      }
    });
  },

  //set current scenario for the frontend
  //==update Global object in the frontend
  set_current_scenario(ecam_object){
    if(!ecam_object){return;}
    //do nothing if we already are editing Global
    if(ecam_object == Global) return;
    if(ecam_object.constructor!==Ecam){
      throw new Error('ecam_object is not an Ecam object');
      return;
    }

    //update Global
    Global = ecam_object;

    //update property "Global" in every view and element
    ['elements','views'].forEach(key=>{
      Object.values(ecam[key]).forEach(vue_object=>{
        if(vue_object.constructor!==Vue){
          throw new Error('object is not a Vue object');
        }
        if(vue_object.Global){
          vue_object.Global = ecam_object;
        }
      });
    });

    //update constants according to selected GWP
    select_scenario.set_constants_from_gwp_report();
  },

  //add new scenario
  new_scenario(){
    let scenario = new Ecam();
    Scenarios.push(scenario);
  },

  //delete scenario
  delete_scenario(scenario){
    if(scenario==Global) return;

    //remove from Scenarios
    {
      let index = Scenarios.indexOf(scenario);
      if(index+1) Scenarios.splice(index,1);
    }

    //remove from scenarios compared
    {
      let index = compare_scenarios.scenarios_compared.indexOf(scenario);
      if(index+1) compare_scenarios.scenarios_compared.splice(index,1);
    }
  },

  //download empty template (step 1)
  generate_empty_excel_template(){
    let scenario=new Ecam();
    scenario.General.Name="Ecam assessment template";

    //array of excel sheets
    let sheets=[
      //sheet 1: General
      {
        sheet_name:"General",
        rows:[
          ...Object.entries(scenario.General).map(([key,value])=>{
            return[
              key, //column 1: variable name
              get_base_unit(key,scenario), //column 2: unit
              value, //column 3: value
            ];
          }),
        ],
      },

      //sheets 2 and 3: Water and Waste
      ...Structure.filter(s=>!s.sublevel).map(s=>{
        return {
          sheet_name:s.level,
          rows:[
            ...get_input_codes(s.level).map(key=>{
              return[
                key, //column: variable name
                translate(key+'_descr'), //column: description
                get_base_unit(key,scenario), //column 2: unit
                scenario[s.level][key], //column: value
              ];
            }),
          ],
        };
      }),

      //sheets 4 to 9: substages
      ...Structure.filter(s=>s.sublevel).map(s=>{
        let name  = `${s.sublevel} 1`; //string
        let ss    = new s.class(name); //Substage
        return {
          //new sheet
          sheet_name:`${s.level} ${s.sublevel}`,
          rows:[
            //...
            [
              "name",
              "substage name",
              "text",
              ss.name,
            ],
            ...get_input_codes(s.level,s.sublevel).map(key=>{

              //variable description
              let description=translate(key+'_descr');

              //include options with a number at the end of the description
              if(Info[key].magnitude=='Option'){
                let options=Tables[Info[key].table].map(row=>translate(row.name));
                let options_with_numbers=options.map((op,i)=>{
                  return `${i}: '${op}'`;
                });
                description += ` --> [${options_with_numbers.join(", ")}]`;
              }

              return[
                key, //column: variable name
                description, //column: description
                get_base_unit(key,scenario), //column 2: unit
                ss[key], //column: value
              ];
            }),
          ],
        };
      }),
    ];

    /*CREATE AND DOWNLOAD EMPTY EXCEL TEMPLATE*/
    (function write_excel(pre_excel){
      let sheet_colors=[
        'FF327CBB', 'FF55C3DC', 'FFEE6D56',
        'FF55C3DC', 'FF84D6E8', 'FFB2EBF7',
        'FFEE6D56', 'FFF59382', 'FFF5B6AB',
      ];

      /*
       * Format header (first row) font and background color from worksheet
       * @param {*} worksheet
       * @param {*} ws_num
       */
      function format_header(worksheet, ws_num){
        let n_cols = worksheet.columnCount;

        for(let i=0; i<n_cols; i++){
          let col = String.fromCharCode('A'.charCodeAt() + i);

          worksheet.getCell(col+'1').fill={
            type:'pattern',
            pattern:'solid',
            fgColor:{argb:sheet_colors[ws_num-1]},
          };

          font_color = ws_num != 1 ? '00000000': 'FFFFFFFF';

          worksheet.getCell(col+'1').font = {
              name: 'Calibri', bold: true, size: 11, color: { argb: font_color }
          };
        }
      }

      /*
       * Format font and background color of static cells (protected cells) from worksheet
       * @param {*} worksheet
       * @param {*} ws_num
       */
      function format_static_cells(worksheet, ws_num){
        let n_cols = worksheet.columnCount;
        let n_rows = worksheet.rowCount;

        for(let i=0; i<n_cols-1; i++){      //all columns except last one (values column)
          for(let j=2; j<=n_rows; j++){   //from second row to last row (avoid header)
            let col = String.fromCharCode('A'.charCodeAt() + i);
            worksheet.getCell(col+j).fill = {
              type: 'pattern', pattern: 'solid', fgColor: {argb: sheet_colors[ws_num-1]}
            };
            font_color =  ws_num != 1 ? '00000000': 'FFFFFFFF';
            worksheet.getCell(col+j).font = {
              name: 'Calibri', size: 11, color: {argb: font_color}
            };
            worksheet.getCell(col+j).border = {
              bottom: {style: 'thin', color: {argb: 'FFB0B2B5'}},
              left: {style: 'thin', color: {argb: 'FFB0B2B5'}}
            }
          }
        }
      }

      /*
       * Unprotect cells that user needs to fill in with data of a substage.
       * @param {*} worksheet
       * @param {*} ws_num
       */
      function unprotect_value_cells(worksheet, ws_num){
        let value = worksheet.getColumn('value');

        //unlock value cells
        value.eachCell({includeEmpty: true}, function(cell, rowNumber){
          cell.protection={locked:false};
          cell_color = rowNumber != 1 ? 'FFEEEEEE' : sheet_colors[ws_num-1];
          font_color = (rowNumber == 1 && ws_num == 1) ? 'FFFFFFFF' : '00000000';
          font_bold  = rowNumber != 1 ? false : true;
          cell.fill  = {
            type:'pattern',
            pattern:'solid',
            fgColor:{argb: cell_color}
          };
          cell.font = {
            name: 'Calibri', bold: font_bold, size: 11, color: {argb: font_color}
          };
          cell.border = {
            bottom: {style: 'thin', color: {argb: 'FFB0B2B5'}},
            left: {style: 'thin', color: {argb: 'FFB0B2B5'}}
          };
        });
      }

      /*
       * Unprotect 20 following columns, for adding new substages and their data if user wants to.
       * @param {*} worksheet
       * @param {*} ws_num
       */
      function unprotect_next_20(worksheet, ws_num){
        let n_cols = worksheet.columnCount;
        let n_rows = worksheet.rowCount;

        for(let i=n_cols+1; i<21+n_cols; i++){
          let col = String.fromCharCode('A'.charCodeAt() + i-1);
          for(let j=1; j<=n_rows; j++){
            worksheet.getCell(col+j).protection = {locked: false};

            color = j!=1 ? 'FFEEEEEE' : sheet_colors[ws_num-1];

            worksheet.getCell(col+j).fill = {
              type:'pattern',
              pattern:'solid',
              fgColor:{argb: color},
            };

            worksheet.getCell(col+j).border = {
              bottom: {style: 'thin', color: {argb: 'FFB0B2B5'}},
              left: {style: 'thin', color: {argb: 'FFB0B2B5'}}
            };
          }

          worksheet.getCell(col+'1').font={
            name:'Calibri',
            bold:true,
            size:11,
          };
          worksheet.getColumn(i).width=15;
        }
      }

      /*
       * Set cell's aligment.
       * @param {*} worksheet
       */
      function fit_columns(worksheet){
        worksheet.columns.forEach(function (column, i){
          column["eachCell"]({includeEmpty:true},
            function(cell){
              cell.alignment={
                vertical:'middle',
                wrapText:true,
              };
            }
          );
        });
      }

      /*
       * Set row's height according to the lenght of second column, wich can be split in multiple lines.
       * @param {*} worksheet
       * @param {*} ws_num
       */
      function fit_rows(worksheet, ws_num){
        worksheet.eachRow( {includeEmpty: true}, function(row, row_number){
          var min_height = 15;
          var col_length = 0;
          var min_col_length = ws_num == 1 ? 15 : 55
          row["eachCell"]({includeEmpty: true}, function(cell, col_number){
            if ((col_number == 2 && ws_num != 1) || (col_number == 3 && ws_num == 1)){
              col_length = cell.value ? cell.value.toString().length : min_col_length;
            }
          });

          if (col_length > min_col_length){
            row.height = (Math.ceil(col_length / (min_col_length+5) ) * min_height);
          }
          else row.height=18;
        })
      }

      /*
       * Create a workbook with sheets and data from pre_excel.js object, and download it in xlsx format.
       */
      function download_excel(){
        //create empty workbook
        let wb = new ExcelJS.Workbook();

        //number of sheets (objects in the array 'pre_excel')
        let n_sheets = pre_excel.length;

        //create worksheets and fill them with data
        for(let i=0; i<n_sheets; i++){
          let sheet_name = pre_excel[i].sheet_name;
          let sheet_data = pre_excel[i].rows;
          let ws = wb.addWorksheet(sheet_name, {properties: {tabColor: {argb: sheet_colors[i]}}});

          //set worksheet properties
          ws.properties.defaultRowHeight = 18;
          ws.properties.defaultColumnWidth = 15;
          ws.protect('',{insertColumns: true, formatColumns: true, formatCells: true, formatRows: true}); //protect sheet

          //add header
          let columns = [
            { header: 'Id',    key: 'id',    width: 20 },
            { header: 'Field', key: 'field', width: 60 },
            { header: 'Unit',  key: 'unit',  width: 20 },
            { header: 'Value', key: 'value', width: 15 }
          ];

          if(sheet_data[0].length==3){ //first sheet has only 3 columns
            columns.splice(0,1); //delete first column
            columns.splice(2,1, { header: 'Value', key: 'value', width: 20 })
          }

          ws.columns = columns;
          format_header(ws, i+1);

          //set freezed columns and header.
          let active_col = String.fromCharCode('A'.charCodeAt() + ws.columnCount-1);
          ws.views = [
            {
              state:'frozen',
              ySplit:1,
              xSplit: (ws.columnCount - 1),
              activeCell: active_col+2,
            }
          ]

          //add data to worksheet (by rows)
          sheet_data.forEach(row => {
            const new_row=[];
            let n_cols = row.length
            for(let j=0; j<n_cols; j++){
              new_row[j] = row[j];
            }
            ws.addRow(new_row);
          });
          format_static_cells(ws, i+1);
          fit_columns(ws);
          fit_rows(ws, i+1);

          //unprotect last column cells (value cells), so user can enter values
          unprotect_value_cells(ws, i+1);

          //unprotect next 20 columns to enable adding new substages, except for first 3 sheets.
          if(i>2) unprotect_next_20(ws, i+1);
        }

        //Export workbook to xlsx file
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        wb.xlsx.writeBuffer().
          then(buffer => saveAs(new Blob([buffer], {type: fileType}), 'ecam-template.xlsx'))
          .catch(err => console.log('Error writing excel export', err))
      }

      download_excel();
    })(sheets);
  },

  //load user filled template (step 2)
  async import_excel_template_filled_by_user(event){
    if(event.target.value=="") return;
    //when event.target.value changes, this function is triggered. Enable
    //reuploading a file with the same name resetting event.target.value at the
    //end of this function

    //1. File object: loaded xlsx by user
    let file = event.target.files[0];

    //enable reuploading the same filename by resetting event.target.value
    event.target.value="";

    //2. convert File object to json
    let excelAsJson = await read_excel(file);

    //3. convert json to ecam object
    let scenario = create_new_ecam_object_with_xlsx_json_object(excelAsJson);

    //add ecam object to scenarios and set to current scenario
    Scenarios.push(scenario);
    ecam.set_current_scenario(scenario);

    //open list of assessments
    (function(){
      let el = document.querySelector('#list_of_assessments');
      if(el) el.setAttribute('open',true);
    })();

    function create_new_ecam_object_with_xlsx_json_object(excelAsJson){
      //excelAsJson is an array of sheets
      //  a sheet is an array of rows
      //    a row is an array of cells

      //new scenario (return value)
      let scenario=new Ecam();

      //sheet 1 (General)
      let sheet_General = excelAsJson.find(sheet=>sheet.sheet_name=='General');
      if(!sheet_General){
        let e='sheet "General" not found'
        alert(e);
        throw(e) ;
      }
      sheet_General.rows.forEach(row=>{
        let key   = row[0];
        let unit  = row[1];
        let value = row[2];

        try{
          value = check_numbers_and_strings_from_excel(key,value);
        }catch(e){
          alert(e);
          throw(e);
        }

        scenario.General[key]=value;
      });

      //sheet 2 and 3 (Level)
      Structure.filter(s=>!s.sublevel).map(s=>s.level).forEach(level=>{
        let sheet = excelAsJson.find(sheet=>sheet.sheet_name==level);
        if(!sheet){
          let e=`sheet "${level}" not found`;
          alert(e);
          throw(e);
        }

        sheet.rows.forEach(row=>{
          let key   = row[0];
          let descr = row[1];
          let unit  = row[2];
          let value = row[3];

          try{
            value = check_numbers_and_strings_from_excel(key,value);
          }catch(e){
            alert(e);
            throw(e);
          }

          scenario[level][key]=value;
        });
      });

      //sheet 4 to 9 (Stages)
      Structure.filter(s=>s.sublevel).forEach(stage=>{
        let level    = stage.level;
        let sublevel = stage.sublevel;

        let sheet = excelAsJson.find(sheet=>sheet.sheet_name==`${level} ${sublevel}`);
        if(!sheet){
          let e=`sheet "${level} ${sublevel}" not found`;
          alert(e);
          throw(e);
        }

        //detect number of substages created by the user == number of columns
        let n_substages = Math.max(...sheet.rows.map(row=>row.length))-3;
        if(n_substages<0){
          let e=`number of substages cannot be "${n_substages}"`;
          alert(e);
          throw(e);
        }

        //create as many substages
        for(let i=0;i<n_substages;i++){
          let ss = new stage.class();
          scenario[level][sublevel].push(ss);
        }

        //fill substages with values in the excel
        sheet.rows.forEach(row=>{
          let key   = row[0];
          let descr = row[1];
          let unit  = row[2];

          for(let i=0;i<n_substages;i++){
            let value = row[3+i];

            try{
              value = check_numbers_and_strings_from_excel(key,value);
            }catch(e){
              alert(e);
              throw(e);
            }

            //console.log({key,unit,value});
            scenario[level][sublevel][i][key]=value;
          }
        });
      });

      return scenario;
    }

    //throw exceptions for errors in the excel file
    //and return the value passed
    function check_numbers_and_strings_from_excel(key, value){
      if(!key){
        throw `The variable ID "${key}" from the Excel template is not defined`;
      }

      if(!Info[key]){
        throw `The variable code "${key}" does not exist in this version of Ecam`;
      }

      if(Info[key].magnitude=='text'){
        if(typeof value=='string'){
          return value; //everything OK
        }else{
          try{
            value = value.toString();
          }catch(e){
            throw `The value for '${key}' ('${value}') could not be converted to text`;
          }
          return value;
        }
      }

      //rest of cases: numbers
      if(typeof value != 'number'){
        let parsed = parseFloat(value);
        if(isNaN(value)){
          throw `The value for '${key}' ('${value}') is not a number`;
        }
        return parsed;
      }

      //deal with Options
      if(Info[key].magnitude=='Option'){
        //make sure that the number entered by the user is not higher than the
        //number of rows
        let max_value = Tables[Info[key].table].length-1;
        if(value < 0 || value > max_value){
          throw `The value for '${key}' ('${value}') is not a valid option. Valid options: [0..${max_value}]`;
        }
      }

      return value;
    }

    function read_excel(excel_buffer){
      let workbook=new ExcelJS.Workbook();
      let excelAsJson=[];

      //get workbook intance
      return workbook.xlsx.load(excel_buffer).then(workbook => {
        workbook.eachSheet(function(worksheet, sheetId){
          try{
            read_sheet(excelAsJson, worksheet, sheetId)
          }catch(e){
            alert(e);
            throw(e);
          }
        });
        return excelAsJson;
      })
    }

    function column_count(workSheet){
      let n_columns = 0;
      workSheet.eachRow({ includeEmpty: true }, function(row, rowNumber){
        if(rowNumber != 1){
          const cells = row._cells;
          let i = cells.length;
          let empty_cells = 0;
          reversed_cells = [].concat(cells).reverse();
          for(const cell of reversed_cells){
            if(cell._value.model.value === undefined){
              i--
              empty_cells += 1
            }
            else break
          }

          if(i > n_columns) n_columns = i
        }
      })
      return n_columns
    }

    function read_sheet(excelAsJson, workSheet, sheetId){
      const obj={
        "sheet_name": workSheet.name,
        "rows":[],
      };

      let numberOfColumns;
      if(sheetId < 4) numberOfColumns = workSheet.actualColumnCount; //not a sheet with substages
      else numberOfColumns = column_count(workSheet);                //sheet with substages

      workSheet.eachRow({includeEmpty:true},function(row, rowNumber){
        //ignore first row
        if(rowNumber !== 1){
          const currentRow = [];
          //iterate over all cells in a row (including empty cells)
          row.eachCell({ includeEmpty: true }, function(cell, colNumber){
            if(colNumber > numberOfColumns) return
            if(cell.value === null){           //Empty cells
              if(sheetId == 1){             //General
                if(colNumber == 3){
                  if(rowNumber < 8) currentRow.push('')
                  else if(rowNumber == 8) currentRow.push(false)
                  else currentRow.push(0)
                }else{
                  currentRow.push('')
                }
              }else if(sheetId == 2 || sheetId == 3){   //Water and Waste
                currentRow.push(0)
              }else{                                    //Substage
                if(rowNumber == 2){                     //Substage name
                  let name="";
                  switch (sheetId){
                    case 4:
                      name = "Abstraction"
                      break;
                    case 5:
                      name = "Treatment"
                      break;
                    case 6:
                      name = "Distribution"
                      break;
                    case 7:
                      name = "Collection"
                      break;
                    case 8:
                      name = "Treatment"
                      break;
                    case 9:
                      name = "Onsite"
                      break;
                  }
                  name += " "+String(currentRow.length - 2)
                  currentRow.push(name)
                }else{
                  currentRow.push(0)
                }
              }
            }
            else if(typeof cell.value === 'object'){  //Boolean cells
              if(cell.value['formula'] == 'FALSE()'){
                currentRow.push(false)
              }else if(cell.value['formula'] == 'TRUE()'){
                currentRow.push(true)
              }else{
                currentRow.push('')
              }
            }
            else{ //Full cell
              let toInsert = cell.value
              currentRow.push(toInsert)
            }
          });
          obj.rows.push(currentRow)
        }
      });
      excelAsJson.push(obj)
    }
  },
};

ecam.add_styles();

/*history*/
window.onpopstate=function(event){
  if(!event){return}
  if(!event.state){return}
  if(!event.state.view){return}

  /*
  console.log(`
    location: ${document.location          },
    state:    ${JSON.stringify(event.state)}`
  );
  */
  let view = event.state.view;

  //pressing "back" does not push a new historystate object, otherwise an
  //infinite loop is generated with "ecam.show"
  let no_history_entry=true;

  if(view=='tier_b'){
    go_to(
      event.state.level,
      event.state.sublevel,
      no_history_entry,
    );
  }else if(view=='variable'){
    variable.view(
      event.state.id,
      no_history_entry,
    );
  }else if(view=='constant'){
    constant.view(
      event.state.code,
      no_history_entry,
    );
  }else{
    ecam.show(view, no_history_entry);
  }
}
