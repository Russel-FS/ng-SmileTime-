import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty searchTerm by default', () => {
    expect(component.searchTerm).toBe('');
  });

  it('should emit search term when input changes', () => {
    const searchTerm = 'test search';
    spyOn(component.searched, 'emit');
    
    component.searchTerm = searchTerm;
    component.onSearch();

    expect(component.searched.emit).toHaveBeenCalledWith(searchTerm);
  });

  it('should update searchTerm and emit when input value changes', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const searchTerm = 'test search';
    spyOn(component.searched, 'emit');

    input.value = searchTerm;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchTerm).toBe(searchTerm);
    expect(component.searched.emit).toHaveBeenCalledWith(searchTerm);
  });

  it('should emit search term when search button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    const searchTerm = 'test search';
    spyOn(component.searched, 'emit');
    
    component.searchTerm = searchTerm;
    button.click();
    fixture.detectChanges();

    expect(component.searched.emit).toHaveBeenCalledWith(searchTerm);
  });

  it('should have correct placeholder text', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.placeholder).toBe('Buscar odontólogo...');
  });
});
