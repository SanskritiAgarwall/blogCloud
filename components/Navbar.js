import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = ({ user, logout }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check the local storage or system preference for the theme
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setTheme('light');
    }
  };

  return (
    <header className="relative border-b-2 border-gray-500 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white dark:bg-gray-900 text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex w-44 items-center gap-3 flex-row text-xl font-semibold focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Brand"
          >
            <img className="w-10 h-auto rounded-full" src="http://localhost:3000/images/user2.jpg" alt="Logo" />
            <p className="text-gray-900 dark:text-slate-300">Blog Site</p>
          </a>
        </div>
        <div
          id="hs-navbar-example"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div className="flex flex-col items-center gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <button
              id="theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              {theme === 'dark' ? (
                <svg
                  id="theme-toggle-light-icon"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  id="theme-toggle-dark-icon"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <Link
              href="/"
              className="text-lg text-gray-900 dark:text-slate-300 hover:text-gray-400 focus:outline-none"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className="text-lg text-gray-900 dark:text-slate-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-lg text-gray-900 dark:text-slate-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              href="/blogPost"
            >
              Blog
            </Link>
            {!user ? (
              <Link href="/login">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                >
                  Login/Signup
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  logout();
                  
                  // Optional: Redirect to home or login page after logout
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
              >
                Logout
              </button>
            )}
            {user &&
            <Link href={'/myposts'}>
            <p className='text-xl cursor-pointer dark:text-white text-gray-700 border-2 border-blue-600 px-3 py-2 font-mono rounded-3xl'>My Posts</p>
            </Link>
            }
            {/* {mail && <img src="http://localhost:3000/images/user.jpg" className="h-7 mb-2 cursor-pointer" alt="" />} */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
