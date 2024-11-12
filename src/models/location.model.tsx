export type ILocationValue = '0' | '1' | '2'
export type ILocationName = 'Válassz egy kerületet' | 'Konkrét helyszínhez kötődik' | 'Nem kötődik konkrét helyszínhez'

export type ILocation = {
  name: ILocationName
  value: ILocationValue
}

export const locationDataList: ILocation[] = [
  { name: 'Válassz egy kerületet', value: '0'},
  { name: 'Konkrét helyszínhez kötődik', value: '1'},
  { name: 'Nem kötődik konkrét helyszínhez', value: '2'},
]
