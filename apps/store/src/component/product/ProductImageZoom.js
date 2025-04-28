import React from "react";
import { ImageZoom } from "react-responsive-image-zoom";

const ProductImageZoom = ({ imageUrl }) => {
  return (
    <div>
      <ImageZoom
        src={imageUrl}
        defaultZoomFactor={2}
        transition={0.3}
        breakpoints={[
          { maxWidth: 768, zoomFactor: 1.2 },
          { maxWidth: 1024, zoomFactor: 1.4 },
        ]}
        imgClassName="my-image-class cursor-zoom-in"
        debug={false}
      />
    </div>
  );
};

export default ProductImageZoom;
