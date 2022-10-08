import PropTypes from "prop-types";

export function Avatar({ username, imageUrl, className }) {
  return (
    <>
      {imageUrl && (
        <img
          className={`rounded-full w-8 h-8 flex mr-3 ${className}`}
          src={imageUrl}
          alt={`${username}'s avatar`}
        />
      )}
      {!imageUrl && (
        <div
          className={`rounded-full w-8 h-8 flex mr-3 items-center justify-center bg-grey-primary font-semibold ${className}`}
        >
          {username[0].toUpperCase()}
        </div>
      )}
    </>
  );
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};
