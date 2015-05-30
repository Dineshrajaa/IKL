$(document).ready(function(){	
$("[data-role=panel]").panel().enhanceWithin();//Initialize the External panel
$( "#sharPagePopup" ).enhanceWithin().popup();//Initialize External Popup
var selectedDonors;
/**Generic Methods**/
function groupNameFinder(bg){
	var groupname;
	switch(bg){

			case 'ap':
			groupname='A+';
			break;
			case 'aop':
			groupname='A1+';
			break;
			case 'atp':
			groupname='A2+';
			break;
			case 'bp':
			groupname='B+';
			break;
			case 'aobp':
			groupname='A1B+';
			break;
			case 'atbp':
			groupname='A2B+';
			break;
			case 'abp':
			groupname='AB+';
			break;
			case 'op':
			groupname='O+';
			break;
			case 'an':
			groupname='A-';
			break;
			case 'aon':
			groupname='A1-';
			break;
			case 'atn':
			groupname='A2-';
			break;
			case 'bn':
			groupname='B-';
			break;
			case 'aobn':
			groupname='A1B-';
			break;
			case 'atbn':
			groupname='A2B-';
			break;
			case 'abn':
			groupname='AB-';
			break;
			case 'on':
			groupname='O-';
			break;
			case 'hh':
			groupname='BombayBlood';
			break;
			default:
			groupname="Unknown Blood Group";
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

if (localStorage.getItem('iklmemberlist')===null || undefined) setLocalData('res/results.json');//Checks whether local file data already exists or not

/**Initializing Methods(Only runned during Installation)**/
function setLocalData(jsondata){
	//Method to Read the local json file and store it in Local Storage(Executed only during the installation)

$.getJSON(jsondata,function(data){
	showLoader("Setting up Data","true");	
	var localResult=JSON.stringify(data);
	localStorage.setItem('iklmemberlist',localResult);
	$.mobile.loading( "hide" );
	customAlert("Updated Donors Information","Sync Success");		
});

}
/**End of Initializing Methods**/

/**Donor Search Methods**/
function searchDonor(bloodid){
	//Method to search Donors of required Blood group
	var resultcontent;
	var resultcounter=0;
	$("#searchresultslist").html(" ");
	$(":mobile-pagecontainer").pagecontainer("change","#searchresult-page");
	showLoader("Loading Search Results","true");	
	var op=JSON.parse(localStorage.getItem('iklmemberlist'));
	$.each(op,function(index,value){
		if(value.bloodgrp==bloodid) {
			resultcounter++;
			resultcontent="<li>\
			<div class='ui-grid-b'>\
			<div class='ui-block-a' width='94%'>\
				<p><b>"+value.name+"</b></p>\
			</div>\
			<div class='ui-block-b' width='3%'>\
				<a href='tel:"+value.mobile+"' data-theme='b' data-role='button' data-icon='phone' data-iconpos='notext'></a>\
			</div>\
			<div class='ui-block-c' width='3%'>\
				<a href='#' data-name='"+value.name+"' data-mobile='"+value.mobile+"' data-theme='b' data-role='button' data-icon='none' data-iconpos='notext' class='mark'></a>\
			</div>\
			</div>\
			</li>";
			//resultcontent="<li><p><b>"+value.name+"</b></p><a href='tel:"+value.mobile+"' data-role='button' data-icon='phone' data-iconpos='notext' class='split-button-custom'></a></li>";
			//resultcontent="<li><table><tbody><tr><td><p><b>"+value.name+"</b></p></td><td><b>"+value.mobile+"</b></td><td><a href='tel:"+value.mobile+"' data-role='button' data-icon='phone' data-iconpos='notext'></a></td></tr></tbody></table></li>";
			//resultcontent="<div data-role='collapsible'><h4>"+value.name+"</h4><p><a href='tel:"+value.mobile+"'rel='external'>"+value.mobile+"</a></p></div>";
			//<td><a href=tel:"+value.mobile+" data-role='button' data-icon='phone' data-iconpos='notext'></a></td>/
			$( "#searchresultslist" ).append(resultcontent);
		}

	});
	$( "#searchresultslist" ).listview("refresh").trigger("create");
	$("#resultsetcount").html("Found <b>"+ resultcounter+"</b>  "+ groupNameFinder(bloodid)+" details");
	$.mobile.loading( "hide" );
	if (resultcounter==0){
		customAlert("Now you can Share it in Social Medias","No Results Found");
		$(":mobile-pagecontainer").pagecontainer("change","#share-page");
	}
}

function prepareForShare(){
	//selectedDonors='';
	if ($('li .ui-icon-check').length>1) {
	selectedDonors=localStorage.getItem('selecedBloodGroup')+' Donors\n';
	$.each($('li .ui-icon-check'),function(){		
		selectedDonors+=$(this).attr('data-name')+"-"+$(this).attr('data-mobile')+"\n";
			});
	selectedDonors=selectedDonors.replace('undefined-undefined','-Inaindhakaiggal');
	
	}
	else customAlert("Please select Donors before sharing","Nothing to Share");
}

function selectAllDonors(){
	if($('.mark').hasClass('ui-icon-check')){
		$('.mark').addClass('ui-icon-none').removeClass('ui-icon-check');
		//$("#bulkSelectBtn").text("Unselect All").removeClass('ui-icon-check').addClass('ui-icon-delete');
	}
	else{
		$('.mark').removeClass('ui-icon-none').addClass('ui-icon-check');
		//$("#bulkSelectBtn").text("Select All").removeClass('ui-icon-delete').addClass('ui-icon-check');
	}
}

function showPreview(){
	prepareForShare();
	$("#shareMessage").text(selectedDonors);
}

function shareDonorsList(){
	prepareForShare();
	window.plugins.socialsharing.share(selectedDonors);
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
	localStorage.setItem('selecedBloodGroup',$("#rblood :selected").text());
});

$("#info-page").tap(function(){
	var aboutapp="IKL"+"\n"+"Version:0.0.1"+"\n"+"Developed by"+"\n"+"Dinesh Raja"+"\n"+"E-mail:\ndineshrajaa.93@gmail.com\nMobile:\n9942734970";
	customAlert(aboutapp,"About IKL");
});

$("#listerbtn").tap(listMembers);

$("#sharebtn").tap(shareIt);

$("#syncbtn").tap(sync);

$("#shareSelectedBtn").tap(prepareForShare);

$("#bulkSelectBtn").tap(selectAllDonors);

$("#viewBtn").tap(showPreview);

$("#shareOkBtn,#shareSelectedBtn").tap(shareDonorsList);



$(document).on('pagebeforeshow','#memberslist-page',listMembers);
/**End of Function Calls**/


document.addEventListener('deviceready',function(){
	StatusBar.overlaysWebView(false);
},false);

});

$(document).on("click","#searchresultslist a.mark",function(){
	if($(this).hasClass('ui-icon-none'))
	//$(this).attr('data-icon','check').button().trigger("refresh");
		$(this).removeClass('ui-icon-none').addClass('ui-icon-check');
	else
		$(this).removeClass('ui-icon-check').addClass('ui-icon-none');	
});


/**Testing**/

/*
function dbtInitialize(){
		if (window.openDatabase) {
			dbName.transaction(function(tx){
				tx.executeSql("create table if not exists samtable(samcontent text)");
				});
		}
		else{
			alert("Sorry You can't Save data");
		}
	}
	
var dbName=window.openDatabase("SVTDB",1.0,"SVTDB",5242880);
dbtInitialize();
$("#samync").tap(trialSync);
function trialSync(){
		$.getJSON('res/results.json',function(data){
	showLoader("Setting up Data","true");	
	var localResult=JSON.stringify(data);
	dbName.transaction(function(tx){
		tx.executeSql("insert into samtable(samcontent) values(?)",[localResult]);
	});
	// localStorage.setItem('iklmemberlist',localResult);
	// $.mobile.loading( "hide" );
	customAlert("Updated Donors Information","Sync Success");		
});
	}*/


//Updated 16 details