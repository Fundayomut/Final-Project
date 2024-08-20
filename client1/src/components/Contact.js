import React from 'react';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-left">
                <h1 className="contact-header">Let's talk with us</h1>
                <p className="contact-text">Questions, comments, or suggestions? Simply fill </p>
                <p className="contact-text">in the form and we’ll be in touch shortly.</p>
                <p className="contact-address">1055 Arthur ave Elk Groot, 67.<br/>New Palmas South Carolina.</p>
                <p className="contact-phone">+1 234 678 9108 99</p>
                <p className="contact-email">Contact@moralizer.com</p>
            </div>
            <div className="contact-right">
                <form className="contact-form">
                    <input type="text" placeholder="First Name" className="contact-input" />
                    <input type="text" placeholder="Last Name" className="contact-input" />
                    <input type="email" placeholder="Email" className="contact-input" />
                    <input type="tel" placeholder="Phone Number" className="contact-input" />
                    <textarea placeholder="Your Message" className="contact-message"></textarea>
                    <button type="submit" className="contact-submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
