$(document).ready(function(){	
$("[data-role=panel]").panel().enhanceWithin();//Initialize the External panel


/**Generic Methods**/
function groupNameFinder(bg){
	var groupname;
	switch(bg){
			case 'ap':
			groupname='A+';
			break;
			case 'an':
			groupname='A-';
			break;
			case 'bp':
			groupname='B+';
			break;
			case 'bn':
			groupname='B-';
			break;
			case 'op':
			groupname='O+';
			break;
			case 'on':
			groupname='O-';
			break;
			default:
			groupname="Unknown";
			break;
		}
		return groupname;
}

function checkConnection(){
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';   
	if(states[networkState]=='No network connection'){
	  return false;
	}else{
	  return true;
	}
}


function showLoader(content,visibility){
	//This is used for showing Loader

	$.mobile.loading('show',{text:content,textVisible:visibility,theme:'b'});

}


function customAlert(msg,title){
  //This is a common template for generating native looking alerts
  navigator.notification.alert(msg,false,title);
}

/**End of Generic Methods**/

if (localStorage.getItem('iklmemberlist')===null) setLocalData('res/results.json');//Checks whether local file data already exists or not

/**Initializing Methods(Only runned during Installation)**/
function setLocalData(jsondata){
	//Method to Read the local json file and store it in Local Storage(Executed only during the installation)

$.getJSON(jsondata,function(data){
	showLoader("Setting up Data","true");	
	var localResult=JSON.stringify(data);
	localStorage.setItem('iklmemberlist',localResult);
	$.mobile.loading( "hide" );		
});

}
/**End of Initializing Methods**/

/**Donor Search Methods**/
function searchDonor(bloodid){
	//Method to search Donors of required Blood group
	var resultcontent;
	$("#searchresultslist").html(" ");
	$(":mobile-pagecontainer").pagecontainer("change","#searchresult-page");
	showLoader("Loading Search Results","true");	
	var op=JSON.parse(localStorage.getItem('iklmemberlist'));
	$.each(op,function(index,value){
		if(value.bloodgrp==bloodid) {
			resultcontent="<div data-role='collapsible'><h4>"+value.name+"</h4><p><a href='tel:"+value.mobile+"'rel='external'>"+value.mobile+"</a></p></div>";
			$( "#searchresultslist" ).append(resultcontent).collapsibleset( "refresh" );
		}
	});
	$.mobile.loading( "hide" );
}
/**End of Donor Search Methods**/

/**Share Methods**/
	//Method to Share the Requirement with Friends
	function shareIt(){
		var shareDetails;
		if ($("#cnum").val()!==null) {
			var groupnamer=groupNameFinder($("#cblood :selected").val()); 
			shareDetails="Blood Group Needed:"+groupnamer+"\nContact Name:"+$("#cname").val()+"\nContact Number:"+$("#cnum").val()+"\nLocation:"+$("#clocation").val()+"\nShare it to Save Life\n-Inaindhakaiggal";
		}
		window.plugins.socialsharing.share(shareDetails);
		
	}
/**End of Share Methods**/

/**Listing Methods**/
	//Method to List all the Members
function listMembers(){	
	$("#memberslist,#memberlistdetails").html(" ");
	showLoader("Loading Members List","true");
	var ls=JSON.parse(localStorage.getItem('iklmemberlist'));
	$.each(ls,function(index,value){
		var groupnamer=groupNameFinder(value.bloodgrp);		
		$("#memberslist").append("<li id='"+index+"'><a href='#'><h4>"+value.name+"</h4><p>"+value.mobile+"</p><p class='ui-li-aside'>"+groupnamer+"</p></a></li>");
	});
	$("#memberslist").listview("refresh");
	var contentDetails="Total Members:<b>"+ls.length+"</b>";
	$("#memberlistdetails").html(contentDetails);
}
/**End of Listing Methods**/

/**Synchronizing Method**/
	//Method to Synchronize data from server
	function sync(){
		if (checkConnection())
			setLocalData('https://gist.githubusercontent.com/Dineshrajaa/2ea3aa008436522da9e6/raw/4c9cf738c3928513956369eaf048642c6b0d37d6/IKL');
		else customAlert('Connect to Internet to Sync data','No Internet');
	}
/**End of Synchronizing Method**/

/**Function Calls**/

$("#searchbtn").tap(function(){	
	searchDonor($("#rblood :selected").val());
});

$("#info-page").tap(function(){
	var aboutapp="IKL"+"\n"+"Version:0.0.1"+"\n"+"Developed by"+"\n"+"Dinesh Raja"+"\n"+"E-mail:\ndineshrajaa.93@gmail.com\nMobile:\n9942734970";
	customAlert(aboutapp,"About IKL");
});

$("#listerbtn").tap(listMembers);

$("#sharebtn").tap(shareIt);

$("#syncbtn").tap(sync);

$(document).on('pagebeforeshow','#memberslist-page',listMembers);
/**End of Function Calls**/


document.addEventListener('deviceready',function(){
	StatusBar.overlaysWebView(false);
},false);

});