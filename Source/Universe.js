
class Universe
{
	constructor
	(
		display,
		inputTracker,
		timerHelper,
		world
	)
	{
		this.display = display;
		this.inputTracker = inputTracker;
		this.timerHelper = timerHelper;
		this.world = world;
	}

	static demo()
	{
		var display = new Display(new Coords(400, 300) );
		var inputTracker = new InputTracker();
		var timerHelper = new TimerHelper(24);
		var world = World.demo();

		return new Universe
		(
			display,
			inputTracker,
			timerHelper,
			world
		);
	}

	initialize()
	{
		this.display.initialize();
		this.inputTracker.initialize();
		this.timerHelper.initialize(this);

		this.world.initialize();
	}

	updateForTimerTick()
	{
		this.world.updateForTimerTick(this);
	}
}
