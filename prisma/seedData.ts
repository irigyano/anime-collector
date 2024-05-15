export const seedUsers = [
  {
    username: "GIGACHAD",
    image: "https://cdn.7tv.app/emote/60ae958e229664e8667aea38/4x.webp",
  },
  {
    username: "COPIUM",
    image: "https://cdn.7tv.app/emote/60ae4ec30e35477634988c18/4x.webp",
  },
  {
    username: "Clueless",
    image: "https://cdn.7tv.app/emote/60b14a737a157a7f3360fb32/4x.webp",
  },
  {
    username: "RIOT",
    image: "https://cdn.7tv.app/emote/61dbb508600369a98b38de67/4x.webp",
  },
  {
    username: "lebronJAM",
    image: "https://cdn.7tv.app/emote/62f424b0ea941a22a1f03268/4x.webp",
  },
  {
    username: "forsen",
    image: "https://cdn.7tv.app/emote/614a3d1e0f25350dc5d78f2d/4x.webp",
  },
  {
    username: "D:",
    image: "https://cdn.7tv.app/emote/639938bf1e2f45552fe4fa03/4x.webp",
  },
  {
    username: "Pepega",
    image: "https://cdn.7tv.app/emote/603eace1115b55000d7282db/4x.webp",
  },
  {
    username: "COCKA",
    image: "https://cdn.7tv.app/emote/60aeaf8b98f4291470c8e64b/4x.webp",
  },
  {
    username: "classic",
    image: "https://cdn.7tv.app/emote/630db7e07b84e74996da9552/4x.webp",
  },
];
export const seedWorks = [
  { workId: 8953, workTitle: "治癒魔法の間違った使い方" },
  { workId: 10079, workTitle: "葬送のフリーレン" },
  { workId: 9696, workTitle: "【推しの子】" },
  { workId: 8631, workTitle: "異世界おじさん" },
  { workId: 8365, workTitle: "その着せ替え人形は恋をする" },
  { workId: 7162, workTitle: "呪術廻戦" },
  { workId: 5459, workTitle: "ゆるキャン△" },
  { workId: 6089, workTitle: "鬼滅の刃" },
  { workId: 5792, workTitle: "青春ブタ野郎はバニーガール先輩の夢を見ない" },
  { workId: 5167, workTitle: "賭ケグルイ" },
  { workId: 4278, workTitle: "聲の形" },
  { workId: 4266, workTitle: "冴えない彼女の育てかた" },
  { workId: 4086, workTitle: "東京喰種トーキョーグール" },
  { workId: 997, workTitle: "進撃の巨人" },
  { workId: 1166, workTitle: "ソードアート・オンライン" },
  { workId: 4547, workTitle: "この素晴らしい世界に祝福を！" },
  { workId: 9125, workTitle: "スキップとローファー" },
  { workId: 4636, workTitle: "Re:ゼロから始める異世界生活" },
  { workId: 10518, workTitle: "薬屋のひとりごと" },
];

export function generateRandomDateWithinPastMonth() {
  const currentDate = new Date();
  const pastMonthDate = new Date(currentDate);
  pastMonthDate.setMonth(currentDate.getMonth() - 1);

  const randomTime =
    Math.random() * (currentDate.getTime() - pastMonthDate.getTime()) +
    pastMonthDate.getTime();
  const randomDate = new Date(randomTime);

  return randomDate;
}
