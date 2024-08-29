//
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser")
const app = express();
const Portnummer = 1001;


app.use(cors());
app.use(bodyParser.json())
let db = new sqlite3.Database(
    "./finalProject.db",
    (fehler) => {
        if (fehler)
            console.log(fehler.message)
        else
            console.log("Verbindung zum Datenbak hergestellt")
    }
)


//************************************************
//                   LOGIN
//************************************************

app.get(
    "/userLastName/i:",
    (req, res) => {
        db.all(
            `SELECT * FROM 
            users
            WHERE
            userNumber='${req.params.i}'
            `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.error(fehler)
                    res.send("")
                }
                else {
                    if (zeilen.length > 0) {
                        res.send(zeilen[0].userFirstName + " " + zeilen[0].userLastName
                        )
                    }
                    else {
                        res.send("");
                    }
                }
            }
        )
    }
)

app.get("/login/:b/:k",
    (req, res) => {
        db.all(
            `SELECT * FROM
            users
            WHERE
            eMail='${req.params.b}'
            AND
            password='${req.params.k}'
            `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.error(fehler);
                    res.send("{}");
                }
                else {
                    if (zeilen.length > 0) {
                        let konto = {
                            id: zeilen[0].userNumber,
                            kt: zeilen[0].userType,
                            vn: zeilen[0].userFirstName,
                            nm: zeilen[0].userLastName,
                        };
                        res.send(
                            JSON.stringify(konto)
                        );
                    }
                    else {
                        res.send("{}")
                    }
                }
            }
        )
    }
)

//************************************************
//           ABRUF/DELETE/UPDATE/INSERT
//************************************************
app.get("/products/abruf/alle",
    (req, res) => {
        db.all(
            `SELECT * FROM products`,
            (fehler, zeilen) => {
                if (fehler) {
                    res.send(fehler)
                } else {
                    res.send(zeilen)
                }
            }
        )
    })

app.get(
    "/",
    (req, res) => {
        res.send("Product List");
    }
)


app.get("/products/neu/:name/:category/:size/:price/:image/:description",
    (req, res) => {
        db.run(
            `INSERT INTO products
        (name,category,size,price,image,description)
        VALUES
        (
        '${req.params.name}',
        '${req.params.category}',
        '${req.params.size}',
        '${req.params.price}',
        '${req.params.image}',
        '${req.params.description}'
        )
        `,
            (fehler) => console.log(fehler)
        )
        res.send("Cake Hinzugefügt")
    })


app.get("/rezept/abruf/alle",
    (req, res) => {
        db.all(
            `SELECT * FROM rezept`,
            (fehler, zeilen) => {
                if (fehler) {
                    res.send(fehler)
                } else {
                    res.send(zeilen)
                }
            }
        )
    })

///////////////////////////////
app.get(
    "/rezept/abruf/wer/:id",
    (req, res) => {
        db.all(
            `SELECT * FROM rezept
                WHERE rezeptNumber='${req.params.id}'
                `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.log(fehler)
                    res.send("[]");
                }
                else {
                    res.send(JSON.stringify(zeilen))
                }
            }
        )
    }
)
////////////////////

app.get("/products/update/:id/:name/:category/:size/:price/:image/:description",
    (req, res) => {
        db.run(
            `UPDATE products SET
        name='${req.params.name}',
        category='${req.params.category}',
        size='${req.params.size}',
        price='${req.params.price}',
        image='${req.params.image}',
        description='${req.params.description}'
        WHERE 
        productNumber=${req.params.id}`,
        )
        res.send("Products update sucsesfully")
    })

app.get("/products/delete/:id",
    (req, res) => {
        db.run(
            `DELETE FROM products
            WHERE productNumber=${req.params.id}`
        );
        res.send("Products Entfernen")
    })

app.get(
    "/products/abruf/wer/:id",
    (req, res) => {
        db.all(
            `SELECT * FROM products
            WHERE productNumber='${req.params.id}'
            `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.log(fehler)
                    res.send("[]");
                }
                else {
                    res.send(JSON.stringify(zeilen))
                }
            }
        )
    }
)


