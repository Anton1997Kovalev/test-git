function viewLoadImg(_this){
    let _max_size = 4194304, // 4mb
        _max_img = 4, // сколько файлов можно загружать
        _files = _this.files,
        _lenght = _files.length;
    let valid_ext = ["jpg", "jpeg", "webp", "png"]; //файлы которые можно загружать
    let low_case;

    $(_this).closest('.js_line_form_img').find('.info_inp').remove();
    $(_this).closest('form').find('.view_load_img div').remove();

    for (const file of _this.files) {
        $(_this).closest('form').find('.view_load_img').append("<div>"+file.name+" размер файла "+file.size+" байт.</div>");
    }

    $(_this).closest('form').find('.view_load_img').append('<div>Выбранно '+_lenght+' файлов</div>');

    // Проверяем на количество картинок
    if(_lenght > _max_img){
        $(_this).closest('.js_line_form_img').addClass('error').removeClass('correct').append('<div class="info_inp">Не больше '+_max_img+' картинок</div>');
        return false;
    } else {
        $(_this).closest('.js_line_form_img').removeClass('error').addClass('correct');
    }

    // Проверяем размер каждого файла и его расширение
    for (const _file_item of _this.files) {
        low_case = ext(_file_item.name);
        if(_file_item.size > _max_size){
            $(_this).closest('.js_line_form_img').addClass('error').removeClass('correct').append('<div class="info_inp">Один из файлов превышает максимальный размер, '+_max_size+' байт</div>');
            return false;
        } else if(!valid_ext.includes(low_case.toLowerCase())){
            $(_this).closest('.js_line_form_img').addClass('error').removeClass('correct').append('<div class="info_inp">Не верный тип файла: '+_file_item.name+'</div>');
            return false;
        } else {
            $(_this).closest('.js_line_form_img').removeClass('error').addClass('correct');
        }
    }

    function ext(name) {
        let m = name.match(/\.([^.]+)$/)
        return m && m[1]
    }
}

//проверяем что бы обязательное поле не было пустым
function checkLength(_this){
    let _parent = _this.closest('.js_line_form');
    if(_this.val().length === 0) {
        _parent.find('.info_inp').remove();
        _parent.addClass('error').removeClass('correct').append('<div class="info_inp">Поле обязательно для заполнения</div>');
    } else {
        _parent.removeClass('error').addClass('correct').find('.info_inp').remove();
    }
}

// проверяем email
function checkEmail(_this){
    let reg = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    let address = _this.val();
    if(reg.test(address) == false) {
        _this.closest('.js_line_form').find('.info_inp').remove();
        _this.closest('.js_line_form').addClass('error').removeClass('correct').append('<div class="info_inp">Email введен некорректно</div>');
    } else {
        _this.closest('.js_line_form').removeClass('error').addClass('correct').find('.info_inp').remove();
    }
}

// проверяем телефон
function checkTel(_this){
    let reg = /^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
    let address = _this.val();
    if(reg.test(address) == false) {
        _this.closest('.js_line_form').find('.info_inp').remove();
        _this.closest('.js_line_form').addClass('error').removeClass('correct').append('<div class="info_inp">Номер телефона введен некорректно</div>');
    } else {
        _this.closest('.js_line_form').removeClass('error').addClass('correct').find('.info_inp').remove();
    }
}

// проверяем radio
function checkRadio(_this){
    _this.each(function(i, e){
        if(e.checked == true){
            _this.closest('.js_line_form').removeClass('error').addClass('correct').find('.info_inp').remove();
            return false;
        } else {
            _this.closest('.js_line_form').find('.info_inp').remove();
            _this.closest('.js_line_form').addClass('error').removeClass('correct').append('<div class="info_inp">Нужно что-то выбрать</div>');
        }
    });
}

// проверяем select
function checkSelect(_this){
    _this.each(function(i, e){
        if(e.selected == true){
            if(e.disabled == true){
                _this.closest('.js_line_form').find('.info_inp').remove();
                _this.closest('.js_line_form').addClass('error').removeClass('correct').append('<div class="info_inp">Нужно что-то выбрать</div>');
                return false;
            }
            _this.closest('.js_line_form').removeClass('error').addClass('correct').find('.info_inp').remove();
            return false;
        } else {
            _this.closest('.js_line_form').find('.info_inp').remove();
            _this.closest('.js_line_form').addClass('error').removeClass('correct').append('<div class="info_inp">Нужно что-то выбрать</div>');
        }
    });
}

