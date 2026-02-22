# Sofia's Memory Gallery - AI Agent Instructions

## Project Overview
This is a personal memory gallery website displaying photos and videos with captions and background music. The project follows a simple three-file architecture: HTML structure, vanilla JavaScript for interactivity, and CSS for styling.

## Architecture & Key Files

### Media Management (`script.js`)
- **Core data structure**: `mediaItems` array contains `{type, src, caption}` objects
- All media is added to this array; no external database or API
- `currentIndex` tracks the active media item for gallery navigation
- **Pattern**: To add media, append objects to `mediaItems` array following existing format

### UI Components (`index.html`)
- Gallery container wraps all content with responsive max-width (800px)
- Media display div dynamically renders images or videos
- Controls are hidden until user clicks "❤️ Ver memórias" (Portuguese: "See memories")
- Background music element with `.mp3` support

### Styling (`style.css`)
- Dark theme: `#1a1a1a` background, `#e63946` accent (red)
- Red button hover effect uses `#d62828`
- Media items constrained to 60vh max-height with responsive width (90%)
- `.hidden` utility class uses `!important` to ensure display:none override

## Developer Workflows

### Adding Media
1. Place media files (JPG, MP4, etc.) in project root directory
2. Add entry to `mediaItems` array in `script.js`:
   ```javascript
   { type: 'image', src: 'photo.jpg', caption: 'Your caption here' }
   ```
3. Supported types: `'image'` (img tag) and `'video'` (video tag with controls/autoplay)

### Adding Background Music
- Replace `music.mp3` file in root directory
- Music only plays after user clicks start button (browser autoplay policy)
- Volume is set to 50% (`bgMusic.volume = 0.5`)

### Testing Navigation
- Previous button disabled when `currentIndex === 0`
- Next button disabled when `currentIndex === mediaItems.length - 1`
- Videos autoplay when displayed; images display static

## Important Patterns & Conventions

### Language
- UI uses Portuguese for emotional effect: "Ver memórias" (See memories)
- Captions are user-written narratives about moments

### Browser Constraints
- Audio autoplay blocked by browsers; must be triggered by user interaction (click)
- Videos require explicit `autoplay` and `controls` properties in HTML5

### DOM Manipulation
- `updateDisplay()` clears `mediaDisplay.innerHTML` before rendering new content
- Buttons toggle `.hidden` class to show/hide sections (not remove from DOM)

## Common Modifications

| Task | Location | Notes |
|------|----------|-------|
| Change theme colors | `style.css` - `body`, `button:hover`, `#caption` | Primary red is `#e63946` |
| Adjust gallery width | `style.css` - `.gallery-container` | Currently 800px max |
| Update button text | `index.html` | "❤️ Ver memórias", "Previous", "Next" |
| Change media height | `style.css` - `img, video` | Currently 60vh max-height |
| Add media | `script.js` - `mediaItems` array | Follow `{type, src, caption}` format |
