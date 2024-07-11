import React from "react";
import { Layout } from "antd";
function Footer({ currenttheme }) {
  const { Footer } = Layout;
  return (
    <>
      <Footer
        style={{
          backgroundColor: "transparent",
          color: "black",
        }}
      >
        <div className="font-semibold">
          <h3>
            Copyright © 2024{" "}
            <span className="text-orange-500 font-semibold">Pansari.pk</span>{" "}
            All rights reserved.
          </h3>
        </div>
      </Footer>
    </>
  );
}

export default Footer;
