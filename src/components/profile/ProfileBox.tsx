import { IUser } from "@/models/user.model";

type ProfileBoxProps = {
  profile: IUser
}

export default function ProfileBox({ profile }: ProfileBoxProps): JSX.Element {
  return (
    <div className="box-profile">
      <div className="profile-item">
        <div className="profile-item-name">Név:</div>
        <div className="profile-item-value">{profile.firstname} {profile.lastname}</div>
      </div>
      <div className="profile-item">
        <div className="profile-item-name">E-mail cím:</div>
        <div className="profile-item-value">{profile.email}</div>
      </div>
    </div>
  )
}
