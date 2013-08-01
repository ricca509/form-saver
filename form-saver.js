var formSaver = function(selector) {
    var events = new PubSub(),
    name = "form_" + selector,
    $form = $(selector);

    var autoSave = function() {
        $form.on("keyup change", save);
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
            var $elem = $form.find("[name='" + formElem.name + "']");
            switch ($elem.prop('tagName').toLowerCase()) {
                case 'input':
                if ($elem.attr("type") === "checkbox") {
                    setChecked($elem);
                } else {
                    setValue($elem, formElem.value);
                }
                break;
                case 'textarea':
                setValue($elem, formElem.value);
                break;
                case 'select':
                setValue($elem, formElem.value);
                break;
            }
        });
    };

    var setValue = function($elem, value) {
        $elem.val(value);
    };

    var setChecked = function($elem) {
        $elem.attr("checked", true);
    };

    return {
        autoSave: autoSave,
        onSave: function(fn) {
            events.on("save", fn);
        },
        fill: fill
    };
};