app.get(
    "/products/abruf/:id",
    (req, res) => {
        db.all(
            `SELECT * FROM products
            WHERE productNumber='${req.params.id}'
            `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.log(fehler)
                    res.send("[]");
                }
                else {
                    res.send(JSON.stringify(zeilen))
                }
            }
        )
    }
)


/////////////////////////////////////

app.get(
    "/products/abruf/category/:category",
    (req, res) => {
        db.all(
            `SELECT * FROM products
           WHERE category='${req.params.category}'
            `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.log("fehler--->", fehler)
                    res.send("[fehler]");
                }
                else {
                    res.send(JSON.stringify(zeilen))
                    console.log(zeilen)
                }
            }
        )
    }
)

app.get("/user/abruf/alle",
    (req, res) => {
        db.all(
            `SELECT * FROM users`,
            (fehler, zeilen) => {
                if (fehler) {
                    res.send(fehler)
                } else {
                    res.send(zeilen)
                }
            }
        )
    })



app.get("/user/neu/:userNickName/:userFirstName/:userLastName/:userType/:eMail/:phone/:adresLine1/:adresLine2/:city/:state/:postalCode/:country/:password",
    (req, res) => {
        db.run(
            `INSERT INTO users
        (userNickName,userFirstName,userLastName,userType,eMail,phone,adresLine1,adresLine2,city,state,postalCode,country,password)
        VALUES
        (
        '${req.params.userNickName}',
        '${req.params.userFirstName}',
        '${req.params.userLastName}',
        '${req.params.userType}',
        '${req.params.eMail}',
        '${req.params.phone}',
        '${req.params.adresLine1}',
        '${req.params.adresLine2}',
        '${req.params.city}',
        '${req.params.state}',
        '${req.params.postalCode}',
        '${req.params.country}',
        '${req.params.password}'
        )
        `,
            (fehler) => console.log(fehler)
        )
        res.send("User Hinzugefügt")
    })



app.get("/user/register/:userNickName/:userFirstName/:userLastName/:eMail/:password/:userType",
    (req, res) => {
        db.run(
            `INSERT INTO users
            (userNickName,userFirstName,userLastName,eMail,password,userType)
            VALUES
            (
            '${req.params.userNickName}',
            '${req.params.userFirstName}',
            '${req.params.userLastName}',
            '${req.params.eMail}',
            '${req.params.password}',
            '${req.params.userType}'
            )
            `,
            (fehler) => console.log(fehler)
        )
        res.send("User Register")
    })



app.get("/user/update/:userNumber/:userNickName/:userLastName/:userFirstName/:userType/:eMail/:phone/:adresLine1/:adresLine2/:city/:state/:postalCode/:country/:password",
    (req, res) => {
        db.run(
            `UPDATE users SET
            userNickName='${req.params.userNickName}',
            userFirstName='${req.params.userFirstName}',
            userLastName='${req.params.userLastName}',
            userType='${req.params.userType}',
            eMail='${req.params.eMail}',
            phone='${req.params.phone}',
            adresLine1='${req.params.adresLine1}',
            adresLine2='${req.params.adresLine2}',
            city='${req.params.city}',
            state='${req.params.state}',
            postalcode='${req.params.postalCode}',
            country='${req.params.country}',
            password='${req.params.password}'
            WHERE 
            userNumber=${req.params.userNumber}`,
        )
        res.send("user update sucsesfully")
    })

app.get("/user/delete/:userNumber",
    (req, res) => {
        db.run(
            `DELETE FROM users
                WHERE userNumber=${req.params.userNumber}`
        );
        res.send("User Entfernen")
    })

app.get(
    "/user/abruf/wer/:userNumber",
    (req, res) => {
        db.all(
            `SELECT * FROM users
                    WHERE userNumber='${req.params.userNumber}'
                    `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.log(fehler)
                    res.send("[]");
                }
                else {
                    res.send(JSON.stringify(zeilen))
                }
            }
        )
    }
)

/**************Order***********************/
app.get("/orders/abruf/alle",
    (req, res) => {
        db.all(
            `SELECT * FROM orders`,
            (fehler, zeilen) => {
                if (fehler) {
                    res.send(fehler)
                } else {
                    res.send(zeilen)
                }
            }
        )
    })
/*
app.get(
    "/",
    (req, res) => {
        res.send("Order list");
    }
)
*/

