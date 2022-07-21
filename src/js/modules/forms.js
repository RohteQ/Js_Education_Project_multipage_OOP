export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо!Скоро свяжемся',
            failure: 'Что-то пошло не так',
        };
    
       this.path ='assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs(){
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(event) {
                if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    event.preventDefault();
                }
            });
            input.addEventListener('input', () => {
                if (input.value.match(/[а-яё]/ig)) {
                    input.value = '';
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        
        };
    
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                //matrix based
                def = matrix.replace(/\D/g, ''),
                //dynamic based
                val = this.value.replace(/\D/g, '');
            //when user put smth in matrix if he remove 7 and +,we don't allow it
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (this.value.charAt(1) != '1') {
                this.value = '';
                this.blur();
            }
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
            
        }
      
    
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
            
        });
    }

   async postData (url, data) {

        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    init(){
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(form => {
            this.inputs = document.querySelectorAll('input');
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;


                let formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                 });
            });
        });
    }
}