import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import { useRef, useState } from 'react';
import { collection, serverTimestamp, addDoc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [postImage, setPostImage] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    await addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((doc) => {
      if (postImage) {
        const storageRef = ref(storage, `posts/${doc.id}`);
        uploadString(storageRef, postImage, 'data_url').then((snapshot) => {
          getDownloadURL(snapshot.ref).then((URL) => {
            setDoc(collection(db, 'posts', doc.id)), { postImage: URL }, { merge: true };
          });
        });
        removeImage();
      }
    });
    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (removeEvent) => {
      setPostImage(removeEvent.target.result);
    };
  };

  const removeImage = () => {
    setPostImage(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image className="rounded-full" src={session.user.image} width={40} height={40} />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button type="submit" className="hidden" onClick={sendPost}>
            Submit
          </button>
        </form>
        {postImage && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
            <img className="object-contain h-10" src={postImage} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div onClick={() => filepickerRef.current.click()} className="inputIcon">
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input ref={filepickerRef} hidden type="file" onChange={addImageToPost} />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
