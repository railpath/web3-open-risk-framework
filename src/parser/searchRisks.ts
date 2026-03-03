/**
 * Searches risks by text query (in metadata and sections)
 */

import { listAllRisks } from './listAllRisks'
import { parseRisk } from './parseRisk'
import { Risk } from '../types'

export function searchRisks(query: string): Risk[] {
  const allRisks = listAllRisks()
  const lowerQuery = query.toLowerCase()
  
  return allRisks
    .map(risk => {
      try {
        return parseRisk(risk.filePath)
      } catch (error) {
        return null
      }
    })
    .filter((risk): risk is Risk => risk !== null)
    .filter(risk => {
      // Search in metadata
      const metadataMatch = Object.values(risk.metadata)
        .some(val => String(val).toLowerCase().includes(lowerQuery))
      
      // Search in sections
      const sectionsMatch = Object.values(risk.sections)
        .some(section => section.toLowerCase().includes(lowerQuery))
      
      return metadataMatch || sectionsMatch
    })
}
