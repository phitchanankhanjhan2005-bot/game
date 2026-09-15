import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <Link href="/" className="navLink">
            หน้าแรก
          </Link>
        </li>

        <li className="navItem">
          <Link href="/courses" className="navLink">
            รายวิชา
          </Link>
        </li>

        <li className="navItem">
          <Link href="/bands" className="navLink">
            วงดนตรี
          </Link>
        </li>

        <li className="navItem">
          <Link href="/games" className="navLink">
            🎮 เกม
          </Link>
        </li>

        <li className="navItem">
          <Link href="/about" className="navLink">
            เกี่ยวกับเรา
          </Link>
        </li>
      </ul>
    </nav>
  );
}
