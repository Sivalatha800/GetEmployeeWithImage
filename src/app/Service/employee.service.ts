import { Injectable } from '@angular/core';

import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../DialogComponents/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(public storage: Storage, public dialog: MatDialog) {}

  //==========================  Photo Preview ===================
  imagePath: any;
  imgURL: any;
  message!: string;
  imageDownloadUrl!: string;
  imgURLMessage: any;
  public file: any = {};

  //==============================  Preview Image  ============================
  preview(files: any) {
    this.file = files[0];
    if (files.length === 0) return;

    var photoType = files[0].type;
    if (photoType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.message = '';
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  //==================================== Upload Image ===========================
  uploadImg() {
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on(
      'state_changed',
      (snapshort) => {
        const progress =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.imageDownloadUrl = downloadURL;
          console.log('File avalable at', this.imageDownloadUrl);
        });
      }
    );
    this.successAndErrorMessage = 'Image Uploaded Successfully';
    this.openDialogSuccess();
  }

  //=====================================  Open Dialog  =====================
  successAndErrorMessage!: string;
  openDialogSuccess(): void {
    let dialogRefSuccess = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      height: '200px',
      data: 'click',
    });
  }

  //=================================  Passing Form Values  ==============================
  empFormValuesData: any;
  employeeFormDetails(empFormValues: any) {
    this.empFormValuesData = empFormValues;
  }

  //=================================  Delete Image ======================
  deleteImage(deleteEmp: any) {
    const storageRef = ref(this.storage, deleteEmp.photoURL);
    deleteObject(storageRef)
      .then(() => {
        console.log('File deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
