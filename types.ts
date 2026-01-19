
export enum TeamType {
  ALPHA = 'ALPHA',
  BRAVO = 'BRAVO',
  SUBSTITUTE_ALPHA = 'REMPLAÇANT ALPHA',
  SUBSTITUTE_BRAVO = 'REMPLAÇANT BRAVO',
  RESERVE = 'RÉSERVE',
  UNASSIGNED = 'NON ASSIGNÉ'
}

export type ViewType = 'UNITS' | 'RANKING';

export interface Player {
  rank: number;
  name: string;
  donations: number;
  power: number;
  noteDonations: number;
  noteVS: number;
  noteForce: number;
  finalScore: number;
  team: TeamType;
}

export interface TeamStats {
  totalForce: number;
  playerCount: number;
  percentage: number;
  avgDonations: number;
}
