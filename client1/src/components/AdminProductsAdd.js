import React, { useState } from "react";
import { TextAntwort } from "./ServerCom";
import "./Admin.css";
import AdminNav from "./AdminNav";

export const AdminProductsAdd= () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [inhalt, setInhalt] = useState("");

    function ProductHinzu() {
        const parsedPrice = parseFloat(price) || 0;
        const encodedImage = encodeURIComponent(image);

        TextAntwort(
            `/products/neu/${name}/${category}/${size}/${parsedPrice}/${encodedImage}/${description}/${inhalt}`,
            (antwort) => {
                console.log("Neues Produkt", antwort);
            },
            (fehler) => {
                console.log("Fehler", fehler);
            }
        );
    }

    return (
        <>
        <div>
            <AdminNav/>
        </div>
        <div className="admin-product-main-div">
            <div className="admin-product-container">
                <input type="text" placeholder="Produktname" className="admin-product-input" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Kategorie" className="admin-product-input" onChange={(e) => setCategory(e.target.value)} />
                <input type="text" placeholder="Größe" className="admin-product-input" onChange={(e) => setSize(e.target.value)} />
                <input type="number" placeholder="Preis" className="admin-product-input" onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder="Bild-URL" className="admin-product-input" onChange={(e) => setImage(e.target.value)} />
                <input type="text" placeholder="Beschreibung" className="admin-product-input" onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Inhalt" className="admin-product-input" onChange={(e) => setInhalt(e.target.value)} />
                <button className="button" onClick={ProductHinzu}>Add</button>
            </div>
        </div>
        </>
    );
};
