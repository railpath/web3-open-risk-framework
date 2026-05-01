export type EntityType = 'risk' | 'indicator' | 'measure';

export type TemplateProfile = 'core' | 'fidleg';

export interface TemplateInput {
  entity: EntityType;
  id: string;
  title: string;
  description: string;
  profile?: TemplateProfile;
  category?: string;
  indicators?: string[];
  measures?: string[];
  owners?: string[];
  scopes?: string[];
  impactPotential?: 'LOW' | 'MEDIUM' | 'HIGH';
  difficulty?: 'LOW' | 'MEDIUM' | 'HIGH';
  date?: string;
}

export interface TemplateOptions {
  dryRun: boolean;
  maxRepairIterations: number;
}

export interface TemplateResult {
  success: boolean;
  outputPath: string;
  iterations: number;
  changes: string[];
  errors: string[];
}

export interface GenerationContext {
  nowDate: string;
  profile: TemplateProfile;
}
