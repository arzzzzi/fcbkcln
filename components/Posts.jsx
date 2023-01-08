import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Post from './Post';
import { db } from '../firebase';

function Posts() {
  const [realtimePosts] = useCollectionData(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
  );

  console.log(realtimePosts);

  return (
    <div>
      {realtimePosts &&
        realtimePosts?.map((post) => (
          <Post
            key={post.id}
            name={post.name}
            message={post.message}
            email={post.email}
            timestamp={post.timestamp}
            image={post.image}
            postImage={post.postImage}
          />
        ))}
    </div>
  );
}

export default Posts;
