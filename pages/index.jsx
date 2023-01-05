import Head from 'next/head';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home({ session }) {
  if (!session) return <Login />;
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        {/* Widgets */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
