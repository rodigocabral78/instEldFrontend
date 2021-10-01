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

  // defini se um category será criado ou atualizado
  saveCategory(form: NgForm) {
    if (this.category.id !== undefined) {
      this.categoryService.updateCategory(this.category).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.categoryService.saveCategory(this.category).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os categories
  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  // deleta um category
  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category).subscribe(() => {
      this.getCategories();
    });
  }

  // copia o category para ser editado.
  editCategory(category: Category) {
    this.category = { ...category };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getCategories();
    form.resetForm();
    this.category = {} as Category;
  }
}
