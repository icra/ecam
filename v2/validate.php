<!--form for json formatter-->
<form id=json_formatter action="https://jsonformatter.curiousconcept.com/process" method=POST>
  <input name=jsondata             type=hidden>
  <input name=jsonstandard value=1 type=hidden>
  <input name=jsontemplate value=1 type=hidden>
</form>

<button onclick=document.querySelector('#json_formatter').submit() style=margin-bottom:1em>
  Validate with JSON formatter
</button>

<script>
  document.querySelector('input[name=jsondata]').value=JSON.stringify(Global)
</script>
