import clsx from "clsx";
import Image, { ImageProps } from "next/image";

type Props = {
  src: string;
  size?: "sm" | "md" | "lg";
  isCircular?: boolean;
};

const LogoImg = (props: Props & ImageProps) => {
  const { src, size = "sm", isCircular } = props;

  let logoSize = "";

  switch (size) {
    case "sm":
      logoSize = "h-6 w-6";
      break;
    case "md":
      logoSize = "h-8 w-8";
      break;
    case "lg":
      logoSize = "h-10 w-10";
      break;
  }

  return (
    <div
      className={clsx(
        "relative",
        logoSize,
        isCircular && "rounded-full border-2 border-slate-500 p-[5px]"
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image layout="fill" objectFit="contain" src={src} alt="" priority />
      </div>
    </div>
  );
};

export default LogoImg;
