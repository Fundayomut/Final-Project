import React, { useEffect, useState } from 'react'
import { ObjectAntwort } from './ServerCom';
import { ProductsLinie } from './ProductsLinie';

export const Products = () => {
    const [productList, setProductList] = useState([]);

    const abrufList = () => {
        ObjectAntwort(`/products/abruf/alle`,
            (res) => {
                setProductList(res)
                console.log(res)
            },
            (fehler) => {
                console.log(fehler)
            }
        );
    };

    useEffect(() => {
        abrufList()
    
    }, [])

    return (
        <div>
             {productList.length > 0 ? (productList.map((item)=>
        <>
        <ProductsLinie key={item.productNumber} daten={item}/>
        </>
        )):(<p>Problem</p>)}
             </div>
    )
}
/*<div>
        {productList.length > 0 ? (productList.map((item)=>
        <>
        <ProductsLinie key={item.productNumber} daten={item}/>
        </>
        )):(<p>Problem</p>)}
    </div> */
