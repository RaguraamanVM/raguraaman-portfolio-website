import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="footer__mono">status: all systems operational</p>
    </footer>
  );
}
