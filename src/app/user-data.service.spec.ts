import { TestBed } from '@angular/core/testing';
import { UserDataService, User, Workout } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data', () => {
    const users = service.getUsers();
    expect(users.length).toBe(3);
  });

  it('should add workout to existing user', () => {
    const workout: Workout = { type: 'Running', minutes: 30 };
    service.addWorkout('John Doe', workout);
    const user = service.getUsers().find(u => u.name === 'John Doe');
    expect(user?.workouts.length).toBe(3);
  });

  it('should add workout and create new user if user does not exist', () => {
    const workout: Workout = { type: 'Running', minutes: 45 };
    service.addWorkout('New User', workout);
    const user = service.getUsers().find(u => u.name === 'New User');
    expect(user).toBeTruthy();
    expect(user?.workouts.length).toBe(1);
  });

  it('should save data to localStorage', () => {
    const spy = spyOn(localStorage, 'setItem');
    const workout: Workout = { type: 'Running', minutes: 45 };
    service.addWorkout('Test User', workout);
    expect(spy).toHaveBeenCalledWith(service['storageKey'], jasmine.any(String));
  });

  it('should load data from localStorage', () => {
    const testData: User[] = [
      { id: 1, name: 'Test User', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(testData));
    const newService = new UserDataService();
    expect(newService.getUsers()).toEqual(testData);
  });
});
