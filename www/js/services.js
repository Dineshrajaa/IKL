angular.module('ikl.services', [])
.factory('bloodService', function() {
	// Service to list blood groups
	var bloodGroups=[{bn:"A+",bc:"ap"},{bn:"A1+",bc:"aop"},{bn:"A2+",bc:"atp"},{bn:"B+",bc:"bp"},{bn:"A1B+",bc:"aobp"},{bn:"A2B+",bc:"atbp"},{bn:"AB+",bc:"abp"},{bn:"O+",bc:"op"},{bn:"A-",bc:"an"},{bn:"A1-",bc:"aon"},{bn:"A2-",bc:"atn"},{bn:"B-",bc:"bn"},{bn:"A1B-",bc:"aobn"},{bn:"A2B-",bc:"atbn"},{bn:"AB-",bc:"abn"},{bn:"O-",bc:"on"},{bn:"Bombay Blood Group",bc:"hh"}];
	return {
		listBloodGroups:function(){
			return bloodGroups;
		}
	};
})

.service('tipService',function(){
	// Service to list blood donation tips
	var tips=[{q:"Age Limit",a:"18 -60 years age"},
	{q:"Weight",a:"50Kg"},
	{q:"Hemoglobin Level",a:"12.5%"},
	{q:"Time Interval between each donations",a:"Can donate 3 months once"},
	{q:"Body Temperature",a:"37.5 degree Celsius"},
	{q:"Affected by Viral Fever",a:"If you are affected by malaria,typhoid before 3 months you are not eligible"},
	{q:"Alcohol Consumed",a:"If donor consumed alcohol within the last 24 hours,not eligible"},
	{q:"Immunized",a:"If donor undergone any immunization within the past one month,not eligible"},
	{q:"Fever/Cold",a:"If you are sick with cold/fever in past 1 week,not eligible"},
	{q:"Intaking Medicine",a:"Under treatment with   antibiotics or any other medicine, not eligible"},
	{q:"Keep it in mind",a:"50Kg"},
	{q:"Weight",a:"50Kg"}];
	this.listTips=function(){
		// To list blood donation tips 
		return tips;
	};
})

