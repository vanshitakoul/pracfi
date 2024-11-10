import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Use this if your component is standalone
  imports: [FormsModule, RouterModule, CommonModule] // Declare necessary imports for this component
})
export class AppComponent {
  title = 'My Angular App'; // Define the title property
  registerData = { username: '', password: '' }; // Initialize registerData
  registeredUsers: Array<{ username: string }> = []; // Initialize registeredUsers array

  registerUser() {
    // Check if username is not empty
    if (this.registerData.username) {
      // Push the user data into the registeredUsers array
      this.registeredUsers.push({ username: this.registerData.username });
      // Reset the input fields
      this.registerData.username = '';
      this.registerData.password = '';
    }
  }
}
