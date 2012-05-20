var libraryObject;
function runASFunction(){ 
    libraryObject = new window.runtime.happybucket;
	libraryObject.accessDOM(window);
	
}
function configure() {
	libraryObject.configure("config.xml");
}
function updateFile(filename, svc) {
	if(air.NativeApplication.supportsDockIcon){
		filename=filename.replace("\\","/");
	}
	//send filename to svc
	if(svc == 'Facebook') {
		air.trace('Uploading to facebook');
		Facebook.upload(filename);
	}else if(svc == 'Picasa') {
		air.trace('Uploading to Picasa');
		Picasa.upload(filename);
	}else if(svc == 'Slideshare') {
		air.trace('Uploading to Slideshare');
		Slideshare.upload(filename);
	}
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
//Check if Facebook is enabled if not create onclick event to enable
if(Facebook.getAccessToken())
	$('#enableFacebook').html('Reset');
else
	$('#enableFacebook').html('Enable');
$('#enableFacebook').click(function () {
	if(Facebook.auth())
		$('#enableFacebook').html('Reset');
});