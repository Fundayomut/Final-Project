import React from 'react';

const Contact = () => {
    return (
        <div className="contact-background">
            <div className="contact-container">
                <div className="contact-left">
                    <h1 className="contact-header">Let's talk with us</h1>
                    <p className="contact-text">
                        <span>Questions, comments, or suggestions? Simply fill</span><br />
                        <span>in the form and we’ll be in touch shortly.</span>
                    </p>
                    <p className="contact-address">
                        <img src='https://cdn4.iconfinder.com/data/icons/business-finance-vol-13-1/512/15-512.png' alt="Address Icon" className="contact-icon" />
                        1055 Arthur ave Elk Groot, 67.<br/>New Palmas South Carolina.
                    </p>
                    <p className="contact-phone">
                        <img src='https://cdn1.iconfinder.com/data/icons/bootstrap-fill-vol-3/16/telephone-plus-fill-512.png' alt="Phone Icon" className="contact-icon" />
                        +1 234 678 9108 99
                    </p>
                    <p className="contact-email">
                        <img src='https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/envelope-512.png' alt="Email Icon" className="contact-icon" />
                        Contact@moralizer.com
                    </p>
                </div>
                <div className="contact-right">
                    <form className="contact-form">
                        <div className="contact-row">
                            <input type="text" placeholder="First Name" className="contact-input" />
                            <input type="text" placeholder="Last Name" className="contact-input" />
                        </div>
                        <input type="email" placeholder="Email" className="contact-input" />
                        <input type="tel" placeholder="Phone Number" className="contact-input" />
                        <textarea placeholder="Your Message" className="contact-message"></textarea>
                        <button type="submit" className="contact-submit">Send Message</button>
                        <p> last update</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
/***update******/