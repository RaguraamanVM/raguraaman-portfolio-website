import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data.js';

export default function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <p className="eyebrow">kind: Ingress</p>
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        Let's establish a connection
      </motion.h2>
      <p className="contact__sub">
        Open to DevOps roles, infrastructure collaborations, and conversations about
        anything that involves making systems more reliable.
      </p>

      <div className="contact__endpoints">
        <a className="endpoint" href={`mailto:${profile.email}`}>
          <Mail size={18} strokeWidth={1.6} />
          <div>
            <span className="endpoint__label">email</span>
            <span className="endpoint__value">{profile.email}</span>
          </div>
        </a>
        <a className="endpoint" href={profile.github} target="_blank" rel="noreferrer">
          <Github size={18} strokeWidth={1.6} />
          <div>
            <span className="endpoint__label">github</span>
            <span className="endpoint__value">@RaguraamanVM</span>
          </div>
        </a>
        <a className="endpoint" href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={18} strokeWidth={1.6} />
          <div>
            <span className="endpoint__label">linkedin</span>
            <span className="endpoint__value">linkedin.com/in/raguraaman/</span>
          </div>
        </a>
      </div>

      <pre className="contact__curl">
        <span className="terminal__prompt">$</span> curl -X POST https://raguraaman.dev/connect \{'\n'}
        {'  '}--data '&#123; "message": "let\'s build something reliable" &#125;'
      </pre>
    </section>
  );
}
