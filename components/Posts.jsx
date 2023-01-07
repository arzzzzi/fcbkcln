import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import app from '../firebase';
import Post from './Post';

function Posts() {
  const [realtimePosts] = useCollection(collection(getFirestore(app), 'hooks'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      {realtimePosts &&
        realtimePosts?.docs.map((post) => (
          <Post
            key={post.id}
            name={post.data().name}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timestamp}
            image={post.data().image}
            postImage={post.data().postImage}
          />
        ))}
    </div>
  );
}

export default Posts;
