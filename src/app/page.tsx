import HomeView from "@/components/home/home-view";

export default async function Home() {
  return (
    <div className="min-h-[calc(100vh-90px)] bg-black w-full text-white p-4">
      <HomeView />
    </div>
  );
}
