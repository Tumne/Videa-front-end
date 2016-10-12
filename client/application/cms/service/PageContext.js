module.exports = function pageContext($timeout) {
    var title = "Videa";
    var ALERT_DELAY = 10000;

    var service = {

        setTitle: function (title) {
            this.title = title;
        },

        getTitle: function () {
            return this.title;
        },

        showAlertSuccess: function (msg, title) {
            //this.alert = { message: msg, title: title, type: "success" };
            this.pushAlert(msg, title, "success");
        },

        showAlertDanger: function (msg, title) {
            //this.alert = { message: msg, title: title, type: "danger" };
            this.pushAlert(msg, title, "danger");
        },

        pushAlert: function (msg, title, type) {
            var _this = this;
            var alert = {
                message: msg, title: title, type: type, dismissAlert: function () {
                    var index = _this.alerts.indexOf(alert);
                    if (index > -1) {
                        _this.alerts.splice(index, 1);
                    }
                }
            };
            if (!this.alerts) {
                this.alerts = [];
            }
            this.alerts.push(alert);
            $timeout(function () {
                alert.dismissAlert();
            }, ALERT_DELAY);
        },

        getAlerts: function () {
            return this.alerts;
        },

        dismissAlert: function () {
            this.alert = {}
        },

        hasAlert: function () {
            return this.alerts && this.alerts.lenght > 0;
        }
    }

    return service;
};
