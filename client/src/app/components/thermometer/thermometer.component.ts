import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() thermoColor: string;
  @Input() featureName: string;
  @Input() featurePercentage: string;

  constructor() { }

  ngOnInit() {
    console.log('thermometer called');
    //console.log('thermoColor: '+thermoColor);
    //console.log('featureName: '+featureName);
    //console.log('featurePercentage: '+featurePercentage);
  }

}
