import { connectToDatabase } from "./lib/moongose";

export default async function Home() {
  await connectToDatabase();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
    </main>
  );
}
