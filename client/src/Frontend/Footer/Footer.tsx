import footerlogo from "./footerlogo.png";
import facebook from './facebook_jc.png';
import instagram from './instagram_jd.png';
import './footerfrontend.css';

function Footer() {
  return (
    <div id="FrontEndFooter">
      <div>
        <img src={footerlogo} alt="logo" />
      </div>
      <div className="divider">

      </div>
      <div className="content">
        <div className="phone">(843) 222-8947</div>
        <div className="description">Pawleys Island, SC • Cherry Grove, SC</div>
        <div className="description">
          North Myrtle Beach, SC • Myrtle Beach, SC
        </div>
      </div>
      <div className="follow">
        <div>FOLLOW US</div>
        <img src={facebook} id="facebook" alt="" />
        <img src={instagram} id="instagram" alt="" />
      </div>
    </div>
  );
}

export default Footer;