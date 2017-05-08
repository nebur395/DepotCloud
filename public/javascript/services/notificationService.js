angular.module('depotCloudApp')

    // 'notification' service manage the ui-notifications of the client side
    .factory('notificationService', function (Notification) {

        return {
            // show the error message
            showError: function (title, message, delay) {
                if (!title && (typeof delay === 'undefined' && delay !== null)) {
                    Notification.error(message);
                } else if (!title) {
                    Notification.error({message: message, delay: delay});
                } else if (typeof delay === 'undefined' && delay !== null) {
                    Notification.error({title: title, message: message});
                } else {
                    Notification.error({title: title, message: message, delay: delay});
                }
            },

            // show the success message
            showSuccess: function (title, message, delay) {
                if (!title && (typeof delay === 'undefined' && delay !== null)) {
                    Notification.success(message);
                } else if (!title) {
                    Notification.success({message: message, delay: delay});
                } else if (typeof delay === 'undefined' && delay !== null) {
                    Notification.success({title: title, message: message});
                } else {
                    Notification.success({title: title, message: message, delay: delay});
                }
            },

            // show the warning message
            showWarning: function (title, message, delay) {
                if (!title && (typeof delay === 'undefined' && delay !== null)) {
                    Notification.warning(message);
                } else if (!title) {
                    Notification.warning({message: message, delay: delay});
                } else if (typeof delay === 'undefined' && delay !== null) {
                    Notification.warning({title: title, message: message});
                } else {
                    Notification.warning({title: title, message: message, delay: delay});
                }
            }
        };
    });


