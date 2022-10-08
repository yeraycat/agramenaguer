import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pocketbaseClient } from "../lib/pocketbase";
import { ButtonPrimary } from "./buttons/button";
import { UploadingIcon } from "./icons/uploading";

export default function CreatePost({ userId, profileId, username }) {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isInvalid = !imageFile || !caption;

  const onFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append("media_content", imageFile);
    formData.append("text_content", caption);
    formData.append("user", userId);
    formData.append("userprofile", profileId);
    setUploading(true);
    try {
      await pocketbaseClient.records.create("posts", formData);
      navigate(`/p/${username}`);
      setUploading(false);
    } catch (error) {
      console.error({ error });
      setUploading(false);
      setError({ message: "upload failed", error });
    }
  };

  return (
    <div className="w-full m-auto lg:w-3/5 p-4 rounded border-2 border-black-light flex flex-col items-center">
      <div className="w-full min-h-[430px] max-h[430px] rounded bg-grey-primary flex flex-col items-center justify-center relative">
        {!imageFile && <p>Upload your image</p>}
        {imageFile && (
          <img
            className="w-full rounded h-full"
            src={URL.createObjectURL(imageFile)}
            alt={imageFile.name}
          />
        )}
        <input
          className="w-full h-full opacity-0 absolute cursor-pointer"
          type="file"
          id="fileInput"
          onChange={onFileChange}
        />
      </div>
      <div className="w-full py-4">
        <textarea
          className="w-full resize-none"
          rows={3}
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
      </div>
      <div className="w-full flex justify-end">
        <Link
          to="/"
          className="w-28 border-2 border-grey-primary hover:bg-grey-primary w-full rounded font-bold py-2 px-4 mr-4 text-center"
        >
          Cancel
        </Link>
        {!uploading && (
          <ButtonPrimary
            className="w-28 hover:border-blue-medium hover:bg-blue-medium"
            onClick={() => createPost()}
            disabled={isInvalid}
          >
            Post
          </ButtonPrimary>
        )}
        {uploading && (
          <ButtonPrimary
            className={`w-auto flex hover:border-blue-medium hover:bg-blue-medium`}
            disabled={true}
          >
            <UploadingIcon />
            Uploading
          </ButtonPrimary>
        )}
      </div>
    </div>
  );
}
