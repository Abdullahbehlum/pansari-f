import { Flex, Spin } from "antd";
import React from "react";

function Loading() {
  return (
    <>
      <Flex justify="center" align="center" gap={"middle"}>
        <Spin size="large" fullscreen={true} className="text-green-600" spinning={true} />
      </Flex>
    </>
  );
}

export default Loading;
