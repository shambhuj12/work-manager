import "./globals.css";
import CustomNavar from "@/components/CustomNavar";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { connectDB } from "@/helper/db";
import UserProvider from "@/context/userProvider";

connectDB();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ToastContainer></ToastContainer>
          <CustomNavar />
          <div className="my-2">{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
