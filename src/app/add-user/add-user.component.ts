import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  status!: number;
  message!: string;
 

  constructor(
    private service: UserService,
  ) {}

  //Create form
  userForm = new FormGroup({
    firstname: new FormControl(
      "",
      Validators.compose([Validators.required])
    ),
    lastname: new FormControl(
      "",
      Validators.compose([Validators.required])
    ),
  });
 
  ngOnInit() {
    
  }
 
  // add user
  onClickSubmit() {
    if (this.userForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform add
    let user = this.userForm.value;
    
      //add user
      this.service.addUser(user).subscribe(
        status => {
          this.status = status;
          this.userForm.reset();
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );   
  }

}
