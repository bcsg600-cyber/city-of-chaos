// Add a compact, standalone Manhattan street map to the main game HUD.
// Coordinates follow the approximate Manhattan street reference in the repository.
const canvasSize = 720;
const streets = [
  { name: 'Broadway', points: [[40.7050,-74.0140],[40.7130,-74.0090],[40.7200,-74.0010],[40.7360,-73.9910],[40.7580,-73.9855],[40.7680,-73.9820],[40.7840,-73.9790],[40.8010,-73.9720],[40.8170,-73.9660],[40.8400,-73.9360]] },
  { name: '1st Ave', points: [[40.7090,-73.9720],[40.7300,-73.9810],[40.7540,-73.9670],[40.7650,-73.9600],[40.7800,-73.9490],[40.8100,-73.9410],[40.8300,-73.9360]] },
  { name: '2nd Ave', points: [[40.7090,-73.9830],[40.7300,-73.9820],[40.7520,-73.9720],[40.7650,-73.9620],[40.7800,-73.9500],[40.8100,-73.9430],[40.8300,-73.9370]] },
  { name: '3rd Ave', points: [[40.7150,-73.9860],[40.7340,-73.9810],[40.7520,-73.9720],[40.7680,-73.9620],[40.7850,-73.9560],[40.8100,-73.9470],[40.8300,-73.9380]] },
  { name: 'Park Ave', points: [[40.7470,-73.9810],[40.7560,-73.9750],[40.7680,-73.9670],[40.7820,-73.9530],[40.8000,-73.9420],[40.8150,-73.9400]] },
  { name: 'Madison Ave', points: [[40.7450,-73.9810],[40.7600,-73.9720],[40.7720,-73.9650],[40.7900,-73.9540],[40.8100,-73.9440],[40.8280,-73.9370]] },
  { name: '5th Ave', points: [[40.7380,-73.9880],[40.7500,-73.9850],[40.7600,-73.9730],[40.7720,-73.9660],[40.7900,-73.9560],[40.8100,-73.9470],[40.8300,-73.9400]] },
  { name: '6th Ave', points: [[40.7230,-74.0030],[40.7400,-73.9920],[40.7500,-73.9860],[40.7600,-73.9800],[40.7720,-73.9790],[40.7880,-73.9760],[40.8050,-73.9680]] },
  { name: '7th Ave', points: [[40.7350,-74.0000],[40.7500,-73.9920],[40.7580,-73.9850],[40.7680,-73.9810],[40.7850,-73.9760],[40.8000,-73.9700],[40.8150,-73.9510],[40.8300,-73.9350]] },
  { name: '8th Ave', points: [[40.7430,-74.0010],[40.7580,-73.9900],[40.7680,-73.9830],[40.7850,-73.9770],[40.8050,-73.9690],[40.8200,-73.9570]] },
  { name: '9th Ave', points: [[40.7420,-74.0060],[40.7580,-73.9920],[40.7680,-73.9860],[40.7850,-73.9740],[40.8050,-73.9650]] },
  { name: '10th Ave', points: [[40.7420,-74.0090],[40.7580,-73.9980],[40.7700,-73.9900],[40.7850,-73.9770],[40.8050,-73.9660]] },
  { name: '11th Ave', points: [[40.7470,-74.0070],[40.7590,-73.9990],[40.7720,-73.9900],[40.7880,-73.9780],[40.8000,-73.9690]] }
];
const crossStreets = [
  { name: '14th St', points: [[40.7390,-74.0100],[40.7390,-74.0000],[40.7385,-73.9900],[40.7380,-73.9810],[40.7370,-73.9700]] },
  { name: '23rd St', points: [[40.7430,-74.0080],[40.7430,-73.9960],[40.7425,-73.9870],[40.7420,-73.9780],[40.7410,-73.9700]] },
  { name: '34th St', points: [[40.7520,-74.0050],[40.7520,-73.9930],[40.7490,-73.9860],[40.7480,-73.9780],[40.7470,-73.9700]] },
  { name: '42nd St', points: [[40.7570,-74.0010],[40.7560,-73.9900],[40.7540,-73.9790],[40.7520,-73.9720],[40.7510,-73.9650]] },
  { name: '57th St', points: [[40.7680,-73.9950],[40.7660,-73.9820],[40.7640,-73.9730],[40.7620,-73.9650]] },
  { name: '79th St', points: [[40.7830,-73.9840],[40.7810,-73.9750],[40.7780,-73.9640]] },
  { name: '96th St', points: [[40.7920,-73.9780],[40.7900,-73.9690],[40.7880,-73.9600]] },
  { name: '125th St', points: [[40.8120,-73.9580],[40.8100,-73.9490],[40.8080,-73.9400],[40.8050,-73.9340]] }
];

