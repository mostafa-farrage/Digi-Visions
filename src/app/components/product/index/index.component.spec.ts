import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        IndexComponent
      ],
    }).compileComponents();
  });
  it('should create the index component', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it(`should have products'`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.componentInstance;
    expect(component.items.length).toBeGreaterThan(0);
  });
});
