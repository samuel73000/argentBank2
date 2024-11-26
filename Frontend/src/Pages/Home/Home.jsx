import "./Home.css";

import logo1 from "../../Assets/icon-chat.png";
import logo2 from "../../Assets/icon-money.png";
import logo3 from "../../Assets/icon-security.png";
export default function Home() {
  return (
    <section>
      <div className='hero-home'>
        <div className='content-hero-home'>
          <p className='titre-hero-home'>No fees.</p>
          <p className='titre-hero-home'>No minimum deposit.</p>
          <p className='titre-hero-home'>High interest rates.</p>
          <p className='texte-hero-home'>
            Open a savings account with Argent Bank today!
          </p>
        </div>
      </div>
      <div className='container-features'>
        <div className='container-features-item'>
          <img src={logo1} alt='chat item' className='feature-icon' />
          <h2 className='feature-item-title'>You are our #1 priority</h2>
          <p className='feature-item-texte'>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>

        <div className='container-features-item'>
          <img src={logo2} alt='chat item' className='feature-icon' />
          <h2 className='feature-item-title'>
            More savings means higher rates
          </h2>
          <p className='feature-item-texte'>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>

        <div className='container-features-item'>
          <img src={logo3} alt='chat item' className='feature-icon' />
          <h2 className='feature-item-title'>Security you can trust</h2>
          <p className='feature-item-texte'>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </div>
    </section>
  );
}
