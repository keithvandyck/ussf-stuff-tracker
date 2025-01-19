import { Saira_Condensed } from "next/font/google";
import "./globals.css";
import TopBar from '../../components/topbar';
import { AuthProvider } from '../../components/authprovider';

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata = {
  title: "USSF Stuff Tracker",
  description: "Build as a SupraCoder project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={saira.variable}>
        <AuthProvider>
          <TopBar />
          <div className="box-it-in">
          {children}
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}