import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private storageKey = 'userData';
  private userData: User[];

  constructor() {
    this.userData = this.loadData();
  }

  private loadData(): User[] {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
    }
    return [];
  }

  getUsers(): User[] {
    return this.userData;
  }

  addWorkout(userName: string, workout: Workout) {
    const user = this.userData.find(u => u.name === userName);
    if (user) {
      user.workouts.push(workout);
    } else {
      const newUser: User = {
        id: this.userData.length + 1,
        name: userName,
        workouts: [workout]
      };
      this.userData.push(newUser);
    }
    this.saveData();
  }

  private saveData() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
    }
  }
}
