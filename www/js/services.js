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

