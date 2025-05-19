import { useTemplateStore } from "../store/templateStore";

function ModernTemplate({ cvData }) {
  const { personalInfo, education, experience, skills, languages } = cvData;
  const { activeFont, activeColorTheme, colorThemes } = useTemplateStore();
  
  const theme = colorThemes[activeColorTheme] || colorThemes.blue;
  
  return (
    <div className="h-full" style={{ fontFamily: activeFont || 'sans-serif' }}>
      <header 
        className="pb-6 mb-6 border-b" 
        style={{ borderColor: theme.primary.DEFAULT }}
      >
        <h1 
          className="text-3xl font-bold mb-1" 
          style={{ color: theme.primary.DEFAULT }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <h2 className="text-xl mb-4">{personalInfo.profession}</h2>
        
        <p className="mb-4 text-sm">{personalInfo.summary}</p>
        
        <div className="flex flex-wrap gap-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <span className="mr-1">✉️</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <span className="mr-1">📞</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <span className="mr-1">📍</span>
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <span className="mr-1">🌐</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="mr-1">💼</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center">
              <span className="mr-1">👨‍💻</span>
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          {skills.length > 0 && (
            <section className="mb-6">
              <h3 
                className="text-lg font-semibold mb-3 pb-1 border-b" 
                style={{ borderColor: theme.primary.light }}
              >
                Habilidades
              </h3>
              
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        {skill.level && (
                          <span className="text-xs">{skill.level}/5</span>
                        )}
                      </div>
                      
                      {skill.level && (
                        <div 
                          className="h-1.5 rounded-full bg-slate-200"
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ 
                              width: `${(skill.level / 5) * 100}%`,
                              backgroundColor: theme.primary.DEFAULT
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section className="mb-6">
              <h3 
                className="text-lg font-semibold mb-3 pb-1 border-b" 
                style={{ borderColor: theme.primary.light }}
              >
                Idiomas
              </h3>
              
              <ul className="space-y-2">
                {languages.map((language) => (
                  <li key={language.id} className="flex justify-between">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-sm">{language.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="col-span-2">
          {experience.length > 0 && (
            <section className="mb-6">
              <h3 
                className="text-lg font-semibold mb-4 pb-1 border-b" 
                style={{ borderColor: theme.primary.light }}
              >
                Experiencia
              </h3>
              
              <div className="space-y-4">
                {experience.map((job) => (
                  <div key={job.id} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{job.position}</h4>
                      <span className="text-sm text-slate-600">
                        {job.startDate} - {job.endDate || 'Actual'}
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium mb-1">{job.company}, {job.location}</p>
                    
                    <p className="text-sm">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-6">
              <h3 
                className="text-lg font-semibold mb-4 pb-1 border-b" 
                style={{ borderColor: theme.primary.light }}
              >
                Educación
              </h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <span className="text-sm text-slate-600">
                        {edu.startDate} - {edu.endDate || 'Actual'}
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium">{edu.institution}, {edu.location}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate; 