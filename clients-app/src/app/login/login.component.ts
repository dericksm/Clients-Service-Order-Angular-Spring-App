import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { User } from '../models/user.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  public username: string;
  public password: string;
  public loginError: boolean = false
  public newUser: boolean = false
  public successMessage: string
  public errors: string[] = []
  ngOnInit(): void {}

  onSubmit(){
    this.authService.login(this.username, this.password)
    .subscribe(res => {
      const access_token = JSON.stringify(res)
      localStorage.setItem('access_token', access_token)
      this.router.navigate(['/home'])
    }, err => {
        this.errors = ['Usuário e/ou senha incorretos.']
    })
  }

  prepareToRegister(event){
    event.preventDefault()
    this.newUser = true
  }

  cancelRegister(){
    this.newUser = false
  }

  register(){
    const user: User = new User()
    user.password = this.password
    user.username = this.username
    this.authService.save(user).subscribe(res => {
      this.successMessage = "Cadastro realizado com sucesso"      
      this.loginError = false
      this.newUser = false
      this.password = ''
      this.username = ''
      this.errors = []
    }, (err) => {
      this.loginError = true
      this.successMessage = null
      this.errors = err.error.errors
      console.log(err)      
    })

  }
}
