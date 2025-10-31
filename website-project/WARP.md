# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A static website project built with vanilla HTML, CSS, and JavaScript. No build tools or package managers required.

## Development Commands

### Running the Website

Since this is a static site, open `index.html` directly in a browser or use a local server:

**PowerShell (Python):**
```powershell
python -m http.server 8000
```

**Node.js (if available):**
```powershell
npx serve
```

Then navigate to `http://localhost:8000` or the port shown.

### Testing Changes

No automated tests exist. Manual testing in browser is required:
1. Open/refresh `index.html` in browser
2. Test navigation links and smooth scrolling
3. Test responsive behavior (resize browser or use DevTools)
4. Check browser console for JavaScript errors

## Architecture

### Core Structure

- **index.html**: Single-page application with semantic HTML5. Uses anchor-based navigation (`#home`, `#about`, `#contact`)
- **css/styles.css**: Mobile-first responsive design with CSS reset. Breakpoint at 768px
- **js/script.js**: Vanilla JavaScript with two main features:
  - Smooth scroll navigation using `scrollIntoView()`
  - Intersection Observer API for section fade-in animations on scroll
- **assets/**: Currently empty directory for images and media

### Key Technical Details

**JavaScript Patterns:**
- All code wrapped in `DOMContentLoaded` event listener to ensure DOM is ready
- Uses Intersection Observer API for scroll-based animations (threshold: 0.5)
- Sections animate with opacity and translateY transforms

**CSS Approach:**
- Universal box-sizing reset (`* { box-sizing: border-box }`)
- CSS custom properties are NOT used (colors hardcoded)
- Max-width container pattern (1200px) for content centering
- System font stack for performance

**Navigation:**
- Hash-based routing (client-side only, no server routing)
- Navigation links use `href="#section-id"` pattern
- JavaScript intercepts clicks for smooth scrolling

## File Modification Guidelines

**When editing HTML:**
- Maintain semantic structure (header > nav, main > section, footer)
- Any new sections need corresponding navigation links in `<nav>`
- Add `id` attributes to new sections for anchor navigation

**When editing CSS:**
- Follow existing naming conventions (no BEM, no utility classes)
- Maintain responsive design considerations
- Keep mobile breakpoint at 768px unless redesigning entirely

**When editing JavaScript:**
- Keep code within `DOMContentLoaded` wrapper
- Don't break smooth scroll or Intersection Observer functionality
- Test in browser console during development

## Browser Compatibility

Targets modern browsers (Chrome, Firefox, Safari, Edge). Uses ES6+ JavaScript and modern CSS. No transpilation or polyfills.
