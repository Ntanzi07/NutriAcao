import Image from "next/image"

type Props = {
  size?: number;
};

const LoadingLogo = ({ size = 300 }: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Image
        src="/logo.png"
        alt="Logo" width={size}
        height={size}
        className="animate-pulse duration-800"
      />
    </div>
  )
}

export default LoadingLogo