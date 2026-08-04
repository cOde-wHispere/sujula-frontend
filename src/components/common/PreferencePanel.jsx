import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

export default function PreferencePanel() {
  return (
    <section>
      <h3>Preferences</h3>

      <div>
        <label htmlFor="language">Language</label>
        <LanguageSwitcher />
      </div>

      <div>
        <label htmlFor="currency">Currency</label>
        <CurrencySwitcher />
      </div>
    </section>
  );
}