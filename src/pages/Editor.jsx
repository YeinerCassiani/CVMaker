import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCVStore } from '../store/cvStore';

const PersonalInfoForm = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
            placeholder="Tus apellidos"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Profesión</label>
        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="input"
          placeholder="Ej. Desarrollador Full Stack"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input"
          placeholder="+34 612 345 678"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ubicación</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input"
          placeholder="Ciudad, País"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resumen profesional</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          rows="4"
          className="input"
          placeholder="Breve descripción de tu perfil profesional"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sitio web</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input"
            placeholder="https://miwebsite.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="input"
            placeholder="linkedin.com/in/usuario"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="input"
            placeholder="github.com/usuario"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary px-4 py-2">
          Guardar cambios
        </button>
      </div>
    </form>
  );
};

const ExperienceForm = ({ data = [], onAdd, onUpdate, onRemove }) => {
  const initialState = {
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData(initialState);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Experiencia laboral</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 cv-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Empresa</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="input"
              placeholder="Nombre de la empresa"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Puesto</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="input"
              placeholder="Puesto o cargo"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ubicación</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input"
            placeholder="Ciudad, País"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha inicio</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
              placeholder="MM/AAAA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha fin</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input"
              placeholder="MM/AAAA o 'Actual'"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="input"
            placeholder="Descripción de responsabilidades y logros"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialState);
                setEditingId(null);
              }}
              className="btn btn-outline px-4 py-2"
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary px-4 py-2">
            {editingId ? 'Actualizar' : 'Añadir experiencia'}
          </button>
        </div>
      </form>

      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Experiencia añadida:</h4>
          {data.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">{item.position}</h4>
                  <p className="text-sm">{item.company}, {item.location}</p>
                </div>
                <div className="text-sm text-slate-500">
                  {item.startDate} - {item.endDate || 'Actual'}
                </div>
              </div>
              {item.description && <p className="text-sm">{item.description}</p>}
              <div className="mt-3 flex space-x-2 justify-end">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EducationForm = ({ data = [], onAdd, onUpdate, onRemove }) => {
  const initialState = {
    institution: '',
    degree: '',
    location: '',
    startDate: '',
    endDate: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData(initialState);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Educación</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 cv-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Institución</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="input"
              placeholder="Universidad o Centro educativo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Título/Grado</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="input"
              placeholder="Grado o titulación obtenida"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ubicación</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input"
            placeholder="Ciudad, País"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha inicio</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
              placeholder="MM/AAAA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha fin</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input"
              placeholder="MM/AAAA o 'Actual'"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialState);
                setEditingId(null);
              }}
              className="btn btn-outline px-4 py-2"
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary px-4 py-2">
            {editingId ? 'Actualizar' : 'Añadir educación'}
          </button>
        </div>
      </form>

      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Educación añadida:</h4>
          {data.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">{item.degree}</h4>
                  <p className="text-sm">{item.institution}, {item.location}</p>
                </div>
                <div className="text-sm text-slate-500">
                  {item.startDate} - {item.endDate || 'Actual'}
                </div>
              </div>
              <div className="mt-3 flex space-x-2 justify-end">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SkillsForm = ({ data = [], onAdd, onUpdate, onRemove }) => {
  const initialState = {
    name: '',
    level: 3,
  };

  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'level' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData(initialState);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Habilidades</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 cv-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la habilidad</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Ej. React, Marketing Digital, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nivel (1-5)
              <span className="ml-2 text-slate-400">{formData.level}/5</span>
            </label>
            <input
              type="range"
              name="level"
              min="1"
              max="5"
              step="1"
              value={formData.level}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialState);
                setEditingId(null);
              }}
              className="btn btn-outline px-4 py-2"
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary px-4 py-2">
            {editingId ? 'Actualizar' : 'Añadir habilidad'}
          </button>
        </div>
      </form>

      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Habilidades añadidas:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className="text-sm">{item.level}/5</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${(item.level / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-3 flex space-x-2 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LanguagesForm = ({ data = [], onAdd, onUpdate, onRemove }) => {
  const initialState = {
    name: '',
    level: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

  const languageLevels = [
    'Básico',
    'Intermedio',
    'Avanzado',
    'Fluido',
    'Nativo',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData(initialState);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Idiomas</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 cv-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Idioma</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Ej. Inglés, Español, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nivel</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="" disabled>Selecciona un nivel</option>
              {languageLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialState);
                setEditingId(null);
              }}
              className="btn btn-outline px-4 py-2"
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary px-4 py-2">
            {editingId ? 'Actualizar' : 'Añadir idioma'}
          </button>
        </div>
      </form>

      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Idiomas añadidos:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className="text-sm">{item.level}</span>
                </div>
                <div className="mt-3 flex space-x-2 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function Editor() {
  const {
    cvData,
    setPersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
  } = useCVStore();

  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', label: 'Información Personal', icon: '👤' },
    { id: 'experience', label: 'Experiencia', icon: '💼' },
    { id: 'education', label: 'Educación', icon: '🎓' },
    { id: 'skills', label: 'Habilidades', icon: '🛠️' },
    { id: 'languages', label: 'Idiomas', icon: '🌎' },
  ];

  return (
    <div>
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Editor de CV</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Completa todas las secciones para crear tu currículum perfecto.
          </p>
        </div>
        <div className="flex space-x-2">
          <Link to="/templates" className="btn btn-outline py-2 px-4">
            Cambiar plantilla
          </Link>
          <Link to="/preview" className="btn btn-primary py-2 px-4">
            Vista previa
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="font-medium mb-3 pb-2 border-b dark:border-slate-700">
              Secciones
            </h2>
            <nav>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                        activeSection === section.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary dark:text-primary-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700/70'
                      }`}
                    >
                      <span className="mr-2 text-xl">{section.icon}</span>
                      <span>{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            {activeSection === 'personal' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-slate-700">
                  Información Personal
                </h2>
                <PersonalInfoForm
                  data={cvData.personalInfo}
                  onSave={setPersonalInfo}
                />
              </div>
            )}

            {activeSection === 'experience' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-slate-700">
                  Experiencia
                </h2>
                <ExperienceForm
                  data={cvData.experience}
                  onAdd={addExperience}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
                />
              </div>
            )}

            {activeSection === 'education' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-slate-700">
                  Educación
                </h2>
                <EducationForm
                  data={cvData.education}
                  onAdd={addEducation}
                  onUpdate={updateEducation}
                  onRemove={removeEducation}
                />
              </div>
            )}

            {activeSection === 'skills' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-slate-700">
                  Habilidades
                </h2>
                <SkillsForm
                  data={cvData.skills}
                  onAdd={addSkill}
                  onUpdate={updateSkill}
                  onRemove={removeSkill}
                />
              </div>
            )}

            {activeSection === 'languages' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-slate-700">
                  Idiomas
                </h2>
                <LanguagesForm
                  data={cvData.languages}
                  onAdd={addLanguage}
                  onUpdate={updateLanguage}
                  onRemove={removeLanguage}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Editor; 