
import { Player, TeamType, TeamStats } from './types';

export const distributeTeams = (players: Omit<Player, 'team'>[]): Player[] => {
  const top40 = players.slice(0, 40);
  const subs = players.slice(40, 60);
  const reserve = players.slice(60);

  const totalForce40 = top40.reduce((acc, p) => acc + p.noteForce, 0);
  const targetAlphaForce = totalForce40 * 0.55;

  const shuffled40 = [...top40].sort(() => Math.random() - 0.5);

  let currentAlphaForce = 0;
  const alphaPlayers: Player[] = [];
  const bravoPlayers: Player[] = [];

  shuffled40.forEach(p => {
    if (currentAlphaForce < targetAlphaForce && alphaPlayers.length < 25) {
      alphaPlayers.push({ ...p, team: TeamType.ALPHA });
      currentAlphaForce += p.noteForce;
    } else {
      bravoPlayers.push({ ...p, team: TeamType.BRAVO });
    }
  });

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
