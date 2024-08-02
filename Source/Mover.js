
class Mover
{
	constructor(id, defnName, disp)
	{
		this.id = id;
		this.defnName = defnName;
		this.disp = disp;
	}

	activityDefn()
	{
		var defn = this.defn();
		var activityDefn = defn.activityDefn();
		return activityDefn;
	}

	bounds()
	{
		if (this._bounds == null)
		{
			this._bounds = Bounds.fromCenterAndSize
			(
				this.disp.pos, this.defn().size
			);
		}

		return this._bounds;
	}

	defn()
	{
		return MoverDefn.byName(this.defnName);
	}

	drawToDisplay(display)
	{
		var defn = this.defn();
		var visual = defn.visual();
		visual.drawToDisplayAtPos(display, this.disp.pos);
	}

	initialize()
	{
		this.integrity = this.defn().integrityMax;
	}

	updateForTimerTick(universe, world, place)
	{
		var activityDefn = this.activityDefn();
		activityDefn.perform(universe, world, place, this);
	}
}

class MoverDefn
{
	constructor
	(
		name,
		energyToPlace,
		integrityMax,
		speed,
		ticksPerAttack,
		damagePerAttack,
		size,
		visualName,
		activityDefnName
	)
	{
		this.name = name;
		this.energyToPlace = energyToPlace;
		this.integrityMax = integrityMax;
		this.speed = speed;
		this.ticksPerAttack = ticksPerAttack;
		this.damagePerAttack = damagePerAttack;
		this.size = size;
		this.visualName = visualName;
		this.activityDefnName = activityDefnName;
	}

	static byName(name)
	{
		return MoverDefn.Instances().byName(name);
	}

	static Instances()
	{
		if (MoverDefn._instances == null)
		{
			MoverDefn._instances = new MoverDefn_Instances();
		}
		return MoverDefn._instances;
	}

	activityDefn()
	{
		return ActivityDefn.byName(this.activityDefnName);
	}

	visual()
	{
		return Visual.byName(this.visualName);
	}
}

class MoverDefn_Instances
{
	constructor()
	{
		var activityDefns = ActivityDefn.Instances();
		var visuals = Visual.Instances();

		var sizeEmplacement = new Coords(16, 16);
		var sizeEnemy = new Coords(8, 32);
		var sizeProjectile = new Coords(2, 2);

		this.Cursor = new MoverDefn
		(
			"Cursor",
			0, // energyToPlace
			1, // integrityMax
			2, // speed
			0, // ticksPerAttack
			0, // damagePerAttack
			sizeEmplacement,
			visuals.Cursor.name,
			activityDefns.UserInputAccept.name
		);

		this.EmplacementGenerator = new MoverDefn
		(
			"EmplacementGenerator",
			50, // energyToPlace
			10, // integrityMax
			0, // speed
			0, // ticksPerAttack
			0, // damagePerAttack
			sizeEmplacement,
			visuals.EmplacementGenerator.name,
			activityDefns.GenerateEnergy.name
		);

		this.EmplacementShield = new MoverDefn
		(
			"EmplacementShield",
			100, // energyToPlace
			50, // integrityMax
			0, // speed
			0, // ticksPerAttack
			0, // damagePerAttack
			sizeEmplacement,
			visuals.EmplacementShield.name,
			activityDefns.DoNothing.name
		);

		this.EmplacementShooter = new MoverDefn
		(
			"EmplacementShooter",
			100, // energyToPlace
			10, // integrityMax
			0, // speed
			50, // ticksPerAttack
			1, // damagePerAttack
			sizeEmplacement,
			visuals.EmplacementShooter.name,
			activityDefns.Shoot.name
		);

		this.EnemyCharger = new MoverDefn
		(
			"EnemyCharger",
			0, // energyToPlace
			5, // integrityMax
			0.5, // speed
			10, // ticksPerAttack
			1, // damagePerAttack
			sizeEnemy,
			visuals.EnemyCharger.name,
			activityDefns.Enemy.name
		);

		this.Projectile = new MoverDefn
		(
			"Projectile",
			0, // energyToPlace
			1, // integrityMax
			8, // speed,
			0, // ticksPerAttack
			1, // damagePerAttack
			sizeProjectile,
			visuals.Projectile.name,
			activityDefns.Projectile.name
		);

		this._All =
		[
			this.Cursor,
			this.EmplacementGenerator,
			this.EmplacementShield,
			this.EmplacementShooter,
			this.EnemyCharger,
			this.Projectile
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}

class MoverSpawning
{
	constructor
	(
		secondToSpawnAt,
		moverDefnName,
		disp
	)
	{
		this.secondToSpawnAt = secondToSpawnAt;
		this.moverDefnName = moverDefnName;
		this.disp = disp;
	}

	spawn(universe, world, place)
	{
		var mover = new Mover
		(
			place.moverIdMaxSoFar++, // id
			this.moverDefnName,
			this.disp.clone()
		);

		mover.initialize(universe, world, place);

		place.moverAdd(mover);
	}
}
