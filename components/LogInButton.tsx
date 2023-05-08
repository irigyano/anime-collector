import Link from "next/link";

const LogInButton = () => {
  return (
    <Link
      className="flex basis-1/2 justify-center items-center h-8 bg-zinc-200 rounded-lg m-2 shadow-md duration-300 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-500"
      href={"/login"}
    >
      <div className="">登入</div>
    </Link>
  );
};
export default LogInButton;
