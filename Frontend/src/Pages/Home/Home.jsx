import "./Home.css";

import FeaturesHome from "../../Components/FeaturesHome/FeaturesHome";
export default function Home() {
  const features = {
    src: [
      require("../../Assets/icon-chat.png"),
      require("../../Assets/icon-money.png"),
      require("../../Assets/icon-security.png"),
    ],
    title: [
      "You are our #1 priority",
      "More savings means higher rates",
      "Security you can trust",
    ],
    details: [
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
      "The more you save with us, the higher your interest rate will be!",
      " We use top of the line encryption to make sure your data and money is always safe.",
    ],
  };
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
        <FeaturesHome
          icon={features.src[0]}
          title={features.title[0]}
          texte={features.details[0]}
        />
        <FeaturesHome
          icon={features.src[1]}
          title={features.title[1]}
          texte={features.details[1]}
        />
        <FeaturesHome
          icon={features.src[2]}
          title={features.title[2]}
          texte={features.details[2]}
        />
      </div>
    </section>
  );
}
