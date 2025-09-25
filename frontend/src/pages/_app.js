import "@/styles/globals.css";
import Layout from "../component/Layout";
import DashboardLayout from "@/component/Dashboard/DashboardLayout";
import { Toaster } from "react-hot-toast";
import { createContext, useState, useEffect } from "react";
import API from "@/services/Api";

export const UserContext = createContext();

export default function App({ Component, pageProps, router }) {
  const [user, setUser] = useState(null);
  const isDashboard = router.pathname.startsWith("/dashboard");

  // ✅ Page reload pe backend se user fetch
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API("get", "user/me");
        console.log(res);
        setUser(res.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // ✅ Login ke baad user set karna
  const saveUser = (userData) => {
    setUser(userData);
  };

  // ✅ Logout function
  const logoutUser = async () => {
    try {
      await API("post", "user/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const ProviderWrapper = ({ children }) => (
    <UserContext.Provider value={{ user, setUser: saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );

  if (isDashboard) {
    return (
      <ProviderWrapper>
        <Toaster />
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ProviderWrapper>
    );
  }

  return (
    <ProviderWrapper>
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProviderWrapper>
  );
}
