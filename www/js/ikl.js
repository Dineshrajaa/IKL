$(document).ready(function(){	
$("[data-role=panel]").panel().enhanceWithin();//Initialize the External panel


/**Generic Methods**/

function showLoader(content,visibility){
	//This is used for showing Loader
	$.mobile.loading('show',{text:content,textVisible:visibility});
}


function customAlert(msg,title){
  //This is a common template for generating native looking alerts
  navigator.notification.alert(msg,false,title);
}


if (localStorage.getItem('sample')===null) setLocalData();//Checks whether local file data already exists or not
function setLocalData(){
	//Method to Read the local json file and store it in Local Storage(Executed only during the installation)
$.getJSON('res/results.json',function(data){
	showLoader("Setting up Data","true");	
	var localResult=JSON.stringify(data);
	localStorage.setItem('sample',localResult);
	$.mobile.loading( "hide" );		
});
}

function searchDonor(bloodid){
	var resultcontent;
	$("#searchresultslist").html(" ");
	$(":mobile-pagecontainer").pagecontainer("change","#searchresult-page");
	showLoader("Loading Search Results","true");	
	var op=JSON.parse(localStorage.getItem('sample'));
	$.each(op,function(index,value){
		if(value.bloodgrp==bloodid) {
			resultcontent="<div data-role='collapsible'><h2>"+value.name+"</h2><p><a href='tel:"+value.mobile+"'rel='external'>"+value.mobile+"</a></p></div>";
			$( "#searchresultslist" ).append(resultcontent).collapsibleset( "refresh" );
		}
	});
	$.mobile.loading( "hide" );
}

$("#searchbtn").tap(function(){	
	searchDonor($("#rblood :selected").val());
});

$("#info-page").tap(function(){
	var aboutapp="IKL"+"\n"+"Version:0.0.1"+"\n"+"Developed by"+"\n"+"Dinesh Raja";
	customAlert(aboutapp,"About IKL");
});


document.addEventListener('deviceready',function(){
	StatusBar.overlaysWebView(false);
},false);

});