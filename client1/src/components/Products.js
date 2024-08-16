import React, { useEffect, useState } from 'react'
import { ObjectAntwort } from './ServerCom';
import { ProductsLinie } from './ProductsLinie';
import { Link } from 'react-router-dom';

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
            <div className='productcategorie'>
               <Link to='/Products/ProductsCategorie/Boutique'><p>Boutique-Kuchen</p></Link>
               <Link to='/Products/ProductsCategorie/Hochzeit'><p>Hochzeits und Verlobungstorten</p></Link>
               <Link to='/Products/ProductsCategorie/Bild'><p>Figure Kuchen</p></Link>
            </div>
      {productList.length > 0 ? (
        <div className='prodLiniemain'>
          {productList.map((item) => (
            <div className='prodLiniecard' key={item.productNumber}>
              <div className='cardratio'>
                <p>herz</p>
                <p>stern</p>
              </div>
              <div className='cardimage'>
                <img src={item.image} alt={item.name} style={{width:'100%', borderRadius:'12px'}} />
              </div>
              <div className='cardheadtext'>
                <p>{item.name}</p>
              </div>
              <div className='cardtext'>{item.description}</div>
              <div className='cardbuttondiv'>
                <button className='rezeptbutton'>Details</button></div>
              <div className='cardfooter'>
                <p>Lieferung in 3 Tagen</p>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Problem</p>
      )}
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