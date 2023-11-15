import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const searchTitle = searchParams.get("title");

  if (!searchTitle) {
    return NextResponse.json({ message: "Missing Title" }, { status: 400 });
  }

  const title = `titles:["${searchTitle}"]`;

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
              ${title}
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
    })
  ).json();
  const results = data.searchWorks.nodes;
  return NextResponse.json(results);
}
