import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatasService } from 'src/app/Services/datas.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit,AfterViewInit{
  data: any[] = [];
  searchValue: string = '';
  displayedColumns: string[] = ['topic','source','intensity','likelihood','relevance','year','region','country'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DatasService) { 
  }
  ngOnInit(): void{
    this.dataService.getData().subscribe(
      (response: any[]) => {
        this.data = response;
        this.dataSource = new MatTableDataSource(this.data);
        if(this.paginator){
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    console.log(this.dataSource);
  }
 
  ngAfterViewInit() {
    if(this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }
}



