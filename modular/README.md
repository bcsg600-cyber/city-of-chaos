# City of Chaos — modular build

This is the first safe refactor pass of the v46 game.

- `index.html`: game markup and the Three.js import map.
- `styles.css`: extracted game styles.
- `main.js`: extracted game module and existing gameplay logic.

The original single-file source is preserved at `../backups/city-of-chaos-v46-original.html`.

This pass intentionally preserves gameplay behavior while separating markup, styling, and JavaScript. The next refactor pass can extract state, UI, world, vehicle, and character systems without changing the live original build.

Open the game at `/city-of-chaos/modular/`. Model and animation asset paths resolve from the repository root.
