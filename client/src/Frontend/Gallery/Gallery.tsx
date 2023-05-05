import Footer from "../Footer/Footer";
import FrontPage from "../FrontPage/FrontPage";
import "./gallery.css";
import galleryOne from "./galleryOne.png"
import galleryTwo from "./galleryTwo.png"
import galleryThree from "./galleryThree.png"
import galleryFour from "./galleryFour.png"
import galleryFive from "./galleryFive.png"
import gallerySix from "./gallerySix.png"

const description = `From our kitchen to yours, view tons of delicious foods from past events, and work up that spirit to book an event with us!`;


function Gallery() {
    return (
        <div id="gallery">
            <FrontPage title="Gallery" description={description} />
            <div>
                <div className="galleryTitle">
                    From our kitchen to yours
                </div>
                <div className="imageContainer">
                    <img src={galleryOne} alt="" />
                </div>
                <div className="imageContainer">
                    <img src={galleryTwo} alt="" />
                </div>
                <div className="imageContainer">
                    <img src={galleryThree} alt="" />
                </div>
                <div className="imageContainer">
                    <img src={galleryFour} alt="" />
                </div>
                <div className="imageContainer">
                    <img src={galleryFive} alt="" />
                </div>
                <div className="imageContainer">
                    <img src={gallerySix} alt="" />
                </div>
            </div >
            <Footer />

        </div >
    );
}

export default Gallery;