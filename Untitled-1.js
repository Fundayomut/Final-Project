/*
    neueDetails = {
        productNumber : 0,
        quantitiy : 0,
        price : 0
    };
*/

// Add-Knopf
function DetailsAktualisieren(neueDateil)
{
    /*
        Zuerst versuchst du die bestehende Warenkorb aus dem
        localStorage zu lesen. Wenn die noch nicht da ist,
        bekommst du einen leeren Array!
    */
    let warenkorb = 
        localStorage.getItem("warenkorb") === null ||
        localStorage.getItem("warenkorb") === ""
        ?
        [] // leeres Array
        :
        JSON.parse(localStorage.getItem("warenkorb")); // Bestehender Warenkorb
    // *** //
    // Das neue Produkt wird in den Warenkorb hinzugefügt
    warenkorb.push(neueDateil);
    // *** //
    // Das Warenkorb wird wieder in den localStorage
    // zurückgeschrieben, damit die aktuelle Änderung
    // gespeichert wird
    localStorage.setItem(
        "warenkorb",
        JSON.stringify(warenkorb)
    );
}

// Bestellen-Knopf
function Bestellen()
{
    let warenkorb = 
    localStorage.getItem("warenkorb") === null ||
    localStorage.getItem("warenkorb") === ""
    ?
    []
    :
    JSON.parse(localStorage.getItem("warenkorb"));
    // *** //
    if(warenkorb.length == 0)
    {
        console.log("Es sind keine Produkte im Warenkorb!");
    }
    else
    {
        ObjektAntwort(
            "orderTablosonuOku",
            (antwort) => {
                let Bestellung = {
                    orderNumber : 1,
                    useNumber : BenutzerID,
                    orderDate : new Date(),
                    totalAmount : 0
                };
                // *** //
                for(let nummer of antwort)
                {
                    if(Bestellung.orderNumber < number.orderNumber)
                    {
                        Bestellung.orderNumber = number.orderNumber + 1;
                    }
                }
                // *** //
                for(let Element of warenkorb)
                {
                    Bestellung.totalAmount += Element.price;
                    // *** //
                    // --> orderDetails
                    TextAntwort(
                        `orderDetailsSchicken/${Bestellung.orderNumber}/${Element.prodctNumber}/...`,
                        (antwort) => {},
                        (fehler) => console.error(fehler)
                    );
                }
                // *** //
                // --> orders
                TextAntwort(
                    `orderSelbstSchreiben/${Bestellung.orderNumber}/${Bestellung.totalAmount}/...`,
                    (antwort) => {},
                    (fehler) => console.error(fehler)
                );
                // *** //
                localStorage.removeItem("warenkorb");
            },
            (fehler) => console.error(fehler)
        );
    }
}