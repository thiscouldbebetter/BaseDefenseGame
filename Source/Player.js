
class Player
{
	constructor(energyStockpiled, emplacementDefnsAvailable)
	{
		this.energyStockpiled = energyStockpiled;
		this.emplacementDefnsAvailable = emplacementDefnsAvailable;

		this.emplacementDefnSelectedIndex = 0;
	}

	emplacementDefnSelectNext()
	{
		this.emplacementDefnSelectedIndex++;
		if (this.emplacementDefnSelectedIndex >= this.emplacementDefnsAvailable.length)
		{
			this.emplacementDefnSelectedIndex = 0;
		}
	}

	emplacementDefnSelected()
	{
		return this.emplacementDefnsAvailable[this.emplacementDefnSelectedIndex];
	}
}
