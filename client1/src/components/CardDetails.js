import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import Modal from "./Modal";

export const CardDetails = () => {
  const { productNumber } = useParams(); // Product-Nummer aus der URL abrufen
  const { userNumber, erlaubnis } = useContext(AuthKontext); // Benutzer-Nummer und Erlaubnis aus dem AuthKontext abrufen
  const [product, setProduct] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false); // Zustand für die Sichtbarkeit des Modals
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Zustand für die Erfolgsmeldung nach dem Hinzufügen zum Warenkorb
  const [showInhaltModal, setShowInhaltModal] = useState(false); // Zustand für die Sichtbarkeit des Inhaltsmodals

  useEffect(() => {
    // Abrufen der Produktinformationen
    ObjectAntwort(
      `/products/abruf/${productNumber}`,
      (res) => {
        setProduct(res[0]);
      },
      (fehler) => {
        console.log(fehler);
      }
    );

    // Abrufen der Nährwertinformationen
    ObjectAntwort(
      `/nutrition/abruf/${productNumber}`,
      (res) => {
        setNutrition(res[0]);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  }, [productNumber]); // Effekt, um Produkt- und Nährwertinformationen basierend auf der Produktnummer abzurufen

  useEffect(() => {
    updateCartCount();
  }, []); // Effekt, um die Anzahl der Produkte im Warenkorb beim Laden der Komponente zu aktualisieren

  const updateCartCount = () => {
    // Warenkorb aus dem lokalen Speicher abrufen
    const warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];

    // Filtert die Artikel für den aktuellen Benutzer heraus
    const userItems = warenkorb.filter(
      (item) => item.userNumber === userNumber
    );

    // Berechnet die Gesamtzahl der Artikel des Benutzers im Warenkorb
    const totalUserItems = userItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(totalUserItems); // Aktualisiert den Zustand für die Anzahl der Produkte im Warenkorb
  }; // Funktion zur Aktualisierung der Anzahl der Produkte im Warenkorb für den aktuellen Benutzer

  const Aktualisieren = () => {
    if (!erlaubnis) {
      setShowModal(true);
      return;
    }

    // Neue Details für das Produkt im Warenkorb erstellen
    const neueDetails = {
      productNumber: productNumber,
      quantity: quantity,
      price: product?.price,
      size: product?.size,
      image: product?.image,
      name: product?.name,
      userNumber: userNumber,
      inhalt: product?.inhalt,
    };

    // Warenkorb aus dem lokalen Speicher abrufen
    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];

    // Überprüft, ob das Produkt bereits im Warenkorb vorhanden ist.
    // Wenn das Produkt bereits existiert, wird die Menge aktualisiert.
    const existingItemIndex = warenkorb.findIndex(
      (item) => item.productNumber === productNumber
    );
    if (existingItemIndex >= 0) {
      warenkorb[existingItemIndex].quantity += quantity; // Wenn das Produkt gefunden wurde, wird die Menge des bestehenden Eintrags erhöht.
    } else {
      warenkorb.push(neueDetails); // Wenn das Produkt nicht im Warenkorb ist, wird es neu hinzugefügt.
    }

    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    // Speichert den aktualisierten Warenkorb im lokalen Speicher.
    updateCartCount();
    // Aktualisiert die Anzahl der Artikel im Warenkorb.

    setShowSuccessMessage(true); // Zeigt die Erfolgsmeldung an

    setTimeout(() => {
      setShowSuccessMessage(false); //Blendet die Erfolgsmeldung nach 2 Sekunden aus
    }, 2000); // 2000 ms = 2 saniye
  }; // Funktion zum Hinzufügen des Produkts zum Warenkorb

  const inhaltShow = () => {
    setShowInhaltModal(true); // Zeigt das Inhaltsmodal an
  }; // Funktion zum Anzeigen des Inhaltsmodals

  useEffect(() => {
    if (erlaubnis) {
      updateCartCount(); // Aktualisiert die Warenkorbanzahl bei Änderung der Erlaubnis
    }
  }, [erlaubnis]); // Effekt zur Aktualisierung der Warenkorbanzahl bei Änderung der Erlaubnis

  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div className="card-detail-main">
        {product ? (
          <div className="card-detail-content">
            <div className="card-detail-image">
              <img src={product.image} alt={product.name} width="100%" />
              <div>
                <p className="card-detail-p">
                  Allergy Notice: Some of our products may contain nuts. Our
                  facility is NOT a nut-free facility, and as a result it is
                  possible that any product may have come in contact w/ nut or
                  nut oils.
                </p>
              </div>
            </div>
            <div className="card-detail-info">
              <div className="card-detail-header">
                <h1>{product.name}</h1>
              </div>
              <div className="card-detail-description">
                <p>{product.description}</p>
              </div>
              <div className="card-detail-size">
                <p>{product.size} Person</p>
              </div>
              <div className="card-detail-inhalt">
                <button className="rezeptbutton" onClick={inhaltShow}>
                  Inhalt
                </button>
              </div>
              <div className="card-detail-nutrition">
                <h5>Nutrition Information</h5>
                {nutrition ? (
                  <div className="nutrition-details">
                    <div className="nutrition-item">
                      <strong>Kcal:</strong> {nutrition.kcal}
                    </div>
                    <div className="nutrition-item">
                      <strong>Fat:</strong> {nutrition.fat}
                    </div>
                    <div className="nutrition-item">
                      <strong>Carbs:</strong> {nutrition.carbs}
                    </div>
                    <div className="nutrition-item">
                      <strong>Sugar:</strong> {nutrition.sugar}
                    </div>
                    <div className="nutrition-item">
                      <strong>Fibre:</strong> {nutrition.fibre}
                    </div>
                    <div className="nutrition-item">
                      <strong>Protein:</strong> {nutrition.protein}
                    </div>
                    <div className="nutrition-item">
                      <strong>Salt:</strong> {nutrition.salt}
                    </div>
                  </div>
                ) : (
                  <p>Loading nutrition information...</p>
                )}
              </div>
              <div style={{ marginTop: "50px" }}>
                <div className="card-detail-input-div">
                  <input
                    className="card-detail-input"
                    type="number"
                    placeholder="Anzahl"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    value={quantity}
                  />
                  <div className="card-detail-button-div">
                    <button
                      onClick={Aktualisieren}
                      className="rezeptbutton addButton"
                    >
                      Add to Bag
                    </button>
                  </div>
                  {erlaubnis && (
                    <div className="card-detail-warenkorb-link">
                      <Link to="/Warenkorb">
                        <img
                          src="https://cdn2.iconfinder.com/data/icons/neutro-essential/32/cart-64.png"
                          width="50px"
                          height="50px"
                          alt="basket"
                        />
                        ({cartCount})
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {showSuccessMessage && (
          <div className="success-message">
            <p>Das Produkt wurde dem Warenkorb hinzugefügt!</p>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        className="modal-login"
      >
        <h2>Sie müssen sich anmelden</h2>
        <p>Sie müssen sich anmelden, um Produkte zum Warenkorb hinzuzufügen.</p>
        <button
          className="schlissen-button"
          onClick={() => setShowModal(false)}
        >
          Schließen
        </button>
      </Modal>
      <Modal
        show={showInhaltModal}
        onClose={() => setShowInhaltModal(false)}
        className="modal-inhalt"
      >
        <p className="modal-inhalt-p">{product?.inhalt}</p>
        <button
          className="schlissen-button"
          onClick={() => setShowInhaltModal(false)}
        >
          Schließen
        </button>
      </Modal>
    </>
  );
};
