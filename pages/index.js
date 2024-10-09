import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import harsh from "@/data/harsh";

export default function Home() {


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.style.backgroundColor="black"
        }else{
            document.body.style.backgroundColor="white"

        }
    }, []);
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center gap-10 items-center bg-white dark:bg-gray-900">
                <div className="flex flex-col py-10 gap-5">
                    <p className="text-3xl text-gray-900 dark:text-white">
                        Welcome to our <span className="text-4xl font-bold">Blog Site</span>
                    </p>
                </div>
                <div>
                    <Image className="m-auto w-96 my-8 bg-cover" src="/images/bg4.png" alt="background" width={384} height={384} />
                </div>
            </div>


            <div className="dark:bg-black bg-white  dark:pt-8">

            <h2 className="text-center dark:px-10 dark:mt-16 text-5xl font-extrabold border-4 border-red-800 dark:border-none p-3 rounded-full w-fit m-auto text-gray-900 dark:text-white dark:bg-gray-700">
                Blogs
            </h2>

            <p className='text-4xl text-center dark:text-white  font-semibold text-gray-900 my-10 '>Blog Categories</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-5 lg:mx-20 ">
                {[
                    { title: "Business Blog", description: "Explore the latest in technology, from AI to VR. The future is now!", link: "/businessBlog" },
                    { title: "Travelling Blog", description: "Global markets are volatile—find out what’s moving today.", link: "/travellingBlogs" },
                    { title: "News Blog", description: "The latest on global efforts to combat climate change and what you can do.", link: "/newsBlog" },
                    { title: "Fitness", description: "The latest updates on the global political landscape and key figures to watch.", link: "/fitness" },
                    { title: "Movies", description: "Get the latest news on health breakthroughs and tips for a better lifestyle.", link: "/movies" },
                    { title: "Fashion", description: "Join the journey to the stars with the latest news on space exploration missions.", link: "/fashion" },
                ].map((blog, index) => (
                    <div key={index} className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
                        <Link href={blog.link} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>

            </div>
        </>
    );
}
