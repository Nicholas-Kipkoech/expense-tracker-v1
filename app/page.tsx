import Login from "./auth/login/page";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Login />
    </main>
  );
}
