FruitNinja.AssetsManager = function()
{
	SPP.EventDispatcher.call(this);
	var _this=this,i=0,j=0
	this.loader = new createjs.LoadQueue();

	var handleComplete=function()
	{
		_this.dispatchEvent(new SPP.Event("complete"));
	};
	this.loader.addEventListener("complete", handleComplete);

	this.start=function()
	{
		this.loader.load();
	};

};

CutSound = new Howl ({
	src: ['sounds/throw-fruit.ogg','sounds/throw-fruit.mp3'],
	  volume: 0.5
});
BombSound = new Howl ({
	src: ['sounds/bomb-explode.ogg','sounds/bomb-explode.mp3'],
	  volume: 0.5
});
SplatterSound = new Howl ({
	src: ['sounds/splatter.ogg','sounds/splatter.mp3'],
	  volume: 0.5
});