import React from 'react';
import blog from '@/models/blog';
import mongoose from 'mongoose';
import Link from 'next/link';

const movies = ({posts}) => {
  return (
    <>
    <header className="text-center py-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to</h1>
        <h2 className="text-3xl md:text-5xl font-thin">Movies Blog</h2>
      </header>

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

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Business Blog. All rights reserved.
      </footer>
    </>
  )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  
    const posts = await blog.find({ category: 'Movies' });
    return {
      props: { posts: posts ? JSON.parse(JSON.stringify(posts)) : [] },
    };
  }

export default movies