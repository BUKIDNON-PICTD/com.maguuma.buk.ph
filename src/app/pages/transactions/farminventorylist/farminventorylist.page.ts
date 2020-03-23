import { Component, OnInit } from '@angular/core';
import { FarmerService } from 'src/app/services/farmer.service';
import { Platform } from '@ionic/angular';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'farminventorylist',
  templateUrl: './farminventorylist.page.html',
  styleUrls: ['./farminventorylist.page.scss'],
})
export class FarminventorylistPage implements OnInit {
  ios: boolean;
  public farmlocations: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";

  constructor(private masterService: MasterService, private plt: Platform) { }

   ngOnInit() {
    this.plt.ready().then(() => {
      this.pagesize = 25;
      this.pagenumber = 1;
      this.loadFarmLocations(null);
    });
  }

  loadFarmLocations(event) {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, " ");
    const queryWords = this.queryText.split(" ").filter(w => !!w.trim().length);
    if (event) {
      setTimeout(() => {
        this.masterService.getItems('agri_farmerprofile_location').then(items => {
          if (!items) {
            return null;
          } else {
            this.pagenumber += 1;
            items.forEach(farmlocation => {
              this.filterFarmerLocation(farmlocation, queryWords);
            });
            items = items.filter(i => i.hide === false);
            const sorteditems = items.sort((a, b) =>
              a.barangay.objid > b.barangay.objid ? 1 : -1
            );
            this.farmlocations = this.farmlocations.concat(
              this.paginate(sorteditems, this.pagesize, this.pagenumber)
            );
          }
        });
        event.target.complete();
        if (this.farmlocations.length === 1000) {
          event.target.disabled = true;
        }
      }, 500);
    } else {
      this.masterService.getItems("agri_farmerprofile_location").then(items => {
        if (!items) {
          return null;
        } else {
          items.forEach(farmlocation => {
            this.filterFarmerLocation(farmlocation, queryWords);
          });
          items = items.filter(i => i.hide === false);
          const sorteditems = items.sort((a, b) =>
            a.barangay.objid > b.barangay.objid ? 1 : -1
          );
          this.farmlocations = this.paginate(
            sorteditems,
            this.pagesize,
            this.pagenumber
          );
        }
      });
    }
  }

  filterFarmerLocation(item: any, queryWords: string[]) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (item.location.text.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    // let matchesTracks = false;
    // farmer.tracks.forEach((trackName: string) => {
    //   if (excludeTracks.indexOf(trackName) === -1) {
    //     matchesTracks = true;
    //   }
    // });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    // let matchesSegment = false;
    // if (segment === 'favorites') {
    //   if (this.user.hasFavorite(session.name)) {
    //     matchesSegment = true;
    //   }
    // } else {
    //   matchesSegment = true;
    // }

    // all tests must be true if it should not be hidden
    item.hide = !matchesQueryText;
  }

  private paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  deleteFarmer(item) {
    
  }
}