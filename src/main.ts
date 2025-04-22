import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { builderDevTools } from '@builder.io/dev-tools/angular';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

builderDevTools().catch((err: Error) =>
  console.error('Error starting dev tools:', err)
);

function generateNonce(): string {
  return btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)))
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const nonce = generateNonce();

  // Apply nonce to existing scripts
  document
    .querySelectorAll("script[nonce='GENERATED_NONCE']")
    .forEach((script) => {
      script.setAttribute('nonce', nonce);
    });

  // Dynamically add CSP meta tag
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://cdn.builder.io https://builder.io;
        style-src 'self' 'unsafe-inline' https://cdn.builder.io https://builder.io;
        img-src 'self' data: https://cdn.builder.io https://builder.io;
        frame-src https://builder.io;
        connect-src 'self' https://cdn.builder.io https://builder.io;
      `;
  document.head.appendChild(meta);
});
