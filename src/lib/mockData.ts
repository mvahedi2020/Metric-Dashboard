export interface DeveloperBandwidth {
  name: string;
  role: string;
  assignedPoints: number;
  capacityPoints: number;
}

export interface JiraMetrics {
  todo: number;
  inProgress: number;
  done: number;
  totalVelocity: number;
  activeBugs: number;
}

export interface SprintData {
  id: string;
  name: string;
  metrics: JiraMetrics;
  bandwidth: DeveloperBandwidth[];
}

export const sprints: SprintData[] = [
  {
    id: "sprint-42",
    name: "Sprint 42",
    metrics: {
      todo: 12,
      inProgress: 8,
      done: 22,
      totalVelocity: 38,
      activeBugs: 3
    },
    bandwidth: [
      { name: "Sarah J.", role: "Frontend Lead", assignedPoints: 24, capacityPoints: 20 },
      { name: "Marcus T.", role: "Backend Eng", assignedPoints: 12, capacityPoints: 18 },
      { name: "Elena R.", role: "Fullstack", assignedPoints: 19, capacityPoints: 20 },
      { name: "David L.", role: "DevOps", assignedPoints: 15, capacityPoints: 15 },
    ]
  },
  {
    id: "sprint-43",
    name: "Sprint 43",
    metrics: {
      todo: 8,
      inProgress: 14,
      done: 18,
      totalVelocity: 42,
      activeBugs: 1
    },
    bandwidth: [
      { name: "Sarah J.", role: "Frontend Lead", assignedPoints: 18, capacityPoints: 20 },
      { name: "Marcus T.", role: "Backend Eng", assignedPoints: 16, capacityPoints: 18 },
      { name: "Elena R.", role: "Fullstack", assignedPoints: 22, capacityPoints: 20 },
      { name: "David L.", role: "DevOps", assignedPoints: 12, capacityPoints: 15 },
    ]
  },
  {
    id: "sprint-44",
    name: "Sprint 44 (Current)",
    metrics: {
      todo: 21,
      inProgress: 11,
      done: 5,
      totalVelocity: 31,
      activeBugs: 4
    },
    bandwidth: [
      { name: "Sarah J.", role: "Frontend Lead", assignedPoints: 21, capacityPoints: 20 },
      { name: "Marcus T.", role: "Backend Eng", assignedPoints: 15, capacityPoints: 18 },
      { name: "Elena R.", role: "Fullstack", assignedPoints: 18, capacityPoints: 20 },
      { name: "David L.", role: "DevOps", assignedPoints: 14, capacityPoints: 15 },
    ]
  }
];
