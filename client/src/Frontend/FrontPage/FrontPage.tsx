import { useNavigate } from "react-router-dom";
import Logo from "./Logo";


interface Props {
  title: string,
  description: string,
  descriptionTwo?: React.ReactElement
}

const FrontPage: React.FC<Props> = ({ title, description, descriptionTwo }) => {
  const navigate = useNavigate()
  return (
    <div className="splash">
      <div className="navigation">
        <div className="me-auto">
          <Logo />
        </div>
        <div className="navigation-link mt-2" onClick={() => { navigate('/') }}>MENU</div>
        <div className="navigation-link mt-2" onClick={() => { navigate('/orders') }}>ORDER</div>
        <div className="navigation-link mt-2" onClick={() => { navigate('/about') }}>ABOUT</div>
        <div className="navigation-link mt-2" onClick={() => { navigate('/contact') }}>BOOK SERVICES/CONTACT</div>
        <div className="mt-2" onClick={() => { navigate('/gallery') }}>GALLERY</div>
      </div>
      <div className="row">
        <div className="col-4 title">{title}</div>
      </div>
      <div className="row">
        <div className="col-5">
          <div className="description">
            {description}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-5">
          <div className="description">
            {descriptionTwo}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage
