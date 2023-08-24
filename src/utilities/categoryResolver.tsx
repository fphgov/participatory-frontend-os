export function categoryResolver(theme: string): string {
  switch (theme.toUpperCase()) {
    case 'LOCAL-SMALL':
      return 'Helyi kis ötletek'
    case 'LOCAL-BIG':
      return 'Helyi nagy ötletek'
    case 'CARE':
      return 'Esélyteremtő Budapest'
    case 'OPEN':
      return 'Nyitott Budapest'
    case 'GREEN':
      return 'Zöld Budapest'

    default:
      return '';
  }
}
