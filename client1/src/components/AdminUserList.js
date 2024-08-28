import React, { useEffect, useState } from "react";
import { ObjectAntwort } from "./ServerCom";
import AdminNav from "./AdminNav";
import "./Admin.css";
import AdminUserZeilen from "./AdminUserZeilen";

export const AdminUserList = () => {
  const [userList, setUserList] = useState([]);

  const abrufUserList = () => {
    ObjectAntwort(
      `/user/abruf/alle`,
      (res) => {
        setUserList(res);
        console.log(res);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  useEffect(() => {
    abrufUserList();
  }, []);

  return (
    <div className="admin-user-main-div">
      <div className="admin-user-nav-div">
        <AdminNav />
      </div>
      <div>
        {typeof userList === "object" && userList.length > 0 ? (
          userList.map((item) => (
            <AdminUserZeilen key={item.userNumber} data={item} />
          ))
        ) : (
          <p>Keine Datei</p>
        )}
      </div>
    </div>
  );
};
