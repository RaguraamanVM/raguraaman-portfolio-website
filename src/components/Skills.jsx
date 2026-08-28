import { motion } from 'framer-motion';
import { skillPools } from '../data.js';
import TiltCard from './TiltCard.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="eyebrow">kind: NodePool</p>
      <h2 className="section__title">The stack running underneath</h2>

      <div className="pool-grid">
        {skillPools.map((pool, i) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <TiltCard className="pool-card">
              <div className="pool-card__head">
                <span className="pool-card__kind">{pool.kind}</span>
                <span className="pool-card__status">
                  <span className="status-dot" /> active
                </span>
              </div>
              <h3 className="pool-card__label">{pool.label}</h3>
              <ul className="pool-card__tools">
                {pool.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
