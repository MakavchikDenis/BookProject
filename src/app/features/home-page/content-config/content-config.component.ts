import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Author } from '../../../shared/models/author';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { ContentConfig } from '../content-config';

@Component({
  selector: 'app-config-content',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './content-config.component.html',
  styleUrl: './content-config.component.scss'
})
export class ContentConfigComponent {
  
  @Input() authors?:string[];
  @Output() configChange = new EventEmitter<[ContentConfig,string|boolean]>();

  service = inject(ApiCoreService);
  
  // исходные значения для конфигурации
  selectAuthor:string="";
  onlyFavorities:boolean=false;
 

  //исходные массивы -select
  authorsArray?:string[];
  arraySortBy?:string[]=["Name","Year"]

  onChangeContent(event:ContentConfig){
    event==ContentConfig.SelectAuthor ? this.configChange.emit([event,this.selectAuthor]) : this.configChange.emit([event,this.onlyFavorities]);
  }
}
