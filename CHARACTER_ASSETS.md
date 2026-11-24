# City of Chaos — character asset notes

## Main player character
- Model: `indian_man_in_suit.glb`
- Runtime path: `./indian_man_in_suit.glb`
- Animation source files:
  - `indian-man-in-suit@Running.fbx`
  - `indian-man-in-suit@Standing Jump.fbx`

## Important: preserve the character
When editing this game (including with Claude or another coding assistant), keep these asset files in the repository and keep their filenames and relative paths unchanged. The main player must continue loading `indian_man_in_suit.glb`; do not replace it with a procedural person, a different downloaded model, or a placeholder unless the owner explicitly asks.

The FBX files are animation sources for the same character. Use their animation clips with the GLB model's skeleton; do not display the duplicate FBX meshes. Existing movement controls, camera, vehicle entry/exit, and gameplay should remain attached to the stable `avatar` root.

## Current animation coverage
- Idle: neutral pose from the GLB model.
- Walk: running clip slowed down.
- Run: supplied running clip.
- Jump: supplied standing-jump clip.

If adding more animations, use clips made for this same rig or verify bone compatibility before changing the player model.
