import ProfileActions from "./profile-actions";
import ProfileDescription from "./profile-description";
import ProfileStats from "./profile-stats";

export default function ProfileHeader() {
  return (
    <div>
      <div className="user-avatar"></div>
      <div className="profile-info">
        <div>
          Username <ProfileActions />
        </div>
        <ProfileStats />
        <ProfileDescription />
      </div>
    </div>
  );
}
