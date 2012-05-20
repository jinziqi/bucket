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
		
		private var dirlistings:Array;
		private var dirs:Array;
		private var jsWindow:*;
		private var config:XML;
		
		public function shitbucket() {}

		public function configure(configFile:String):Boolean {
			trace("configuring");
			var configf = File.applicationStorageDirectory.resolvePath(configFile); 
			if(configf.exists) {
				var fileStream = new FileStream();
				fileStream.open(configf, FileMode.READ); 
				var config:XML = XML(fileStream.readUTFBytes(fileStream.bytesAvailable)); 
				fileStream.close();
				//parse config.xml
				dirs = new Array();
				var tdirlistings = new Array();
				dirlistings = new Array();
				/*for(var i = 0; i < config.rules.rule.length(); i++) {
					rules[config.rules.rule[i].type.toString()] = config.rules.rule[i].svc.toString();
				}*/
				for(var j = 0; j < config.dirs.dir.length(); j++) {
					dirs[j] = config.dirs.dir[j].folder.toString();
					tdirlistings[dirs[j]] = (new File(dirs[j])).getDirectoryListing();
					dirlistings[dirs[j]] = new Array();
					dirlistings[dirs[j]][0] = new Array();
					for(var k = 0; k < tdirlistings[dirs[j]].length; k++) {
						//for each file in tdirlistings[directory] add an array in dirlistings[directory]
						//dirlistings[dirs[j]][k] = new Array();//set this directory's file to an array
						//associative array; this directory by name's file by name = this directory's edit date
						//directories->directory->tempfile = new array
						dirlistings[dirs[j]][0][tdirlistings[dirs[j]][k].name] = tdirlistings[dirs[j]][k].modificationDate.getTime();
					}
					dirlistings[dirs[j]][1] = new Array();
					dirlistings[dirs[j]][2] = new Array();
					for(var m = 0; m < config.dirs.dir[j].rule.length(); m++) {
						dirlistings[dirs[j]][1][config.dirs.dir[j].rule[m].type.toString()] = config.dirs.dir[j].rule[m].svc.toString();
					}
				}
				return true;
			}
			return false;
		}
		
		public function init() {
			//start timer to check directories
			trace("initializing");
			if(configure("config.xml")) {
				var time:Timer = new Timer(2000);
				time.addEventListener("timer", checkdirs);
				time.start();
				return;
			}
			else {
				trace("config.xml does not exist. exiting monitor daemon.");
			}
		}
		
		private function checkdirs(e:TimerEvent) {
			trace("checking for file updates");
			//reload local directory data into temp var
			var tempd = new Array();
			for(var j = 0; j < dirs.length; j++) {
				tempd[dirs[j]] = (new File(dirs[j])).getDirectoryListing();
				for(var k = 0; k < tempd[dirs[j]].length; k++) {
					if(tempd[dirs[j]][k].modificationDate.getTime() > dirlistings[dirs[j]][0][tempd[dirs[j]][k].name]) {
						dirlistings[dirs[j]][0][tempd[dirs[j]][k].name] = tempd[dirs[j]][k].modificationDate.getTime();
						update(dirs[j]+"\\"+tempd[dirs[j]][k].name, dirlistings[dirs[j]][1]);
					}
					else if(dirlistings[dirs[j]][0][tempd[dirs[j]][k].name] == null) {
						dirlistings[dirs[j]][0][tempd[dirs[j]][k].name] = tempd[dirs[j]][k].modificationDate.getTime();
						update(dirs[j]+"\\"+tempd[dirs[j]][k].name, dirlistings[dirs[j]][1]);
					}
				}
			}
		}
		
		private function update(filename, dir) {
			trace("testing if filetype is known");
			//get file type, check if a rule exists for it
			var svc = dir[filename.split(".").pop()];
			if(svc) {
				trace("sending "+filename+" to "+svc);
				//call js to upload file
				jsWindow.updateFile(filename, svc);
			}
		}
		
		public function accessDOM(window:*):void {
			jsWindow = window;
			init();
		}
	}
}