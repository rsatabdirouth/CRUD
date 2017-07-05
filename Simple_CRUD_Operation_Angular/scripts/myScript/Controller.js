/// <reference path="Module.js" />
/// <reference path="Service.js" />
/// <reference path="../angular.js" />


angular.module('crudModule')
.controller('crudController',function($scope, crudService) {
    load();
    //load the Employee table 
    function load() {
        var promiseget = crudService.listofEmployee();
        promiseget.then(
            function (model) {
            console.log(model);
            $scope.Employees = model.data;
            }, 
            function (err) 
            {console.log('Error occured',err); });

    }


    //if the 'EmpNo' is not present in the table then
    //insert the 'EmpNo' else
    //update the existing entry
    $scope.save = function () {
        var emp={
            EmpNo : $scope.EmpNo,
            EmpName : $scope.EmpName,
            Salary :$scope.Salary,
            Dept: $scope.Dept,
            Designation:$scope.Designation
        };
        if($scope.EmpNo<0){
            var promiseentry = crudService.addEmpployee();
            promiseentry.then(
                function(model){
                    $scope.EmpNo=model.data.EmpNo;
                    $scope.EmpName=model.data.EmpName;
                    $scope.Salary=model.data.Salary;
                    $scope.Dept=model.data.Dept;
                    $scope.Designation=model.data.Designation;
                    load();},
                function(err){console.log('error',err)});
        }else{
        
            var promiseupdate = crudService.update();
            promiseupdate.then(
                function(){$scope.Message="Successfully updated"; 
                    load();},
                 function(err){console.log('error',err)});}
        

    }

    //delete data
    $scope.delete = function () {

        var promisedel = crudService.deleteemp($scope.EmpNo);
        promisedel.then(function (model) { 
            $scope.Message="Successfully Deleted";
            $scope.EmpNo = 0;
            $scope.EmpName = '';
            $scope.Salary = 0;
            $scope.Dept = '';
            $scope.Designation = '';
            load();
        }, function (err) {console.log('Error',err) });

    }


    //present the empty model on click new button
    $scope.clear = function () {

        $scope.EmpNo = 0;
        $scope.EmpName = '';
        $scope.Salary = 0;
        $scope.Dept = '';
        $scope.Designation = '';
    }

    //search for a single employee
    $scope.get =function (Emp){
        var promisegetsingle =crudService.get(Emp.EmpNo);
        promisegetsingle.then(
            function(pl){
                var res = pl.data;
                $scope.EmpNo = res.EmpNo;
                $scope.EmpName = res.EmpName;
                $scope.Salary = res.Salary;
                $scope.DeptName = res.DeptName;
                $scope.Designation = res.Designation;},
        function (errorPl) {
            console.log('failure loading Employee', errorPl);
               }
                )}



});



      
        



  
    
