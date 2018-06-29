// checks if shooter can hit target.
// shooter and target are position from camera.getWorldPosition.
const BUFFER = 0.3;
const BUFFER_VERTICAL = 0.5;

// direction is camera.getWorldDirection of shooter.
function isHit(shooter, target, direction) {
  // targetX - shooterX
  const deltaX = target.x - shooter.x;
  // targetY - shooterY
  const deltaY = target.y - shooter.y;
  // shooterZ - targetZ
  const deltaZ = shooter.z - target.z;
  // angle.
  const theta =
    direction.z < 0
      ? -Math.atan(direction.x / direction.z)
      : Math.atan(direction.x / direction.z);
  // pythagorean thm.
  const vector = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaZ, 2));
  // x component of vector Vsin(theta)
  const vectorX = vector * Math.sin(theta);
  const vectorZ =
    direction.z < 0 ? -Math.cos(theta) * vector : Math.cos(theta) * vector;

  // taking y axis into account.
  const phi =
    direction.z < 0
      ? -Math.atan(direction.y / direction.z)
      : Math.atan(direction.y / direction.z);

  const phiVector = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(vector, 2));
  const vectorY = phiVector * Math.sin(phi);

  // destination.
  const destination = {
    x: shooter.x + vectorX,
    y: shooter.y + vectorY,
    z: target.z - shooter.z < 0 ? shooter.z - vectorZ : shooter.z + vectorZ
  };

  // const dist = Math.sqrt(
  //   Math.pow(target.x - shooter.x, 2) +
  //   Math.pow(target.y - shooter.y, 2) +
  //   Math.pow(target.z - shooter.z, 2)
  // );

  // const destAlt = {
  //   x: shooter.x + dist + direction.x,
  //   y: shooter.y + dist + direction.y,
  //   z: shooter.z + dist + direction.z,
  // }

  // console.log('DESTINATION', destination);
  // console.log('altDESTINATION', destAlt);
  const buffer = {
    x: Math.abs(target.x - destination.x),
    y: Math.abs(target.y - destination.y),
    z: Math.abs(target.z - destination.z)
  };
  // test if destination is close enough to target.
  return buffer.x < BUFFER && buffer.y < BUFFER_VERTICAL && buffer.z < BUFFER;
}

module.exports = { isHit };
