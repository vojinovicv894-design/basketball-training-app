import { create } from 'zustand';
import { User, TrainingPlan, CompletedWorkout, SkillProgress, Goal } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (updatedUser) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    })),
}));

interface TrainingState {
  trainingPlans: TrainingPlan[];
  completedWorkouts: CompletedWorkout[];
  skillProgress: SkillProgress[];
  goals: Goal[];
  
  // Training Plans
  addTrainingPlan: (plan: TrainingPlan) => void;
  updateTrainingPlan: (plan: TrainingPlan) => void;
  deleteTrainingPlan: (planId: string) => void;
  getActiveTrainingPlan: () => TrainingPlan | null;
  
  // Completed Workouts
  addCompletedWorkout: (workout: CompletedWorkout) => void;
  getCompletedWorkouts: (userId: string) => CompletedWorkout[];
  
  // Skill Progress
  updateSkillProgress: (progress: SkillProgress) => void;
  getSkillProgress: (userId: string, skillId: string) => SkillProgress | null;
  
  // Goals
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  completeGoal: (goalId: string) => void;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  trainingPlans: [],
  completedWorkouts: [],
  skillProgress: [],
  goals: [],
  
  addTrainingPlan: (plan) =>
    set((state) => ({
      trainingPlans: [...state.trainingPlans, plan],
    })),
  
  updateTrainingPlan: (plan) =>
    set((state) => ({
      trainingPlans: state.trainingPlans.map((p) => (p.id === plan.id ? plan : p)),
    })),
  
  deleteTrainingPlan: (planId) =>
    set((state) => ({
      trainingPlans: state.trainingPlans.filter((p) => p.id !== planId),
    })),
  
  getActiveTrainingPlan: () => {
    const state = get();
    return state.trainingPlans.find((p) => p.isActive) || null;
  },
  
  addCompletedWorkout: (workout) =>
    set((state) => ({
      completedWorkouts: [...state.completedWorkouts, workout],
    })),
  
  getCompletedWorkouts: (userId) => {
    const state = get();
    return state.completedWorkouts.filter((w) => w.userId === userId);
  },
  
  updateSkillProgress: (progress) =>
    set((state) => {
      const existing = state.skillProgress.find(
        (p) => p.skillId === progress.skillId && p.userId === progress.userId
      );
      if (existing) {
        return {
          skillProgress: state.skillProgress.map((p) =>
            p.skillId === progress.skillId && p.userId === progress.userId ? progress : p
          ),
        };
      }
      return { skillProgress: [...state.skillProgress, progress] };
    }),
  
  getSkillProgress: (userId, skillId) => {
    const state = get();
    return (
      state.skillProgress.find((p) => p.userId === userId && p.skillId === skillId) || null
    );
  },
  
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),
  
  updateGoal: (goal) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === goal.id ? goal : g)),
    })),
  
  deleteGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== goalId),
    })),
  
  completeGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId ? { ...g, isCompleted: true } : g
      ),
    })),
}));
