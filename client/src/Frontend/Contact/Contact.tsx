import Footer from "../Footer/Footer";
import FrontPage from "../FrontPage/FrontPage";
import "./contact.css";

const description = `Want to sit back, relax, and enjoy your time with friends and family without the worry of having to cook or clean? Contact us to book an event!`;
const descriptionTwo = `Have questions about our services and what we have to offer? Contact us via phone, email, Facebook or Instagram!`;


function Contact() {
    return (
        <div id="contact">
            <FrontPage title="Book Services" description={description} descriptionTwo={<div className="mt-3">{descriptionTwo}</div>} />
            <div className="heading">
                Book Services OR Contact Us!
            </div>
            <div className="textbox">
                via email
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <input type="text" className="contactInput" placeholder="Enter your name" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-4">
                        <input type="text" className="contactInput" placeholder="Enter your Email" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-4">
                        <textarea id="textarea" className="contactInput" placeholder="Enter your message" />
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button className="contactSubmit">
                        SUBMIT
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Contact;