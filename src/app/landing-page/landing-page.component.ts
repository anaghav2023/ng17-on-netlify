// landing-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fetchOneEntry, type BuilderContent } from '@builder.io/sdk-angular';
import { Content } from '@builder.io/sdk-angular';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [Content, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  // Add your Public API Key, specify the page model, and initialize the content variable
  apiKey = '3f3ebbcc055e4b3dbf539daa67c4a45e';
  model = 'page';
  content: BuilderContent | null = null;

  locale = 'aa-DJ';

  async ngOnInit() {
    const urlPath = window.location.pathname || '';
    // fetch the content for the current page based on the current URL
    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath,
      },
      locale: this.locale,
      options: { locale: this.locale },
    });

    if (!content) {
      return;
    }

    this.content = content;
  }
}
