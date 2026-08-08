import { useRequestContext } from "../../context/RequestContext";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "fr",
    label: "Français",
  },
  {
    code: "es",
    label: "Español",
  },
  {
    code: "ar",
    label: "العربية",
  },
];

function activateGoogleTranslate(language) {
  const googleSelect =
    document.querySelector(".goog-te-combo");

  if (!googleSelect) {
    return;
  }

  googleSelect.value = language;

  googleSelect.dispatchEvent(
    new Event("change", {
      bubbles: true,
    })
  );
}

export default function LanguageSelector() {
  const {
    language,
    setLanguage,
  } = useRequestContext();

  function handleChange(event) {
    const selectedLanguage = event.target.value;

    setLanguage(selectedLanguage);

    // Google Translate may load asynchronously.
    // Try immediately first.
    activateGoogleTranslate(selectedLanguage);

    // Give the Google widget a moment to initialize
    // if it was not ready yet.
    if (selectedLanguage !== "en") {
      window.setTimeout(() => {
        activateGoogleTranslate(selectedLanguage);
      }, 500);
    }
  }

  return (
    <label className="language-selector">
      <span>Language</span>

      <select
        value={language}
        onChange={handleChange}
        aria-label="Select language"
      >
        {LANGUAGES.map((item) => (
          <option
            key={item.code}
            value={item.code}
          >
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}