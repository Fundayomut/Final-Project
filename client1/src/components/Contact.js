import React, { useContext, useState } from "react";
import { AuthKontext } from "./LoginSystem";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import emailjs from "emailjs-com";
const Contact = () => {
  const { erlaubnis } = useContext(AuthKontext); // Erlaubnis aus dem AuthKontext abrufen
  const [userFirstName, setUserFirsName] = useState(""); // Zustand für den Vornamen des Benutzers
  const [userLastName, setUserLastName] = useState("");
  const [eMail, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars
    if (userFirstName && userLastName && eMail && message) {
      // Wenn alle erforderlichen Felder ausgefüllt sind, wird die E-Mail gesendet
      emailjs
        .send(
          "service_t0dx7ib",
          "template_pm1es5j",
          {
            first_name: userFirstName,
            last_name: userLastName,
            email: eMail,
            phone: phone,
            message: message,
            to_email: "finalproject.evb@gmail.com",
          },
          "lm4RgtxLGOXXfTnJn"
        )
        .then((response) => {
          console.log("Email ist succesfull:", response); // Erfolgsnachricht in der Konsole
          alert("ihre email ist senden ");
          // Nach dem Senden der E-Mail werden die Eingabefelder zurückgesetzt
          setUserFirsName("");
          setUserLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        })
        .catch((error) => {
          console.log("error", error); // Fehlermeldung in der Konsole
          alert("ihre email ist nicht senden ");
        });
    } else {
      // Wenn nicht alle erforderlichen Felder ausgefüllt sind, wird eine Warnung angezeigt
      alert("bitte füllen Sie alle filder aus ");
    }
  };

  //service_t0dx7ib
  // API key : lm4RgtxLGOXXfTnJn
  // privat ID : if_af6D55-r2nre1Yxif9
  // Template ID : template_7o6mr2v
  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div className="contact-background">
        <div className="contact-container">
          <div className="contact-left">
            <h1 className="contact-header">Let's talk with us</h1>
            <p className="contact-text">
              <span>Questions, comments, or suggestions? Simply fill</span>
              <br />
              <span>in the form and we’ll be in touch shortly.</span>
            </p>
            <p className="contact-address">
              <img
                src="https://cdn4.iconfinder.com/data/icons/business-finance-vol-13-1/512/15-512.png"
                alt="Address Icon"
                className="contact-icon"
              />
              1055 Arthur ave Elk Groot, 67.
              <br />
              New Palmas South Carolina.
            </p>
            <p className="contact-phone">
              <img
                src="https://cdn1.iconfinder.com/data/icons/bootstrap-fill-vol-3/16/telephone-plus-fill-512.png"
                alt="Phone Icon"
                className="contact-icon"
              />
              +1 234 678 9108 99
            </p>
            <p className="contact-email">
              <img
                src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/envelope-512.png"
                alt="Email Icon"
                className="contact-icon"
              />
              Contact@moralizer.com
            </p>
          </div>
          <div className="contact-right">
            <form className="contact-form" onSubmit={sendEmail}>
              <div className="contact-row">
                <input
                  type="text"
                  value={userFirstName}
                  onChange={(e) => setUserFirsName(e.target.value)}
                  placeholder="First Name"
                  className="contact-input"
                />
                <input
                  type="text"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  placeholder="Last Name"
                  className="contact-input"
                />
              </div>
              <input
                type="email"
                value={eMail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="contact-input"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="contact-input"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className="contact-message"
              ></textarea>
              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
/*

fetch('http://localhost:1001/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(response => response.json()) // الحصول على البيانات بتنسيق JSON
.then(data => {
    if (data.success) {
        alert('Email sent successfully!');
    } else {
        alert('Failed to send email: ' + data.message);
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('Error sending email.');
});
};
*/
