
class Color
{
	constructor(name, systemColor)
	{
		this.name = name;
		this.systemColor = systemColor;
	}

	static byName(name)
	{
		return Color.Instances().byName(name);
	}

	static Instances()
	{
		if (Color._instances == null)
		{
			Color._instances = new Color_Instances();
		}
		return Color._instances;
	}
}

class Color_Instances
{
	constructor()
	{
		this.Black = new Color("Black", "Black");
		this.Blue = new Color("Blue", "Blue");
		this.Gray = new Color("Gray", "Gray");
		this.Green = new Color("Green", "Green");
		this.Red = new Color("Red", "Red");
		this.Violet = new Color("Violet", "Violet");
		this.White = new Color("White", "White");
		this.Yellow = new Color("Yellow", "Yellow");

		this._All =
		[
			this.Black,
			this.Blue,
			this.Gray,
			this.Green,
			this.Red,
			this.Violet,
			this.White,
			this.Yellow
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
