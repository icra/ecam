## Template for requesting new inputs / outputs and/or filters
New inputs and outputs can be inside "filters". If not, they will show up
always. This is a minimal example that shows all the information necessary to
add a new filter, with 2 new inputs and 1 new output. If not specified, the
long description of each item will be the same as the name.

## Example

### 1. New filter
Do you want to evaluate x? (yes/no)

#### 1.1. New inputs
<table>
  <TR><TH>CODE  <TH>NAME            <TH>DEFAULT VALUE <TH>UNIT
  <tr><td>code1 <td>energy consumed <td>0             <td>kWh
  <tr><td>code2 <td>sludge produced <td>0             <td>kg
</table>

#### 1.2. New outputs
<table>
  <TR><TH>CODE  <TH>NAME              <TH>FORMULA      <TH>UNIT
  <tr><td>code3 <td>energy per sludge <td>code1/code2  <td>kWh/kg
</table>
