function upload(path)
{
	  url = "https://picasaweb.google.com/data/feed/api/user/111832862997785277947/albumid/5711289114905226177";

	  boundary = '--------------======-------------------AaB03x';

	  request = new air.URLRequest(url);
	  request.useCache = false;
	  request.contentType = 'multipart/form-data, boundary='+boundary;
	  request.shouldCacheResponse = false;
	  request.method='POST';

	  buffer = new air.ByteArray();

	  file = new air.File("/Users/zjin/Documents/bucket/index.html");

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
	  });
	  loader.addEventListener(air.Event.COMPLETE, function(e){
	    air.trace( loader.data );
	  });
	  loader.load( request );
}

function auth()
{
	var myWindow=window.open(googleLogin(),"mywindow","width=550,height=550");
	myWindow.focus();
}
function googleLogin()
{
	var url="https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fpicasaweb.google.com%2Fdata%2F&state=%2Fprofile&redirect_uri=http%3A%2F%2Fhappybucket.com%2Fct%2Fxt_custom_code.bix%3Fc%3D%257BCCBCE38D-2EA2-4919-B530-6E30FBA111F9%257D%26event%3Dcallback&response_type=code&client_id=85959154006-m68f33t69ar0b4ttnp1u7sh94ceq9aot.apps.googleusercontent.com";
return url;
}