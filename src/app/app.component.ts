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

    const firebaseConfig = {
      apiKey: "", // colocar conforme as configurações do firebase
      authDomain: "", // colocar conforme as configurações do firebase
      projectId: "", // colocar conforme as configurações do firebase
      storageBucket: "", // colocar conforme as configurações do firebase
      messagingSenderId: "", // colocar conforme as configurações do firebase
      appId: "", // colocar conforme as configurações do firebase
      measurementId: "" // colocar conforme as configurações do firebase
    };
    firebase.initializeApp(firebaseConfig)
  }
}
