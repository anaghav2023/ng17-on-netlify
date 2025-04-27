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
    // If data is an array, loop through each element
    data.forEach((item, index) => {
      console.log(`Item ${index}:`);
      printRecursive(item); // Recursive call
    });
  } else if (typeof data === 'object' && data !== null) {
    // If data is an object, loop through each key-value pair
    Object.keys(data).forEach((key) => {
      console.log(`Key: ${key}`);
      printRecursive(data[key]); // Recursive call
    });
  } else {
    // If data is a primitive value, log it
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
  model = 'page';
  content: BuilderContent | null = null;

  locale = 'aa-DJ';

  async ngOnInit() {
    const urlPath = this.location.path() || '';
    // fetch the content for the current page based on the current URL
    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath,
      },
      options: {
        evaluateCode: true, // Make server evaluate all code bindings
        prerender: true,
        flatten: true,
      },
      // locale: this.locale,
      // options: { locale: this.locale },
    });

    // Debug log the fetched content
    console.log('Fetched content:'); // printRecursive(content?.data);
    printRecursive(content);

    // Further, check if the content is fully evaluated and structured correctly

    if (!content) {
      return;
    }

    this.content = content;
  }
}
