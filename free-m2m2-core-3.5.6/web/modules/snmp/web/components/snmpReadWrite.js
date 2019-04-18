/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require', 'ipaddr'], function(angular, require, ipaddr) {
'use strict';

const $inject = Object.freeze(['maSNMP', '$timeout']);
class SNMPReadWriteController {
    static get $inject() { return $inject; }
    
    constructor(maSNMP, $timeout) {
        this.maSNMP = maSNMP;
        this.$timeout = $timeout;
        
        this.writable = true;
    }
    
    $onInit() {
    }
    
    $onChanges(changes) {
        if (changes.oidInput && this.oidInput) {
            this.oid = this.oidInput;
        }
        
        if (changes.oidInput || changes.dataSourceXid) {
            if (this.oidInput && this.dataSourceXid) {
                this.read();
            }
        }
    }
    
    read() {
        this.clearError();
        this.readPromise = this.maSNMP.dataSourceReadOid(this.dataSourceXid, this.oid)
            .then(value => this.value = value, (error) => this.errorHandler(error))
            .finally(() => delete this.writePromise);
    }
    
    write() {
        this.clearError();
        this.writePromise = this.maSNMP.dataSourceWriteOid(this.dataSourceXid, this.oid, this.value)
            .then(null, (error) => this.errorHandler(error))
            .finally(() => delete this.writePromise);
    }
    
    clearError() {
        if (this.timeoutPromise) {
            this.$timeout.cancel(this.timeoutPromise);
            delete this.timeoutPromise;
        }
        delete this.error;
    }
    
    errorHandler(error) {
        this.clearError();
        
        if (error.data && error.data.localizedMessage) {
            this.error = error.data.localizedMessage;
        } else if (error.statusText) {
            this.error = error.statusText;
        }
        
        this.timeoutPromise = this.$timeout(() => {
            this.clearError();
        }, 30000);
    }
}

return {
	templateUrl: require.toUrl('./snmpReadWrite.html'),
	controller: SNMPReadWriteController,
	bindings: {
        dataSourceXid: '@sourceXid',
        oidInput: '@?oid',
        showOidInput: '<?',
        writable: '<?',
        label: '@?'
	},
	designerInfo: {}
};

}); // require
