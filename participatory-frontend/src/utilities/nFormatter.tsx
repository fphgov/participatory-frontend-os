const nFormatter = function(num: number, digits: number|undefined = undefined): string {
  const si = [
    { value: 1, symbol: " Ft" },
    { value: 1E3, symbol: " ezer Ft" },
    { value: 1E6, symbol: " millió Ft" },
    { value: 1E9, symbol: " milliárd Ft" },
    { value: 1E12, symbol: " billió Ft" },
    { value: 1E15, symbol: " billiárd Ft" },
    { value: 1E18, symbol: " trillió Ft" },
    { value: 1E18, symbol: " trilliárd Ft" },
    { value: 1E18, symbol: " kvadrillió Ft" }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
export default nFormatter