const style = document.createElement('style');
style.textContent = `
  #manhattanMapBtn { position:fixed; top:198px; right:12px; z-index:35; padding:10px 13px; border:1px solid rgba(103,232,249,.65); border-radius:10px; color:#e0f2fe; background:rgba(8,47,73,.94); font:700 13px system-ui,sans-serif; cursor:pointer; }
  #manhattanMapOverlay { position:fixed; inset:0; z-index:85; display:none; place-items:center; padding:12px; background:rgba(2,6,23,.9); color:#f8fafc; font-family:system-ui,sans-serif; }
  #manhattanMapCard { width:min(94vw,760px); max-height:94vh; overflow:auto; padding:14px; border:1px solid rgba(103,232,249,.35); border-radius:16px; background:#0f172a; box-shadow:0 24px 80px #0009; }
  #manhattanMapTop { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px; }
  #manhattanMapTop strong { letter-spacing:.12em; }
  #manhattanMapClose { border:0; border-radius:8px; padding:9px 12px; color:white; background:#334155; font-weight:800; cursor:pointer; }
  #manhattanMapCanvas { display:block; width:100%; aspect-ratio:1; border-radius:10px; }
  #manhattanMapNote { margin:10px 2px 0; color:#cbd5e1; font-size:12px; }
  @media (max-height:520px) { #manhattanMapBtn { top:188px; } }
`;
document.head.append(style);

const button = document.createElement('button');
button.id = 'manhattanMapBtn';
button.type = 'button';
button.textContent = 'NYC MAP';
button.setAttribute('aria-haspopup', 'dialog');
button.setAttribute('aria-controls', 'manhattanMapOverlay');

document.body.append(button);
const overlay = document.createElement('div');
overlay.id = 'manhattanMapOverlay';
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-label', 'Manhattan street map');
overlay.innerHTML = `<section id="manhattanMapCard"><div id="manhattanMapTop"><strong>MANHATTAN · NEW YORK CITY</strong><button id="manhattanMapClose" type="button">CLOSE ✕</button></div><canvas id="manhattanMapCanvas" width="${canvasSize}" height="${canvasSize}" aria-label="Map of Manhattan streets"></canvas><p id="manhattanMapNote">Approximate street layout. North is up; the island outline is intentionally narrow and elongated like Manhattan.</p></section>`;
document.body.append(overlay);

const canvas = overlay.querySelector('#manhattanMapCanvas');
const ctx = canvas.getContext('2d');
const bounds = { minLat: 40.695, maxLat: 40.885, minLon: -74.025, maxLon: -73.905 };
const pad = 42;
const mapPoint = ([lat, lon]) => ({
  x: pad + (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * (canvasSize - pad * 2),
  y: canvasSize - pad - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat) * (canvasSize - pad * 2)
});

function drawPolyline(points) {
  points.forEach((point, index) => {
    const p = mapPoint(point);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
}
function drawManhattanMap() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  ctx.fillStyle = '#78b9c3';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Distinct tapered, bent island silhouette: broad lower Manhattan, a narrow
  // middle, and the wider Inwood tip. This keeps the map recognizably Manhattan.
  const shoreline = [
    [40.700,-74.018],[40.708,-74.020],[40.720,-74.019],[40.735,-74.017],
    [40.750,-74.015],[40.765,-74.013],[40.780,-74.010],[40.800,-74.007],
    [40.820,-74.004],[40.840,-74.000],[40.855,-73.994],[40.870,-73.982],
    [40.878,-73.928],[40.874,-73.918],[40.862,-73.916],[40.845,-73.919],
    [40.828,-73.923],[40.810,-73.927],[40.792,-73.932],[40.775,-73.937],
    [40.758,-73.944],[40.742,-73.952],[40.728,-73.961],[40.716,-73.972],
    [40.706,-73.986],[40.700,-74.002]
  ];
  ctx.beginPath();
  drawPolyline(shoreline);
  ctx.closePath();
  ctx.fillStyle = '#b7aa8c';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#243b43';
  ctx.lineJoin = 'round';
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  drawPolyline(shoreline);
  ctx.closePath();
  ctx.clip();

  // Neighborhood street grid is drawn over the land only.
  ctx.lineCap = 'round';
  for (const street of crossStreets) {
    ctx.beginPath(); drawPolyline(street.points);
    ctx.lineWidth = 3.2;
    ctx.strokeStyle = '#f1ead8';
    ctx.stroke();
  }
  for (const avenue of streets) {
    ctx.beginPath(); drawPolyline(avenue.points);
    ctx.lineWidth = avenue.name === 'Broadway' ? 4.2 : 2.4;
    ctx.strokeStyle = avenue.name === 'Broadway' ? '#e7aa56' : '#f1ead8';
    ctx.stroke();
  }
  ctx.restore();

  // Keep the island label and a north marker readable at every display size.
  const label = mapPoint([40.774, -73.972]);
  ctx.save();
  ctx.translate(label.x, label.y);
  ctx.rotate(-0.2);
  ctx.fillStyle = '#27343a';
  ctx.font = '800 18px system-ui,sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MANHATTAN', 0, 0);
  ctx.restore();
  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 18px system-ui,sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('N', canvasSize - 35, 38);
  ctx.beginPath();
  ctx.moveTo(canvasSize - 35, 48); ctx.lineTo(canvasSize - 43, 64); ctx.lineTo(canvasSize - 27, 64);
  ctx.closePath();
  ctx.fillStyle = '#f8fafc';
  ctx.fill();
}

function setMapOpen(open) {
  overlay.style.display = open ? 'grid' : 'none';
  if (open) drawManhattanMap();
  button.setAttribute('aria-expanded', String(open));
}
button.addEventListener('click', () => setMapOpen(true));
overlay.querySelector('#manhattanMapClose').addEventListener('click', () => setMapOpen(false));
overlay.addEventListener('click', event => { if (event.target === overlay) setMapOpen(false); });
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && overlay.style.display !== 'none') setMapOpen(false);
});
