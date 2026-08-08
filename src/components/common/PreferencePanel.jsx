import CurrencySwitcher from "./CurrencySwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

import { useRequestContext } from "../../context/RequestContext";

export default function PreferencePanel() {
  const {
    deliveryAddress,
  } = useRequestContext();

  return (
    <section>

      <h2>Preferences</h2>

      <div>

        <p>

          <strong>
            Delivery Address:
          </strong>{" "}

          {deliveryAddress || "Not selected"}

        </p>

      </div>

      <div>

        <label>

          Currency

        </label>

        <CurrencySwitcher />

      </div>

      <div>

        <label>

          Language

        </label>

        <LanguageSwitcher />

      </div>

    </section>
  );
}