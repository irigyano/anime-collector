import { LoaderIcon } from "lucide-react";

const LoadingPlaceholder = () => {
  return (
    <div className="absolute top-0 flex h-screen w-full items-center justify-center">
      <LoaderIcon className="h-14 w-14 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingPlaceholder;
