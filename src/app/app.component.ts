import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'instaclone-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'instagram-clone';

  ngOnInit(): void {

    var firebaseConfig = {
      // colocar as configurações do seu fireBase
      // Project settings > SDK setup and configuration > CDN
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    };

    firebase.initializeApp(firebaseConfig)
  }
}
