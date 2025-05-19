import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialCVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profession: '',
    summary: '',
    profilePicture: null,
    website: '',
    linkedin: '',
    github: '',
  },
  education: [],
  experience: [],
  skills: [],
  languages: [],
  customSections: [],
};

export const useCVStore = create(
  persist(
    (set, get) => ({
      templateId: 'modern', // ID de la plantilla seleccionada
      cvs: {}, // Objeto que contendrá múltiples CVs
      activeCVId: 'default', // ID del CV activo
      history: [], // Historial para deshacer/rehacer
      historyIndex: -1, // Índice del historial actual
      saveTimestamp: null, // Marca de tiempo del último guardado

      cvData: { ...initialCVData },

      setPersonalInfo: (data) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            personalInfo: { ...prevState.personalInfo, ...data },
          },
          saveTimestamp: Date.now(),
        });
      },
      
      addEducation: (item) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            education: [...prevState.education, { id: crypto.randomUUID(), ...item }],
          },
          saveTimestamp: Date.now(),
        });
      },
      
      updateEducation: (id, data) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            education: prevState.education.map(item => 
              item.id === id ? { ...item, ...data } : item
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      removeEducation: (id) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            education: prevState.education.filter(item => item.id !== id),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      addExperience: (item) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            experience: [...prevState.experience, { id: crypto.randomUUID(), ...item }],
          },
          saveTimestamp: Date.now(),
        });
      },
      
      updateExperience: (id, data) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            experience: prevState.experience.map(item => 
              item.id === id ? { ...item, ...data } : item
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      removeExperience: (id) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            experience: prevState.experience.filter(item => item.id !== id),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      addSkill: (skill) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            skills: [...prevState.skills, { id: crypto.randomUUID(), ...skill }],
          },
          saveTimestamp: Date.now(),
        });
      },
      
      updateSkill: (id, data) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            skills: prevState.skills.map(item => 
              item.id === id ? { ...item, ...data } : item
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      removeSkill: (id) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            skills: prevState.skills.filter(item => item.id !== id),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      addLanguage: (language) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            languages: [...prevState.languages, { id: crypto.randomUUID(), ...language }],
          },
          saveTimestamp: Date.now(),
        });
      },
      
      updateLanguage: (id, data) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            languages: prevState.languages.map(item => 
              item.id === id ? { ...item, ...data } : item
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      removeLanguage: (id) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            languages: prevState.languages.filter(item => item.id !== id),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      addCustomSection: (section) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            customSections: [...prevState.customSections, {
              id: crypto.randomUUID(),
              title: section.title,
              items: []
            }],
          },
          saveTimestamp: Date.now(),
        });
      },
      
      addCustomSectionItem: (sectionId, item) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            customSections: prevState.customSections.map(section => 
              section.id === sectionId ? {
                ...section,
                items: [...section.items, { id: crypto.randomUUID(), ...item }]
              } : section
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      updateCustomSectionItem: (sectionId, itemId, data) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            customSections: prevState.customSections.map(section => 
              section.id === sectionId ? {
                ...section,
                items: section.items.map(item => 
                  item.id === itemId ? { ...item, ...data } : item
                )
              } : section
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      removeCustomSectionItem: (sectionId, itemId) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            customSections: prevState.customSections.map(section => 
              section.id === sectionId ? {
                ...section,
                items: section.items.filter(item => item.id !== itemId)
              } : section
            ),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      removeCustomSection: (sectionId) => {
        const prevState = get().cvData;
        set({
          cvData: {
            ...prevState,
            customSections: prevState.customSections.filter(section => section.id !== sectionId),
          },
          saveTimestamp: Date.now(),
        });
      },
      
      setTemplate: (templateId) => {
        set({ 
          templateId,
          saveTimestamp: Date.now() 
        });
      },
      
      createNewCV: (name = 'Mi CV') => {
        const newId = crypto.randomUUID();
        const prevCVs = get().cvs;
        
        set({
          cvs: {
            ...prevCVs,
            [newId]: {
              id: newId,
              name,
              templateId: 'modern',
              data: { ...initialCVData },
              createdAt: Date.now(),
              updatedAt: Date.now()
            }
          },
          activeCVId: newId,
        });
        
        return newId;
      },
      
      setActiveCV: (id) => {
        const cvs = get().cvs;
        if (cvs[id]) {
          set({ activeCVId: id });
        }
      },
      
      deleteCV: (id) => {
        const cvs = get().cvs;
        const { [id]: removed, ...restCVs } = cvs;
        
        set({ 
          cvs: restCVs,
          activeCVId: Object.keys(restCVs)[0] || 'default' 
        });
      },
      
      // Importar/Exportar CV
      importCV: (cvData) => {
        set({
          cvData,
          saveTimestamp: Date.now()
        });
      },
      
      exportCV: () => {
        return {
          data: get().cvData,
          template: get().templateId,
          timestamp: Date.now()
        };
      },
      
      resetCV: () => {
        set({
          cvData: { ...initialCVData },
          saveTimestamp: Date.now()
        });
      }
    }),
    {
      name: 'cv-storage',
    }
  )
); 