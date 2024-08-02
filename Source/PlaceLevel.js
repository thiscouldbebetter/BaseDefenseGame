
class PlaceLevel
{
	constructor(name, energyPerTick, size, player, moverSpawnings)
	{
		this.name = name;
		this.energyPerTick = energyPerTick;
		this.size = size;
		this.player = player;
		this.moverSpawnings = moverSpawnings;

		this.ticksSoFar = 0;
		this.moverIdMaxSoFar = 0;

		var moverForCursor = new Mover
		(
			0, // id
			"Cursor",
			new Disposition
			(
				0, // heading
				new Coords(0.5, 0.5).multiply(this.size)
			)
		);

		this.movers = [ moverForCursor ];
	}

	static demo()
	{
		var placeSize = new Coords(400, 300);

		var moverDefns = MoverDefn.Instances();

		var emplacementDefnsAll =
			moverDefns._All.filter(x => x.name.startsWith("Emplacement") );
		var player = new Player(100, emplacementDefnsAll);

		var spawnings = [];
		var spawningCount = 1;
		for (var i = 0; i < spawningCount; i++)
		{
			var secondToSpawnAt = 15;
			var spawning = new MoverSpawning
			(
				secondToSpawnAt,
				moverDefns.EnemyCharger.name,
				new Disposition(0.5, new Coords(1, 0.5).multiply(placeSize))
			);
			spawnings.push(spawning);
		}

		var place = new PlaceLevel
		(
			"Place0",
			.1, // energyPerTick,
			placeSize,
			player,
			spawnings
		);

		return place
	}

	static fromNameSizeAndSpawningCount(name, size, spawningCount)
	{
		var spawnings = [];

		var moverDefn = MoverDefn.Instances().EnemyCharger;

		var spawnDispRandom = () => new Disposition
		(
			.25,
			new Coords
			(
				Math.random(), 0
			).multiply(size)
		);

		var spawnings = [];

		for (var i = 0; i < spawningCount; i++)
		{
			var spawning = new MoverSpawning
			(
				i + 1,
				moverDefn.name,
				spawnDispRandom()
			);

			spawnings.push(spawning);
		}

		return new PlaceLevel
		(
			name, size, spawnings
		);

	}

	drawToDisplay(display)
	{
		display.clear();

		this.movers.forEach(x => x.drawToDisplay(display) );

		var message = 
			"Energy: " + Math.floor(this.player.energyStockpiled)
			+ " Emplacement: " + this.player.emplacementDefnSelected().name;

		display.drawTextWithColorAndHeightAtPos
		(
			message,
			Color.byName("Gray"),
			10,
			new Coords(0, 0)
		);
	}

	initialize(universe, world)
	{
		this.movers.forEach(x => x.initialize(universe, world, this) );
	}

	moverAdd(mover)
	{
		this.movers.push(mover);
	}

	moverRemove(mover)
	{
		this.movers.splice(this.movers.indexOf(mover), 1);
	}

	secondsSoFar(universe)
	{
		return universe.timerHelper.secondsForTicks(this.ticksSoFar);
	}

	updateForTimerTick(universe, world)
	{
		var moversEnemy = this.enemies();

		var hasAnEnemyReachedBase =
			moversEnemy.some(x => x.disp.pos.x < 0);

		if (hasAnEnemyReachedBase)
		{
			universe.display.drawTextWithColorAndHeightAtPos
			(
				"You lose!",
				Color.Instances().White,
				20,
				new Coords(0, 0)
			);
			return;
		}
		else if (moversEnemy.length == 0)
		{
			if (this.moverSpawnings.length == 0)
			{
				universe.display.drawTextWithColorAndHeightAtPos
				(
					"You win!",
					Color.Instances().White,
					20,
					new Coords(0, 0)
				)
				return;
			}
		}


		var secondsSoFar = this.secondsSoFar(universe);

		var spawningsThisTick = this.moverSpawnings.filter
		(
			x => x.secondToSpawnAt < secondsSoFar
		);

		spawningsThisTick.forEach
		(
			x =>
			{
				x.spawn(universe, world, this);
				this.moverSpawnings.splice
				(
					this.moverSpawnings.indexOf(x), 1
				);
			}
		);

		this.movers.forEach
		(
			x => x.updateForTimerTick(universe, world, this, x)
		);


		var moversEmplacement = this.emplacements();
		var moversProjectile = this.projectiles();

		moversEnemy.forEach
		(
			moverEnemy =>
			{
				var moverEnemyBounds = moverEnemy.bounds();
				var moverEnemyDefn = moverEnemy.defn();

				moversProjectile.forEach
				(
					moverProjectile =>
					{
						var doMoversCollide = moverEnemyBounds.containsPoint
						(
							moverProjectile.disp.pos
						);

						if (doMoversCollide)
						{
							this.moverRemove(moverProjectile);

							var moverProjectileDefn = moverProjectile.defn();
							moverEnemy.integrity -=
								moverProjectileDefn.damagePerAttack;
							if (moverEnemy.integrity <= 0)
							{
								this.moverRemove(moverEnemy);
							}
						}
					}
				);

				moversEmplacement.forEach
				(
					moverEmplacement =>
					{
						var moverEmplacementBounds = moverEmplacement.bounds();

						var doMoversCollide = moverEmplacementBounds.overlapWith
						(
							moverEnemyBounds
						);

						if (doMoversCollide)
						{
							moverEnemy.disp.pos.overwriteWith
							(
								moverEmplacement.disp.pos
							);

							var canAttack =
								(this.ticksSoFar % moverEnemyDefn.ticksPerAttack) == 0;

							if (canAttack)
							{
								moverEmplacement.integrity -=
									moverEnemyDefn.damagePerAttack;

								if (moverEmplacement.integrity <= 0)
								{
									this.moverRemove(moverEmplacement);
								}
							}
						}
					}
				);
			}
		)

		this.ticksSoFar++;

		this.player.energyStockpiled += this.energyPerTick;

		this.drawToDisplay(universe.display);
	}

	// Convenience methods.

	emplacements()
	{
		return this.movers.filter(x => x.defnName.startsWith("Emplacement") );
	}

	enemies()
	{
		return this.movers.filter(x => x.defnName.startsWith("Enemy") );
	}

	projectiles()
	{
		return this.movers.filter(x => x.defnName.startsWith("Projectile") );
	}
}
