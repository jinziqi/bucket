var appDirs = new Array;

$(function() {
	var prefsFile; // The preferences file
	var prefsXML; // The XML data
	var stream; // The FileStream object used to read and write prefsFile data.
	
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
		var dirs = prefsXML.getElementsByTagName("dir");

		for(var i = 0; i<dirs.length; i++) {
			if(dirs[i]) {
				var dir_config = new Object;
				dir_config.folder = dirs[i].getElementsByTagName('folder')[0].firstChild.nodeValue;
				dir_config.title = dirs[i].getElementsByTagName('title')[0].firstChild.nodeValue;
				dir_config.rules = new Array;
				var rules = dirs[i].getElementsByTagName('rule');
				for(var j = 0; j<rules.length; j++) {
					if(rules[i]) {
						var rule_config = new Object;
						rule_config.type = rules[j].getElementsByTagName('type')[0].firstChild.nodeValue;
						rule_config.svc = rules[j].getElementsByTagName('svc')[0].firstChild.nodeValue;

						dir_config.rules.push(rule_config);
					}
				}
				appDirs.push(dir_config);
			}
		}
		loadDataIntoDom();
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

	function loadDataIntoDom()
	{
		for(var i=0; i<appDirs.length; i++) {
			var rule_html = '<div class="ruleContainer">';
			rule_html += '<div class="ruleTitle">';
			rule_html += appDirs[i].title;
			rule_html += '</div>';
			rule_html += '<div class="ruleOptions">';
			rule_html += '<a rule_id="'+i+'" class="editRule">Edit</a>';
			rule_html += '<a rule_id="'+i+'" class="removeRule">Remove</a>';
			rule_html += '</div>';
			rule_html += '</div>';
		}
		$('#ruleList').html(rule_html);
		$('.editRule').click(function(){
			hideViews();
			$('#addRules').show();
			var rule_id = $(this).attr('rule_id');
			$('#ruleName').val(appDirs[rule_id].title);
		});
	}

	/**
	* Creates the XML object with data based on the window state and the 
	* current time.
	*/
	function createXMLData()
	{
		var cr = air.File.lineEnding;
		prefsXML =   "<config>" + cr
					+ "    <dirs>" + cr;

		for(var i=0; i<appDirs.length; i++) {
			prefsXML += "        <dir>" + cr
					+ "            <title>"+appDirs[i].title+"</title>" + cr					
					+ "            <folder>"+appDirs[i].folder+"</folder>" + cr;
			for(var j=0; j<appDirs[i].rules.length; j++) {
				prefsXML += "       <rule>" + cr
					+ "                <type>"+appDirs[i].rules[j].type+"</type>" + cr
					+ "                <svc>"+appDirs[i].rules[j].svc+"</svc>" + cr
					+ "            </rule>" + cr;
			}

			prefsXML += "        </dir>" + cr;
		}


		prefsXML += "    </dirs>" + cr
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