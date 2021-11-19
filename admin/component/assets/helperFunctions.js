export function dateCoverter(date) {
  let tdate = new Date(date)

  let dd = tdate.getDate().toString().padStart(2, 0)
  let mm = (tdate.getMonth() - 1).toString().padStart(2, 0)
  let yyyy = tdate.getFullYear()

  let hour = tdate.getHours().toString().padStart(2, 0)
  let minute = tdate.getMinutes().toString().padStart(2, 0)
  let s = tdate.getSeconds().toString().padStart(3, 0)

  return `${yyyy}.${mm}.${dd}. ${hour}:${minute}:${s}`
}
