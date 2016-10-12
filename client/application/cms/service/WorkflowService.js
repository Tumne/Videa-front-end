var WorkflowService = function workflowService(httpService) {
    this._url = '/api/v1/workflow/states/';
    this._httpService = httpService;
    
};

_.extend(WorkflowService.prototype, {
    getAllowedTriggers: function (state) {
        return this._httpService.doGet(this._url + state + '/triggers');
    },
    getAllWorkflowStates: function() {
        return this._httpService.doGet(this._url );
    }
});

module.exports = WorkflowService;
	
