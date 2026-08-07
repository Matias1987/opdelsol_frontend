import React, { useState } from "react";
import { Dropdown, Menu, message, Modal } from "antd";

const MiniImageGallery = ({ images, onDelete, onSetDefault, size }) => {
  const [contextImage, setContextImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleMenuClick = (e, image) => {
    if (e.key === "delete") {
      onDelete(image.id);
    } else if (e.key === "default") {
      onSetDefault(image.id);
    }
  };

  const menu = [
    {
      label: "Est. por Defecto",
      key: "default",
      disabled: false, //for now, we disable this option, as it is not implemented yet
      icon: <span style={{ color: "gold" }}>★</span>, // You can use an icon here
    },
    {
      label: "Eliminar",
      key: "delete",
      disabled: false, //for now, we disable this option, as it is not implemented yet
      icon: <span style={{ color: "red" }}>🗑️</span>, // You can use an icon here
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        backgroundColor: "#f0f0f0",
        padding: "8px",
        border: "1px solid #e2e2e2",
        borderRadius: "4px",
      }}
    >
      {images.map((img) => (
        <Dropdown
          key={img.id}
          menu={{
            items: menu,
            onClick: (e) => {
              handleMenuClick(e, img);
            },
          }}
          trigger={["contextMenu"]}
        >
          <div
            style={{
              width: size ? size.w : 80,
              height: size ? size.h : 80,
              border: img.isDefault ? "8px solid gold" : "4px solid #d4d4d4",
              borderRadius: 4,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => setPreviewImage(img.url)} // click opens modal
          >
            <img
              src={img.url}
              alt="thumb"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Dropdown>
      ))}
      {/* Full-size preview modal */}
      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
        centered
        width="80%"
      >
        {previewImage && (
          <img
            src={previewImage}
            alt="full"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Modal>
    </div>
  );
};
/*
// Usage example
const Example = () => {
  const [images, setImages] = useState([
    { id: 1, url: "/img1.jpg", isDefault: true },
    { id: 2, url: "/img2.jpg", isDefault: false },
  ]);

  const handleDelete = (id) => setImages(prev => prev.filter(i => i.id !== id));
  const handleSetDefault = (id) =>
    setImages(prev => prev.map(i => ({ ...i, isDefault: i.id === id })));

  return (
    <MiniImageGallery
      images={images}
      onDelete={handleDelete}
      onSetDefault={handleSetDefault}
    />
  );
};*/

export default MiniImageGallery;
