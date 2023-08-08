import "@/styles/globals.css";
import { AuthProvider } from "../../contexts/AuthContext";
import Layout from "../../components/common/Layout";
import { ProfileProvider } from "../../contexts/ProfileContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProfileProvider>
    </AuthProvider>
  );
}
