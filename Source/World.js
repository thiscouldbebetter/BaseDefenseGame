
class World
{
	constructor(name, places)
	{
		this.name = name;
		this.places = places;

		this.placeCurrentIndex = 0;
	}

	static demo()
	{
		var ms =
			(second, moverDefnName, disp) =>
				new MoverSpawning(second, moverDefnName, disp);

		var place = PlaceLevel.demo();

		var world = new World
		(
			"World0",
			[
				place
			]
		);

		return world;
	}

	initialize(universe)
	{
		this.places.forEach(x => x.initialize(universe, this) );
	}

	placeCurrent()
	{
		return this.places[this.placeCurrentIndex];
	}

	updateForTimerTick(universe)
	{
		var place = this.placeCurrent();
		place.updateForTimerTick(universe, this);
	}
}
