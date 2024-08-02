
class InputTracker
{
	constructor()
	{
		this.keysPressed = [];
	}

	initialize()
	{
		var d = document;
		d.onkeydown = this.handleEventKeyDown.bind(this);
		d.onkeyup = this.handleEventKeyUp.bind(this);
	}

	keyRelease(key)
	{
		var keyIndex = this.keysPressed.indexOf(key);
		if (keyIndex >= 0)
		{
			this.keysPressed.splice
			(
				keyIndex, 1	
			);
		}
	}

	// Events.

	handleEventKeyDown(e)
	{
		var key = e.key;
		if (this.keysPressed.indexOf(key) == -1)
		{
			this.keysPressed.push(key);
		}
	}

	handleEventKeyUp(e)
	{
		this.keyRelease(e.key);
	}
}
