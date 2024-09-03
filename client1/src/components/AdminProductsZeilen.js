import React, { useEffect, useState } from "react";
import './Admin.css';

// Das AdminProductsZeilen-Komponente stellt die Verwaltung eines Produkts in der Admin-Oberfläche dar.
// Es bietet zwei verschiedene Ansichten: eine zum Anzeigen und eine zum Bearbeiten der Produktdetails.
export const AdminProductsZeilen = ({ daten }) => {
  // useState-Hooks zur Verwaltung der Produktzustände.
  const [productNumber, setProductNumber] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [inhalt, setInhalt] = useState("");
  const [status, setStatus] = useState(false); // Kontrolliert den Bearbeitungsmodus

  // Aktualisiert die Zustände, wenn die Komponente geladen wird oder sich die "daten"-Props ändern.
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

  // Wird aufgerufen, wenn ein Produkt bearbeitet wird, und gibt die aktualisierten Daten in der Konsole aus.
  const bearbeiten = () => {
    console.log("Produkt aktualisieren", { productNumber, name, category, size, price, image, description });
    setStatus(false); // Beendet den Bearbeitungsmodus
  };

  // Schaltet den Bearbeitungsmodus ein.
  const HandleStatusTrue = () => {
    setStatus(true);
  };

  // Wird aufgerufen, wenn ein Produkt gelöscht wird, schreibt den Löschvorgang in die Konsole und lädt die Seite neu.
  const entfernen = () => {
    console.log("Produkt löschen", productNumber);
    window.location.reload();
  };

  return (
    <div>
      <div className="prodLiniecard">
        {!status ? (
          <>
            {/* Kartenansicht mit Produktinformationen */}
            <div className="cardimage">
              <img src={image} alt={name} />
            </div>
            <div className="cardheadtext">
              <p>{name}</p>
            </div>
            <div className="cardtext">{description}</div>
            <div className="cardtext">{inhalt}</div>
            <div className="cardfooter">
              <p><strong>Kategorie:</strong> {category}</p>
              <p><strong>Preis:</strong> ${price}</p>
              <p><strong>Größe:</strong> {size}</p>
            </div>
            <div className="cardbuttondiv">
              {/* Bearbeiten- und Löschen-Schaltflächen */}
              <button className="rezeptbutton" onClick={HandleStatusTrue}>
                Bearbeiten
              </button>
              <button className="orderbutton" onClick={entfernen}>
                Löschen
              </button>
            </div>
          </>
        ) : (
          // Bearbeitungsformular für das Produkt
          <div className="admin-product-edit-form">
            <div className="admin-product-edit-main">
              <div className="admin-product-edit-label">
                <label>Produktname</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="admin-product-edit-label">
                <label>Kategorie</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="admin-product-edit-label">
                <label>Größe</label>
                <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
              </div>
              <div className="admin-product-edit-label">
                <label>Preis</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="admin-product-edit-label">
                <label>Bild-URL</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className="admin-product-edit-label">
                <label>Beschreibung</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="admin-product-edit-label">
                <label>Inhalt</label>
                <textarea value={inhalt} onChange={(e) => setInhalt(e.target.value)} />
              </div>
            </div>
            <div className="admin-product-edit-buttons">
              {/* Speichern- und Löschen-Schaltflächen */}
              <button className="button rezeptbutton" onClick={bearbeiten}>
                Speichern
              </button>
              <button className="button rezeptbutton" onClick={entfernen}>
                Löschen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
