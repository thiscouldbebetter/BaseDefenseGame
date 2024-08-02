
class Visual
{
	static byName(name)
	{
		return Visual.Instances().byName(name);
	}

	static Instances()
	{
		if (Visual._instances == null)
		{
			Visual._instances = new Visual_Instances();
		}
		return Visual._instances;
	}

}

class VisualRectangle
{
	constructor(name, size, colorFillName, colorBorderName)
	{
		this.name = name;
		this.size = size;
		this.colorFillName = colorFillName;
		this.colorBorderName = colorBorderName;
	}

	colorBorder()
	{
		return (this.colorBorderName == null ? null : Color.byName(this.colorBorderName) );
	}

	colorFill()
	{
		return (this.colorFillName == null ? null : Color.byName(this.colorFillName) );
	}

	drawToDisplayAtPos(display, pos)
	{
		display.drawRectangleWithCenterSizeAndColorsFillAndBorder
		(
			pos, this.size, this.colorFill(), this.colorBorder()
		);
	}
}

class Visual_Instances
{
	constructor()
	{
		var sizeEmplacement = new Coords(16, 16);
		var sizeEnemy = new Coords(8, 32);

		this.Cursor = new VisualRectangle
		(
			"Cursor",
			sizeEmplacement,
			null, "White"
		);

		this.EmplacementGenerator = new VisualRectangle
		(
			"EmplacementGenerator",
			sizeEmplacement,
			"Yellow", null
		);

		this.EmplacementShield = new VisualRectangle
		(
			"EmplacementShield",
			sizeEmplacement,
			"Gray", null
		);

		this.EmplacementShooter = new VisualRectangle
		(
			"EmplacementShooter",
			sizeEmplacement,
			"Violet", null
		);

		this.EnemyCharger = new VisualRectangle
		(
			"EnemyCharger",
			sizeEnemy,
			"Red", null
		);

		this.Projectile = new VisualRectangle
		(
			"Projectile",
			new Coords(2, 2), // size
			"Gray", null
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
