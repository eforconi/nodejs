(function() {
    'use strict';

    angular
        .module('visual')
        .controller('visualController', visualController)
        .factory('visualFactory', visualFactory);
        

    visualController.$inject = ['$scope','visualFactory'];
    visualFactory.$inject = ['$http'];

    function visualFactory($http) {
        var service = {
        getOrganizations : getOrganizations,
        getApisList : getApisList,
        getSwagger : getSwagger
        };
        return service;

        function getOrganizations(url) {
              return $http.get(url);
            }

        function getApisList(){
            return $http.get("/apis");
        }

        function getSwagger(url){
            return $http.get(url);
        }

    }

    /* @ngInject */
    function visualController($scope,visualFactory) {
        var vi = this;
        var actualVerb=[], apiList, apiSelected,swaggerJson, role=true;
        var auxPath,actualKey,auxVal,printTree,auxGlobal = 0,limitGlobal = 0,tree = [],actualRef = {},bodyName, auxValResponses,actualErrorCode;
        activate();
        function activate() {
        }

        visualFactory.getApisList().then(
            function (response) {
                console.log("TXT", response);
                vi.apiList=response.data;
            },
            function(response){
                console.log("ERROR: ", response);
            }
            );
        if(vi.json==undefined){
        //vi.json={"swagger":"2.0","info":{"description":"DonateAPP API","version":"V1.0","title":"Some random api for testing","contact":{"name":"Serol","url":"https://srlk.github.io"}},"host":"localhost:4567","tags":[{"name":"swagger"}],"schemes":["http","https"],"consumes":["application/json"],"produces":["application/json"],"paths":{"/user":{"post":{"summary":"Creates a new user","operationId":"CreateUserRoute","produces":["application/json"],"parameters":[{"name":"auth","in":"header","required":true,"type":"string"},{"in":"body","name":"body","required":true,"schema":{"$ref":"#/definitions/CreateUserRequest"}}],"responses":{"200":{"description":"Success","schema":{"$ref":"#/definitions/User"}},"400":{"description":"Invalid input data","schema":{"$ref":"#/definitions/ApiError"}},"401":{"description":"Unauthorized","schema":{"$ref":"#/definitions/ApiError"}},"404":{"description":"User not found","schema":{"$ref":"#/definitions/ApiError"}}}}},"/user/{id}":{"get":{"summary":"Gets user details and donations","operationId":"GetUserRoute","produces":["application/json"],"parameters":[{"name":"auth","in":"header","required":true,"type":"string"},{"name":"id","in":"path","required":true,"type":"string"}],"responses":{"200":{"description":"Success","schema":{"$ref":"#/definitions/User"}},"400":{"description":"Invalid input data","schema":{"$ref":"#/definitions/ApiError"}},"401":{"description":"Unauthorized","schema":{"$ref":"#/definitions/ApiError"}},"404":{"description":"User not found","schema":{"$ref":"#/definitions/ApiError"}}}}},"/user/{id}/donate":{"post":{"summary":"Creates a donation request for the user","operationId":"DonateRoute","produces":["application/json"],"parameters":[{"name":"auth","in":"header","required":true,"type":"string"},{"name":"id","in":"path","required":true,"type":"string"}],"responses":{"200":{"description":"Success"},"400":{"description":"Invalid input data","schema":{"$ref":"#/definitions/ApiError"}},"401":{"description":"Unauthorized","schema":{"$ref":"#/definitions/ApiError"}},"404":{"description":"User not found","schema":{"$ref":"#/definitions/ApiError"}}}}}},"definitions":{"User":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"},"lastname":{"type":"string"},"phoneNumber":{"type":"string"},"bloodType":{"type":"string","enum":["ABNeg","ABPos","ANeg","APos","BNeg","BPos","NS","ONeg","OPos"]},"donations":{"type":"array","items":{"$ref":"#/definitions/Donation"}}}},"Donation":{"type":"object","properties":{"time":{"type":"string","format":"date-time"}}},"ApiError":{"type":"object","properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}}},"CreateUserRequest":{"type":"object","properties":{"name":{"type":"string"},"lastname":{"type":"string"},"phoneNumber":{"type":"string"},"bloodType":{"type":"string","enum":["ABNeg","ABPos","ANeg","APos","BNeg","BPos","NS","ONeg","OPos"]}}}}};
        vi.json={"swagger":"2.0","info":{"version":"1.0.0","title":"Swagger Petstore","description":"A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification","termsOfService":"http://swagger.io/terms/","contact":{"name":"Swagger API Team","email":"foo@example.com","url":"http://madskristensen.net"},"license":{"name":"MIT","url":"http://github.com/gruntjs/grunt/blob/master/LICENSE-MIT"}},"host":"petstore.swagger.io","basePath":"/api","schemes":["http"],"consumes":["application/json"],"produces":["application/json"],"paths":{"/pets":{"get":{"description":"Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n","operationId":"findPets","parameters":[{"name":"tags","in":"query","description":"tags to filter by","required":false,"type":"array","collectionFormat":"csv","items":{"type":"string"}},{"name":"limit","in":"query","description":"maximum number of results to return","required":false,"type":"integer","format":"int32"}],"responses":{"200":{"description":"pet response","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/Error"}}}},"post":{"description":"Creates a new pet in the store.  Duplicates are allowed","operationId":"addPet","parameters":[{"name":"pet","in":"body","description":"Pet to add to the store","required":true,"schema":{"$ref":"#/definitions/NewPet"}}],"responses":{"200":{"description":"pet response","schema":{"$ref":"#/definitions/Pet"}},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/Error"}}}}},"/pets/{id}":{"get":{"description":"Returns a user based on a single ID, if the user does not have access to the pet","operationId":"find pet by id","parameters":[{"name":"id","in":"path","description":"ID of pet to fetch","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"pet response","schema":{"$ref":"#/definitions/Pet"}},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/Error"}}}},"delete":{"description":"deletes a single pet based on the ID supplied","operationId":"deletePet","parameters":[{"name":"id","in":"path","description":"ID of pet to delete","required":true,"type":"integer","format":"int64"}],"responses":{"204":{"description":"pet deleted"},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/Error"}}}}}},"definitions":{"Pet":{"type":"object","allOf":[{"$ref":"#/definitions/NewPet"},{"required":["id"],"properties":{"id":{"type":"integer","format":"int64"}}}]},"NewPet":{"type":"object","required":["name"],"properties":{"name":{"type":"string"},"tag":{"type":"string"}}},"Error":{"type":"object","required":["code","message"],"properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}}}}};
        console.log("json local");
        }

        //Acomodar
          limitGlobal = Object.keys(vi.json.paths).length;
          for (var i in vi.json.paths){
            (function (j) {
              var arr = [];
              arr = j.split("/");
              mkTree(tree, arr, 1,j);
                })(i)
            }

        vi.showVerbs = function(key,val){
            vi.verbs={};
            console.log(key);
            console.log(val);
            if(document.getElementById("vervsList")!=undefined&&document.getElementById("navDiv")){
            document.getElementById("vervsList").style.display = "block";
            document.getElementById("navDiv").style.display = "none";
            document.getElementById("listVerbs").style.display = "block";

            }

            for (var verbKey in val){
                vi.verbs[verbKey]=val[verbKey];
                vi.auxPath=key;    
            }
            console.log("verbs",vi.verbs);
        }

        vi.showFunction = function(key,val){
            document.getElementById("vervsList").style.display = "none";
            document.getElementById("navDiv").style.display = "block";
            document.getElementById("listVerbs").style.display = "none";
            vi.actualKey=key;
            vi.auxVal=val;
            vi.actualPath="Path: " + vi.auxPath;
            vi.con=key;
            vi.precon2="Descripción: ";
            vi.precon3="Produce: ";
            vi.con2=val.summary;
            vi.con3=val.produces;
             
            document.getElementById("paramsBox").style.display = "block";
            for(var i in val.parameters){
                if(val.parameters[i].schema!=undefined){
                    var myRef=val.parameters[i].schema.$ref.split("/");
                    var refLength = myRef.length;
                    for (var r in vi.json.definitions){
                        if(r == myRef[refLength - 1]){
                        vi.actualRef=vi.json.definitions[r];
                        vi.bodyName=r;
                        }
                    }
                }
            }
        }

        vi.showFunctionInfo = function(){
            //vi.con=vi.json.paths[key];
            if(vi.actualKey==null){
             vi.con="Select an Endpoint";
            }
            else{
            vi.cleanFunction();
            vi.con=vi.actualKey;
            vi.precon2="Descripción: ";
            vi.precon3="Produce: ";
            vi.con2=vi.auxVal.summary;
            vi.con3=vi.auxVal.produces;
            document.getElementById("responsesDiv").style.display = "none";
            document.getElementById("responseBox").style.display = "none";
            document.getElementById("requestDiv").style.display = "block";
            }
        }


        vi.showFunctionResponses = function(){
            if(vi.actualKey==null){
             vi.con="Select an Endpoint";
            }else{
            vi.cleanFunction();
            vi.myResponses=[];
            for (var r in vi.auxVal.responses){
              vi.myResponses.push(r + ': ' + vi.auxVal.responses[r].description);
            };
            vi.spanResponse = "Response Messages";
            document.getElementById("responseBox").style.display = "block";
            document.getElementById("responsesDiv").style.display = "block";
            document.getElementById("requestDiv").style.display = "none";
            }
        }

        vi.selectedResponse = function(res){
            var varSelectResponse=res.split(":");
            for(var i in vi.auxVal.responses){
                if(i==varSelectResponse[0]){
                    var auxResponse=vi.auxVal.responses[i];
                    if(auxResponse.schema!=undefined){
                        var auxsplit=auxResponse.schema.$ref.split("/");
                        var length=auxsplit.length;
                        for (var r in vi.json.definitions){
                            if(r == auxsplit[length-1]){
                                vi.actualErrorCode=vi.json.definitions[r];
                            }   
                        }
                    }else vi.actualErrorCode="No Object";
                }
            }


        }

        vi.showFunctionTry = function(){
            if(vi.actualKey==null){
               vi.con="Select an Endpoint";
               vi.cleanFunction();
            }
            document.getElementById("responseBox").style.display = "none";
            document.getElementById("responsesDiv").style.display = "none";
            document.getElementById("requestDiv").style.display = "block";
            vi.cleanFunction();

           var url='http://localhost:4567/swagger';

           visualFactory.getOrganizations(url).then(
            function (response) {
                console.log("RESPONSE", response.data);
                vi.json=response.data;
            },
            function(response){
                console.log("ERROR: ", response);
            }
            );
        }

        vi.searchRef = function(ref){
            var myRef=ref.split("/");
            var refLength = myRef.length;

        }

        vi.cleanFunction = function(){
            vi.actualPath="",vi.precon2="",vi.con="";vi.precon3="",vi.con2="",vi.con3="",vi.actualErrorCode={};

        }

        vi.capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        vi.getNewApi= function(val){
            visualFactory.getSwagger(val).then(
            function (response) {
                console.log("JSON", response);
                vi.json=response.data;
                console.log(response.data);
                tree=[];
                limitGlobal = Object.keys(vi.json.paths).length;
                  console.log("path", vi.json.paths);
                  for (var i in vi.json.paths){
                    (function (j) {
                      var arr = [];
                      arr = j.split("/");
                      mkTree(tree, arr, 1,j);
                        })(i)
                    }
            },
            function(response){
                console.log("ERROR: ", response);
            }
            );
        }

        function mkNode(name,j){
            var oj = {
                label:name,
                id:name,
                children:[],
                pathObj: j

            }
            return oj;
        }

        function mkTree(tree, arr, index,j){

            if(tree){
                var auxEl = null;
                        
                auxEl = findFirstOccurrence(tree, "label", arr[index]);
                if(auxEl === -1){
                    var el = mkNode(arr[index],j);
                    tree.push(el);
                    if(index < arr.length-1){
                        mkTree(el.children, arr, index+1,j);  
                    }
                    auxGlobal++;
                    if(auxGlobal===limitGlobal){
                        print();
                    }
                }
                else{
                    mkTree(auxEl.children, arr, index+1,j);
                }
            }
        }

        function print(){
            vi.printTree=tree;
        }

        $scope.$watch( 'abc.currentNode', function( newObj, oldObj ) {
            console.log('entro')
            if( $scope.abc && angular.isObject($scope.abc.currentNode) ) {
                console.log( 'Node Selected!!' );
                console.log( $scope.abc.currentNode );
                console.log($scope.abc);
                var myPath=$scope.abc.currentNode.pathObj;
                console.log(vi.json.paths[myPath]);
                vi.showVerbs(myPath,vi.json.paths[myPath]);
                console.log("showVerbs",myPath,vi.json.paths[myPath]);
            }
        }, false);

        function findFirstOccurrence(array, property, value){
            for(var i = 0 ; i < array.length; i++){
              if(array[i][property]==value){
                return array[i];
              }
            }
            return -1;
        }
    }
})();