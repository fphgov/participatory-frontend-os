type ErrorMiniProps = {
  error: any
  increment?: string|number
}

export default function ErrorMini({ error, increment }: ErrorMiniProps): JSX.Element|JSX.Element[] {
  if (typeof error === 'object') {
    return Object.values(error).map((errorMessage: any, i) => {
      return (<div key={i} className="error-errorMinline">{errorMessage}</div>)
    })
  } else {
    return (<div key={increment} className="error-message-inline">{error}</div>)
  }
}
