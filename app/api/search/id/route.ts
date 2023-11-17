import { NextResponse } from "next/server";
// careful with url max length, considering POST?
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json([]);

  try {
    const res = await fetch("https://api.annict.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ANNICT_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query {
            searchWorks(
              annictIds:[${id}]
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
    });

    const { data } = await res.json();
    return NextResponse.json(data.searchWorks.nodes);
  } catch (error) {
    return NextResponse.json([]);
  }
}
