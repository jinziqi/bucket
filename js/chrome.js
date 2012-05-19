$(function() {
	
	var trayIcon = air.NativeApplication.nativeApplication.icon;
	var trayMenu = new air.NativeMenu();
	var exit = trayMenu.addItem(new air.NativeMenuItem("Exit"));
	
	exit.addEventListener(air.Event.SELECT, function(event) {
		trayIcon.bitmaps = [];
		air.NativeApplication.nativeApplication.exit();
	});

	function minFunc(event){
		if(air.NativeApplication.supportsSystemTrayIcon) {
	
			window.nativeWindow.visible = false;
			var iconLoad = new air.Loader();
			iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete);
			iconLoad.load(new air.URLRequest("images/icons/16.png"));

			trayIcon.menu = trayMenu;

		} else if(air.NativeApplication.supportsDockIcon) {
		
		}
	}

	window.nativeWindow.addEventListener(air.NativeWindowDisplayStateEvent .DISPLAY_STATE_CHANGE, minFunc);

	var bindTrayEvents = function() {
		trayIcon.addEventListener(air.MouseEvent.CLICK, function(event) {
			trayIcon.bitmaps = [];
			window.nativeWindow.restore();
		})
	}, 
	iconLoadComplete = function(event) {
		trayIcon.bitmaps = [event.target.content.bitmapData];
		trayIcon.tooltip = "Bucket!!!";
		bindTrayEvents();
	};	
});