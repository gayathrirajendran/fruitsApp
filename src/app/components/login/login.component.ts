import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FruitsService } from 'src/app/services/fruits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isError;

  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private fruitService: FruitsService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.loginForm);

    this.fruitService.authenticate(this.loginForm.value.userName, this.loginForm.value.password).subscribe((response: boolean) => {

      if (response) {
        this.isError = false;

        this.router.navigate(['/dashboard']);

      } else {

        this.isError = true;

      }

    }, (error: any) => {

      console.log(error);

      this.isError = true;

    });

  }

  clearError() {

    this.isError = false;

  }

}
