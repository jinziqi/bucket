var libraryObject;
function runASFunction(){ 
    libraryObject = new window.runtime.shitbucket;
	libraryObject.accessDOM(window);
}
function configure() {
	libraryObject.configure("config.xml");
}
function updateFile(filename, svc) {
	//send filename to svc
	air.trace(svc);
	//document.getElementById("welcome").innerHTML = filename;
}
function browseForDir(){
	var file = new air.File(); 
	file.addEventListener(air.Event.SELECT, dirSelected); 
	file.browseForDirectory("Select a directory"); 
	function dirSelected(event) { 
		document.getElementById('selected_directory').innerHTML = file.nativePath;
	}
}