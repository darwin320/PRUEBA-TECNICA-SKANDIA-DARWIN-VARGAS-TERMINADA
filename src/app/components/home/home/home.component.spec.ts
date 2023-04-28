import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
class MockNgbActiveOffcanvas {
  // Aquí puedes agregar cualquier método o propiedad que necesites para tus pruebas
}

describe('MainSidebarComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: NgbActiveOffcanvas, useClass: MockNgbActiveOffcanvas },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
export { HomeComponent };

