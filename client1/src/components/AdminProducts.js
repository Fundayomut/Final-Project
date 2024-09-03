import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from "./ServerCom";
import AdminNav from "./AdminNav";
import { AdminProductsZeilen } from "./AdminProductsZeilen";


export const AdminProducts = () => {

    const [productList, setProductList] = useState([]); // Zustand für die Liste der Produkte
    
    const abrufList = () => {
        ObjectAntwort(
          `/products/abruf/alle`,
          (res) => {
            setProductList(res); // Setzen der Produktliste im Zustand
            console.log(res); // Ausgabe der Antwort im Konsolenprotokoll
          },
          (fehler) => {
            console.log(fehler); // Ausgabe von Fehlern im Konsolenprotokoll
          }
        );
      };
  
    useEffect(() => {
      abrufList(); // Abrufen der Produktliste beim ersten Rendern des Komponenten
    }, []);
  

    return (
        <div className="admin-user-main-div">
          <div className="admin-user-nav-div">
            <AdminNav />
          </div>
          <div className="admin-product-continer-div">
            {typeof productList === "object" && productList.length > 0 ? (
              // Wenn Benutzer vorhanden sind, Liste der Benutzerzeilen anzeigen
              productList.map((item) => (
                <AdminProductsZeilen key={item.productNumber} daten={item} />
              ))
            ) : (
              <p>Keine Datei</p> // Wenn keine Benutzerdaten vorhanden sind
            )}
          </div>
        </div>
      );
    };
    