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
