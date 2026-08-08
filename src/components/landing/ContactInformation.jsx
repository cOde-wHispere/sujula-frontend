const SUPPORT_PHONE =
  process.env.REACT_APP_SUPPORT_PHONE || "";

const SUPPORT_EMAIL =
  process.env.REACT_APP_SUPPORT_EMAIL || "";

export default function ContactInformation() {
  const whatsappNumber = SUPPORT_PHONE.replace(
    /[^0-9]/g,
    ""
  );

  return (
    <div className="contact-information">

      <a href={`tel:${SUPPORT_PHONE}`}>
        Call: {SUPPORT_PHONE}
      </a>

      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      )}

      {SUPPORT_EMAIL && (
        <a href={`mailto:${SUPPORT_EMAIL}`}>
          Customer Support
        </a>
      )}

    </div>
  );
}