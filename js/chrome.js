$(function() {
	
	var trayIcon = air.NativeApplication.nativeApplication.icon;
	var trayMenu = new air.NativeMenu();
	var exit = trayMenu.addItem(new air.NativeMenuItem("Exit"));
	
	exit.addEventListener(air.Event.SELECT, function(event) {
		trayIcon.bitmaps = [];
		air.NativeApplication.nativeApplication.exit();
	});

	function minFunc(event){
		window.nativeWindow.visible = false;
	}

	window.nativeWindow.addEventListener(air.NativeWindowDisplayStateEvent .DISPLAY_STATE_CHANGE, minFunc);

	trayIcon.addEventListener(air.MouseEvent.CLICK, function(event) {
		window.nativeWindow.restore();
	});

	var iconLoadComplete = function(event) {
		trayIcon.bitmaps = [event.target.content.bitmapData];
		trayIcon.tooltip = "Bucket!!!";
	};	

	if(air.NativeApplication.supportsSystemTrayIcon) {
			
		var iconLoad = new air.Loader();
		iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete);
		iconLoad.load(new air.URLRequest("images/icons/16.png"));
		trayIcon.menu = trayMenu;
	} else if(air.NativeApplication.supportsDockIcon) {
		// var iconLoad = new air.Loader();
		//     iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete); 
		//     	iconLoad.load(new air.URLRequest("images/icons/128.png")); 
		//     	trayIcon.menu = trayMenu;
	}
});