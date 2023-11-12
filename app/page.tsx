import MiniPage from "@/components/Works/MiniPage";

const apiQuery = `query{searchWorks(seasons:["2024-winter"] orderBy:{field:WATCHERS_COUNT,direction:DESC}){nodes{annictId title titleKana seasonName seasonYear media twitterHashtag episodesCount image{facebookOgImageUrl recommendedImageUrl}casts(first:5){nodes{name person{annictId}character{name annictId}}}}}}`;

// fetching external directly due to how Next builds.
async function fetchData() {
  const { data } = await (
    await fetch("https://api.annict.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ANNICT_TOKEN}`,
      },
      body: JSON.stringify({
        query: apiQuery,
      }),
      cache: "force-cache",
    })
  ).json();
  const results = data.searchWorks.nodes;
  return results;
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
