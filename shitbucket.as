package {
	import flash.display.MovieClip;
	import flash.filesystem.File;
	import flash.events.Event;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	import flash.html.HTMLLoader;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.xml.*;
	import flash.filesystem.FileStream;
	import flash.filesystem.FileMode;
	public class shitbucket extends MovieClip {
		
		public function shitbucket() {
			//load config.xml
			var configf = File.applicationDirectory.resolvePath(configFile); 
			var fileStream = new FileStream();
			fileStream.open(configf, FileMode.READ); 
			var config:XML = XML(fileStream.readUTFBytes(fileStream.bytesAvailable)); 
			fileStream.close();
			//parse config.xml
			var rules = new Array();
			var dirs = new Array();
			var dirlistings = new Array();
			for(var i = 0; i < config.rules.rule.length(); i++) {
				rules[i] = new Array();
				rules[i][0] = config.rules.rule[i].type.toString();
				rules[i][1] = config.rules.rule[i].svc.toString();
			}
			for(var j = 0; j < config.dirs.dir.length(); j++) {
				dirs[j] = config.dirs.dir[j].toString();
				dirlistings[dirs[j]] = (new File(dirs[j])).getDirectoryListing();
			}
			//start timer to check directories
			var time:Timer = new Timer(2000);
			time.addEventListener("timer", checkdirs);
			time.start();
		}
		
		private function checkdirs(e:TimerEvent) {
			//reload local directory data into temp var
			var tempdirlistings = new Array();
			for(var i = 0; i < dirs.length; i++) {
				dirs[j] = config.dirs.dir[j].toString();
				dirlistings[dirs[j]] = (new File(dirs[j])).getDirectoryListing();
			}
		}
			/*dirs = new Array();
			dirs[0] = File.desktopDirectory;
			dirs[0].browseForDirectory("Select a directory to monitor");
			dirs[0].addEventListener(Event.SELECT, directorySelected);
		}
		
		private function directorySelected(e:Event) {
			dirs[0].removeEventListener(Event.SELECT, directorySelected);//sigh
			dirs[0][0] = new Array();//change to generic
			dirs[0][0] = (e.target as File).getDirectoryListing;//change to generic
			//get original name and modification date for each directory
			//fill dirs with arrays of three, which is [file list array][names][dates].
			for(var i = 0; i < dirs.length; i++) {
				//dirs[i][0] = new Array();
				//dirs[i][0] = XML.getDirectoryListing;//set it to xml data for this directory
				for(var j = 0; j < dirs[i][0].length; j++) {
					dirs[i][0] = tempfiles[j].name;
					dirs[i][1] = tempfiles[j].modificationDate.getTime();
				}
			}
			var time:Timer = new Timer(2000);
			time.addEventListener("timer", checklist);
			time.start();
		}
		
		private function checklist(e:TimerEvent) {
			var tempdirs:Array = new Array();
			tempeditdates = directory.getDirectoryListing();
			for(var i:uint = 0; i < tempeditdates.length; i++) {
				if(editdates[i] < tempeditdates[i].modificationDate.getTime()) {
					editdates[i] = tempeditdates[i].modificationDate.getTime();				
					var html:HTMLLoader = new HTMLLoader();
					html.load(new URLRequest("index.html"));
					html.width = stage.stageWidth;
					html.height = stage.stageHeight;
					//html.addEventListener(Event.COMPLETE, onLoaded);
					addChild(html);
				}
			}
		}
		//private function onLoaded(e:Event) {
		//}*/
	}
}