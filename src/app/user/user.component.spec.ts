import {async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from './user.service';
import {DataService} from '../shared/data.service';

describe('UserComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  }),
    it('should create the app', () => {
      const fixture = TestBed.createComponent(UserComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  it('should use username from the service', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(app.user.name);

  });
  it('should display username if user logged in', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });
  it('should\'t display username if user is not logged in', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
  });

  it('should\'t fetch data successfully if not called asynchronously', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });
  it('should fetch data successfully if not called asynchronously', async () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.data).toBe('Data');
    });
    expect(app.data).toBe(undefined);
  });

  it('should fetch data successfully if not called asynchronously', fakeAsync(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(app.data).toBe('Data');
  }));
});
