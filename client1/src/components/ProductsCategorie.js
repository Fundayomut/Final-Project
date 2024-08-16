import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ObjectAntwort } from './ServerCom';

export const ProductsCategorie = () => {

    const [categorieList,setCategorieList]=useState([]);
    const {category}=useParams();

    const abrufList = () => {
        ObjectAntwort(`/products/abruf/wer/${category}`,
            (res) => {
                setCategorieList(res)
                console.log("category list",res)
            },
            (fehler) => {
                console.log(fehler)
            }
        );
    };

    useEffect(()=>{
        abrufList()
    },[])

  return (
    <div>
{categorieList.length > 0 ? (
<div className='prodLiniemain'>
  {categorieList.map((item) => (
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
