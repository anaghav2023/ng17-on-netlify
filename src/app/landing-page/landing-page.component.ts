// landing-page.component.ts
import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  fetchOneEntry,
  type BuilderContent,
} from '@builder.io/sdk-angular/bundle/edge';
import { Content } from '@builder.io/sdk-angular/bundle/edge';

function printRecursive(data: any) {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      console.log(`Item ${index}:`);
      printRecursive(item);
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) => {
      console.log(`Key: ${key}`);
      printRecursive(data[key]);
    });
  } else {
    console.log(data);
  }
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [Content, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private location: Location) {}

  // Add your Public API Key, specify the page model, and initialize the content variable
  apiKey = '3f3ebbcc055e4b3dbf539daa67c4a45e';
  model = 'page-2';
  content: BuilderContent | null = null;
  locale = 'aa-DJ';

  async ngOnInit() {
    const urlPath = this.location.path() || '';
    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath,
      },
      options: { locale: this.locale },
    });

    if (!content) {
      return;
    }

    this.content = content;
  }
}
