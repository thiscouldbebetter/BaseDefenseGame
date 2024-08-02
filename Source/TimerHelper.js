
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

	finalize()
	{
		clearInterval(this.systemTimer);
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
