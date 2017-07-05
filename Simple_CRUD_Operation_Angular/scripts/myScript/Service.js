
/// <reference path="../angular.js" />
/// <reference path="Module.js" />

angular.module('crudModule')
.service('crudService', function ($http) {
    var vm = this;


    //get list of all employee
        vm.listofEmployee = function () {
            var request = $http({ method: 'get', url:'http://localhost:13396/api/EmployeesAPI', data: Employee });
        return request;
        }



    //search a single employee
        vm.get = function (EmpNo) {
            var result = $http.get('http://localhost:13396/api/EmployeesAPI', EmpNo);
            return result;
        }
    //create a new entry

        vm.addEmpployee = function(){
            var result = $http({ method: 'post', url:'http://localhost:13396/api/EmployeesAPI', data: Employee });
            return result;}


    //update the employee table
        vm.update = function (Employee,EmpNo) {
            var newentry = $http({ method: 'put', url:'http://localhost:13396/api/EmployeesAPI', data: Employee });
            return newentry;
        }
   
    //delete the single employee
        vm.deleteemp = function (EmpNo) 
        {
            var del = $http({ method: 'delete', url: 'http://localhost:13396/api/EmployeesAPI', EmpNo });
            return del;
        }


});


 

 
     
