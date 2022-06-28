import { NavBar } from './NavigationStyles';
import Link from 'next/link';

const Navigation = () => {
  return (
    <NavBar>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </NavBar>
  );
};

export default Navigation;
