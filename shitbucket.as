package {
	import flash.display.MovieClip;
	import flash.filesystem.File;
	import flash.events.Event;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	public class shitbucket extends MovieClip {
		private var directory:File;
		private var contents:Array;
		public function shitbucket() {
			directory = File.desktopDirectory;
			directory.browseForDirectory("Select a directory to monitor");
			directory.addEventListener(Event.SELECT, directorySelected);
		}
		private function directorySelected(e:Event) {
			directory = e.target as File;
			contents = directory.getDirectoryListing();
			for(var i = 0; i < contents.length; i++) {
				contents[i] = contents[i].modificationDate.getTime();
			}
			var time:Timer = new Timer(2000);
			time.addEventListener("timer", checklist);
			time.start();
		}
		private function checklist(e:TimerEvent) {
			var tempcontents:Array = new Array();
			tempcontents = directory.getDirectoryListing();
			for(var i:uint = 0; i < tempcontents.length-4; i++) {
				if(contents[i] < tempcontents[i].modificationDate.getTime()) {
					contents[i] = tempcontents[i].modificationDate.getTime();
					trace("FILE EDIT");
				}
			}
		}
	}
}