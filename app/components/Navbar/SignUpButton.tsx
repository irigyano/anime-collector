import Link from "next/link";

const SignUpButton = () => {
  return (
    <Link
      className="flex basis-1/2 justify-center items-center h-8 bg-pink-200 rounded-lg m-2 shadow-md duration-300 hover:bg-pink-300 dark:bg-pink-700 dark:hover:bg-pink-500"
      href={"/signup"}
    >
      <div className="">註冊</div>
    </Link>
  );
};
export default SignUpButton;
