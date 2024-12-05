export const SPACE_COLORS: Record<ActivitySpace, string> = {
  professional: 'bg-blue-500 hover:bg-blue-600',
  personal: 'bg-pink-500 hover:bg-pink-600',
  associative: 'bg-green-500 hover:bg-green-600',
};

export const SPACE_NAMES: Record<ActivitySpace, string> = {
  professional: 'Professionnel',
  personal: 'Personnel',
  associative: 'Associatif',
};

export const SPACE_TEXT_COLORS: Record<ActivitySpace, string> = {
  professional: 'text-blue-700 dark:text-blue-300',
  personal: 'text-pink-700 dark:text-pink-300',
  associative: 'text-green-700 dark:text-green-300',
};

export const SPACE_BORDER_COLORS: Record<ActivitySpace, string> = {
  professional: 'border-blue-500 dark:border-blue-400',
  personal: 'border-pink-500 dark:border-pink-400',
  associative: 'border-green-500 dark:border-green-400',
};

export const SPACE_BACKGROUND_COLORS: Record<ActivitySpace, string> = {
  professional: 'bg-blue-50 dark:bg-blue-950/50',
  personal: 'bg-pink-50 dark:bg-pink-950/50',
  associative: 'bg-green-50 dark:bg-green-950/50',
};

export const SPACE_HOVER_COLORS: Record<ActivitySpace, string> = {
  professional: 'hover:bg-blue-100 dark:hover:bg-blue-900/50',
  personal: 'hover:bg-pink-100 dark:hover:bg-pink-900/50',
  associative: 'hover:bg-green-100 dark:hover:bg-green-900/50',
};

export const SPACE_ICONS: Record<ActivitySpace, string> = {
  professional: 'briefcase',
  personal: 'heart',
  associative: 'users',
};

export const LEVEL_DESCRIPTIONS = {
  1: 'Débutant - Commencez votre voyage',
  2: 'Apprenti - Développez vos compétences',
  3: 'Intermédiaire - Maîtrisez les bases',
  4: 'Avancé - Perfectionnez vos techniques',
  5: 'Expert - Excellez dans tous les domaines',
};

export const WORKLOAD_LEVELS = {
  low: {
    threshold: 5,
    label: 'Normale',
    color: 'text-green-500',
  },
  medium: {
    threshold: 10,
    label: 'Modérée',
    color: 'text-amber-500',
  },
  high: {
    threshold: 15,
    label: 'Élevée',
    color: 'text-red-500',
  },
};

export type ActivitySpace = 'professional' | 'personal' | 'associative';