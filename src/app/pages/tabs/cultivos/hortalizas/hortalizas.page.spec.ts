import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HortalizasPage } from './hortalizas.page';

describe('HortalizasPage', () => {
  let component: HortalizasPage;
  let fixture: ComponentFixture<HortalizasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HortalizasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
