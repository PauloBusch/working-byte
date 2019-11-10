import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-bottom-sheet',
  template: ``
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  private bottomSheetRef: MatBottomSheetRef;
  private subscriptions: Subscription[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.data
      .subscribe(data => {
        this.openForm(data.form);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public openForm(form: any) {
    this.bottomSheetRef = this.bottomSheet.open(form);
    const { params } = this.activatedRoute.snapshot;
    this.bottomSheetRef.instance.loadData(params);

    this.subscriptions.push(this.bottomSheetRef.afterDismissed().subscribe(() => {
      const { url } = this.router;
      const { path } = this.activatedRoute.snapshot.routeConfig;
      const navigate = url.substring(null, url.indexOf(_.first(path.split('/:'))));
      this.router.navigate([navigate]);
    }));
  }

  public closeForm() {
    this.bottomSheet.dismiss();
  }
}
