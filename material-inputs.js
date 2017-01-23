(function() {
    'use strict';

    function setUpMaterialInputs() {
        var materialInputs = document.querySelectorAll('.material-input input');

        materialInputs.forEach(function(el) {

            handleMaterialInputs(el);

            el.addEventListener('keyup', function(event) {
                if (!event.keyCode === 8) {
                    handleMaterialInputs(this);
                }
            });

            el.addEventListener('focus', function(event) {
                this.classList.remove('clean');
            });

            el.addEventListener('blur', function(event) {
                handleMaterialInputs(this);
            });
        });

        function handleMaterialInputs(element) {
            if (!element.value.length) {
                element.classList.add('clean');
            } else {
                element.classList.remove('clean');
            }
        }
    }

    function setUpMaterialSelects() {
        var materialSelects = document.querySelectorAll('.material-select');

        window.addEventListener('click', function(e) {
            if (
                e.target &&
                e.target.classList &&
                !e.target.classList.contains('material-select__options-drop-down-item') &&
                !e.target.classList.contains('material-select__container')
            ) {
                document.querySelectorAll('.material-select__options-drop-down').forEach(function(el) {
                    el.classList.remove('active');
                });
            }
        })

        materialSelects.forEach(function(el) {
            var materialSelect = el.querySelector('select');
            var currentOptions = el.querySelector('.material-select__options-drop-down');

            handleMaterialSelects(materialSelect);

            el.querySelector('.material-select__container').addEventListener('click', function(event) {
                if (window.innerWidth > 768) {
                    document.querySelectorAll('.material-select__options-drop-down').forEach(function(el) {
                        el.classList.remove('active');
                    });
                    currentOptions.classList.add('active');
                }
            });

            materialSelect.addEventListener('change', function(event) {
                handleMaterialSelects(this);
            });

            materialSelect.addEventListener('focus', function(event) {
                this.classList.remove('clean');
            });

            materialSelect.addEventListener('blur', function(event) {
                handleMaterialSelects(this);
            });

            currentOptions.addEventListener('click', function(event) {
                if (event.target != this) {
                    this.classList.remove('active');
                    materialSelect.value = event.target.innerHTML;
                }
                handleMaterialSelects(materialSelect);
            });
        });

        function handleMaterialSelects(element) {
            if (!element.value.length || element.value.length === 0) {
                element.classList.add('clean');
            } else {
                element.classList.remove('clean');
            }
        }
    }

    function setUpFormValidation() {
        [].forEach.call(document.forms, function(form) {
            form.addEventListener('change', function() {
               validateForm(form); 
            });

            validateForm(form);

            function validateForm(formToValidate) {
                var invalidInputs = [],
                    inputsToTest = formToValidate.querySelectorAll('[required]');

                if (!inputsToTest) {
                    return;
                }

                invalidInputs = [].filter.call(inputsToTest, function(requiredField) {
                    return (requiredField.value && requiredField.value.length);
                });
                
                if (invalidInputs.length > 0) {
                    formToValidate.classList.remove('invalid');
                } else {
                    formToValidate.classList.add('invalid');
                }
            }
        });
    }

    function setUpMaterialInputsNextOnEnter() {
        [].forEach.call(document.forms, function(form) {
            var inputList = form.querySelectorAll('.material-input input, .material-select select'),
                submitBtn = form.querySelector('.button');

            [].forEach.call(inputList, function(input, index) {
                input.addEventListener('keyup', function(event) {
                    if (event.keyCode === 13) {
                        focusNextInput(this, inputList[index + 1], submitBtn);
                    }
                });

                if (input.classList.contains('material-select__input')) {
                    input.addEventListener('change', function(event) {
                        focusNextInput(this, inputList[index + 1], submitBtn);
                    });

                    input.parentElement.nextElementSibling.addEventListener('click', function(event) {
                        focusNextInput(input, inputList[index + 1], submitBtn);
                    });
                }
                
            });
        });

        function focusNextInput(currentInput, nextInput, submitBtn) {
            currentInput.blur();

            document.querySelectorAll('.material-select__options-drop-down').forEach(function(el) {
                el.classList.remove('active');
            });

            if (nextInput) {
                nextInput.focus();

                if (nextInput.classList.contains('material-select__input')) {
                    var currentOptions;

                    if (window.innerWidth > 768) {
                        currentOptions = nextInput.parentElement.nextElementSibling;
                        currentOptions.classList.add('active');
                    } else {
                        openSelect(nextInput);
                    }
                }

            }
        }

        function openSelect(el){
            if (window.document.createEvent) {
                var evt = window.document.createEvent("MouseEvents");
                evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                
                el.dispatchEvent(evt);
            } else if (el.fireEvent) {
                el.fireEvent("onmousedown");

            }
        }
    }

    setUpMaterialInputsNextOnEnter();
    setUpMaterialInputs();
    setUpMaterialSelects();
})();