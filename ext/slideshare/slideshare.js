//Requires Jquery
var slideshare_config = 'slideshare.txt';
var access_token = 0;
var Slideshare = {
	//return false if unsuccessful
	upload:function(path)
	{
		  if(access_token == 0)
		  	 access_token = Slideshare.getAccessToken();
		

var ts = Math.round((new Date()).getTime() / 1000);
				var hash = SHA1('X7sjFUSb'+ts);
useraccount = access_token.split(':');
		  url = "http://www.slideshare.net/api/2/upload_slideshow?api_key=OIQl7VQI&ts="+escape(ts)+"&hash="+escape(hash)+"&username="+useraccount[0]+"&password="+useraccount[1]+" ";
		  var boundary = '--------------======-------------------AaB03x';

		  

		  request = new air.URLRequest(url);
		  request.useCache = false;
		  request.contentType = 'multipart/form-data, boundary='+boundary;
		  //request.shouldCacheResponse = false;

			file = new air.File(path);

				

		  request.method='POST';
		  request.data = "slideshow_title=testy \r\n";
		  buffer = new air.ByteArray();

		  fileStream = new air.FileStream();
		  fileStream.open(file, air.FileMode.READ);
		  fileContents = new air.ByteArray();
		  fileStream.readBytes(fileContents, 0, file.size);
		  fileStream.close();

		  buffer.writeUTFBytes( "--"+boundary+"\r\n" );
		  buffer.writeUTFBytes( "content-disposition: form-data; name=\"slideshow_srcfile\"; filename=\""+file.name+"\"\r\n" );
		 // buffer.writeUTFBytes( "Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation\r\n" );
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
		  air.trace(request);
		  loader.load( request );
	},
	//Authenticat user to facebook, store authtoken
	auth:function()
	{
		$('#slideshare_auth_window').show();
	},
	saveAuth:function()
	{
		var data = $('#slideshare_username').val() + ':' + $('#slideshare_password').val();
		sh.write(slideshare_config, data);
		$('#slideshare_auth_window').hide();
	},
	//Returnt true if an access token exists
	getAccessToken:function()
	{
		//Check if access token exists in config file
		var token = sh.read(slideshare_config);
		if(token.length > 0)
			return token;
		else
			return false;
	},
}
function getUrlVar(key, url){
	var result = new RegExp(key + "=([^&]*)", "i").exec(url); 
	return result && unescape(result[1]) || ""; 
}
var sh = {
	//write data to file name
	write:function(fileName, data)
	{
		var prefsFile = sh.get(fileName);
		var stream = new air.FileStream();
		stream.open(prefsFile, air.FileMode.WRITE);
		stream.writeUTFBytes(data);
		stream.close();
	},
	//return data from file name
	read:function(fileName)
	{
		var prefsFile = sh.get(fileName);
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

function SHA1 (msg) {
 
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toLowerCase();
 
}
