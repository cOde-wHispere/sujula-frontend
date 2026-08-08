import { useEffect } from "react";

const GOOGLE_TRANSLATE_SCRIPT_ID =
  "google-translate-script";

const GOOGLE_TRANSLATE_ELEMENT_ID =
  "google_translate_element";

const GOOGLE_TRANSLATE_CALLBACK =
  "googleTranslateElementInit";

function initializeGoogleTranslate() {
  if (!window.google?.translate?.TranslateElement) {
    return;
  }

  const container = document.getElementById(
    GOOGLE_TRANSLATE_ELEMENT_ID
  );

  if (!container) {
    return;
  }

  // Prevent Google Translate from being initialized more than once.
  if (container.dataset.initialized === "true") {
    return;
  }

  container.innerHTML = "";

  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,fr,es,ar",
      autoDisplay: false,
    },
    GOOGLE_TRANSLATE_ELEMENT_ID
  );

  container.dataset.initialized = "true";
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Google Translate already exists.
    if (window.google?.translate?.TranslateElement) {
      initializeGoogleTranslate();
      return undefined;
    }

    // Reuse an existing script if one is already loading.
    let script = document.getElementById(
      GOOGLE_TRANSLATE_SCRIPT_ID
    );

    window[GOOGLE_TRANSLATE_CALLBACK] =
      initializeGoogleTranslate;

    if (!script) {
      script = document.createElement("script");

      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=" +
        GOOGLE_TRANSLATE_CALLBACK;
      script.async = true;

      document.body.appendChild(script);
    }

    // IMPORTANT:
    // Do not delete window.googleTranslateElementInit
    // during cleanup.
    //
    // Google Translate owns this callback after the
    // script has been loaded, and React StrictMode can
    // run this cleanup more than once.

    return undefined;
  }, []);

  return (
    <div
      id={GOOGLE_TRANSLATE_ELEMENT_ID}
      className="google-translate"
      aria-label="Google Translate"
    />
  );
}