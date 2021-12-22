import { NavBar } from "./NavigationStyles";
import Link from "next/link";

const Navigation = () => {
  return (
    <NavBar>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </NavBar>
  );
};

export default Navigation;
