import { Link, Navigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  const { user } = useAppContext();

  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby williamsburg blackbird spyplane jean shorts authentic
              tumeric austin locavore kickstarter drinking vinegar synth vegan
              la croix gastropub cold-pressed. Tilde affogato gochujang chambray
              drinking vinegar sus gatekeep migas ethical cliche man braid
              bicycle rights la croix iceland.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          {/* image */}
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
