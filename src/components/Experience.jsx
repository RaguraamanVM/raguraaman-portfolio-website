import { motion } from 'framer-motion';
import { journey } from '../data.js';

const STATUS_LABEL = {
  running: 'Running',
  passed: 'Passed',
  building: 'Building',
};

export default function Experience() {
  return (
    <section id="journey" className="section">
      <p className="eyebrow">kind: deploy</p>
      <h2 className="section__title">Deployment history</h2>

      <ol className="pipeline">
        {journey.map((stage, i) => (
          <motion.li
            key={stage.title}
            className="pipeline__stage"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="pipeline__marker">
              <span className={`status-dot status-dot--${stage.status}`} />
            </div>
            <div className="pipeline__content">
              <div className="pipeline__meta">
                <span className="pipeline__stagename">{stage.stage}</span>
                <span className={`pipeline__badge pipeline__badge--${stage.status}`}>
                  {STATUS_LABEL[stage.status]}
                </span>
                <span className="pipeline__period">{stage.period}</span>
              </div>
              <h3 className="pipeline__title">{stage.title}</h3>
              <p className="pipeline__org">{stage.org}</p>
              <ul className="pipeline__notes">
                {stage.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
