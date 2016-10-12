var AssetService = function($q, httpService, $upload, AssetModel) {
    this._httpService = httpService;
    this._q = $q;
    this._upload = $upload;
    this._assetModel = AssetModel;
    this._url = '/api';
    this._resource = '/asset';
};

_.extend(AssetService.prototype, {
    listDirectory: function (dirName, container, offset, setSize) {
        var params = {
            dirName: dirName ? dirName : '',
            container: container,
            offset: offset,
            setSize: setSize
        };

        var deferred = this._q.defer();
        this._httpService.doGet(this._url + this._resource + 
                                '/listDirectory' + '?' + this._httpService.buildQuery(params)).then(
            function(data){
                var models = [];
                var AssetModel = this._assetModel;
                angular.forEach(data.Data, function (value, key) {
                    this.push(new AssetModel({ asset: value, container: container }));
                }, models);

                deferred.resolve({ Data: models, NextOffset: data.NextOffset });                
            }, function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    },  
    createDirectory: function (parentName, dirName, container) {
        var params = {
            parentName: parentName ? parentName : '',
            dirName: dirName ? dirName : '',
            container: container
        },
        AssetModel = this._assetModel,
        deferred = this._q.defer();
        
        this._httpService.doGet(this._url + this._resource + 
                                        '/createDirectory' + '?' + 
                                        this._httpService.buildQuery(params)).then(
                function(data){
                    console.log("list dir", data);
                    var model = new AssetModel({ asset: data, container: container });
                    deferred.resolve(model);                                            
                }, function(err){
                    deferred.reject(err);
                });
                
        return deferred.promise;      
    },   
    uploadFile: function (dirName, file, container) {
        var params = {
            dirName: dirName ? dirName : '',
            container: container
        };

        var deferred = this._q.defer();
        this._upload.upload({
            url: this._url + this._resource + '/uploadFile',
            method: 'PUT',
            //headers: {'header-key': 'header-value'},
            //withCredentials: true,
            data: {replace:true},
            params: params,
            file: file, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name. 
            fileFormDataName: "myFile", //or a list of names for multiple files (html5). Default is 'file' 
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
        }).progress(function (evt) {
            deferred.notify(parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            // file is uploaded successfully
            deferred.resolve(data);
        })
        .error(function (data) {
            deferred.reject(data);
        });

        return deferred.promise;
    },       
    updateAsset: function (fullName, asset, container) {
        var params = {
            fullName: fullName ? fullName : '',
            container: container
        },
            deferred = this._q.defer(),
            AssetModel = this._assetModel;
            
        this._httpService.doPost(this._url +  this._resource + 
                                '/updateAsset' + '?' + this._httpService.buildQuery(params), asset).then(
          function(data) {
            var model = new AssetModel({ asset: data, container: container });
            deferred.resolve(model);
          }, function(err) {
              deferred.reject(err);
          }                          
        );
        return deferred.promise;
    },
    getAsset: function (fullName, loadContent, container) {
        var params = {
            fullName: fullName ? fullName : '',
            loadContent: loadContent ? loadContent : false,
            container: container
        },
            deferred = this._q.defer(),
            AssetModel = this._assetModel;
            
        this._httpService.doGet(this._url +  this._resource + 
                                '/getAsset' + '?' + this._httpService.buildQuery(params)).then(
          function(data) {
            var model = new AssetModel({ asset: data, container: container });
            deferred.resolve(model);
          }, function(err) {
              deferred.reject(err);
          }                          
        );
        return deferred.promise;            
    },
    deleteAsset: function (fullName, container) {
        var params = {
            fullName: fullName ? fullName : '',
            container: container
        };

        var deferred = this._q.defer();
        this._httpService.doDelete(this._url + 
                                   this._resource + '/deleteAsset?' + 
                                   this._httpService.buildQuery(params)).then(
                            function(){
                                deferred.resolve("deleted");
                            },
                            function(err) {
                                deferred.reject(err);
                            });
        return deferred.promise;
    },
    deleteDirectory: function (fullName, container) {
        var params = {
            fullName: fullName ? fullName : '',
            container: container
        };

        var deferred = this._q.defer();
        this._httpService.doDelete(this._url + 
                                   this._resource + '/deleteDirectory?' + 
                                   this._httpService.buildQuery(params)).then(
                            function(){
                                deferred.resolve("deleted");
                            },
                            function(err) {
                                deferred.reject(err);
                            });
        return deferred.promise;        
    }                             
});

module.exports = AssetService;