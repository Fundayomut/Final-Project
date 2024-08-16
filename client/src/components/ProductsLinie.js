import React, { useEffect, useState } from 'react'

export const ProductsLinie = ({daten}) => {
    const[productNumber,setproductNumber]=useState();
    const[name,setName]=useState();
    const[category,setCategory]=useState();
    const[size,setSize]=useState();
    const[price,setPrice]=useState();
    const[image,setImage]=useState();
    const[description,setDescription]=useState();

    useEffect(()=>{
        setproductNumber(daten.productNumber);
        setName(daten.name);
        setCategory(daten.category);
        setSize(daten.size);
        setPrice(daten.price);
        setImage(daten.image);
        setDescription(daten.description);
    })
  return (
    <div>
        <div>ratio</div>
        <div>{image}</div>
        <div>{name}</div>
        <div>{description}</div>
        <div>Button</div>
        <div>Lieferung detail</div>

    </div>
  )
}
