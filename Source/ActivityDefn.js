
class ActivityDefn
{
	constructor(name, perform)
	{
		this.name = name;
		this._perform = perform;
	}

	static byName(name)
	{
		return ActivityDefn.Instances().byName(name);
	}

	static Instances()
	{
		if (ActivityDefn._instances == null)
		{
			ActivityDefn._instances = new ActivityDefn_Instances();
		}
		return ActivityDefn._instances;
	}

	perform(universe, world, place, entityActing)
	{
		this._perform(universe, world, place, entityActing);
	}
}

class ActivityDefn_Instances
{
	constructor()
	{
		this.DoNothing = new ActivityDefn
		(
			"DoNothing",
			(u, w, p, e) => {}
		);

		this.GenerateEnergy = new ActivityDefn
		(
			"GenerateEnergy",
			(u, w, p, e) =>
			{
				p.player.energyStockpiled += p.energyPerTick;
			}
		);

		this.Enemy = new ActivityDefn
		(
			"Enemy",
			(u, w, p, e) =>
			{
				var defn = e.defn();
				var vel = e.disp.headingAsCoords();
				vel.multiplyScalar(defn.speed);
				var pos = e.disp.pos;
				pos.add(vel);
				if (pos.y < 0 || pos.y > p.size.y)
				{
					vel.y *= -1;
					pos.add(vel);
				}
			}
		);

		this.Projectile = new ActivityDefn
		(
			"Projectile",
			(u, w, p, e) =>
			{
				var defn = e.defn();
				var vel = e.disp.headingAsCoords();
				vel.multiplyScalar(defn.speed);
				e.disp.pos.add(vel);
			}
		);

		this.Shoot = new ActivityDefn
		(
			"Shoot",
			(u, w, p, e) =>
			{
				var tick = p.ticksSoFar;
				var moverShooter = e;
				var moverShooterDefn = moverShooter.defn();
				var canFire = (tick % moverShooterDefn.ticksPerAttack) == 0;
				if (canFire)
				{
					var projectileDisp = e.disp.clone();
					var headingInTurns = e.disp.headingInTurns;
					var headingOffset = 0; // (Math.random() * 2 - 1) / 8;
					projectileDisp.headingInTurns += headingOffset;
					projectileDisp.pos.add
					(
						e.disp.headingAsCoords().multiplyScalar
						(
							e.defn().size.y
						)
					);
					var moverProjectile = new Mover
					(
						p.moverIdMaxSoFar++,
						MoverDefn.Instances().Projectile.name,
						projectileDisp
					);
					p.moverAdd(moverProjectile);
				}
			}
		);

		this.UserInputAccept = new ActivityDefn
		(
			"UserInputAccept",
			(u, w, p, e) =>
			{
				var inputTracker = u.inputTracker;
				var keysPressed = inputTracker.keysPressed;
				keysPressed.forEach
				(
					key =>
					{
						if (key == "ArrowDown")
						{
							e.disp.pos.addXY(0, e.defn().speed)
						}
						else if (key == "ArrowLeft")
						{
							e.disp.pos.addXY(-e.defn().speed, 0)
						}
						else if (key == "ArrowRight")
						{
							e.disp.pos.addXY(e.defn().speed, 0)
						}
						if (key == "ArrowUp")
						{
							e.disp.pos.addXY(0, -e.defn().speed)
						}
						else if (key == "Enter")
						{
							var player = p.player;
							var emplacementDefn = player.emplacementDefnSelected();

							var energyToPlace = emplacementDefn.energyToPlace;
							var hasEnoughEnergy =
								player.energyStockpiled >= energyToPlace;

							var emplacements = p.emplacements();
							var cursorBounds = e.bounds();
							var collidesWithExistingEmplacement = emplacements.some
							(
								x => x.bounds().overlapWith(cursorBounds)
							);

							var canBuild =
							(
								hasEnoughEnergy
								&& !collidesWithExistingEmplacement
							);

							if (canBuild)
							{
								player.energyStockpiled -= energyToPlace;

								var pos = e.disp.pos.clone();
								var moverEmplacement = new Mover
								(
									p.moverIdMaxSoFar++,
									emplacementDefn.name,
									new Disposition(0, pos)
								); 
								moverEmplacement.initialize(u, w, p);
								p.moverAdd(moverEmplacement);
							}
						}
						else if (key == "/")
						{
							p.player.emplacementDefnSelectNext();
							u.inputTracker.keyRelease("/");
						}
					}
				);
			}
		);

		this._All =
		[
			this.DoNothing,
			this.Enemy,
			this.GenerateEnergy,
			this.Projectile,
			this.Shoot,
			this.UserInputAccept
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
