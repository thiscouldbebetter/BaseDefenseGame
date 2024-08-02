
class Disposition
{
	constructor(headingInTurns, pos)
	{
		this.headingInTurns = headingInTurns;
		this.pos = pos;
	}

	clone()
	{
		return new Disposition(this.headingInTurns, this.pos.clone() );
	}

	headingAsCoords()
	{
		return Coords.fromHeadingInTurns(this.headingInTurns);
	}
}
