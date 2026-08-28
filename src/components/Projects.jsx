import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data.js';
import TiltCard from './TiltCard.jsx';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="eyebrow">kind: ServiceList</p>
      <h2 className="section__title">Mission Log</h2>

      <div className="project-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
          >
            <TiltCard className="project-card" maxTilt={4}>
              <div className="project-card__head">
                <span className="project-card__name">{project.name}</span>
                <span className={`pipeline__badge pipeline__badge--${project.status === 'running' ? 'running' : 'building'}`}>
                  {project.status === 'running' ? 'Running' : 'Building'}
                </span>
              </div>
              <p className="project-card__desc">{project.description}</p>
              <ul className="project-card__stack">
                {project.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project-card__links">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github size={15} strokeWidth={1.6} /> source
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} strokeWidth={1.6} /> live
                  </a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