app.get("/order/neu/:userNumber/:orderDate/:totalAmount",
    (req, res) => {
        db.run(
            `INSERT INTO orders
        (userNumber,orderDate,totalAmount)
        VALUES
        (
        '${req.params.userNumber}',
        '${req.params.orderDate}',
        '${req.params.totalAmount}'
        )
        `,
            (fehler) => console.log(fehler)
        )
        res.send("Orders Hinzugefügt")
    })


app.get("/order/delete/:orderNumber",
    (req, res) => {
        db.run(
            `DELETE FROM orders
                WHERE orderNumber=${req.params.orderNumber}`
        );
        res.send("Order Entfernen")
    })


/*************OrderDetail********************/
app.get("/orderdetail/abruf/alle",
    (req, res) => {
        db.all(
            `SELECT * FROM orderDetails`,
            (fehler, zeilen) => {
                if (fehler) {
                    res.send(fehler)
                } else {
                    res.send(zeilen)
                }
            }
        )
    })

app.get(
    "/",
    (req, res) => {
        res.send("Order Detail List");
    }
)


app.get("/orderdetail/neu/:orderNumber/:productNumber/:quantity/:price",
    (req, res) => {
        db.run(
            `INSERT INTO orderDetails
        (orderNumber,productNumber,quantity,price)
        VALUES
        (
        '${req.params.orderNumber}',
        '${req.params.productNumber}',
        '${req.params.quantity}',
        '${req.params.price}'
        )
        `,
            (fehler) => console.log(fehler)
        )
        res.send("orderDetail Hinzugefügt")
    })


/******************favorites*****************/

app.get("/favorites/update/:userNumber/:productNumber/:favorite", (req, res) => {
    db.run(
        `UPDATE favorites SET favorite='${req.params.favorite}' 
        WHERE userNumber='${req.params.userNumber}' AND productNumber='${req.params.productNumber}'`,
        (fehler) => {
            if (fehler) {
                res.send("Fehler beim Aktualisieren des Favoritenstatus");
                console.error(fehler);
            } else {
                res.send("Favoritenstatus erfolgreich aktualisiert");
            }
        }
    );
});


app.get("/favorites/status/:userNumber/:productNumber", (req, res) => {
    db.get(
        `SELECT favorite FROM favorites WHERE userNumber='${req.params.userNumber}' AND productNumber='${req.params.productNumber}'`,
        (fehler, zeile) => {
            if (fehler) {
                res.send("Fehler beim Abrufen des Favoritenstatus");
                console.error(fehler);
            } else {
                res.send(zeile ? zeile.isFavorite.toString() : "0");
            }
        }
    );
});

app.get("/favorites/:userNumber", (req, res) => {
    db.all(
        `SELECT productNumber FROM favorites WHERE userNumber='${req.params.userNumber}' AND favorite='1'`,
        (fehler, zeilen) => {
            if (fehler) {
                res.send("Fehler beim Abrufen der Favoritenliste");
                console.error(fehler);
            } else {
                res.send(zeilen);
            }
        }
    );
});

app.get("/favorites/neupdate", (req, res) => {
    const { userNumber, productNumber, favorite } = req.body;
    db.run(
        `UPDATE favorites SET favorite='${favorite}' WHERE userNumber='${userNumber}' AND productNumber='${productNumber}'`,
        (fehler) => {
            if (fehler) {
                res.send("Fehler beim Aktualisieren des Favoritenstatus");
                console.error(fehler);
            } else {
                res.send("Favoritenstatus erfolgreich aktualisiert");
            }
        }
    );
});

/********************Nutrition**************************/
app.get(
    "/nutrition/abruf/:productNumber",
    (req, res) => {
        db.all(
            `SELECT * FROM nutrition
                    WHERE productNumber='${req.params.productNumber}'
                    `,
            (fehler, zeilen) => {
                if (fehler) {
                    console.log(fehler)
                    res.send("[]");
                }
                else {
                    res.send(JSON.stringify(zeilen))
                }
            }
        )
    }
)

/**************************************************/

const server = app.listen(
    Portnummer,
    () => {
        console.log(`Der Backend-Server mit der Adresse http://localhost:${Portnummer}/ ist aktiv!`);
    }
);

