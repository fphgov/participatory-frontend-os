export type IDisctrictValue = 'AREA1' | 'AREA2' | 'AREA3' | 'AREA4' | 'AREA5' | 'AREA6' | 'AREA7' | 'AREA8' | 'AREA9' | 'AREA10' | 'AREA11' | 'AREA12' | 'AREA13' | 'AREA14' | 'AREA15' | 'AREA16' | 'AREA17' | 'AREA18' | 'AREA19' | 'AREA20' | 'AREA21' | 'AREA22' | 'AREA23' | 'AREA24'
export type IDisctrictName = 'Válassz egy kerületet' | 'I. kerület' | 'II. kerület' | 'III. kerület' | 'IV. kerület' | 'V. kerület' | 'VI. kerület' | 'VII. kerület' | 'VIII. kerület' | 'IX. kerület' | 'X. kerület' | 'XI. kerület' | 'XII. kerület' | 'XIII. kerület' | 'XIV. kerület' | 'XV. kerület' |
'XVI. kerület' | 'XVII. kerület' | 'XVIII. kerület' | 'XIX. kerület' | 'XX. kerület' | 'XXI. kerület' | 'XXII. kerület' | 'XXIII. kerület' | 'Margit sziget'

export type IDisctrict = {
  label: IDisctrictName
  value: IDisctrictValue
}

export const districtDataList: IDisctrict[] = [
  { label: 'I. kerület', value: 'AREA1'},
  { label: 'II. kerület', value: 'AREA2'},
  { label: 'III. kerület', value: 'AREA3'},
  { label: 'IV. kerület', value: 'AREA4'},
  { label: 'V. kerület', value: 'AREA5'},
  { label: 'VI. kerület', value: 'AREA6'},
  { label: 'VII. kerület', value: 'AREA7'},
  { label: 'VIII. kerület', value: 'AREA8'},
  { label: 'IX. kerület', value: 'AREA9'},
  { label: 'X. kerület', value: 'AREA10'},
  { label: 'XI. kerület', value: 'AREA11'},
  { label: 'XII. kerület', value: 'AREA12'},
  { label: 'XIII. kerület', value: 'AREA13'},
  { label: 'XIV. kerület', value: 'AREA14'},
  { label: 'XV. kerület', value: 'AREA15'},
  { label: 'XVI. kerület', value: 'AREA16'},
  { label: 'XVII. kerület', value: 'AREA17'},
  { label: 'XVIII. kerület', value: 'AREA18'},
  { label: 'XIX. kerület', value: 'AREA19'},
  { label: 'XX. kerület', value: 'AREA20'},
  { label: 'XXI. kerület', value: 'AREA21'},
  { label: 'XXII. kerület', value: 'AREA22'},
  { label: 'XXIII. kerület', value: 'AREA23'},
  { label: 'Margit sziget', value: 'AREA24'},
]
