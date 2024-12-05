import { Holiday, SchoolVacation } from '@/lib/types';

interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  types: string[];
}

export async function fetchPublicHolidays(
  countryCode: string,
  year: number
): Promise<Holiday[]> {
  try {
    const response = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }

    const data: NagerHoliday[] = await response.json();

    return data.map((holiday) => ({
      date: new Date(holiday.date),
      name: holiday.localName,
      type: 'public',
      country: countryCode,
      region: holiday.counties?.[0],
    }));
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
}

// School vacation data for France
const FRENCH_VACATIONS: Record<string, Record<string, SchoolVacation[]>> = {
  '2024': {
    'A': [
      {
        startDate: new Date('2024-02-17'),
        endDate: new Date('2024-03-04'),
        name: "Vacances d'hiver",
        zone: 'A',
        country: 'FR'
      },
      {
        startDate: new Date('2024-04-13'),
        endDate: new Date('2024-04-29'),
        name: 'Vacances de printemps',
        zone: 'A',
        country: 'FR'
      },
      {
        startDate: new Date('2024-07-06'),
        endDate: new Date('2024-09-02'),
        name: "Vacances d'été",
        zone: 'A',
        country: 'FR'
      },
      {
        startDate: new Date('2024-10-19'),
        endDate: new Date('2024-11-04'),
        name: "Vacances de la Toussaint",
        zone: 'A',
        country: 'FR'
      },
      {
        startDate: new Date('2024-12-21'),
        endDate: new Date('2025-01-06'),
        name: 'Vacances de Noël',
        zone: 'A',
        country: 'FR'
      }
    ],
    'B': [
      {
        startDate: new Date('2024-02-24'),
        endDate: new Date('2024-03-11'),
        name: "Vacances d'hiver",
        zone: 'B',
        country: 'FR'
      },
      {
        startDate: new Date('2024-04-20'),
        endDate: new Date('2024-05-06'),
        name: 'Vacances de printemps',
        zone: 'B',
        country: 'FR'
      },
      {
        startDate: new Date('2024-07-06'),
        endDate: new Date('2024-09-02'),
        name: "Vacances d'été",
        zone: 'B',
        country: 'FR'
      },
      {
        startDate: new Date('2024-10-19'),
        endDate: new Date('2024-11-04'),
        name: "Vacances de la Toussaint",
        zone: 'B',
        country: 'FR'
      },
      {
        startDate: new Date('2024-12-21'),
        endDate: new Date('2025-01-06'),
        name: 'Vacances de Noël',
        zone: 'B',
        country: 'FR'
      }
    ],
    'C': [
      {
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-26'),
        name: "Vacances d'hiver",
        zone: 'C',
        country: 'FR'
      },
      {
        startDate: new Date('2024-04-06'),
        endDate: new Date('2024-04-22'),
        name: 'Vacances de printemps',
        zone: 'C',
        country: 'FR'
      },
      {
        startDate: new Date('2024-07-06'),
        endDate: new Date('2024-09-02'),
        name: "Vacances d'été",
        zone: 'C',
        country: 'FR'
      },
      {
        startDate: new Date('2024-10-19'),
        endDate: new Date('2024-11-04'),
        name: "Vacances de la Toussaint",
        zone: 'C',
        country: 'FR'
      },
      {
        startDate: new Date('2024-12-21'),
        endDate: new Date('2025-01-06'),
        name: 'Vacances de Noël',
        zone: 'C',
        country: 'FR'
      }
    ]
  }
};

export async function fetchSchoolVacations(
  country: string,
  zone: string,
  year: number
): Promise<SchoolVacation[]> {
  if (country === 'FR' && FRENCH_VACATIONS[year.toString()]?.[zone]) {
    return FRENCH_VACATIONS[year.toString()][zone];
  }
  return [];
}