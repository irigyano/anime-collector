import Image from "next/image";
import kyaru from "../../public/images/kyaru.gif";

const LoadingPlaceholder = () => {
  return (
    <div className="flex justify-center items-center h-screen pb-40 w-screen fixed">
      <Image src={kyaru} alt="Deadge" />
    </div>
  );
};

export default LoadingPlaceholder;
