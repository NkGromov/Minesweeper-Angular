import { Component, OnInit } from '@angular/core';
import { Template } from '../../models/templates';
import { TemplateService } from '../../services/templates.service';

@Component({
  selector: 'templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.sass'],
})
export class TemplatesComponent implements OnInit {
  templates = [] as Template[];
  constructor(public templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService
      .getTemplates()
      .subscribe((response) => (this.templates = response));
  }
}
