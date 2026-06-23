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
      todo: 25,
      inProgress: 5,
      done: 8,
      totalVelocity: 14,
      activeBugs: 7
    },
    bandwidth: [
      { name: "Sarah J.", role: "Frontend Lead", assignedPoints: 18, capacityPoints: 20 },
      { name: "Marcus T.", role: "Backend Eng", assignedPoints: 22, capacityPoints: 18 },
      { name: "Elena R.", role: "Fullstack", assignedPoints: 10, capacityPoints: 20 },
      { name: "David L.", role: "DevOps", assignedPoints: 16, capacityPoints: 15 },
    ]
  },
  {
    id: "sprint-44",
    name: "Sprint 44 (Planning)",
    metrics: {
      todo: 45,
      inProgress: 0,
      done: 0,
      totalVelocity: 0,
      activeBugs: 1
    },
    bandwidth: [
      { name: "Sarah J.", role: "Frontend Lead", assignedPoints: 5, capacityPoints: 20 },
      { name: "Marcus T.", role: "Backend Eng", assignedPoints: 8, capacityPoints: 18 },
      { name: "Elena R.", role: "Fullstack", assignedPoints: 4, capacityPoints: 20 },
      { name: "David L.", role: "DevOps", assignedPoints: 2, capacityPoints: 15 },
    ]
  }
];
