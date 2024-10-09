import user from '@/models/user';
import React from 'react'
import cookie from 'cookie';
import mongoose from 'mongoose';
import blog from '@/models/blog';
import Link from 'next/link';
const myposts = ({user , posts}) => {
  return (

    <>
 
    <div className=' text-gray-700 dark:text-white text-center text-3xl my-10'>{user.name}</div>

    <div className="max-w-6xl mx-auto p-4 md:p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                <Link href={`/blog/${post._id}`}>
                  <p className="hover:text-blue-600 transition-colors duration-200">{post.title}</p>
                </Link>
              </h3>
              <p className="text-gray-500 text-sm mt-1">By {post.author}</p>
              <p className="text-gray-500 text-xs mt-1">{post.category}</p>
              <p className="mt-3 text-gray-700 line-clamp-3">{post.content}</p>
              <p className="text-gray-400 text-xs mt-4">
                Posted on {new Date(post.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        ))}
      </div>
      </>
  )
}

export async function getServerSideProps(context) {

  const { req } = context;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const email = cookies.email || null;

    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  
    const u = await user.findOne({ email:email });
    const post = await blog.find({author:u.name})
    return {
      props: { user: u ? JSON.parse(JSON.stringify(u)) : [] ,posts: post ? JSON.parse(JSON.stringify(post)) : []},
    };
  }

export default myposts