import Image from "next/image";
import type { StaticImageData } from "next/image";

const IntroSlide = ({ imageSrc, text }: { imageSrc: StaticImageData; text: string }) => {
  return (
    <div className="flex flex-col items-cente min-w-fit">
      <Image
        src={imageSrc}
        alt="feature_intro"
        priority
        className="rounded-xl shadow-xl w-auto h-96 md:h-full md:max-h-[600px] "
      />
      <p className="text-center">{text}</p>
    </div>
  );
};
export default IntroSlide;
