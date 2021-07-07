const loadG = (callback) => {
  const existingScript = document.getElementById('ga')

  if (! existingScript) {
    const script = document.createElement('script')

    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + process.env.GA_ID
    script.id = process.env.GA_ID
    document.body.appendChild(script)

    script.onload = () => {
      if (callback) callback()
    }
  }

  if (existingScript && callback) callback()
}
export default loadG
