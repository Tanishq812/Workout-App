import { Component, OnInit } from '@angular/core';
import { UserDataService, Workout, User } from '../user-data.service';
import { Color, ScaleType } from '@swimlane/ngx-charts'; // Import Color and ScaleType

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  username: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting'];
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  selectedWorkoutType: string = '';
  selectedUser: User | null = null; // Track the selected user
  p: number = 1;
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  colorScheme: {
    name: string;
    selectable: boolean;
    group: ScaleType;
    domain: string[];
  } = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.loadUsers();
  }

  addWorkout() {
    const workout: Workout = {
      type: this.workoutType,
      minutes: this.workoutMinutes
    };

    this.userDataService.addWorkout(this.username, workout);
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userDataService.getUsers();
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedWorkoutType ? user.workouts.some(workout => workout.type === this.selectedWorkoutType) : true)
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.prepareChartData(user);
  }

  prepareChartData(user: User) {
    this.chartData = this.workoutTypes.map(workoutType => {
      const totalMinutes = user.workouts
        .filter(workout => workout.type === workoutType)
        .reduce((sum, workout) => sum + workout.minutes, 0);
      return {
        name: workoutType,
        value: totalMinutes
      };
    }).filter(data => data.value > 0);
  }
}
