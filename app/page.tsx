import Login from "./auth/login/page";

export default async function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Login />
    </main>
  );
}
