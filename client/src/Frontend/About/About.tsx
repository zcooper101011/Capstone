import Footer from "../Footer/Footer";
import FrontPage from "../FrontPage/FrontPage";
import "./about.css";
import founder from "./bougie_foodie.png";

const description = "Are you interested in learning about us, our story, and our goals of the Bougie Foodie? Scroll to learn more about us!";


function About() {
    return (
        <div id="about">
            <FrontPage title="About Us" description={description} />
            <div className="aboutContainer">
                <div id="founder">
                    <img src={founder} alt="" />
                    <div id="founderImage">
                    Founder, Lauren Clever
                    </div>
                </div>
                <div>
                    <div id="ourStory">
                        Our Story
                    </div>
                    <div id="storyDescription">
                        Founded by Lauren Clever in September of 2022, the Bougie Foodie sprouted from her love in cooking, baking, and her importance and love for creating meaningful memories.
                    </div>
                    <div id="storyDescriptionTwo">
                        Since founded, the Bougie Foodie has gained tons of clientele and has boomed with clients since! Reaching clients all along the Grand Strand in South Carolina, the Bougie Foodie aims to provide you outstanding service in the luxury in your own home.
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;
