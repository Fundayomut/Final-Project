/* This area is under construction */
    

import React, { useState } from "react";
import { TextAntwort } from "./ServerCom";

export const AdminProducts = () => {

    const [name,setName]=useState("");
    const [category,setCategory]=useState("");
    const [size,setSize]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const [description,setDescription]=useState("");
    const [inhalt,setInhalt]=useState("");

/* This area is under construction */
    
    function ProductHinzu(){
        const parsedPrice = parseFloat(price) || 0;
        TextAntwort(
            `/products/neu/${name}/${category}/${size}/${parsedPrice}/${image}/${description}/${inhalt}`,
            (antwort)=>{
                console.log("neu Product",antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
           );
    }

  return (
    <>
    <div><h1>This area is under construction</h1></div>
    {/*<div>
        <input type="text" placeholder="Product Name" onChange={(e)=>{setName(e.target.value)}}></input>
        <input type="text" placeholder="Category" onChange={(e)=>{setCategory(e.target.value)}}></input>
        <input type="text" placeholder="Size" onChange={(e)=>{setSize(e.target.value)}}></input>
        <input type="number" placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}}></input>
        <input type="text" placeholder="Image" onChange={(e)=>{setImage(e.target.value)}}></input>
        <input type="text" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}></input>
        <input type="text" placeholder="Inhalt" onChange={(e)=>{setInhalt(e.target.value)}}></input>
        <button onClick={ProductHinzu}>Add</button>
    </div>*/}
    </>
  )
}

/*
<div>
        {productList.map((item)=>(
            <AdminProductsZeile data={item}/>
        ))}
      </div>
*/