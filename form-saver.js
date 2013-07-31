var formSaver = function(selector) {
    var events = new PubSub(),
    name = "form_" + selector,
    $form = $(selector);

    var autoSave = function() {
        $form.on("keyup", save);
    };

    var save = function () {
        var formData = JSON.stringify($form.serializeArray());

        if (!sessionStorage) {
            return;
        }
        if (sessionStorage[name] !== formData) {
            sessionStorage[name] = formData;
            events.trigger("save", formData);
        }
    };

    var fill = function() {
        if (!sessionStorage) {
            return;
        }
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

