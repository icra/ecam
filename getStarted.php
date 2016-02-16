<?php /* getStarted.php: page for inserting general information about the system */ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		th{vertical-align:middle}
		#form th,#form td{padding:1em}
		input,textarea{padding:0.5em}
	</style>
	<script>
		function updateField(field,newValue)
		{
			Global.General[field]=newValue;
			init();
		}

		/** Create a row for a field in Global.General */
		function tableRow(field,input,type)
		{
			/*default values for input and type*/input=input||"input";type=type||"text";
			var onchange="onchange=\"updateField('"+field+"',this.value)\""
			var ret="<tr><th>"+field+"<td>"
			switch(input)
			{
				case "textarea":
					ret+="<textarea placeholder='Max 200 characters' rows=5 cols=50 maxlength=200 field='"+field+"' "+onchange+">"+Global.General[field]+"</textarea>";
					break;
				case "input":
					ret+="<input maxlength=25 field='"+field+"' type='"+type+"' value='"+Global.General[field]+"' "+onchange+">";
					break;
				default:
					break;
			}
			return ret
		}

		function updateForm()
		{
			var t = document.getElementById('form')
			/*clean form*/ while(t.rows.length>0){t.deleteRow(-1);}
			//update also sidebar name
			document.querySelector("#sidebar #Name").innerHTML=Global.General.Name;
			/*fill form*/
			t.innerHTML=(function(){
				return tableRow("Name")+
					createLocationSelection()+
					tableRow("Assessment Period Start",'input','date')+
					tableRow("Assessment Period End",'input','date')+
					"<tr><th>Assessment Period<td>"+Global.General.Days()+" days"+
					tableRow("Comments",'textarea','date')
			})();
		}

		function createLocationSelection()
		{
			var select = document.createElement('select');
			select.setAttribute('onchange','updateField("Location",this.value)');
			for(var country in Tables.Countries)
			{
				var option = document.createElement('option');
				if(country==Global.General.Location)
				{
					option.setAttribute('selected','true');
				}
				option.innerHTML=country;
				select.appendChild(option);
			}
			return "<tr><th>Location<td>"+select.outerHTML;
		}

		function init()
		{
			updateForm()
			updateResult()
			Sidebar.update()
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>General info</h1>
<!--SUBTITLE--><h4>Edit general data of your system. You can edit this information later.</h4>

<div style="padding:0;margin-bottom:1em;background:#d7bfaf;height:5px"></div>

<!--FORM--><table id=form style="text-align:left;"></table>
<!--PREV&NEXT-->
<div style=margin:1em>
	<button class="button prev" onclick="event.stopPropagation();window.location='index.php'">Previous</button> 
	<button class="button next" onclick="event.stopPropagation();window.location='configuration.php'">Next</button>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
