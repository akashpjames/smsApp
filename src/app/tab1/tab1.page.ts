import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var SMS: any;

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

    constructor( private androidPermissions: AndroidPermissions ) {}

    checkPermissionAndSend() {

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
            success => {
                if (!success.hasPermission) {
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).
                    then((success) => {
                            this.sendMessage();
                        },
                        (err) => {
                            console.error(err);
                        });
                } else {
                    this.sendMessage();
                }
            },
            err => {
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).
                then((success) => {
                        this.sendMessage();
                    },
                    (err) => {
                        console.error(err);
                    });
            });
    }

    sendMessage(){
        if(SMS) {
            SMS.sendSMS("Add your mobile number", "Test Message", () => {
                console.log('Message sent successfully');
            }, (error) => {
                console.error(error);
            });
        }
    }
}
