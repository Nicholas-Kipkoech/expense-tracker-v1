import Login from "./auth/login/page";
import { connectToDatabase } from "./libs/mongodb";

export default async function Home() {
  await connectToDatabase();
  return (
    <main className="flex justify-center items-center h-screen">
      <Login />
    </main>
  );
}
