import { uploads_url } from "@/src/config";

import { get } from "@/src/urls";
import { Image } from "antd";
import { useEffect, useState } from "react";

/**
 *
 * @param idproduct
 */
const DefaultImageProduct = (props) => {
  const { idproduct, width, mustUpdate } = props;
  const [img, setImg] = useState(null);

  useEffect(() => {
    load();
  }, [idproduct, mustUpdate]);

  const load = () => {
    fetch(get.default_product_image + idproduct)
      .then((r) => r.json())
      .then((response) => {
        if (response == null) {
          return;
        }

        if (response.data == null) {
          return;
        }

        if (response.data.length < 1) {
          return;
        }

        setImg((_) => ({ src: uploads_url + response.data[0]?.fname }));
      });
  };

  return img == null ? (
    <></>
  ) : (
    <>
      <Image
        style={{
          borderRadius: "8px",
          border: "1px solid #ffffff",
          boxShadow: "1px 1px 3px 1px #c4c4c4",
        }}
        src={img.src}
        width={width || "70px"}
      />
    </>
  );
};

export default DefaultImageProduct;
