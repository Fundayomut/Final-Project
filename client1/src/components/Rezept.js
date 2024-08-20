import React, { useEffect, useState } from 'react'
import { ObjectAntwort } from './ServerCom';

export const Rezept = () => {
    const[rezept,setRezept]=useState([]);
    const abrufList=()=>{
        ObjectAntwort(`/rezept/abruf/alle`,
            (res)=>{
                setRezept(res)
            },
            (fehler)=>{
                console.log(fehler)
            }
        )
    }
    useEffect(()=>{
        abrufList()
    },[])
  return (
    <>
    <div className='rezeptListe'>  
        <p>Apfel Kuchen</p>
        <p>Schokolademousse</p>
        <p>Käse Kuchen</p>
    </div>
    <div>
        {rezept.length > 0 ? (rezept.map((item)=>
        <>
        <p>{item.rezeptHeader}</p>
        <p>{item.rezeptInhalt1}</p>
        </>
        )):(<p>Problem</p>)}
    </div>
    </>
  )
}
