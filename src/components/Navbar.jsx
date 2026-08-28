import { useEffect, useState } from 'react';
import { profile } from '../data.js';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'stack' },
  { href: '#journey', label: 'journey' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'connect' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#top" className="navbar__brand">
        <span className="navbar__dot" aria-hidden="true" />
        raguraaman<span className="navbar__brand-muted">.dev</span>
      </a>
      <nav className="navbar__links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <a className="navbar__cta" href={profile.resume} download>
        resume.pdf
      </a>
    </header>
  );
}
