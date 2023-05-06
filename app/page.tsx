import Link from "next/link";

const IndexPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl">IndexPage</h1>
      <Link href={"/home"}>See More</Link>
    </div>
  );
};
export default IndexPage;
