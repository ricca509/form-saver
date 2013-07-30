var formSaver = function(selector) {
    var events = new PubSub();
    var name = "form_" + selector;

    var autoSave = function() {
        $(selector).on("keyup", save);
    };

    var save = function () {
        var form = JSON.stringify($(selector).serializeArray());

        if (!sessionStorage) {
            return;
        }
        if (sessionStorage[name] !== form) {
            sessionStorage[name] = form;
            events.trigger("save", form);
        }
    };

    var fill = function() {
        if (!sessionStorage) {
            return;
        }
        var $form = $(selector);
        var formData = sessionStorage[name] ? JSON.parse(sessionStorage[name]) : [];

        formData.forEach(function(formElem) {
            $form.find("input[name='" + formElem.name + "']").val(formElem.value);
        });
    };

    return {
        autoSave: autoSave,
        onSave: function(fn) {
            events.on("save", fn);
        },
        fill: fill
    };
};

