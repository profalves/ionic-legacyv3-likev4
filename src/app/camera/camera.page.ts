import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public pictures: any;
  public photoUrl: string = "https://picsum.photos/200/200";

  constructor(private camera: Camera) { }

  takePhoto(source) {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      saveToPhotoAlbum: source == "picture" ? true : false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {

      this.photoUrl = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }

  ngOnInit() {
    this.pictures = []
  }

}
