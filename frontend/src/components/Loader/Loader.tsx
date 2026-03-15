import React from "react";
import { TailSpin } from "react-loader-spinner";

interface LoaderProps {
  size?: string | number;
  color?: string;
  visible?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 20, 
  color = "#ffffff", 
  visible = true 
}) => {
  return (
    <TailSpin
      visible={visible}
      height={size}
      width={size}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
