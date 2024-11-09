import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {

        this.router.navigate(['/dashboard']);
        this.errorMessage = null;
        console.log("Login successful:", response);
      },
      (error) => {

        if (error.status === 403) {
          this.errorMessage = "Votre email n'est pas confirmé. Veuillez vérifier votre boîte mail pour le lien de confirmation.";
        } else if (error.status === 401) {
          this.errorMessage = "Mauvais email ou mot de passe.";
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
        }
        console.error("Login error:", error);
      }
    );
  }
}
