import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserDataService, Workout, User } from '../user-data.service';
import { WorkoutFormComponent } from './workout-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let userDataService: UserDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutFormComponent ],
      providers: [ UserDataService ],
      imports: [ FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    userDataService = TestBed.inject(UserDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    spyOn(component, 'loadUsers');
    component.ngOnInit();
    expect(component.loadUsers).toHaveBeenCalled();
  });

  it('should add workout and reload users', () => {
    const spyAddWorkout = spyOn(userDataService, 'addWorkout');
    const spyLoadUsers = spyOn(component, 'loadUsers');
    component.username = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;
    component.addWorkout();
    expect(spyAddWorkout).toHaveBeenCalledWith('John Doe', { type: 'Running', minutes: 30 });
    expect(spyLoadUsers).toHaveBeenCalled();
  });

  it('should filter users correctly', () => {
    component.users = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    component.searchQuery = 'Jane';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane Smith');
  });

  it('should select user and prepare chart data', () => {
    const user: User = { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] };
    component.selectUser(user);
    expect(component.selectedUser).toBe(user);
    expect(component.chartData.length).toBeGreaterThan(0);
  });

  it('should prepare chart data correctly', () => {
    const user: User = { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 15 }] };
    component.prepareChartData(user);
    expect(component.chartData).toEqual([
      { name: 'Running', value: 30 },
      { name: 'Cycling', value: 15 }
    ]);
  });
});
