import { IUser } from "@/models/user.model";
import {IUserPreference} from "@/models/userPreference.model";

type ProfileBoxProps = {
  profile: IUser
  profilePreference: IUserPreference
}

export default function ProfileBox({ profile, profilePreference }: ProfileBoxProps): JSX.Element {
  return (
    <div className="box-profile">
      <div className="profile-item">
        <div className="profile-item-name">Név:</div>
        <div className="profile-item-value">{profile.firstname} {profile.lastname}</div>
      </div>
      <div className="profile-item">
        <div className="profile-item-name">E-mail cím:</div>
        <div className="profile-item-value">{profile.email ?? '-'}</div>
      </div>
      <div className="profile-item">
        <div className="profile-item-name">Telefonszám:</div>
        <div className="profile-item-value">{profilePreference.phone ?? '-'}</div>
      </div>
    </div>
  )
}
