import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { UpdateCategoryDTO } from '../dtos/category/update.category.dto';
import { InsertCategoryDTO } from '../dtos/category/insert.category.dto';
import { ApiResponse } from '../responses/api.response';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiBaseUrl = enviroment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  // getCategories():Observable<any> {
  //     return this.http.get<any>(`${enviroment.apiBaseUrl}/categories`);           
  // }

  getCategories(): Observable<any>{
    return this.http.get(this.apiBaseUrl+ "/categories")
  }
  
  getDetailCategory(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/categories/${id}`);
  }
  deleteCategory(id: number): Observable<ApiResponse> {
    debugger
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/categories/${id}`);
  }
  updateCategory(id: number, updatedCategory: UpdateCategoryDTO): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiBaseUrl}/categories/${id}`, updatedCategory);
  }  
  insertCategory(insertCategoryDTO: InsertCategoryDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}/categories`, insertCategoryDTO);
  }
}
