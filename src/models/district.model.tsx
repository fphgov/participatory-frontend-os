export type IDisctrictValue = 'AREA1' | 'AREA2' | 'AREA3' | 'AREA4' | 'AREA5' | 'AREA6' | 'AREA7' | 'AREA8' | 'AREA9' | 'AREA10' | 'AREA11' | 'AREA12' | 'AREA13' | 'AREA14' | 'AREA15' | 'AREA16' | 'AREA17' | 'AREA18' | 'AREA19' | 'AREA20' | 'AREA21' | 'AREA22' | 'AREA23' | 'AREA24'
export type IDisctrictName = 'Válassz egy kerületet' | 'I. kerület' | 'II. kerület' | 'III. kerület' | 'IV. kerület' | 'V. kerület' | 'VI. kerület' | 'VII. kerület' | 'VIII. kerület' | 'IX. kerület' | 'X. kerület' | 'XI. kerület' | 'XII. kerület' | 'XIII. kerület' | 'XIV. kerület' | 'XV. kerület' |
'XVI. kerület' | 'XVII. kerület' | 'XVIII. kerület' | 'XIX. kerület' | 'XX. kerület' | 'XXI. kerület' | 'XXII. kerület' | 'XXIII. kerület' | 'Margit sziget'

export type IDisctrict = {
  name: IDisctrictName
  value: IDisctrictValue
}

export const districtDataList: IDisctrict[] = [
  { name: 'I. kerület', value: 'AREA1'},
  { name: 'II. kerület', value: 'AREA2'},
  { name: 'III. kerület', value: 'AREA3'},
  { name: 'IV. kerület', value: 'AREA4'},
  { name: 'V. kerület', value: 'AREA5'},
  { name: 'VI. kerület', value: 'AREA6'},
  { name: 'VII. kerület', value: 'AREA7'},
  { name: 'VIII. kerület', value: 'AREA8'},
  { name: 'IX. kerület', value: 'AREA9'},
  { name: 'X. kerület', value: 'AREA10'},
  { name: 'XI. kerület', value: 'AREA11'},
  { name: 'XII. kerület', value: 'AREA12'},
  { name: 'XIII. kerület', value: 'AREA13'},
  { name: 'XIV. kerület', value: 'AREA14'},
  { name: 'XV. kerület', value: 'AREA15'},
  { name: 'XVI. kerület', value: 'AREA16'},
  { name: 'XVII. kerület', value: 'AREA17'},
  { name: 'XVIII. kerület', value: 'AREA18'},
  { name: 'XIX. kerület', value: 'AREA19'},
  { name: 'XX. kerület', value: 'AREA20'},
  { name: 'XXI. kerület', value: 'AREA21'},
  { name: 'XXII. kerület', value: 'AREA22'},
  { name: 'XXIII. kerület', value: 'AREA23'},
  { name: 'Margit sziget', value: 'AREA24'},
]
