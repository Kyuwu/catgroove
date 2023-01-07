import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageItem } from 'ng-gallery';
import { map } from 'rxjs';
import Management from 'src/app/shared/models/management';
import { DancerService } from 'src/app/shared/services/firebase/dancer.service';
import { ManagementService } from 'src/app/shared/services/firebase/management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  type = "Management"
  constructor(private db: DancerService, private gallery: Gallery) {}

  ngOnInit(): void {
    const galleryRef = this.gallery.ref('myGallery');

    this.db.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      )
    ).subscribe(data => {
      data.forEach(element => {
        galleryRef.addImage({ src: element.image });
      });
    });
  }


}
