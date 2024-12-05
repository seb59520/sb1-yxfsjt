import { Holiday, SchoolVacation } from '@/lib/types';
import { fetchPublicHolidays, fetchSchoolVacations } from './api';

export const COUNTRIES = [
  { code: 'FR', name: 'France' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'CA', name: 'Canada' },
] as const;

export const FRENCH_SCHOOL_ZONES = [
  { code: 'A', name: 'Zone A (Besançon, Bordeaux, Clermont-Ferrand, Dijon, Grenoble, Limoges, Lyon, Poitiers)' },
  { code: 'B', name: 'Zone B (Aix-Marseille, Amiens, Caen, Lille, Nancy-Metz, Nantes, Nice, Orléans-Tours, Reims, Rennes, Rouen, Strasbourg)' },
  { code: 'C', name: 'Zone C (Créteil, Montpellier, Paris, Toulouse, Versailles)' },
] as const;

export const FRENCH_REGIONS = [
  { code: 'IDF', name: 'Île-de-France' },
  { code: 'ARA', name: 'Auvergne-Rhône-Alpes' },
  { code: 'BFC', name: 'Bourgogne-Franche-Comté' },
  { code: 'BRE', name: 'Bretagne' },
  { code: 'CVL', name: 'Centre-Val de Loire' },
  { code: 'COR', name: 'Corse' },
  { code: 'GES', name: 'Grand Est' },
  { code: 'HDF', name: 'Hauts-de-France' },
  { code: 'NOR', name: 'Normandie' },
  { code: 'NAQ', name: 'Nouvelle-Aquitaine' },
  { code: 'OCC', name: 'Occitanie' },
  { code: 'PDL', name: 'Pays de la Loire' },
  { code: 'PAC', name: "Provence-Alpes-Côte d'Azur" },
] as const;

export async function getPublicHolidays(
  country: string,
  year: number
): Promise<Holiday[]> {
  return fetchPublicHolidays(country, year);
}

export async function getSchoolVacations(
  country: string,
  zone: string,
  year: number
): Promise<SchoolVacation[]> {
  return fetchSchoolVacations(country, zone, year);
}