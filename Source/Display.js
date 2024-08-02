
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this._drawPos = Coords.zeroes();
		this._zeroes = Coords.zeroes();
	}

	initialize()
	{
		var d = document;
		var canvas = d.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;

		this.graphics = canvas.getContext("2d");

		var divDisplay = d.getElementById("divDisplay");
		divDisplay.appendChild(canvas);
	}

	// Draw.

	clear()
	{
		this.drawRectangleAtPosWithSizeAndColorsFillAndBorder
		(
			this._zeroes, this.sizeInPixels, Color.Instances().Black, null
		);
	}

	drawRectangleAtPosWithSizeAndColorsFillAndBorder
	(
		pos, size, colorFill, colorBorder
	)
	{
		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill.systemColor;
			this.graphics.fillRect
			(
				pos.x, pos.y, size.x, size.y
			);
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder.systemColor;
			this.graphics.strokeRect
			(
				pos.x, pos.y, size.x, size.y
			);
		}
	}

	drawRectangleWithCenterSizeAndColorsFillAndBorder
	(
		center, size, colorFill, colorBorder
	)
	{
		var drawPos =
			this._drawPos.overwriteWith(size).half().invert().add(center);

		this.drawRectangleAtPosWithSizeAndColorsFillAndBorder
		(
			drawPos, size, colorFill, colorBorder
		);
	}

	drawTextWithColorAndHeightAtPos(text, color, heightInPixels, pos)
	{
		this.graphics.font = "" + heightInPixels + "px sans-serif";
		this.graphics.fillStyle = color.systemColor;
		this.graphics.fillText(text, pos.x, pos.y + heightInPixels);
	}
}
