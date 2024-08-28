
import React, { useEffect, useState, useContext } from "react";
import { AuthKontext } from "./LoginSystem";
import { ObjectAntwort } from "./ServerCom";
import AdminNav from "./AdminNav";
import "./Admin.css";
import AdminUserZeilen from "./AdminUserZeilen";

export const AdminUserList = () => {
  const [userList, setUserList] = useState([]);
  const { userNumber } = useContext(AuthKontext);

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
    <>
      <AdminNav />
      <table>
        <thead>
          <tr>
            <th>User Nick Name</th>
            <th>User Firt Name</th>
            <th>User Last Name</th>
            <th>User Type</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>AdresLine1</th>
            <th>AdresLine2</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Password</th>
          </tr>
        </thead>
        {typeof userList === "object" && userList.length > 0 ? (
    userList.map((item) => {
        return (
            <>
            <AdminUserZeilen data={item}/>
            </>
        )
    })
) : <p>Keine Datei</p>}

      </table>
    </>
  );
};
/*{typeof userList === "object" && userList.length > 0 ? (
    userList.map((item) => {
        return (
            <>
            <AdminUserZeilen data={item}/>
            </>
        )
    })
) : <p>Keine Datei</p>}*/
