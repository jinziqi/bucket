var Picasa ={
	upload:function(path)
	{
		  url = "https://picasaweb.google.com/data/feed/api/user/default/albumid/default?access_token=ya29.AHES6ZSAMbcxzZgLATb9Df1t53ywtGnNzAVNmFbr2GKC7NBJpLZZ1g";

		  boundary = '--------------======-------------------AaB03x';

		  request = new air.URLRequest(url);
		  request.useCache = false;
		  request.contentType = 'image/png';
		  //request.shouldCacheResponse = false;
		  request.method='POST';

		  buffer = new air.ByteArray();

		  file = new air.File("/Users/zjin/Documents/bucket/images/happyBucket.png");

		  fileStream = new air.FileStream();
		  fileStream.open(file, air.FileMode.READ);
		  fileContents = new air.ByteArray();
		  fileStream.readBytes(fileContents, 0, file.size);
		  fileStream.close();

		  buffer.writeBytes(fileContents, 0, fileContents.length);


		  request.data = buffer;

		  var loader = new air.URLLoader();
		  loader.addEventListener(air.ProgressEvent.PROGRESS , function(e){
		  });
		  loader.addEventListener(air.IOErrorEvent.IO_ERROR , function (e){
		    air.trace( 'error: '+ e.text );
		  });
		  loader.addEventListener(air.Event.COMPLETE, function(e){
		    //air.trace( loader.data );
		  });
		  loader.load( request );
	},

	auth:function()
	{
		var myWindow=window.open(Picasa.googleLogin(),"mywindow","width=550,height=550");
		myWindow.focus();
	},
	getAccessToken:function()
	{
		$.post('http://happybucket.com/ct/xt_custom_code.bix?c={CCBCE38D-2EA2-4919-B530-6E30FBA111F9}&event=google_access_token', {'code': 'kACAH-1Ng1SFvdjaJdMKxnajxxEwNaO2Op0jHXSTs9a7g8SMwBQ4EwJum7AOPkr2y_RMH3y9gAwzFzqwkZQYNIAjN2QnMxHGMTuoOxdbiWtwnQ9_pfY24MuG1s',
		'client_id':'85959154006-m68f33t69ar0b4ttnp1u7sh94ceq9aot.apps.googleusercontent.com',
		'client_secret':'X_Xa3yQb71J46q_5q3_HPlJ7',
		'redirect_uri':'http%3A%2F%2Fhappybucket.com%2Fct%2Fxt_custom_code.bix%3Fc%3D%257BCCBCE38D-2EA2-4919-B530-6E30FBA111F9%257D%26event%3Dcallback',
		'grant_type':'authorization_code'}, function(data, textStatus, xhr) {
			air.trace(data);
		});
	
	},
	googleLogin:function()
	{
		var url="https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fpicasaweb.google.com%2Fdata%2F&state=%2Fprofile&redirect_uri=http%3A%2F%2Fhappybucket.com%2Fct%2Fxt_custom_code.bix%3Fc%3D%257BCCBCE38D-2EA2-4919-B530-6E30FBA111F9%257D%26event%3Dcallback&response_type=code&client_id=85959154006-m68f33t69ar0b4ttnp1u7sh94ceq9aot.apps.googleusercontent.com&access_type=offline&approval_prompt=force";
		return url;
	},
}