import Image from "next/image";
import kyaru from "../../public/images/kyaru.gif";

const LoadingPlaceholder = () => {
  return (
    <Image
      src={kyaru}
      alt="Deadge"
      priority
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
};

export default LoadingPlaceholder;
