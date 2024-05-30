import Navbar from "../components/Navbar";
import { ContextProvider } from "../context/context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <Navbar />
      {children}
    </ContextProvider>
  );
}
