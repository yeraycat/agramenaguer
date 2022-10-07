import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pocketbaseClient } from "../lib/pocketbase";

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
    console.log("hola");
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
          <button
            className={`w-28 border-2 text-white border-black-light bg-black-light w-full rounded py-2 px-4 font-bold px-2 ${
              isInvalid
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-blue-medium hover:bg-blue-medium cursor-pointer"
            }`}
            onClick={() => createPost()}
            disabled={isInvalid}
          >
            Post
          </button>
        )}
        {uploading && (
          <button
            className={`w-auto flex border-2 text-white border-black-light bg-black-light w-full rounded py-2 px-4 font-bold px-2 opacity-50 cursor-not-allowed hover:border-blue-medium hover:bg-blue-medium `}
            disabled={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="animate-spin w-6 h-6 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Uploading
          </button>
        )}
      </div>
    </div>
  );
}
