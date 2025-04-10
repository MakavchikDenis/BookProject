import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { ContentConfig, SortKind } from '../content-config';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { UserStateService } from '../../../core/services/user-state.service';
;

@Component({
  selector: 'app-config-content',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatSlideToggleModule,MatAutocompleteModule,MatIconModule],
  templateUrl: './content-config.component.html',
  styleUrl: './content-config.component.scss'
})
export class ContentConfigComponent  {
  
  @Input() authors:string[]=[]
  @Output() filteringContent = new EventEmitter<[ContentConfig,string]>();
  @Output() sortingContent = new EventEmitter<SortKind>();

 readonly userState = inject(UserStateService);
  
  // исходные значения для конфигурации
  selectAuthor:string="";
  sortBy:string="";
  onlyFavorites:boolean=false;
  searchName:string=""

  //исходные массивы -select
  arraySortBy:string[]=["None","Name","Year"];

  handlerKeyUp(event:any){
    if(event.keyCode===13){
      this.onFilterContent("search");
    }
  }

  onSortContent(){
    this.sortingContent.emit(this.sortBy=="None"? SortKind.None : this.sortBy=="Name" ? SortKind.Name : SortKind.Year);
  }

  onFilterContent(event:string){
    if(event=='author'){
      this.filteringContent.emit([ContentConfig.SelectAuthor,this.selectAuthor=="None"? "": this.selectAuthor]);
    }
    else if(event=='favorites'){
      this.filteringContent.emit([ContentConfig.OnlyFavorites,this.onlyFavorites ? "true" : ""]);
    }
    else if(event=='search'){
      this.filteringContent.emit([ContentConfig.SearchText,this.searchName.trim()])
    }
  }
}
