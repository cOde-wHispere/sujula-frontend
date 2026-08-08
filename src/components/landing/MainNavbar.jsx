import SidebarButton from "./SidebarButton";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavigationButtons from "./NavigationButtons";
import CartButton from "./CartButton";

export default function MainNavbar({
  sidebarOpen = false,
  onToggleSidebar,
}) {
  return (
    <nav
      className="main-navbar"
      aria-label="Main navigation"
    >
      <div className="main-navbar-left">
        <SidebarButton
          open={sidebarOpen}
          onClick={onToggleSidebar}
        />

        <Logo />
      </div>

      <div className="main-navbar-center">
        <SearchBar />
        <NavigationButtons />
      </div>

      <div className="main-navbar-right">
        <CartButton />
      </div>
    </nav>
  );
}