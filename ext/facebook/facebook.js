//Requires Jquery
var config = 'facebookConfig.txt';
var access_token = 0;
var Facebook = {
	//return false if unsuccessful
	upload:function(path, type)
	{
		  //if(access_token == 0)
		  access_token = Facebook.getAccessToken();
		  //This will need to be updated to expand and handle more document types
		  var extension = path.substr( (path.lastIndexOf('.') +1) );
		  var params = "";
		  if(extension == 'jpg')
		  {
			url = "https://graph.facebook.com/me/photos?access_token=" + access_token;
			params = "message=happybucket";
		  }
		  else
		  {
			var video_title = "happybucket";
			var video_desc = "happybucket";
			url = "https://graph-video.facebook.com/me/videos?access_token=" + access_token;
			params = " title=" + video_title + "&description=" . video_desc + " ";
		  }
		  boundary = '--------------======-------------------AaB03x';

		  request = new air.URLRequest(url);
		  request.useCache = false;
		  request.contentType = 'multipart/form-data, boundary='+boundary;
		  //request.shouldCacheResponse = false;
		  request.method='POST';
		  request.data = params + " \r\n";
		  buffer = new air.ByteArray();

		  file = new air.File(path);

		  fileStream = new air.FileStream();
		  fileStream.open(file, air.FileMode.READ);
		  fileContents = new air.ByteArray();
		  fileStream.readBytes(fileContents, 0, file.size);
		  fileStream.close();

		  buffer.writeUTFBytes( "--"+boundary+"\r\n" );
		  buffer.writeUTFBytes( "content-disposition: form-data; name=\"Filedata\"; filename=\""+file.name+"\"\r\n" );
		  buffer.writeUTFBytes( "Content-Transfer-Encoding: binary\r\n" );
		  buffer.writeUTFBytes( "Content-Length: "+file.size+"\r\n" );
		  buffer.writeUTFBytes( "Content-Type: application/octet-stream\r\n" );
		  buffer.writeUTFBytes( "\r\n" );

		  buffer.writeBytes(fileContents, 0, fileContents.length);

		  buffer.writeUTFBytes( "\r\n--"+boundary+"--\r\n" );

		  request.data = buffer;

		  var loader = new air.URLLoader();
		  loader.addEventListener(air.ProgressEvent.PROGRESS , function(e){
		  });
		  loader.addEventListener(air.IOErrorEvent.IO_ERROR , function (e){
			air.trace( 'error: '+ e.text );
			return false;
		  });
		  loader.addEventListener(air.Event.COMPLETE, function(e){
			air.trace( loader.data );
		  });
		  loader.load( request );
	},
	//Authenticat user to facebook, store authtoken
	auth:function()
	{
		var options = new air.NativeWindowInitOptions(); 	
		options.systemChrome = "standard"; 
		options.type = "normal"; 
		options.resizable = "false";
		options.maximizable = "false";

		var windowBounds = new air.Rectangle(0,0,1100,600); 
		var newHTMLLoader = air.HTMLLoader.createRootWindow(true, options, true, windowBounds); 
		newHTMLLoader.load(new air.URLRequest(Facebook.facebookLogin()));
		newHTMLLoader.addEventListener(air.Event.LOCATION_CHANGE, onChange);
		 
		function onChange(event)
		{
			access_token = getUrlVar('access_token', newHTMLLoader.location);
			if(access_token.length > 0)
			{
				newHTMLLoader.stage.nativeWindow.close();
				air.trace(access_token);
				
				//Save access token in config file
				fh.write(config, access_token);
				return true;
			}
		}
	},
	//Returnt true if an access token exists
	getAccessToken:function()
	{
		//Check if access token exists in config file
		var token = fh.read(config);
		if(token.length > 0)
			return token;
		else
			return false;
	},
	facebookLogin:function()
	{
		var url = "https://www.facebook.com/dialog/oauth?client_id=239826812788136&redirect_uri=";
		url += encodeURIComponent("https://www.facebook.com/connect/login_success.html") + "&response_type=token";
		return url;
	},
}
function getUrlVar(key, url){
	var result = new RegExp(key + "=([^&]*)", "i").exec(url); 
	return result && unescape(result[1]) || ""; 
}
var fh = {
	//write data to file name
	write:function(fileName, data)
	{
		var prefsFile = fh.get(fileName);
		var stream = new air.FileStream();
		stream.open(prefsFile, air.FileMode.WRITE);
		stream.writeUTFBytes(data);
		stream.close();
	},
	//return data from file name
	read:function(fileName)
	{
		var prefsFile = fh.get(fileName);
		var data = "";
		if (prefsFile.exists) {
			var stream = new air.FileStream();
			stream.open(prefsFile, air.FileMode.READ);
			data = stream.readUTFBytes(stream.bytesAvailable);
			stream.close();
		}
		return $.trim(data);
	},
	//get file
	get:function(fileName)
	{
		prefsFile = air.File.applicationStorageDirectory;
		prefsFile = prefsFile.resolvePath(fileName); 
		return prefsFile;
	}
}
