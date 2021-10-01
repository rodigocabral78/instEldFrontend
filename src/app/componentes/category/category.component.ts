import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from "../../models/category";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category = {} as Category;
  categories: Category[];

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  saveCategory(form: NgForm) {
    this.categoryService.saveCategory(this.category).subscribe(() => {
      this.cleanForm(form);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category).subscribe(() => {
      this.getCategories();
    });
  }

  cleanForm(form: NgForm) {
    this.getCategories();
    form.resetForm();
    this.category = {} as Category;
  }
}
