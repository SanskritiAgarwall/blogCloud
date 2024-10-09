import React from 'react'
import Image from 'next/image'
const about = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-10 px-5 lg:px-20">

    <header className="text-center mb-12">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white">About Us</h1>
      <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
        Discover the purpose and vision behind our blog
      </p>
    </header>

    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
          Welcome to our blog, where we bring you insights from various industries, share expert knowledge, and provide the latest trends and tips. Our goal is to create a platform where readers can find inspiration, stay informed, and connect with like-minded individuals. Whether it's business, tech, fashion, or fitness, we cover it all!
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          With a team of dedicated writers and contributors, we aim to deliver high-quality content that makes a difference in your everyday life. Dive into our various categories and explore articles that matter.
        </p>
      </div>

      <div className="lg:w-1/2">
        <Image
          src="/images/blogone.jpg"
          alt="About us"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">What We Cover</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Business", description: "Insights into the latest trends in business, technology, and startups." },
          { title: "Travel", description: "Explore the world through our travel guides, tips, and experiences." },
          { title: "News", description: "Stay updated with global news and important events." },
          { title: "Fitness", description: "Health and fitness tips to keep your body and mind in shape." },
          { title: "Movies", description: "Reviews and analysis of the latest blockbusters and indie films." },
          { title: "Fashion", description: "Get the latest in fashion trends, styling tips, and outfit inspiration." },
        ].map((category, index) => (
          <div key={index} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{category.title}</h3>
            <p className="text-gray-700 dark:text-gray-400">{category.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-gray-100 dark:bg-gray-800 py-10 rounded-lg shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Our mission is to inform, inspire, and empower our readers through quality content. We believe that knowledge is key to growth and success, and we're here to share that knowledge with you.
        </p>
      </div>
    </section>
  </div>
  )
}

export default about