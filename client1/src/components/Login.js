import React,{useEffect,useContext, useState} from "react";
import { AuthKontext } from "./LoginSystem";
import { Link, useNavigate } from 'react-router-dom';

export default function Login()
{
    const geheZuZeite=useNavigate();
    const {setEMail,setPassword,erlaubnis,login}=useContext(AuthKontext);

    useEffect(()=>{
        if(erlaubnis)
            geheZuZeite("/")
  
    },[erlaubnis,geheZuZeite])
    

   async function LoginVersuch(ErgebnisObject)
    {
        ErgebnisObject.preventDefault();
        const loginSucsess= await login()
        if(loginSucsess){
            geheZuZeite("/")
        }else{
            geheZuZeite("/Register")
        }
       
    }

    return(
        <div className="loginmaindiv">
        <div className="logincontainer">
        <div className="logininnencontainer">
        <form className="loginform" onSubmit={(e)=>LoginVersuch(e)}>
            <label >E-Mail</label>
            <input className="input" type="text"
            placeholder="max@beispiel.com"
            onChange={(e)=>setEMail(e.target.value)}
            onKeyUp={(e)=>setEMail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input className="input" type="password"
            placeholder="******"
            onChange={(e)=>setPassword(e.target.value)}
            onKeyUp={(e)=>setPassword(e.target.value)}/>
            <br/>
            <div className="loginbuttondiv">
            <button className="blackbutton" type="submit">LOGIN</button>
            </div>
            <div className="loginbuttondiv">
            <Link to="/Register"><button className="button">REGISTER</button></Link>
            </div> 
            <Link to="/"><p>Without logging in to the home page</p></Link>
        </form>
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                <p>or Login with</p>
                <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-64.png" width="10%"/>
                <img src="https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/1227/X-64.png" width="10%" />
                <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/instagram_icon-instagram_buttoninstegram-64.png" width="10%"/>
                <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-64.png" width="10%" />
                </div>
                <div style={{display:"flex",alignItems:"center", flexDirection:"column",marginTop:"15px"}}>
                <p>Don`t have an account?</p>
            </div>
            </div>
      
        </div>
        </div>
    )
}



/*facebook ID = 392227800278109*/