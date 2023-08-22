type ErrorProps = {
  message: string
}

export default function Error({ message }: ErrorProps): JSX.Element {
  return (
    <div className="error-message">
      {message}
    </div>
  )
}
