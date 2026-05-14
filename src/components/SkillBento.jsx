import React from 'react'
import { motion } from 'framer-motion'
import '../styles/skill-bento.css'

const categories = [
  { title: 'Frontend', skills: ['HTML','CSS','JavaScript','React','Tailwind CSS'] },
  { title: 'Programming', skills: ['Python','C','Java'] },
  { title: 'DevOps', skills: ['CI/CD','GitHub Actions','Jenkins','Docker'] },
  { title: 'Cloud & Infrastructure', skills: ['AWS (Learning)','Kubernetes (Learning)','Terraform (Learning)','Linux'] },
  { title: 'Automation & Tools', skills: ['Git','GitHub','Bash','VS Code','Postman'] }
]

const featuredLearning = {
  title: 'Currently Learning',
  skills: ['Kubernetes','Terraform','Advanced AWS','Monitoring Tools']
}
const SkillBento = () => {
  return (
    <section id="skills" className="skills-bento-section container mx-auto px-6 py-8">
      {/* Compact learning bar */}
      <motion.div
        className="learning-bar mb-6"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="learning-inner">
          <div className="learning-left">
            <h4 className="learning-title">Currently Learning</h4>
          </div>
          <div className="learning-tags">
            {featuredLearning.skills.map(s => (
              <span key={s} className="compact-tag compact-tag-learning">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Compact 2-row grid: 3 columns x 2 rows for 6 categories */}
      <div className="compact-grid">
        {categories.map((cat) => (
          <motion.div
            key={cat.title}
            className={`compact-module`}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <div className="module-header">
              <h5 className="module-title">{cat.title}</h5>
              <span className="module-meta">{cat.skills.length}</span>
            </div>
            <div className="module-body">
              <div className="module-tags">
                {cat.skills.map(s => (
                  <span key={s} className={`compact-tag ${/Learning/.test(s) ? 'compact-tag-learning' : ''}`}>
                    <svg className="tag-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="currentColor" />
                    </svg>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SkillBento
