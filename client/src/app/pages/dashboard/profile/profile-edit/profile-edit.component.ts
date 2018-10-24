import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalUserService} from '../../../../@core/data/local-user.service';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import {UserProfile} from '../../../../@core/models/profile.model';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  model: UserProfile;
  @Output() onEditSuccess: EventEmitter<any> = new EventEmitter();

  toasterConfig: ToasterConfig;
  constructor(private localUserService: LocalUserService,
              private toasterService: ToasterService,
              private changeDet: ChangeDetectorRef) {
    this.toasterConfig = new ToasterConfig({
      positionClass: 'toast-top-full-width',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'fade', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
  }
  ngOnInit(): void {
    this.localUserService.getLocal().subscribe(usr => {
      this.model = usr.profile;
      this.changeDet.detectChanges();
    });
  }

  onSubmit(): void {
    this.localUserService.updateProfile(this.model).subscribe(data => {
      // console.log('Response: ' + data);
      this.onEditSuccess.emit(this.model);
      this.localUserService.refreshLocal();
      // TODO: redirect to user profile?
      this.showToast('success', 'Updated user profile!', '');
    }, error => {
      this.showToast('error', 'Failed to update user profile!', error.message);
    });
  }

  showToast(type: string, title: string, body: string) {
    // types: ['default', 'info', 'success', 'warning', 'error']
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };

    this.toasterService.popAsync(toast);
  }
}