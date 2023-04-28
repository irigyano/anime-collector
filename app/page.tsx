import MiniPage from "@/components/Works/MiniPage";
import { User } from "@prisma/client";

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
        query: `query {
            searchWorks(
              seasons:["2023-spring"]
              orderBy: { field: WATCHERS_COUNT, direction: DESC }
            ) {
              nodes {
                annictId
                title
                titleKana
                seasonName
                seasonYear
                media
                twitterHashtag
                episodesCount
                image{facebookOgImageUrl,recommendedImageUrl}         
                casts(first:5){nodes{name,character{name}}}
              }
            }
          }`,
      }),
      cache: "no-store",
    })
  ).json();
  const results = data.searchWorks.nodes;
  return results;
}

const HomePage = async ({ params }: { params: { currentUser: User } }) => {
  const worksData = await fetchData();
  const currentUser = params.currentUser;
  return (
    <main>
      <MiniPage worksData={worksData} currentUser={currentUser} mode="view" />
    </main>
  );
};

export default HomePage;
