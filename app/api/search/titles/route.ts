import { NextResponse } from "next/server";
import { Base64 } from "js-base64";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const title = searchParams.get("title")
  //   ? `titles:["${Base64.decode(searchParams.get("title") ? `${searchParams.get("title")}` : "")}"]`
  //   : null;

  const searchTitle = searchParams.get("title");

  if (!searchTitle) {
    return NextResponse.json({ message: "Missing Title" }, { status: 400 });
  }

  const title = `titles:["${Base64.decode(searchTitle)}"]`;

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
