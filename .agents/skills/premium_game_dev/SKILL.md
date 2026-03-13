---
name: Premium Web Game Development
description: Guidelines and patterns for creating high-end, visually stunning web-based games with modern UI/UX.
---

# Premium Web Game Development Skill

This skill provides a comprehensive framework for developing high-quality, visually appealing web games using Vanilla JavaScript, HTML5 Canvas, and modern CSS.

## Core Principles

1. **Rich Aesthetics First**: Every game should feature a curated color palette, neon effects, and smooth animations.
2. **Glassmorphism UI**: Use semi-transparent backgrounds with blur filters for a premium feel.
3. **Responsive Canvas**: Ensure the game canvas adapts to different screen sizes while maintaining aspect ratio.
4. **Performance**: Use `requestAnimationFrame` for smooth frame rates and optimize canvas drawing.

## UI/UX Standards

### 1. Color System (CSS Variables)
Always define a coherent color system:
```css
:root {
    --primary-color: #00ff88;   /* Neon Green */
    --secondary-color: #ff0055; /* Hot Pink */
    --bg-dark: #0a0a0c;         /* Deepest Blue/Black */
    --card-bg: rgba(255, 255, 255, 0.05);
    /* ... */
}
```

### 2. Premium Components
- **Backgrounds**: Use radial gradients and animated grid patterns.
- **Buttons**: Implement hover scaling and glow transitions.
- **Overlays**: Use backdrop-blur for game-over or pause menus.

## Technical Patterns

### Responsive Canvas Scaling
Always implement a resize listener to handle different display resolutions:
```javascript
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
```

### Game Loop Structure
Maintain a clear separation between Update and Draw logic:
```javascript
function gameLoop() {
    updateState();
    renderFrame();
    requestAnimationFrame(gameLoop);
}
```

## Deployment Strategy

### GitHub Actions (Auto-Deploy)
Always include a `.github/workflows/static.yml` for zero-touch deployment to GitHub Pages. Remember to instruct the user to set the source to "GitHub Actions" in repository settings.

## Pro-Tips for AI Agents
- When generating images for covers, use keywords like: "neon", "cyberpunk", "cinematic lighting", "high-tech grid".
- Proactively handle browser local storage for high scores to persist user progress.
