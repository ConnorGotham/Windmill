/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Will Geller
 */

define(['angular', 'require'], function (angular, require) {
    'use strict';

    dataFileDataSourceImportController.$inject = ['dataFileDataSourceService', '$timeout'];

    function dataFileDataSourceImportController(dataFileDataSourceService, $timeout) {
        var $ctrl = this;

        $ctrl.uploadStatus = '';

        $ctrl.$onInit = function() {
            if($ctrl.dropDownMode && $ctrl.xid) {
                 $ctrl.selectedXid = $ctrl.xid[0];
            }
        };

        $ctrl.fileDropped = function (data) {
            var types = data.getDataTransferTypes();
            if (types.length && types[0] === 'Files') {
                var transfer = data.getDataTransfer();
                if (transfer.length) {
                    var file = transfer[0];
                    if (file.name.substr(-4) === '.csv' || file.name.substr(-4) === '.xml' || file.name.substr(-4) === '.xls' || file.name.substr(-4) === '.xlsx') {
                        this.uploadFile(file);
                    }
                }
            }
        };

        $ctrl.fileSelected = function ($event) {
            var fileInput = $event.target;
            if (fileInput.files && fileInput.files.length) {
                this.uploadFile(fileInput.files[0]);
                fileInput.value = '';
            }
        };

        $ctrl.uploadFile = function (file) {
            // console.log(file);

            if($ctrl.dropDownMode) {
                if(!$ctrl.xid) {
                    $ctrl.uploadXid = $ctrl.selectedDataSource.xid;
                }
                else {
                    $ctrl.uploadXid = $ctrl.selectedXid;
                }
            }
            else {
                $ctrl.uploadXid = $ctrl.xid;
            }

            var formData = new FormData();
            formData.append('file', file);

            $ctrl.uploadStatus += 'Upload Started on ' + file.name + ' into Data Source (xid: ' + $ctrl.uploadXid + ')\n';
            $ctrl.uploadProgress = 0;
            dataFileDataSourceService.upload(formData, $ctrl.uploadXid, useStatusLocation);
        };

        function useStatusLocation(url) {
            dataFileDataSourceService.getStatus(url, statusCallback);
        }

        function statusCallback(status) {
            // console.log(status.data);

            $ctrl.uploadProgress = status.data.progress;

            if (!status.data.finished) {
                $timeout(useStatusLocation('/rest/v2/data-file/import/' + status.data.resourceId), 500);
            }
            else {
                if (status.data.errors.length) {
                    status.data.errors.forEach(function(error){
                        $ctrl.uploadStatus += 'Error: ' + error + '\n';
                    });
                }

                if (status.data.createdPoints.length) {
                    status.data.createdPoints.forEach(function(point){
                        $ctrl.uploadStatus += 'Data Point ' + point + ' Created \n';
                    });
                }
                $ctrl.uploadStatus += 'Upload Completed: ';
                $ctrl.uploadStatus += status.data.totalImported + ' Values imported, ' +  status.data.createdPoints.length + ' Data Points Created!' +
                    '\n';
            }
        }
    }

    return {
        bindings: {
            xid: '<?',
            dropDownMode: '<?'
        },
        controller: dataFileDataSourceImportController,
        templateUrl: require.toUrl('./dataFileDataSourceImport.html'),
    	designerInfo: {}
    };
}); // define