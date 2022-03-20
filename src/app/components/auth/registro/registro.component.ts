import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(private fb:FormBuilder, private authService:AuthService) { 
    this.createForm();
  }
  ngOnInit(): void {
  }
  register():void{
    if(this.registerForm.invalid){
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.authService.register(this.user).subscribe((data:any) => {
        console.log('Registro completado');
      }, error => {
        console.log(error);
      });
    }
  }
  createForm():void{
    this.registerForm = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['', [Validators.required]],
      password2:['',[Validators.required]]
    });
  }
  get emailValidate(){
    return(
    this.registerForm.get('email').invalid && this.registerForm.get('email').touched
    );
  }
  get passwordValidate(){
    return(
    this.registerForm.get('password').invalid && this.registerForm.get('password').touched
    );
  }
  get password2Validate(){
    const pass = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return pass == pass2 ? false :true;
  }
  setUser():void{
    this.user = {
    email: this.registerForm.get('email').value,
    password: this.registerForm.get('password').value
    };
  }
}
