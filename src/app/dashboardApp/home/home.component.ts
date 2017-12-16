import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  classList = [{name:"Math", professor:"Uwwxy", detail:"This is a full description of this course."},{name:"English", professor:"another", detail:"This is a full description of this course."},{name:"Physics", professor:"Unknow", detail:"This is a full description of this course."}];
  constructor() {

  }

  ngOnInit() {
  }

}
