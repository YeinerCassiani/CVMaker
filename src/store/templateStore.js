import { create } from 'zustand';

const colorThemes = {
  blue: {
    primary: {
      light: '#dbeafe',
      DEFAULT: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      light: '#f0f9ff',
      DEFAULT: '#e0f2fe',
      dark: '#0ea5e9',
    },
    accent: '#0284c7',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
    },
  },
  green: {
    primary: {
      light: '#d1fae5',
      DEFAULT: '#10b981',
      dark: '#047857',
    },
    secondary: {
      light: '#f0fdfa',
      DEFAULT: '#ccfbf1',
      dark: '#0d9488',
    },
    accent: '#14b8a6',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
    },
  },
  purple: {
    primary: {
      light: '#ede9fe',
      DEFAULT: '#8b5cf6',
      dark: '#6d28d9',
    },
    secondary: {
      light: '#f5f3ff',
      DEFAULT: '#e9d5ff',
      dark: '#a855f7',
    },
    accent: '#9333ea',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
    },
  },
  dark: {
    primary: {
      light: '#334155',
      DEFAULT: '#1e293b',
      dark: '#0f172a',
    },
    secondary: {
      light: '#475569',
      DEFAULT: '#334155',
      dark: '#1e293b',
    },
    accent: '#6366f1',
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
    },
  },
  light: {
    primary: {
      light: '#e5e7eb',
      DEFAULT: '#9ca3af',
      dark: '#6b7280',
    },
    secondary: {
      light: '#f9fafb',
      DEFAULT: '#f3f4f6',
      dark: '#d1d5db',
    },
    accent: '#4b5563',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
    },
  },
};

const fonts = {
  sans: ['Inter', 'sans-serif'],
  serif: ['Merriweather', 'serif'],
  mono: ['JetBrains Mono', 'monospace'],
  display: ['Poppins', 'sans-serif'],
  elegant: ['Playfair Display', 'serif'],
};

const templates = {
  modern: {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño limpio y profesional con acentos de color',
    thumbnail: '', 
    defaultColor: 'blue',
    defaultFont: 'sans',
    layout: 'sidebar',
    sections: ['personal', 'education', 'experience', 'skills', 'languages'],
  },
  classic: {
    id: 'classic',
    name: 'Clásico',
    description: 'Diseño tradicional y elegante para ambientes corporativos',
    thumbnail: '',
    defaultColor: 'light',
    defaultFont: 'serif',
    layout: 'top',
    sections: ['personal', 'experience', 'education', 'skills', 'languages'],
  },
  creative: {
    id: 'creative',
    name: 'Creativo',
    description: 'Diseño moderno y original para destacar tu personalidad',
    thumbnail: '',
    defaultColor: 'purple',
    defaultFont: 'display',
    layout: 'cards',
    sections: ['personal', 'skills', 'experience', 'education', 'languages'],
  },
  minimal: {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Diseño simple y directo enfocado en la información esencial',
    thumbnail: '',
    defaultColor: 'light',
    defaultFont: 'sans',
    layout: 'minimal',
    sections: ['personal', 'experience', 'education', 'skills'],
  },
  tech: {
    id: 'tech',
    name: 'Tecnológico',
    description: 'Diseño orientado a perfiles técnicos y de desarrollo',
    thumbnail: '',
    defaultColor: 'dark',
    defaultFont: 'mono',
    layout: 'grid',
    sections: ['personal', 'skills', 'experience', 'education', 'languages', 'projects'],
  }
};

export const useTemplateStore = create((set, get) => ({
  templates,
  colorThemes,
  fonts,
  
  activeTemplateId: 'modern',
  activeColorTheme: 'blue',
  activeFont: 'sans',
  customColor: null,
  
  paperSize: 'a4',
  margins: 'normal',
  showPageNumbers: true,
  spacing: 'compact',
  
  setActiveTemplate: (templateId) => {
    const template = templates[templateId];
    if (!template) return;
    
    set({ 
      activeTemplateId: templateId,
      activeColorTheme: template.defaultColor,
      activeFont: template.defaultFont
    });
  },
  
  setColorTheme: (colorThemeId) => {
    if (colorThemes[colorThemeId] || colorThemeId === 'custom') {
      set({ activeColorTheme: colorThemeId });
    }
  },
  
  setCustomColor: (customColorObj) => {
    set({ 
      customColor: customColorObj,
      activeColorTheme: 'custom' 
    });
  },
  
  setFont: (fontFamily) => {
    if (fonts[fontFamily]) {
      set({ activeFont: fontFamily });
    }
  },
  
  setPaperSize: (size) => {
    set({ paperSize: size });
  },
  
  setMargins: (marginSize) => {
    set({ margins: marginSize });
  },
  
  setShowPageNumbers: (show) => {
    set({ showPageNumbers: show });
  },
  
  setSpacing: (spacing) => {
    set({ spacing });
  },
  
  getCurrentTemplate: () => {
    return templates[get().activeTemplateId];
  },
  
  getCurrentColorTheme: () => {
    const { activeColorTheme, customColor } = get();
    return activeColorTheme === 'custom' ? customColor : colorThemes[activeColorTheme];
  },
  
  getCurrentFont: () => {
    return fonts[get().activeFont];
  },
  
  getPageConfig: () => {
    return {
      paperSize: get().paperSize,
      margins: get().margins,
      showPageNumbers: get().showPageNumbers,
      spacing: get().spacing
    };
  }
})); 