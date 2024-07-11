import { Skeleton } from "antd";
import React from "react";

function SkeletonLoader() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Skeleton  />
        </div>
      </div>
    </>
  );
}

export default SkeletonLoader;
