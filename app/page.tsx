import MiniPage from "@/components/Works/MiniPage";

async function fetchData() {
  // const response = await fetch("http://localhost:3000/api/search/seasons?season=2023-spring", {
  const response = await fetch(`${process.env.VERCEL_URL}/api/search/seasons?season=2023-spring`, {
    cache: "no-store",
  });
  return response.json();
}

const HomePage = async () => {
  const worksData = await fetchData();

  return (
    <main>
      <MiniPage worksData={worksData} mode="view" />
    </main>
  );
};

export default HomePage;
