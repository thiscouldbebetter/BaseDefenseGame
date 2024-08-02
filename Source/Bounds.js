
class Bounds
{
	constructor(center, size)
	{
		this.center = center;
		this.size = size;

		this._sizeHalf = this.size.clone().half();
		this._min = Coords.zeroes();
		this._max = Coords.zeroes();
	}

	static fromCenterAndSize(center, size)
	{
		return new Bounds(center, size);
	}

	containsPoint(pointToCheck)
	{
		return pointToCheck.isInRangeMinMax(this.min(), this.max() );
	}

	overlapWith(other)
	{
		var thisMin = this.min();
		var thisMax = this.max();
		var otherMin = other.min();
		var otherMax = other.max();

		var doOverlapInX =
		(
			(
				thisMin.x >= otherMin.x
				&& thisMin.x <= otherMax.x
			)
			||
			(
				thisMax.x >= otherMin.x
				&& thisMax.x <= otherMax.x
			)
			||
			(
				otherMin.x >= thisMin.x
				&& otherMin.x <= thisMax.x
			)
			||
			(
				otherMax.x >= thisMin.x
				&& otherMax.x <= thisMax.x
			)
		);

		var doOverlapInY =
		(
			(
				thisMin.y >= otherMin.y
				&& thisMin.y <= otherMax.y
			)
			||
			(
				thisMax.y >= otherMin.y
				&& thisMax.y <= otherMax.y
			)
			||
			(
				otherMin.y >= thisMin.y
				&& otherMin.y <= thisMax.y
			)
			||
			(
				otherMax.y >= thisMin.y
				&& otherMax.y <= thisMax.y
			)
		);

		var doOverlap = (doOverlapInX && doOverlapInY);

		return doOverlap;
	}

	max()
	{
		return this._max.overwriteWith(this.center).add(this._sizeHalf);
	}

	min()
	{
		return this._min.overwriteWith(this.center).subtract(this._sizeHalf);
	}
}
