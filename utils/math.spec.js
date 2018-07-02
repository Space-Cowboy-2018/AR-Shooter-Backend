const expect = require('chai').expect;
const { isHit } = require('./math');

describe('isHit function', () => {
  describe('shooter is at origin', () => {
    it('can hit target in front', () => {
      const shooter = { x: 0, y: 0, z: 0 };
      const target = { x: 0, y: 0, z: -1 };
      const aim = { x: 0, y: 0, z: -1 };

      expect(isHit(shooter, target, aim)).to.equal(true);
    });

    it('can hit target at 45 degree angle', () => {
      const shooter = { x: 0, y: 0, z: 0 };
      const target = { x: 1, y: 0, z: -1 };
      const aim = { x: 0.707106781186548, y: 0, z: -0.707106781186548 };

      expect(isHit(shooter, target, aim)).to.equal(true);
    });

    it('can hit target from the back', () => {
      const shooter = { x: 0, y: 0, z: 0 };
      const target = { x: 0, y: 0, z: 1 };
      const aim = { x: 0, y: 0, z: 1 };

      expect(isHit(shooter, target, aim)).to.equal(true);
    });

    it('can hit target at arbitrary angle', () => {
      const shooter = { x: 5, y: 0, z: -5 };
      const target = { x: 8, y: 0, z: -1};
      const aim = {
        x: 3,
        y: 0,
        z: 4
      }
      expect(isHit(shooter, target, aim)).to.equal(true);
    });
  });

  describe('shooter is not at origin', () => {
    let shooter;
    beforeEach(() => {
      shooter = { x: 0, y: 0, z: -1 };
    });

    it('can hit target in front', () => {
      const target = { x: 0, y: 0, z: -2 };
      const aim = { x: 0, y: 0, z: -1 };

      expect(isHit(shooter, target, aim)).to.equal(true);
    });

    it('can hit target at 45 degree angle', () => {
      const target = { x: 1, y: 0, z: -2 };
      const aim = { x: 0.707106781186548, y: 0, z: -0.707106781186548 };

      expect(isHit(shooter, target, aim)).to.equal(true);
    });

    it('can hit target from the back', () => {
      const target = { x: 0, y: 0, z: 2 };
      const aim = { x: 0, y: 0, z: 1 };

      expect(isHit(shooter, target, aim)).to.equal(true);
    });
  });
});
