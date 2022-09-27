import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function User({ username, fullName, imageUrl }) {
  return !username || !fullName ? (
    <div className="flex items-center">
      <Skeleton count={1} circle width={61} height={61} />
      <div className="flex flex-col items-start justify-center ml-2">
        <Skeleton count={1} width={120} height={25} />
        <Skeleton count={1} width={200} />
      </div>
    </div>
  ) : (
    <Link to={`/p/${username}`}>
      <div className="flex items-center">
        <img
          className={`rounded-full h-14 w-14 flex border-2 border-grey-primary `}
          src={imageUrl}
          alt="Profile"
        />
        <div className="flex flex-col items-start justify-center ml-4">
          <p className="text-black-light font-semibold">{username}</p>
          <p className="text-grey-base">{fullName}</p>
        </div>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export default User;
