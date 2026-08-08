import HeroBanner from "./HeroBanner";
import HeroActions from "./HeroActions";

export default function HeroSection() {
  return (
    <section className="hero-section">

      <div className="hero-content">

        <span className="hero-tag">
          Marketplace
        </span>

        <h1>
          Find Products Available Near Your Delivery Location
        </h1>

        <p>
          Shop products from trusted sellers and receive
          them at your selected delivery destination.
        </p>

        <HeroActions />

      </div>

      <HeroBanner />

    </section>
  );
}