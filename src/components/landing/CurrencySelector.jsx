import { useRequestContext } from "../../context/RequestContext";

const CURRENCIES = [
  {
    code: "USD",
    name: "US Dollar",
  },
  {
    code: "GMD",
    name: "Gambian Dalasi",
  },
  {
    code: "EUR",
    name: "Euro",
  },
  {
    code: "GBP",
    name: "British Pound",
  },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useRequestContext();

  function handleChange(event) {
    const selectedCurrency = event.target.value;

    setCurrency(selectedCurrency);
  }

  return (
    <label className="currency-selector">
      Currency

      <select
        value={currency}
        onChange={handleChange}
        aria-label="Select currency"
      >
        {CURRENCIES.map((currencyOption) => (
          <option
            key={currencyOption.code}
            value={currencyOption.code}
          >
            {currencyOption.code} — {currencyOption.name}
          </option>
        ))}
      </select>
    </label>
  );
}