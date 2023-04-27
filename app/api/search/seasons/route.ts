import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const season = searchParams.get("season")
    ? `seasons:["${searchParams.get("season")}"]`
    : `seasons:["2023-spring"]`;

  console.log("api/search/seasons", season);

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
              ${season}
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
  return NextResponse.json(results);
}
