export function toggleForm(selector) {
    const trigger = document.getElementById('isDifferent'),
        inputs = document.querySelectorAll('.checkout_form-fieldset--optional input'),
        submitBtn = document.querySelector('.btn-full-submit');

    if (selector) {
        submitBtn.setAttribute('disabled', 'disabled');
    
        inputs.forEach(input => {
            input.setAttribute('disabled', 'disabled');
        });
    
        trigger.addEventListener('change', () => {
            if (trigger.checked) {
                inputs.forEach(input => {
                    input.removeAttribute('disabled');
                });
                submitBtn.removeAttribute('disabled');
    
            } else {
                inputs.forEach(input => {
                    input.setAttribute('disabled', 'disabled');
                });
                submitBtn.setAttribute('disabled', 'disabled');
            }
        })
    }
}