import {Component, input, model} from '@angular/core';
import {CourseCategory} from "../models/course-category.model";

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {
  label = input.required<string>();
  categoryValue = model.required<CourseCategory>();

  onCategoryChanged(categorySelected: string) {
    this.categoryValue.set(categorySelected as CourseCategory);
  }
}
