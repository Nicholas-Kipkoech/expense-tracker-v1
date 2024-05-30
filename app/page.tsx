import Login from "./auth/login/page";
import { connectToDatabase } from "./lib/moongose";

export default async function Home() {
  await connectToDatabase();
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Login />
    </main>
  );
}
