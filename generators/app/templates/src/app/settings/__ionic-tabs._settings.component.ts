import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { TextFieldTypes } from '@ionic/core';

import { I18nService } from '@app/core/i18n.service';
<% if (props.auth) { -%>
import { AuthenticationService } from '@app/core/authentication/authentication.service';
<% } -%>

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private platform: Platform,
              private alertController: AlertController,
              private actionSheetController: ActionSheetController,
<% if (props.auth) { -%>
              private authenticationService: AuthenticationService,
<% } -%>
              private i18nService: I18nService) { }

  ngOnInit() { }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

<% if (props.auth) { -%>
  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
<% } -%>

  changeLanguage() {
    this.alertController.create({
        header: this.translateService.instant('Change language'),
        inputs: this.i18nService.supportedLanguages.map(language => ({
          type: 'radio' as TextFieldTypes,
          name: language,
          label: language,
          value: language,
          checked: language === this.i18nService.language
        })),
        buttons: [
          {
            text: this.translateService.instant('Cancel'),
            role: 'cancel'
          },
          {
            text: this.translateService.instant('Ok'),
            handler: language => {
              this.i18nService.language = language;
            }
          }
        ]
      })
      .then(alertController => alertController.present());
  }
}
