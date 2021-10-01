import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Device } from '../models/device';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  url = environment.baseUrl + '/devices';
  environment: any;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getDeviceById(id: number): Observable<Device> {
    return this.httpClient.get<Device>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveDevice(device: Device): Observable<Device> {
    // device.partNumber = Number(device.partNumber)
    console.log(device)
    return this.httpClient.post<Device>(this.url, JSON.stringify(device), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteDevice(device: Device) {
    return this.httpClient.delete<Device>(this.url + '/' + device.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code : ${error.status}, ` + `message: ${error.message}`;
    }
    window.alert(error.error.message);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
