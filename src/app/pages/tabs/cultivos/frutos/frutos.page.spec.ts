import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrutosPage } from './frutos.page';

describe('FrutosPage', () => {
  let component: FrutosPage;
  let fixture: ComponentFixture<FrutosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FrutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
