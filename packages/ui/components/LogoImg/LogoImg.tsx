import clsx from "clsx";
import Image, { ImageProps } from "next/image";

type Props = {
  src: string;
  size?: "sm" | "md" | "lg";
};

const LogoImg = (props: Props & ImageProps) => {
  const { src, size = "sm", ...otherImageProps } = props;

  let logoSize = "";

  switch (size) {
    case "sm":
      logoSize = "h-4 w-4";
      break;
    case "md":
      logoSize = "h-6 w-6";
      break;
    case "lg":
      logoSize = "h-8 w-8";
      break;
  }

  return (
    <div className={clsx("relative", logoSize)}>
      <Image
        layout="fill"
        objectFit="contain"
        src={src}
        alt=""
        priority
        {...otherImageProps}
      />
    </div>
  );
};

export default LogoImg;
