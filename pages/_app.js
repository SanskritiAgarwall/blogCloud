import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const [user, setUser] = useState('');

  const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem("userLoggedIn");
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    setUser('');

    router.push('/login'); 
    
  }

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
  
    if (userLoggedIn == "True") {
      setUser(userLoggedIn);
    }
  }, [router.query]);

  return (
    <>
      <Navbar user={user} logout={logout} />
      <Component logout={logout} {...pageProps} />
      <Footer />
    </>
  );
}
