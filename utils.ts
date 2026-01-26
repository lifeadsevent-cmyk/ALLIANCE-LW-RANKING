import { Player, TeamType, TeamStats } from './types';

/**
 * Vérifie si l'ajout d'une équipe à une séquence respecte la règle de "pas plus de 2 consécutifs".
 */
const isSequenceValid = (sequence: TeamType[], next: TeamType): boolean => {
  if (sequence.length < 2) return true;
  return !(sequence[sequence.length - 1] === next && sequence[sequence.length - 2] === next);
};

/**
 * Génère une séquence d'équipes pour une tranche donnée.
 */
const generateTrancheSequence = (
  countA: number,
  countB: number,
  prefix: TeamType[]
): TeamType[] | null => {
  const total = countA + countB;
  const result: TeamType[] = [];

  const backtrack = (current: TeamType[], remA: number, remB: number): boolean => {
    if (current.length === total) return true;

    // Mélange des options pour l'aléa
    const options = Math.random() > 0.5 ? [TeamType.ALPHA, TeamType.BRAVO] : [TeamType.BRAVO, TeamType.ALPHA];

    for (const opt of options) {
      if ((opt === TeamType.ALPHA && remA > 0) || (opt === TeamType.BRAVO && remB > 0)) {
        const fullSequenceSoFar = [...prefix, ...current];
        if (isSequenceValid(fullSequenceSoFar, opt)) {
          current.push(opt);
          if (backtrack(current, opt === TeamType.ALPHA ? remA - 1 : remA, opt === TeamType.BRAVO ? remB - 1 : remB)) {
            return true;
          }
          current.pop();
        }
      }
    }
    return false;
  };

  if (backtrack(result, countA, countB)) return result;
  return null;
};

export const distributeTeams = (players: Omit<Player, 'team'>[]): Player[] => {
  // On s'assure que les joueurs sont triés par rang (ou score) pour l'attribution séquentielle
  const sorted = [...players].sort((a, b) => b.finalScore - a.finalScore);
  
  const top10 = sorted.slice(0, 10);
  const next30 = sorted.slice(10, 40);
  const subs = sorted.slice(40, 60);
  const rest = sorted.slice(60);

  // --- 1. TOP 10 (5 Alpha / 5 Bravo) ---
  // Contraintes : Rank 1 = Alpha, Rank 2 = Bravo.
  let top10Teams: TeamType[] = [TeamType.ALPHA, TeamType.BRAVO];
  const remainingTop10 = generateTrancheSequence(4, 4, top10Teams);
  if (remainingTop10) top10Teams = [...top10Teams, ...remainingTop10];

  // --- 2. TITULAIRES 11-40 (15 Alpha / 15 Bravo) ---
  // Objectif : Alpha ~55% de la puissance totale Top 40
  const totalTop40Score = sorted.slice(0, 40).reduce((acc, p) => acc + p.finalScore, 0);
  const targetAlphaScore = totalTop40Score * 0.55;
  
  let bestNext30Teams: TeamType[] = [];
  let minDiff = Infinity;

  // On génère plusieurs séquences valides et on garde celle qui approche le mieux le 55/45
  for (let i = 0; i < 2000; i++) {
    const testTeams = generateTrancheSequence(15, 15, top10Teams);
    if (!testTeams) continue;

    const fullTop40Teams = [...top10Teams, ...testTeams];
    const alphaScore = sorted.slice(0, 40).reduce((acc, p, idx) => 
      fullTop40Teams[idx] === TeamType.ALPHA ? acc + p.finalScore : acc, 0
    );

    const diff = Math.abs(alphaScore - targetAlphaScore);
    if (diff < minDiff) {
      minDiff = diff;
      bestNext30Teams = testTeams;
      // Si on est à moins de 0.5% d'erreur, on s'arrête
      if (diff < totalTop40Score * 0.005) break;
    }
  }

  // --- 3. REMPLAÇANTS 41-60 (10 Alpha / 10 Bravo) ---
  const prefixForSubs = [...top10Teams, ...bestNext30Teams];
  const subsTeamsRaw = generateTrancheSequence(10, 10, prefixForSubs) || [];
  
  // --- ASSEMBLAGE ---
  const finalPlayers: Player[] = [];

  // Top 10
  top10.forEach((p, i) => finalPlayers.push({ ...p, team: top10Teams[i] }));
  // 11-40
  next30.forEach((p, i) => finalPlayers.push({ ...p, team: bestNext30Teams[i] }));
  // 41-60
  subs.forEach((p, i) => {
    const team = subsTeamsRaw[i] === TeamType.ALPHA ? TeamType.SUBSTITUTE_ALPHA : TeamType.SUBSTITUTE_BRAVO;
    finalPlayers.push({ ...p, team });
  });
  // Reste
  rest.forEach(p => finalPlayers.push({ ...p, team: TeamType.RESERVE }));

  return finalPlayers;
};

export const calculateStats = (players: Player[], team: TeamType | 'ALL'): TeamStats => {
  const isMain = (t: TeamType) => t === TeamType.ALPHA || t === TeamType.BRAVO;
  
  const filtered = team === 'ALL' 
    ? players.filter(p => isMain(p.team))
    : players.filter(p => p.team === team);
  
  const totalScore = filtered.reduce((acc, p) => acc + p.finalScore, 0);
  const allMainScore = players
    .filter(p => isMain(p.team))
    .reduce((acc, p) => acc + p.finalScore, 0);

  return {
    totalForce: Math.round(totalScore * 100) / 100,
    playerCount: filtered.length,
    percentage: allMainScore === 0 ? 0 : Math.round((totalScore / allMainScore) * 100),
    avgDonations: filtered.length === 0 ? 0 : Math.round(filtered.reduce((acc, p) => acc + p.donations, 0) / filtered.length)
  };
};
