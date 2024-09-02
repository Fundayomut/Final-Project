import React, { useEffect, useState } from "react";
import { ObjectAntwort } from "./ServerCom";

export const RezeptLinie = () => {
  const [rezeptLinie, setRezeptLinie] = useState([]);
  const abrufList = () => {
    ObjectAntwort(
      `/rezept/abruf/alle/category`,
      (res) => {
        setRezeptLinie(res);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };
  useEffect(() => {
    abrufList();
  }, []);
  return <div></div>;
};
