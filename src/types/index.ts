// User and authentication types
export interface User {
  id: string;
  name: string;
  email: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'multi';
  age: number;
  joinedDate: Date;
}

// Training related types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  skillsTargeted: Skill[];
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'shooting' | 'dribbling' | 'defense' | 'passing' | 'footwork' | 'conditioning';
  description: string;
}

export interface WorkoutSet {
  exerciseId: string;
  reps?: number;
  duration?: number;
  rest: number; // rest time in seconds
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // total duration in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  exercises: WorkoutSet[];
  skillsFocused: Skill[];
  createdDate: Date;
  lastModified: Date;
}

export interface TrainingPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  goalDescription: string;
  workouts: Workout[];
  frequency: number; // workouts per week
  startDate: Date;
  endDate?: Date;
  skillsToImprove: Skill[];
  isActive: boolean;
  createdDate: Date;
}

export interface CompletedWorkout {
  id: string;
  userId: string;
  workoutId: string;
  trainingPlanId: string;
  completedDate: Date;
  duration: number;
  exercises: CompletedExercise[];
  notes: string;
  rating: number; // 1-5 scale
}

export interface CompletedExercise {
  exerciseId: string;
  repsCompleted?: number;
  durationCompleted?: number;
  notes: string;
}

export interface SkillProgress {
  userId: string;
  skillId: string;
  skillName: string;
  level: number; // 0-100
  history: ProgressRecord[];
  lastUpdated: Date;
}

export interface ProgressRecord {
  date: Date;
  level: number;
  workoutId: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  skillTargeted: Skill;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  isCompleted: boolean;
  createdDate: Date;
}
