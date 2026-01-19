
import { Player, TeamType, TeamStats } from './types';

export const distributeTeams = (players: Omit<Player, 'team'>[]): Player[] => {
  // On prend les 40 premiers pour les équipes principales
  const top40 = [...players.slice(0, 40)].sort((a, b) => b.noteForce - a.noteForce);
  const subs = players.slice(40, 60);
  const reserve = players.slice(60);

  const alphaPlayers: Player[] = [];
  const bravoPlayers: Player[] = [];

  /**
   * MÉLANGE STRATÉGIQUE :
   * On crée 20 paires (le plus fort avec le moins fort du top 40, etc.)
   * Pour chaque paire, on attribue le "fort" à l'équipe qui a besoin de puissance 
   * pour atteindre l'objectif de 55/45, et le "faible" à l'autre.
   * Cela garantit un mélange "Forts et Faibles" dans chaque unité.
   */
  for (let i = 0; i < 20; i++) {
    const strong = top40[i];
    const weak = top40[39 - i];

    const currentAlphaForce = alphaPlayers.reduce((sum, p) => sum + p.noteForce, 0);
    const currentBravoForce = bravoPlayers.reduce((sum, p) => sum + p.noteForce, 0);
    const totalCurrent = currentAlphaForce + currentBravoForce;
    
    // Si Alpha est en dessous de 55% de la force actuelle, il prend le joueur fort de la paire
    const alphaNeedsForce = totalCurrent === 0 || (currentAlphaForce / totalCurrent) < 0.55;

    if (alphaNeedsForce) {
      alphaPlayers.push({ ...strong, team: TeamType.ALPHA });
      bravoPlayers.push({ ...weak, team: TeamType.BRAVO });
    } else {
      alphaPlayers.push({ ...weak, team: TeamType.ALPHA });
      bravoPlayers.push({ ...strong, team: TeamType.BRAVO });
    }
  }

  const alphaSubs = subs.slice(0, 10).map(p => ({ ...p, team: TeamType.SUBSTITUTE_ALPHA }));
  const bravoSubs = subs.slice(10, 20).map(p => ({ ...p, team: TeamType.SUBSTITUTE_BRAVO }));
  const reservePlayers = reserve.map(p => ({ ...p, team: TeamType.RESERVE }));

  return [...alphaPlayers, ...bravoPlayers, ...alphaSubs, ...bravoSubs, ...reservePlayers].sort((a, b) => a.rank - b.rank);
};

export const calculateStats = (players: Player[], team: TeamType | 'ALL'): TeamStats => {
  const filtered = team === 'ALL' 
    ? players.filter(p => [TeamType.ALPHA, TeamType.BRAVO].includes(p.team))
    : players.filter(p => p.team === team);
  
  const totalForce = filtered.reduce((acc, p) => acc + p.noteForce, 0);
  const allMainForce = players
    .filter(p => [TeamType.ALPHA, TeamType.BRAVO].includes(p.team))
    .reduce((acc, p) => acc + p.noteForce, 0);

  return {
    totalForce: Math.round(totalForce * 100) / 100,
    playerCount: filtered.length,
    percentage: allMainForce === 0 ? 0 : Math.round((totalForce / allMainForce) * 100),
    avgDonations: filtered.length === 0 ? 0 : Math.round(filtered.reduce((acc, p) => acc + p.donations, 0) / filtered.length)
  };
};
