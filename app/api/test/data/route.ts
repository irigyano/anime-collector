import { NextResponse } from "next/server";
import { Base64 } from "js-base64";
import Dump from "./DumpData.json";

function getRandomSubarray(arr: any, length: number) {
  const startIndex = Math.floor(Math.random() * (arr.length - length + 1));
  const endIndex = startIndex + length;
  return arr.slice(startIndex, endIndex);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log(searchParams.get("title"));

  const title = searchParams.get("title")
    ? `titles:["${Base64.decode(searchParams.get("title") ? `${searchParams.get("title")}` : "")}"]`
    : null;
  const season = searchParams.get("season") ? `seasons:["${searchParams.get("season")}"]` : null;

  console.log("api/test called", "title", title, "season", season);

  const response = getRandomSubarray(Dump, 3);

  return NextResponse.json(response);
}
