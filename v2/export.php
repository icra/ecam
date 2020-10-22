<script>
  function selectText(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
  }

  function createCSV() {
    //get the table "table"
    var t=document.getElementById('table');

    //string where we will write the entire file
    var str="";

    //go over the table
    for(var i=0; i<t.rows.length; i++)
    {
      for(var j=0; j<t.rows[i].cells.length; j++)
      {
        str += t.rows[i].cells[j].textContent.replace(/,/g,' ')+",";
      }
      str+='\r\n';
    }

    //generate clickable link
    var a      = document.createElement('a');
    a.href     = 'data:text/csv;charset=utf-8,' + encodeURI(str);
    a.target   = '_blank';
    a.download = 'export.csv';

    //click the link
    document.body.appendChild(a);
    a.click();
  }
</script>
