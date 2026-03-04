/**
 * Risk Catalogue Cache Management
 */

import { Risk } from '../types';
import { listAllRisks } from './listAllRisks';
import { parseRisk } from './parseRisk';

// In-memory caches
let riskCache: Record<string, Risk> = {};
let cacheLoaded = false;

/**
 * Loads all risks into memory cache
 */
export function loadAllRisksIntoCache(): { success: boolean; errors: string[] } {
  if (cacheLoaded) {
    return { success: true, errors: [] };
  }

  const allRisks = listAllRisks();
  riskCache = {};
  const errors: string[] = [];

  for (const risk of allRisks) {
    try {
      const parsedRisk = parseRisk(risk.filePath);
      riskCache[parsedRisk.metadata.id] = parsedRisk;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Risk ${risk.id}: ${message}`);
      console.warn(`Failed to cache risk ${risk.id}:`, error);
    }
  }

  cacheLoaded = true;
  return { success: errors.length === 0, errors };
}

/**
 * Gets a risk from cache by ID
 */
export function getRiskFromCache(id: string): Risk | null {
  if (!cacheLoaded) {
    const result = loadAllRisksIntoCache();
    if (!result.success) {
      console.error('Cache loading failed:', result.errors);
      return null;
    }
  }

  if (!(id in riskCache)) {
    console.warn(`Risk with ID ${id} not found in cache`);
    return null;
  }

  return riskCache[id];
}

/**
 * Gets all cached risks
 */
export function getAllCachedRisks(): Risk[] {
  if (!cacheLoaded) {
    loadAllRisksIntoCache();
  }
  return Object.values(riskCache);
}

/**
 * Gets cached risks by category
 */
export function getRisksByCategoryFromCache(category: string): Risk[] {
  if (!cacheLoaded) {
    loadAllRisksIntoCache();
  }

  return Object.values(riskCache).filter((risk) => risk.metadata.category === category);
}

/**
 * Searches in cached risks
 */
export function searchCachedRisks(query: string): Risk[] {
  if (!cacheLoaded) {
    loadAllRisksIntoCache();
  }

  const lowerQuery = query.toLowerCase();

  return Object.values(riskCache).filter((risk) => {
    // Search in metadata
    const metadataMatch = Object.values(risk.metadata).some((val) =>
      String(val).toLowerCase().includes(lowerQuery)
    );

    // Search in sections
    const sectionsMatch = Object.values(risk.sections).some((section) =>
      section.toLowerCase().includes(lowerQuery)
    );

    return metadataMatch || sectionsMatch;
  });
}

/**
 * Clears the risk cache
 */
export function clearRiskCache(): void {
  riskCache = {};
  cacheLoaded = false;
}
