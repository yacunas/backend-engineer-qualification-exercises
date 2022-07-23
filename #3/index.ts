/**
 * LOGEST function.
 * https://www.statisticshowto.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation
 * http://www.exceluser.com/formulas/how-to-calculate-both-types-of-compound-growth-rates.html
 * https://www.excelfunctions.net/excel-logest-function.html
 * @param data 
 */

 const formulajs = require('@formulajs/formulajs')

export default function logest(ys: number[]): number {
  const xs = [1, 2, 3, 4, 5];
  let ln_ys = [];
  let total = 0;
  let hasZero = false;
  let hasNeg = false;
  let allNeg = true;

  for (var val of ys) {
    total += val;
    
    if(val >= 0){
      allNeg = false;
    }

    if(val == 0){
      hasZero = true;
    }

    if(val < 0){
      hasNeg = true
    }
  }

  if(total == 0 || hasZero == true || hasNeg == true || allNeg == true){
    return NaN;
  }

  //Calculating the ln of the ys array
  for (let i = 0; i < ys.length; i++) {
    ln_ys[i] = formulajs.LN(ys[i]);
  }

  //Formula for calculating the logest function using linest function
  let linest = formulajs.LINEST(ln_ys,xs); 
  let logest = formulajs.EXP(linest[0]);

  console.log(logest);
  return logest;  
}
