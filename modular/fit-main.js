// Keep the full game module unchanged while applying the requested fit adjustments
// before it creates the player and vehicles. The original procedural animations
// remain available and do not require external animation uploads.
import * as THREE from 'three';

const originalAdd = THREE.Object3D.prototype.add;
const PLAYER_SCALE = 0.82;
const VEHICLE_SCALE = 1.2;

THREE.Object3D.prototype.add = function (...objects) {
  for (const object of objects) {
    if (!object || object.userData.fitAdjustmentApplied) continue;

    if (this.name === 'player-avatar-root' && object.name !== 'indian-man-in-suit-player') {
      object.scale.multiplyScalar(PLAYER_SCALE);
      object.userData.fitAdjustmentApplied = true;
    } else if (object.name === 'indian-man-in-suit-player') {
      // Shrink the imported player from its feet/root so he stays fully inside
      // the vehicle and does not clip through the roof or floor while seated.
      object.scale.multiplyScalar(PLAYER_SCALE);
      object.userData.fitAdjustmentApplied = true;
    } else if (object.name === 'papercar-suv-vehicle' || object.name === 'player-shared-papercar-suv') {
      // Scale the complete car group, including cabin, wheels, and lights.
      object.scale.multiplyScalar(VEHICLE_SCALE);
      object.userData.fitAdjustmentApplied = true;
    }
  }
  return originalAdd.apply(this, objects);
};

// Start the game, then add a dedicated Manhattan street-map panel to its HUD.
await import('./main.js?v=fov1');
await import('./manhattan-map.js');
