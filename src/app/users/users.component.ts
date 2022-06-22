import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private service: UserService) {}
  users!: User[];
  status!: number;
  message!: string;
  loading!: boolean;
  
  ngOnInit() {
    this.getUsers();
  }
  //Fetch all users
  getUsers() {
    this.loading = true;
    this.service.getUsers().subscribe(
      data => {
        this.users = data;
        this.loading = false;
      },
      error => {
        this.status = error.status;
        this.message = error.message;
        this.loading = false;
      }
    );
  }

}
