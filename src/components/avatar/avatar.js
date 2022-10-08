import PropTypes from "prop-types";

export function Avatar({ username, imageUrl, className }) {
  const fallbackLetter = username[0].toUpperCase();
  return (
    <>
      {imageUrl && (
        <img
          className={`rounded-full w-8 h-8 mr-3 bg-grey-primary flex items-center justify-center ${className}`}
          src={imageUrl}
          alt={`${fallbackLetter}`}
        />
      )}
      {!imageUrl && (
        <div
          className={`rounded-full w-8 h-8 flex mr-3 items-center justify-center bg-grey-primary font-semibold ${className}`}
        >
          {fallbackLetter}
        </div>
      )}
    </>
  );
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  className: PropTypes.string,
};
