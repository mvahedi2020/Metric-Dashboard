export type HealthStatus = "Excellent" | "Good" | "At Risk";

export interface SprintHealth {
  score: number;
  status: HealthStatus;
  message: string;
}

/**
 * Calculates a synthetic health score based on velocity progress and active bugs.
 * @param currentVelocity The total story points completed so far.
 * @param activeBugs The current number of active (unresolved) bugs.
 * @param targetVelocity The team's target velocity (default 40).
 * @param bugPenalty The percentage penalty per active bug (default 5).
 */
export function calculateSprintHealth(
  currentVelocity: number,
  activeBugs: number,
  targetVelocity: number = 40,
  bugPenalty: number = 5
): SprintHealth {
  
  // 1. Calculate Base Velocity Score (Capped at 100)
  const velocityScore = Math.min((currentVelocity / targetVelocity) * 100, 100);
  
  // 2. Apply Bug Penalties
  const totalPenalty = activeBugs * bugPenalty;
  
  // 3. Final Score clamped between 0 and 100
  const finalScore = Math.max(Math.round(velocityScore - totalPenalty), 0);

  // 4. Determine Status & Message
  if (finalScore >= 90) {
    return {
      score: finalScore,
      status: "Excellent",
      message: "Sprint is heavily on track. High confidence in meeting all delivery milestones."
    };
  } else if (finalScore >= 70) {
    return {
      score: finalScore,
      status: "Good",
      message: "Sprint is proceeding well, though a few bugs or velocity delays need monitoring."
    };
  } else {
    return {
      score: finalScore,
      status: "At Risk",
      message: "Sprint is at risk. Immediate intervention required on active bugs or scope."
    };
  }
}
