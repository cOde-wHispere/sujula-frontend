export default function SidebarButton({
  open = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className="button sidebar-button"
      aria-label={
        open
          ? "Close category menu"
          : "Open category menu"
      }
      aria-expanded={open}
      onClick={onClick}
    >
      ☰
    </button>
  );
}