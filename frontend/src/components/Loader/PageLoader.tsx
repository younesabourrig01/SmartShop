import React from "react";
import { TailSpin } from "react-loader-spinner";

interface LoaderProps {
  size?: string | number;
  color?: string;
  visible?: boolean;
}

const PageLoader: React.FC<LoaderProps> = ({
  size = 80,
  color = "#5f7ed4",
  visible = true,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <TailSpin
        visible={visible}
        height={size}
        width={size}
        color={color}
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default PageLoader;
