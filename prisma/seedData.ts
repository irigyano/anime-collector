export const seedUsers = [
  {
    username: "boy30406",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/asiagodtonegg3be0-profile_image-081feb3428b1a1c6-150x150.jpeg",
  },
  {
    username: "力量人",
    image:
      "https://yt3.ggpht.com/IHSLqZySPR-KF9fhiBj9lsAZrz3a8fomzqRbyY0q_Pm_3_uyfQWaIJEdB_bHjTTZPApCCOUU=s48-c-k-c0x00ffffff-no-rj",
  },
  {
    username: "黃香梅",
    image:
      "https://yt3.googleusercontent.com/ytc/AIdro_keJnoDcYGpXwPRV_nFVQfGY3k8bZgN8UNh_CJmDw=s68-c-k-c0x00ffffff-no-rj-mo",
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
