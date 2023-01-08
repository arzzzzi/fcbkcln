function Post({ name, message, email, postImage, image, timestamp }) {
  return (
    <div className="flex flex-1">
      <div>
        <img src={image} alt="avatar" height={40} width={40} className="rounded-full" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-400">{new Date(timestamp?.toDate()).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
