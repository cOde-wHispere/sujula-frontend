import { useRequestContext } from "../../context/RequestContext";

export default function LanguageSwitcher() {

  const {
    language,
    setLanguage
  } = useRequestContext();


  return (
    <select
      id="language"
      value={language}
      onChange={(event) =>
        setLanguage(event.target.value)
      }
    >
      <option value="en">
        English
      </option>

      <option value="fr">
        French
      </option>

      <option value="ar">
        Arabic
      </option>

    </select>
  );
}