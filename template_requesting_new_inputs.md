ECAM v2.1 template for requesting new inputs / filters / outputs

Example

1. New filter: do you want to evaluate x?

1.1. New inputs

<table>
  <TR><TH>CODE <TH>NAME            <TH>DEFAULT VALUE <TH>UNIT
  <tr><td>i1   <th>energy consumed <td>0             <td>kWh
  <tr><td>i2   <th>sludge produced <td>0             <td>kg
</table>

1.2. New outputs

<table>
  <TR><TH>CODE <TH>NAME              <TH>FORMULA <TH>UNIT
  <tr><td>o1   <td>energy per sludge <td>i1/i2   <th>kWh/kg
</table>
