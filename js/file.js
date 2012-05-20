function processFile(path){
	
}
function getExtension(path){
	var name_splited=path.split(".");
	switch(name_splited[name_splited.length-1]){
		case "jpg":
		return "image/jpeg";
		case "png":
		return "image/png";
	}
}