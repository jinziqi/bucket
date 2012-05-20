
$(function() {
	var prefsFile; // The preferences file
	var prefsXML; // The XML data
	var stream; // The FileStream object used to read and write prefsFile data.
	var appRules = new Array;
	var appDirs = new Array;

	/**
	* Called when the application content is loaded. The method points the prefsFile File object 
	* to the "preferences.xml prefsFile in the Apollo application store directory, which is uniquely 
	* defined for the application. It then calls the readXML() method, which reads the XML data.
	*/
	function xml_init()
	{
		window.nativeWindow.addEventListener(air.Event.CLOSING, windowClosingHandler); 
		prefsFile = air.File.applicationStorageDirectory;
		prefsFile = prefsFile.resolvePath("config.xml"); 
		readXML();
	}
 
	/**
	* Called when the application is first rendered, and when the user clicks the Save button.
	* If the preferences file *does* exist (the application has been run previously), the method 
	* sets up a FileStream object and reads the XML data, and once the data is read it is processed. 
	* If the file does not exist, the method calls the saveData() method which creates the file. 
	*/
	function readXML()
	{
		stream = new air.FileStream();
		if (prefsFile.exists) {
			stream.open(prefsFile, air.FileMode.READ);
			processXMLData();
		}
		else
		{
			saveData();
		}
		window.nativeWindow.visible = true;
	}

	/**
	* Called after the data from the prefs file has been read. The readUTFBytes() reads
	* the data as UTF-8 text, and the XML() function converts the text to XML. The x, y,
	* width, and height properties of the main window are then updated based on the XML data.
	*/
	function processXMLData()
	{
		prefsXML = stream.readUTFBytes(stream.bytesAvailable);
		stream.close();
		var domParser = new DOMParser();
		prefsXML = domParser.parseFromString(prefsXML, "text/xml");
		var rules = prefsXML.getElementsByTagName("rule");

		for(var i = 0; i<rules.length; i++) {
			if(rules[i]) {
				appRules[rules[i].getElementsByTagName('type')[0].firstChild.nodeValue] = rules[i].getElementsByTagName('svc')[0].firstChild.nodeValue;
			}
		}

		var dirs = prefsXML.getElementsByTagName("dir");
		for(var i = 0; i<dirs.length; i++) {
			if(dirs[i]) {
				appDirs.push(dirs[i].firstChild.nodeValue);
			}
		}
	}

	/**
	* Called when the user closes the window.
	*/
	function windowClosingHandler(event) 
	{
		event.preventDefault();
		nativeWindow.removeEventListener("closing", windowClosingHandler)
		saveData();
		air.NativeApplication.nativeApplication.exit();
	}
	/**
	 * Called in the windowClosingHandler() method. Constructs XML data and saves the 
	 * data to the preferences.xml file.
	 */
	function saveData()
	{
		createXMLData();
		writeXMLData();
	}
	/**
	* Creates the XML object with data based on the window state and the 
	* current time.
	*/
	function createXMLData()
	{
		var cr = air.File.lineEnding;
		prefsXML =   "<config>" + cr
					+ "    <rules>" + cr
					+ "        <rule>" + cr
					+ "            <type></type>" + cr
					+ "            <svc></svc>" + cr
					+ "        </rule>" + cr
					+ "    </rules>" + cr
					+ "    <dirs>" + cr
					+ "        <dir></dir>" + cr
					+ "    </dirs>" + cr
					+ "</config>";
	}

	/**
	* Called when the user resizes the window. The method replaces line ending 
	* characters with the platform-specific line ending character. Then sets up 
	* and uses the stream object to write the data.
	*/
	function writeXMLData()
	{
		stream = new air.FileStream();
		stream.open(prefsFile, air.FileMode.WRITE);
		stream.writeUTFBytes(prefsXML);
		stream.close();
	}

	xml_init();	
});