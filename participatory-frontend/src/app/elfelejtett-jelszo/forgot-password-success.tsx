import Link from 'next/link'

export default function ForgotPasswordSuccess({ message }: { message: string }): JSX.Element {
  return (
    <>
      <h2>Elfelejtett jelszó</h2>

      <p className="tipp">{message}</p>

      <div className="row">
        <div className="col-md-12">
          <Link className="btn btn-primary btn-headline btn-next" href="/bejelentkezes" style={{ marginTop: 24 }}>Tovább a bejelentkezésre</Link>
        </div>
      </div>
    </>
  )
}
