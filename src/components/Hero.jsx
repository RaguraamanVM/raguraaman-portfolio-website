import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { profile, terminalLines } from '../data.js';
import { usePrefersReducedMotion } from '../lib/useEnvironment.js';

function TerminalPanel() {
  const reducedMotion = usePrefersReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      // Show a stable, non-animated snapshot instead of cycling text.
      setTyped(terminalLines[0].cmd);
      setShowOutput(true);
      return;
    }

    let i = 0;
    setTyped('');
    setShowOutput(false);
    const cmd = terminalLines[lineIndex].cmd;

    const typeTimer = setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(typeTimer);
        setTimeout(() => setShowOutput(true), 250);
      }
    }, 34);

    return () => clearInterval(typeTimer);
  }, [lineIndex, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!showOutput) return;
    const hold = setTimeout(() => {
      setLineIndex((i) => (i + 1) % terminalLines.length);
    }, 2600);
    return () => clearTimeout(hold);
  }, [showOutput, reducedMotion]);

  const current = terminalLines[reducedMotion ? 0 : lineIndex];

  return (
    <div className="terminal" role="img" aria-label={`Terminal demo: ${current.cmd}`}>
      <div className="terminal__bar">
        <span className="terminal__chip terminal__chip--red" />
        <span className="terminal__chip terminal__chip--yellow" />
        <span className="terminal__chip terminal__chip--green" />
        <span className="terminal__title">raguraaman@cluster:~</span>
      </div>
      <div className="terminal__body">
        <p className="terminal__line">
          <span className="terminal__prompt">$</span> {typed}
          {!showOutput && <span className="terminal__cursor" aria-hidden="true" />}
        </p>
        {showOutput && (
          <pre className="terminal__output">{current.out}</pre>
        )}
      </div>
    </div>
  );
}

function Avatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="avatar">
      <div className="avatar__ring" aria-hidden="true" />
      {!failed ? (
        <img
          src={profile.avatar}
          alt={profile.name}
          className="avatar__img"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="avatar__fallback" aria-hidden="true">
          {profile.initials}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hero__copy"
        >
          <p className="eyebrow">
            apiVersion: portfolio/v1 <span className="eyebrow__sep">·</span> kind: Devops-Engineer
          </p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={profile.resume} download>
              Download résumé
            </a>
            <a className="btn btn--ghost" href="#projects">
              View deployed work
            </a>
          </div>

          <div className="hero__social" aria-label="Social links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} strokeWidth={1.6} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} strokeWidth={1.6} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={18} strokeWidth={1.6} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero__panel"
        >
          <Avatar />
          <TerminalPanel />
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About">
        <ArrowDown size={16} strokeWidth={1.6} />
      </a>
    </section>
  );
}
