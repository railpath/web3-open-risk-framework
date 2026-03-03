/**
 * Finds risks by category
 */

import { listAllRisks } from './listAllRisks'
import { parseRisk } from './parseRisk'
import { Risk } from '../types'

export function findRisksByCategory(category: string): Risk[] {
  const allRisks = listAllRisks()
  const categoryRisks = allRisks.filter(r => r.filePath.startsWith(`${category}/`))
  
  return categoryRisks.map(risk => parseRisk(risk.filePath))
}
