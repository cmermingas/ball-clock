/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClockLevelComponent } from './clock-level.component';
import { Observable, Subject } from 'rxjs';

describe('ClockLevelComponent', () => {
  let component: ClockLevelComponent;
  let fixture: ComponentFixture<ClockLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClockLevelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockLevelComponent);
    component = fixture.componentInstance;

    // let debugElement = fixture.debugElement.query(By.css('p'));
    // let element = debugElement.nativeElement;

  });

  describe('Unit level', () => {
    let marbleSource: Subject<number>;
    let overflowCount = 0;

    beforeEach(() => {
      component.minValue = 1;
      component.maxValue = 4;
      component.step = 1;
      marbleSource = new Subject<number>();
      component.marbleSource = marbleSource;
      overflowCount = 0;
      component.overflow.subscribe(x => overflowCount += 1);
      fixture.detectChanges();
      spyOn(component.sourceSubscription,'unsubscribe').and.callThrough();
    });

    it('should have an overflow property', () => {
      expect(component.overflow).toBeTruthy();
    });

    it('should start with zero marbles', () => {
      expect(component.marbleCount).toEqual(0);
    });

    it('should increase marbleCount with each marble emitted', fakeAsync(() => {
      marbleSource.next(1);
      // Do I need to call tick() here?
      expect(component.marbleCount).toEqual(1);
      marbleSource.next(1);
      expect(component.marbleCount).toEqual(2);
      marbleSource.next(1);
      expect(component.marbleCount).toEqual(3);
    }));

    it('should overflow exactly once', fakeAsync(() => {
      for (let i = 0 ; i < 5; i++) {
        marbleSource.next(1);
      }
      tick(); // Is this needed?
      expect(component.marbleCount).toEqual(0);
      expect(overflowCount).toEqual(1);
    }));

    it('should unsubscribe on destroy', () => {
      fixture.destroy();
      expect(component.sourceSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('5s level', () => {
    let marbleSource: Subject<number>;
    let overflowCount = 0;

    beforeEach(() => {
      component.minValue = 5;
      component.maxValue = 55;
      component.step = 5;
      marbleSource = new Subject<number>();
      component.marbleSource = marbleSource;
      overflowCount = 0;
      component.overflow.subscribe(x => overflowCount += 1);
      fixture.detectChanges();
    });

    it('should increase marbleCount with each marble emitted', fakeAsync(() => {
      marbleSource.next(1);
      // Do I need to call tick() here?
      expect(component.marbleCount).toEqual(1);
      marbleSource.next(1);
      expect(component.marbleCount).toEqual(2);
      marbleSource.next(1);
      expect(component.marbleCount).toEqual(3);
    }));

    it('should overflow exactly once', fakeAsync(() => {
      for (let i = 0 ; i < 12; i++) {
        marbleSource.next(1);
      }
      tick(); // Is this needed?
      expect(component.marbleCount).toEqual(0);
      expect(overflowCount).toEqual(1);
    }));
  });

  describe('Hour level', () => {
    let marbleSource: Subject<number>;
    let overflowCount = 0;

    beforeEach(() => {
      component.minValue = 1;
      component.maxValue = 11;
      component.step = 1;
      marbleSource = new Subject<number>();
      component.marbleSource = marbleSource;
      overflowCount = 0;
      component.overflow.subscribe(x => overflowCount += 1);
      fixture.detectChanges();
    });

    it('should increase marbleCount with each marble emitted', fakeAsync(() => {
      marbleSource.next(1);
      // Do I need to call tick() here?
      expect(component.marbleCount).toEqual(1);
      marbleSource.next(1);
      expect(component.marbleCount).toEqual(2);
      marbleSource.next(1);
      expect(component.marbleCount).toEqual(3);
    }));

    it('should overflow exactly once', fakeAsync(() => {
      for (let i = 0 ; i < 12; i++) {
        marbleSource.next(1);
      }
      tick(); // Is this needed?
      expect(component.marbleCount).toEqual(0);
      expect(overflowCount).toEqual(1);
    }));
  });

});
