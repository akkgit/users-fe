import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//URL for api
apiUrl = environment.apiUrl;

//Create constructor to get Http instance
constructor(private http: HttpClient) {
}
//Fetch all users
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.apiUrl)
}
//Add user
addUser(user: User): Observable<any> {
  return this.http.post(this.apiUrl, user, {observe: 'response'})
                    .pipe(map(res => res.status));
}
}
