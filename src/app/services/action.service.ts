import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private httpService: HttpService) { }

  async addUser(path: string, data: Object) {
    try {
      const response = await this.httpService.post(path, data);
      console.log('User Added:', response);
      return response
    } catch (error) {
      console.error('Error adding user:', error);
      return { "ErrorMessage": "Internal Server Error" }
    }
  }
  async updateUser(path: string, data: Object) {
    try {
      const response = await this.httpService.put(path, data);
      console.log('User Updated:', response);
      return response
    } catch (error) {
      console.error('Error updating user:', error);
      return { "ErrorMessage": "Internal Server Error" }
    }
  }

  async getUsers(path: string) {
    try {
      const users = await this.httpService.get(path);
      console.log('Users:', users);
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      return { "ErrorMessage": "Internal Server Error" }
    }
  }
  async deleteUser(path: string) {
    try {
      const response = await this.httpService.delete(path);
      console.log('User Deleted:', response);
      return response;
    } catch (error) {
      console.error('Error deleting users:', error);
      return { "ErrorMessage": "Internal Server Error" }
    }
  }

}