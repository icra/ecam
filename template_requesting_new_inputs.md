## Template for requesting new inputs / filters / outputs
New inputs and outputs can be inside new filters. If not, they will show up always.
This is a minimal example that shows all the information necessary to add a new filter, with 2 new inputs and 1 new output.
If not specified, the long description of each item will be the same as the name.

## 1. New filter (yes/no)
Do you want to evaluate x?

### 1.1. New inputs
<table>
  <TR><TH>CODE <TH>NAME            <TH>DEFAULT VALUE <TH>UNIT
  <tr><td>i1   <td>energy consumed <td>0             <td>kWh
  <tr><td>i2   <td>sludge produced <td>0             <td>kg
</table>

### 1.2. New outputs
<table>
  <TR><TH>CODE <TH>NAME              <TH>FORMULA <TH>UNIT
  <tr><td>o1   <td>energy per sludge <td>i1/i2   <th>kWh/kg
</table>
