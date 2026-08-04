import { useRequestContext } from "../../context/RequestContext";

export default function CurrencySwitcher() {

  const {
    currency,
    setCurrency
  } = useRequestContext();


  return (
    <select
      id="currency"
      value={currency}
      onChange={(event) =>
        setCurrency(event.target.value)
      }
    >

      <option value="GMD">
        GMD
      </option>

      <option value="USD">
        USD
      </option>

      <option value="EUR">
        EUR
      </option>

    </select>
  );
}