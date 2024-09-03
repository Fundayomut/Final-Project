import React, { useEffect, useState } from "react";
import './Admin.css';

export const AdminProductsZeilen = ({ daten }) => {
  const [productNumber, setProductNumber] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [inhalt, setInhalt] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setProductNumber(daten.productNumber);
    setName(daten.name);
    setCategory(daten.category);
    setSize(daten.size);
    setPrice(daten.price);
    setImage(daten.image);
    setDescription(daten.description);
    setInhalt(daten.inhalt);
  }, [daten]);

  const bearbeiten = () => {
    console.log("Ürün güncelle", { productNumber, name, category, size, price, image, description });
    setStatus(false);
  };

  const HandleStatusTrue = () => {
    setStatus(true);
  };

  const entfernen = () => {
    console.log("Ürün sil", productNumber);
    window.location.reload();
  };

  return (
    <div>
    <div className="prodLiniecard">
      {!status ? (
        <>
          <div className="cardimage">
            <img src={image} alt={name} />
          </div>
          <div className="cardheadtext">
            <p>{name}</p>
          </div>
          <div className="cardtext">{description}</div>
          <div className="cardtext">{inhalt}</div>
          <div className="cardfooter">
            <p><strong>Category:</strong>{category}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Size:</strong> {size}</p>
          </div>
          <div className="cardbuttondiv">
            <button className="rezeptbutton" onClick={HandleStatusTrue}>
              Edit
            </button>
            <button className="orderbutton" onClick={entfernen}>
              Delete
            </button>
          </div>
         
        </>
      ) : (
        <div className="admin-product-edit-form">
          <div className="admin-product-edit-main">
            <div className="admin-product-edit-label">
              <label>Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="admin-product-edit-label">
              <label>Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="admin-product-edit-label">
              <label>Size</label>
              <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <div className="admin-product-edit-label">
              <label>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="admin-product-edit-label">
              <label>Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="admin-product-edit-label">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="admin-product-edit-label">
              <label>Inhalt</label>
              <textarea value={inhalt} onChange={(e) => setInhalt(e.target.value)} />
            </div>
          </div>
          <div className="admin-product-edit-buttons">
            <button className="button rezeptbutton" onClick={bearbeiten}>
              Save
            </button>
            <button className="button rezeptbutton" onClick={entfernen}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};
