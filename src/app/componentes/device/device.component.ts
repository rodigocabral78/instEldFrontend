import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from "../../models/device";
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from "../../models/category";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  device = {} as Device;
  devices: Device[];

  category = {} as Category;
  categories: Category[];

  constructor(private deviceService:DeviceService, private categoryService:CategoryService) { }

  ngOnInit() {
    this.getDevices();
    this.getCategories();
  }

  saveDevice(form: NgForm) {
    this.deviceService.saveDevice(this.device).subscribe(() => {
      this.cleanForm(form);
    });
  }

  getDevices() {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;
    });
  }

  deleteDevice(device: Device) {
    this.deviceService.deleteDevice(device).subscribe(() => {
      this.getDevices();
    });
  }

  cleanForm(form: NgForm) {
    this.getDevices();
    form.resetForm();
    this.getCategories();
    this.device = {} as Device;
    this.category = {} as Category;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
}