// проверяем обязательные поля и ставим нужные классы
// в div с классом js_line_form, если надо input сделать обязательным, добавьте класс required
// добавить класс js_check_email для тега input, для проверки email
// добавить класс js_check_tel для тега input, для проверки маски телефона
// добавить класс js_check_textarea для тега textarea, для проверки на заполненность
// добавить класс js_check_checked для тега input, для проверки check или radiobox
// добавить класс js_check_select для тега select, для проверки выбора
function checkRequired(_form){
    $(_form).find('.js_line_form').each(function(i, e){
        if(i !== 0){
            if($(e).hasClass('required')){
                if($(e).find('input').hasClass('js_check_email')){
                    checkEmail($(e).find('input'));
                } else if($(e).find('input').hasClass('js_check_tel')) {
                    checkTel($(e).find('input'));
                } else if($(e).find('textarea').hasClass('js_check_textarea')){
                    checkLength($(e).find('textarea'));
                } else if($(e).find('input').hasClass('js_check_checked')){
                    checkRadio($(e).find('input'));
                } else if($(e).find('select').hasClass('js_check_select')){
                    checkSelect($(e).find('select option'));
                } else {
                    checkLength($(e).find('input'));
                }
            } else {
                $(e).addClass('correct');
            }
        }
    });
    return checkFormReady($(_form).find('.js_line_form'));
}

// можно ли сделать AJAX запрос
function checkFormReady(_form){
    let _return = true;
    if($('.js_line_form_img').hasClass('error')){
        _return = false;
    }
    $(_form).each(function(i, e){
        if(i !== 0){
            if($(e).hasClass('error')){
                _return = false;
            }
        }
    });
    return _return;
}

// маска телефона
let masks = {
    init: function () {
        this.phoneMask()
    },
    phoneMask: function (t) {
        let n = void 0 !== t ? t : $('input.maskphone'),
            i = !1,
            a = {};
        n.each(function () {
            let t = $(this);
            t.mask && (t.on("paste drop", function () {
                    let t = $(this),
                        n = !t.val(),
                        a = t.get(0),
                        e = a.selectionEnd - a.selectionStart;
                    (n || t.val().length === e) && (i = !0)
                }),
                    t.on("input", function (t) {
                        let n = $(this),
                            a = n.val();
                        if (a.startsWith("8")) {
                            if (i && 11 !== a.length)
                                return void (i = !1);
                            i = !1,
                                t.stopPropagation(),
                                a = a.replace("8", "+7"),
                                n.val(a)
                        }
                    }),
                    t.mask("+7 (000) 000-00-00", a)
            )
        })
    }
};

$(document).ready(function(){
    masks.init();

    $('.js_ajax_form').on('click', function(e){
        e.preventDefault();
        if(checkRequired($(this).closest('form'))){
            let _data_form = document.forms.form_full;
            let file_data = $('.js_form_files')[0].files;
            let formData = new FormData(_data_form);
            $.each(file_data, function (key, value) {
                formData.append('file-'+key, value);
            });
            formData.delete('files')
            $.ajax({
                type: 'post',
                url: '/inc/send.php',
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                dataType: 'json',
                success: function (result) {
                    if(result.result == 'success'){
                        document.forms.form_full.reset();
                        $('.view_load_img').find('div').remove();
                        $('.js_line_form, .js_line_form_img').removeClass('correct error');
                        alert('Письмо успешно отправлено');
                    }
                    console.log(result);
                },
                error: function (result) {
                    console.log(result);
                    alert('Ошибка загрузки');
                }
            });
        }
        return false;
    });

    $('.js_check_email').on('blur', function(){
        let _this = $(this);
        if(_this.closest('.js_line_form').hasClass('required') || _this.val().length){
            checkEmail(_this);
        }
    });

    $('.js_check_tel').on('blur', function(){
        let _this = $(this);
        if(_this.closest('.js_line_form').hasClass('required')) {
            checkTel(_this);
        }
    });

    $('.js_check_textarea').on('blur', function(){
        let _this = $(this);
        if(_this.closest('.js_line_form').hasClass('required')) {
            checkLength(_this);
        }
    });
});