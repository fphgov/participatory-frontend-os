import { IUser } from "@/models/user.model";

type ProfileBoxProps = {
  profile: IUser
}

export default function ProfileBox({ profile }: ProfileBoxProps): JSX.Element {
  return (
    <div className="box-profile">
      <p>A megadott adatok jelenleg nem módosíthatóak.</p>

      <div className="profile-item">
        <div className="profile-item-name">Név</div>
        <div className="profile-item-value">{profile.lastname + ' ' + profile.firstname}</div>
      </div>

      <div className="profile-item">
        <div className="profile-item-name">E-mail</div>
        <div className="profile-item-value">{profile.email}</div>
      </div>
    </div>
  )
}
