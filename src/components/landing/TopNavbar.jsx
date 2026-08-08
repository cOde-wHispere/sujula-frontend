import ContactInformation from "./ContactInformation";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";
import GoogleTranslate from "./GoogleTranslate";

export default function TopNavbar() {
  return (
    <header className="top-navbar">
      <div className="top-navbar-left">
        <ContactInformation />
      </div>

      <div className="top-navbar-controls">
        <CurrencySelector />
        <LanguageSelector />
      </div>

      <GoogleTranslate />
    </header>
  );
}