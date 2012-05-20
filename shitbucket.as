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
		
		var dirlistings:Array;
		var dirs:Array;
		var rules:Array;
		var jsWindow;
		
		public function shitbucket() {
		}
		
		private function init() {
			//load config.xml
			var configf = File.applicationDirectory.resolvePath("config.xml"); 
			var fileStream = new FileStream();
			fileStream.open(configf, FileMode.READ); 
			var config:XML = XML(fileStream.readUTFBytes(fileStream.bytesAvailable)); 
			fileStream.close();
			//parse config.xml
			rules = new Array();
			dirs = new Array();
			var tdirlistings = new Array();
			dirlistings = new Array();
			for(var i = 0; i < config.rules.rule.length(); i++) {
				rules[config.rules.rule[i].type.toString()] = config.rules.rule[i].svc.toString();
			}
			for(var j = 0; j < config.dirs.dir.length(); j++) {
				dirs[j] = config.dirs.dir[j].toString();
				tdirlistings[dirs[j]] = (new File(dirs[j])).getDirectoryListing();
				dirlistings[dirs[j]] = new Array();
				for(var k = 0; k < tdirlistings[dirs[j]].length; k++) {
					//for each file in tdirlistings[directory] add an array in dirlistings[directory]
					//dirlistings[dirs[j]][k] = new Array();//set this directory's file to an array
					//associative array; this directory by name's file by name = this directory's edit date
					//directories->directory->tempfile = new array
					dirlistings[dirs[j]][tdirlistings[dirs[j]][k].name] = tdirlistings[dirs[j]][k].modificationDate.getTime();
				}
			}
			//start timer to check directories
			var time:Timer = new Timer(2000);
			time.addEventListener("timer", checkdirs);
			time.start();
		}
		
		private function checkdirs(e:TimerEvent) {
			//reload local directory data into temp var
			var tempd = new Array();
			for(var j = 0; j < dirs.length; j++) {
				tempd[dirs[j]] = (new File(dirs[j])).getDirectoryListing();
				for(var k = 0; k < tempd[dirs[j]].length; k++) {
					if(tempd[dirs[j]][k].modificationDate.getTime() > dirlistings[dirs[j]][tempd[dirs[j]][k].name]) {
						dirlistings[dirs[j]][tempd[dirs[j]][k].name] = tempd[dirs[j]][k].modificationDate.getTime();
						update(dirs[j]+"/"+tempd[dirs[j]][k].name);
					}
					else if(dirlistings[dirs[j]][tempd[dirs[j]][k].name] == null) {
						dirlistings[dirs[j]][tempd[dirs[j]][k].name] = tempd[dirs[j]][k].modificationDate.getTime();
						update(dirs[j]+"/"+tempd[dirs[j]][k].name);
					}
				}
			}
		}
		
		private function update(filename:String) {
			//get file type, check if a rule exists for it
			var svc = rules[filename.split(".").pop()];
			if(svc) {
				//call js to upload file
			}
		}
		public function accessDOM(window:*):void { 
			jsWindow = window;
			init();
    	}
	}
}