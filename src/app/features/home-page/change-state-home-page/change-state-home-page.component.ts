import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Author } from '../../../models/author';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-change-state-home-page',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './change-state-home-page.component.html',
  styleUrl: './change-state-home-page.component.scss'
})
export class ChangeStateHomePageComponent implements OnInit {
  
  @Input() observable?:Observable<any>;
  @Output() changeContent = new EventEmitter<HttpParams>();

  service = inject(ApiCoreService);
  
  selectAuthor:number=0;
  sortBy:number=0;
  onlyFavorities:boolean=false;
  searchField:string="";

  authors?:Author[];
  arraySortBy?:string[];

  onChangeContent(){
    this.changeContent.emit();
  }

}
