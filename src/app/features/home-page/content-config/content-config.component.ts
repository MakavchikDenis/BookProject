import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { ContentConfig } from '../content-config';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-config-content',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatSlideToggleModule,MatAutocompleteModule,MatIconModule],
  templateUrl: './content-config.component.html',
  styleUrl: './content-config.component.scss'
})
export class ContentConfigComponent  {
  
  @Input() authors:string[]=[]
  @Input() nameBooks:string[]=[]
  @Output() configChange = new EventEmitter<[ContentConfig,string]>();

  service = inject(ApiCoreService);
  
  // исходные значения для конфигурации
  selectAuthor:string="";
  sortBy:string="";
  onlyFavorites:boolean=false;
  searchName:string=""

  //исходные массивы -select
  arraySortBy:string[]=["None","Name","Year"];

  handlerKeyUp(event:any){
    if(event.keyCode===13){
      this.onChangeContent("search");
    }
  }

  onChangeContent(event:string){
    if(event=='author'){
      this.configChange.emit([ContentConfig.SelectAuthor,this.selectAuthor=="None"? "": this.selectAuthor]);
    }
    else if(event=='favorites'){
      this.configChange.emit([ContentConfig.OnlyFavorites,this.onlyFavorites ? "true" : ""]);
    }
    else if(event=='search'){
      this.configChange.emit([ContentConfig.SearchText,this.searchName.trim()])
    }
  }
}
