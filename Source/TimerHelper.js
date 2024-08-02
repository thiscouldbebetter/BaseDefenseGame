
class TimerHelper
{
	constructor(ticksPerSecond)
	{
		this.ticksPerSecond = ticksPerSecond;

		this.millisecondsPerTick = Math.round
		(
			1000 / this.ticksPerSecond
		);
	}

	initialize(universe)
	{
		this.systemTimer = setInterval
		(
			() => universe.updateForTimerTick(),
			this.millisecondsPerTick
		);
	}

	secondsForTicks(ticks)
	{
		return ticks / this.ticksPerSecond;
	}
}
