import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-debt',
  templateUrl: './list-debt.component.html',
  styleUrls: ['./list-debt.component.scss']
})
export class ListDebtComponent implements OnInit {
  public debts: any = [];
  ngOnInit() {
  }

  deleteDebt(user: any) {
  }
}
