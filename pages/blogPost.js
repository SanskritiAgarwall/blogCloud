import React, { useEffect } from 'react';
import Link from 'next/link';
import user from '@/models/user';
import mongoose from 'mongoose';
import cookie from 'cookie';
import { useState } from 'react';
import harshWordsSet from '@/data/harsh';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BlogPost = ({ initialUser }) => {

  const [u, setU] = useState(initialUser)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const harshWords = harshWordsSet.toString();

  const checkHarshWords = (message, harshWords) => {
    const words1 = message.split(/\s+/); // The original words from message, including punctuation
    const cleanWords1 = message.replace(/[.,;!]/g, "").toLowerCase().split(/\s+/); // Cleaned words for comparison
    const words2 = harshWords.replace(/[.,;!]/g, "").toLowerCase().split(/\s+/); // Harsh words

    let hasHarshWords = false;

    // Iterate over the original message words and highlight those that match harsh words
    const updatedMessage = words1.map((word, index) => {
      const cleanWord = cleanWords1[index]; // Use the cleaned word for comparison
      if (words2.includes(cleanWord)) {
        hasHarshWords = true;
        return `<span class="text-red-500 font-bold bg-black dark:bg-white px-2 py-1">${word}</span>`; // Highlight harsh words
      }
      return word;
    }).join(" "); // Join the words back to form a sentence

    return { hasHarshWords, updatedMessage };
  };


  const validateForm = () => {
    let formErrors = {};

    if (!title) {
      formErrors.title = 'Blog title is required.';
    }

    if (!category) {
      formErrors.category = 'Please select a category.';
    }

    if (!content) {
      formErrors.content = 'Blog content is required.';
    }

    if (!message) {
      formErrors.message = 'Blog message is required.';
    }

    const { hasHarshWords, updatedMessage } = checkHarshWords(message, harshWords);

    if (hasHarshWords) {
      formErrors.harshWords = `Your BLOG contains some harsh words. Please review: ${updatedMessage}`;
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const blogData = {
        title,
        category,
        content,
        message,
        author: initialUser.name || "John Doe",
      };

      try {
        const response = await fetch('/api/blogPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        });

        const data = await response.json();

        if (response.ok) {
          setTitle("");
          setCategory("");
          setContent("");
          setMessage("");
          
          toast.success('BLOG posted successfully', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });



        } else {
          console.error('Failed to submit the form:', data.error);
          toast.error('There was some validations issues.', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      } catch (error) {
        console.error('An error occurred while submitting the form:', error);
      }
    } else {
      alert("Validation failed.")
  
    }
  };

  return (
    <>

      <div className='dark:bg-black bg-white pb-10'>
      <ToastContainer
position="top-center"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


        <p className="text-center text-3xl font-bold dark:text-white text-gray-700 py-10 ">Welcome<span className='text-4xl text-blue-700 font-thin'> {u ? u.name : 'Guest'}</span></p>

        <div className=" px-4 py-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Write Your Own Blog</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2" htmlFor="title">Blog Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2" htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              >
                <option value="">Select a category</option>
                <option value="business">Business Blog</option>
                <option value="travelling">Travelling Blog</option>
                <option value="News Blog">News Blog</option>
                <option value="Fitness">Fitness</option>
                <option value="Movies">Movies</option>
                <option value="Fashion">Fashion</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2" htmlFor="content">Blog Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                placeholder="Write your message here..."
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out ${errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              ></textarea>
              {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content}</p>}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2" htmlFor="content">Blog Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                placeholder="Write your thoughts here..."
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out ${errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
              {errors.harshWords && (
                <p
                  className="text-red-500 text-sm mt-2"
                  dangerouslySetInnerHTML={{ __html: errors.harshWords }}
                />
              )}
            </div>

            {initialUser && <div className="flex justify-end space-x-4">
              <button
                type="reset"
                className="px-6 py-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium rounded-lg transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition duration-150 ease-in-out"
              >
                Publish
              </button>
            </div>}
            {
              !initialUser &&
              <Link href={"/login"}>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition duration-150 ease-in-out"
                >
                  You have to login
                </button>
              </Link>
            }
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const email = cookies.email || null;

  if (!email) {
    return {
      props: { initialUser: null },
    };
  }

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let u = await user.findOne({ email });
  return {
    props: { initialUser: u ? JSON.parse(JSON.stringify(u)) : null },
  };
}
export default BlogPost;
