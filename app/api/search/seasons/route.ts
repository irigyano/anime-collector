import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const workYear = searchParams.get("year");
  const workSeason = searchParams.get("season");

  if (!workYear || !workSeason) return NextResponse.json([]);

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
              seasons:["${workYear}-${workSeason}"]
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
                casts(first:5){nodes{name,person{annictId},character{name,annictId}}}
              }
            }
          }`,
      }),
      cache: "force-cache",
    })
  ).json();
  const results = data.searchWorks.nodes;
  return NextResponse.json(results);
}
