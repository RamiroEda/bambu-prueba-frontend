import { Component } from '@angular/core';
import { UserRepositoryService } from './data/repositories/user-repository.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private userRepository: UserRepositoryService
  ) { }

  /**
   * Usuario actual.
   */
  user = this.userRepository.currentUser();
}
