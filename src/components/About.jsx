import { motion } from 'framer-motion';
import { aboutBio, aboutManifest } from '../data.js';

export default function About() {
  return (
    <section id="about" className="section">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        kind: About
      </motion.p>

      <div className="about__grid">
        <motion.p
          className="about__bio"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {aboutBio}
        </motion.p>

        <motion.div
          className="manifest"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="manifest__head">
            <span className="terminal__chip terminal__chip--red" />
            <span className="terminal__chip terminal__chip--yellow" />
            <span className="terminal__chip terminal__chip--green" />
            <span className="manifest__filename">education.yaml</span>
          </div>
          <dl className="manifest__body">
            {aboutManifest.map((row) => (
              <div className="manifest__row" key={row.key}>
                <dt>{row.key}:</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
