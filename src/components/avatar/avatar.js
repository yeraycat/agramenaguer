import PropTypes from "prop-types";

export function Avatar({ imageUrl, username }) {
  return (
    <>
      {imageUrl && (
        <img
          className="rounded-full w-8 h-8 flex mr-3"
          src={imageUrl}
          alt={`${username}'s avatar`}
        />
      )}
      {!imageUrl && (
        <div className="rounded-full w-8 h-8 flex mr-3 items-center justify-center bg-grey-primary font-semibold">
          {username[0].toUpperCase()}
        </div>
      )}
    </>
  );
}

Avatar.propTypes = {
  imageUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
};
