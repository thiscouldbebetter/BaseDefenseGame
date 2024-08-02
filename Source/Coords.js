
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static fromHeadingInTurns(headingInTurns)
	{
		var headingInRadians = headingInTurns * Math.PI * 2;
		var returnValue = new Coords
		(
			Math.cos(headingInRadians), Math.sin(headingInRadians)
		);
		return returnValue;
	}

	static ones()
	{
		return new Coords(1, 1);
	}

	static zeroes()
	{
		return new Coords(0, 0);
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	addXY(x, y)
	{
		this.x += x;
		this.y += y;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	half()
	{
		return this.divideScalar(2);
	}

	invert()
	{
		return this.multiplyScalar(-1);
	}

	isInRangeMax(max)
	{
		return this.isInRangeMinMax(Coords.zeroes(), max);
	}

	isInRangeMinMax(min, max)
	{
		var isInRange =
		(
			this.x >= min.x
			&& this.x <= max.x
			&& this.y >= min.y
			&& this.y <= max.y
		);

		return isInRange;
	}

	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	normalize()
	{
		return this.divideScalar(this.magnitude() );
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	trimToRangeMax(max)
	{
		return this.trimToRangeMinMax(Coords.zeroes(), max);
	}

	trimToRangeMinMax(min, max)
	{
		if (this.x < min.x)
		{
			this.x = min.x;
		}
		else if (this.x > max.x)
		{
			this.x = max.x;
		}

		if (this.y < min.y)
		{
			this.y = min.y;
		}
		else if (this.y > max.y)
		{
			this.y = max.y;
		}

		return this;
	}
}
