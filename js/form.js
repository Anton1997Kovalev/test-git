export function validateForm() {
	const minLength = 3;
	const maxSizeFile = 5242880;
	const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
	const extension = new RegExp('[^.]+$'); //расшираниение файла
	const formatsFileImage = ['image/jpg', 'image/jpeg', 'image/png'];
	const formatsFilePdf = ['application/pdf'];
	const formatsFileWord = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
	const formatsFileExel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
	const formatsFileTxt = ['text/plain'];

	let masks = {
		init: function () {
			this.phoneMask()
		},
		phoneMask: function (t) {
			var n = void 0 !== t ? t : $('input.phone'),
				i = !1,
				a = {};
			n.each(function () {
				var t = $(this);
				t.mask && (t.on("paste drop", function () {
					var t = $(this),
						n = !t.val(),
						a = t.get(0),
						e = a.selectionEnd - a.selectionStart;
					(n || t.val().length === e) && (i = !0)
				}),
					t.on("input", function (t) {
						var n = $(this),
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
					t.mask("+7(000)000-00-00", a)
				)
			})
		}
	};
	masks.init();

	const $elements = document.querySelectorAll('.form-input, .form-radiobtn, .form-checkbox, .form-select, .form-textarea, .form-file');
	if ($elements.length) {
		$elements.forEach(($item, indx) => {
			let $form = $item.closest('form');
			let $btn = $form.querySelector('button');


			if ($item.classList.contains('form-input')) {
				$item.addEventListener('input', (e) => {
					if ($item.classList.contains('phone')) {
						if ($item.value.length >= $item.getAttribute('data-min') && $item.value.length <= $item.getAttribute('data-max')) {
							itemHasSuccess($item.closest('.form-item'));
						} else {
							itemHasError($item.closest('.form-item'));
						}
					} else if ($item.classList.contains('email')) {
						if (validate(emailPattern, $item.value)) {
							itemHasSuccess($item.closest('.form-item'));
						} else {
							itemHasError($item.closest('.form-item'));
						}
						$item.value = $item.value.replace(/[^\w@.-]/g, '');
					} else {
						if ($item.value.length >= $item.getAttribute('data-min') && $item.value.length <= $item.getAttribute('data-max')) {
							itemHasSuccess($item.closest('.form-item'));
						} else {
							itemHasError($item.closest('.form-item'));
						}
					}
					if ($item.classList.contains('without-number')) {
						$item.value = $item.value.replace(/\d/g, '');
					}
					if ($item.classList.contains('number')) {
						$item.value = $item.value.replace(/\D/g, '');
					}
					if ($item.closest('._required')) {
						activeFormBtn($item);
					}
				});
				if ($item.closest('.custom')) {
					$item.addEventListener('focus', (e) => {
						$item.closest('.form-item').classList.add('_active');
					});
					$item.addEventListener('blur', (e) => {
						if ($item.value.length === 0) {
							$item.closest('.form-item').classList.remove('_active');

						}
					});
				}
			}
			if ($item.type === 'radio') {
				$item.addEventListener('change', (e) => {
					if ($item.checked) {
						itemHasSuccess($item.closest('.form-radiobtns'));
						$item.parentElement.classList.add('_checked');
						siblingsClass($item.parentElement, { remove: '_checked' });
					} else {
						itemHasError($item.closest('.form-radiobtns'));
					}
					if ($item.closest('.form-radiobtns').classList.contains('_required')) {
						activeFormBtn($item);
					}

				});
			}
			if ($item.type === 'checkbox') {
				$item.addEventListener('change', (e) => {
					if ($item.checked) {
						itemHasSuccess($item.closest('.form-checkboxes'));
						$item.parentElement.classList.add('_checked');

					} else {
						$item.parentElement.classList.remove('_checked');
						if ($item.closest('.form-checkboxes').querySelectorAll('._checked').length === 0) {
							itemHasError($item.closest('.form-checkboxes'));
						}
					}
					if ($item.closest('.form-checkboxes').classList.contains('_required')) {
						activeFormBtn($item);
					}

				});
			}
			if ($item.tagName.toLowerCase() === 'textarea') {
				$item.addEventListener('input', (e) => {
					if ($item.value.length > 0) {
						itemHasSuccess($item.closest('.form-item'));
					} else {
						itemHasError($item.closest('.form-item'));
					}
					if ($item.closest('._required')) {
						activeFormBtn($item);
					}
				});
				if ($item.closest('.custom')) {
					$item.addEventListener('focus', (e) => {
						$item.closest('.form-item').classList.add('_active');
					});
					$item.addEventListener('blur', (e) => {
						if ($item.value.length === 0) {
							$item.closest('.form-item').classList.remove('_active');
						}
					});
				}
			}
			if ($item.tagName.toLowerCase() === 'select') {
				$item.addEventListener('change', (e) => {
					if ($item.value.length === 0) {
						itemHasError($item.closest('.form-item'));
					} else {
						itemHasSuccess($item.closest('.form-item'));
					}
					if ($item.closest('._required')) {
						activeFormBtn($item);
					}
				});
			}
			if ($item.type === 'file') {
				let fileList = [];
				let formatsFile = [];
				const maxSizeFile = $item.getAttribute('data-max-size') ? +$item.getAttribute('data-max-size') : 5242880;
				const maxCountFiles = $item.getAttribute('data-max-files') ? +$item.getAttribute('data-max-files') : 10;

				let dataTransfer = new DataTransfer(); // можно добавлять файлы в new DataTransfer() и потом $item.files = new DataTransfer().files
				let customLabel;
				if ($item.closest('.custom')) {
					customLabel = $item.parentElement.querySelector('.form-file__label');
					customLabel.addEventListener('click', () => {
						customLabel.parentElement.querySelector('input').click();
					});
					$item.parentElement.addEventListener('click', (e) => {
						if (e.target.closest('.form-file-item__remove')) {
							dataTransfer.clearData();
							let $this = e.target.closest('.form-file-item__remove');
							let fileIndx = Array.from($this.closest('.form-file__list').querySelectorAll('.form-file-item')).indexOf($this.parentElement);

							$item.value = '';

							if ($item.hasAttribute('multiple')) {
								fileList.splice(fileIndx, 1);

								if (fileList.length) {
									fileList.forEach(($file, i) => {
										dataTransfer.items.add($file);
									});
								}

								$item.files = dataTransfer.files;
							}

							if ($item.value.length === 0) {
								itemHasError($item.closest('.form-item'));
							} else {
								itemHasSuccess($item.closest('.form-item'));
							}
							if ($item.closest('._required')) {
								activeFormBtn($item);
							}
							$this.parentElement.remove();
						} else {
							return;
						}
					});
				}

				if ($item.getAttribute('data-formats')) {
					if ($item.getAttribute('data-formats').includes('image')) {
						formatsFile.push(...formatsFileImage);
					}
					if ($item.getAttribute('data-formats').includes('pdf')) {
						formatsFile.push(...formatsFilePdf);
					}
					if ($item.getAttribute('data-formats').includes('word')) {
						formatsFile.push(...formatsFileWord);
					}
					if ($item.getAttribute('data-formats').includes('excel')) {
						formatsFile.push(...formatsFileExel);

					}
					if ($item.getAttribute('data-formats').includes('txt')) {
						formatsFile.push(...formatsFileTxt);
					}
				} else {
					formatsFile.push(...formatsFileImage, ...formatsFilePdf, ...formatsFileWord, ...formatsFileExel, ...formatsFileTxt);
				}
				$item.addEventListener('change', (e) => {
					// let countFiles = $item.files.length > maxCountFiles ? $item.files.length  ;
					for (let i = 0; i < $item.files.length; i++) {
						if (formatsFile.includes($item.files[i].type)) {
							// if ($item.files[i].size <= maxSizeFile) {
							if ($item.hasAttribute('multiple')) {
								$item.closest('.form-item').querySelector('.help-block').classList.remove('show');

								if ($item.files[i].size <= maxSizeFile) {
									if (fileList.length + 1 <= maxCountFiles) {
										fileList.push($item.files[i]);
										dataTransfer.items.add(fileList[i]);
										if ($item.closest('.custom')) {
											let fileHtml = `
												<div class="form-file-item">
													<div class="form-file-item__name">${$item.files[i].name.length > 40 ? $item.files[i].name.substring(0, 40) + '...' + $item.files[i].name.match(extension)[0] : $item.files[i].name}</div>
													<div class="form-file-item__remove"></div>
												</div>
											`;
											$item.parentElement.querySelector('.form-file__list').insertAdjacentHTML('beforeEnd', fileHtml);
										}
										$item.closest('.form-item').querySelector('.help-block').classList.remove('show');
									} else {
										$item.closest('.form-item').querySelector('.help-block').textContent = `Максимальное количетсво файлов: ${maxCountFiles}`;
										$item.closest('.form-item').querySelector('.help-block').classList.add('show');
									}
								} else {
									$item.closest('.form-item').querySelector('.help-block').textContent = `Максимальный вес файла: ${maxSizeFile} байт`;
									$item.closest('.form-item').querySelector('.help-block').classList.add('show');
								}

							} else {
								if ($item.files[0].size <= maxSizeFile) {
									fileList.push($item.files[0]);
									if ($item.closest('.custom')) {
										let fileHtml = `
											<div class="form-file-item">
												<div class="form-file-item__name">${$item.files[0].name.length > 40 ? $item.files[0].name.substring(0, 40) + '...' + $item.files[0].name.match(extension)[0] : $item.files[0].name}</div>
												<div class="form-file-item__remove"></div>
											</div>
										`;
										$item.parentElement.querySelector('.form-file__list').innerHTML = fileHtml;
									}
									$item.closest('.form-item').querySelector('.help-block').classList.remove('show');

								} else {
									$item.value = '';
									$item.closest('.form-item').querySelector('.help-block').textContent = `Максимальный вес файла: ${maxSizeFile} байт`;
									$item.closest('.form-item').querySelector('.help-block').classList.add('show');

								}
							}
							// else {
							// $item.closest('.form-item').querySelector('.help-block').textContent = `Максимальный вес файла: ${maxSizeFile} байт`;
							// }

						} else {
						}

					}
					if ($item.hasAttribute('multiple')) {
						$item.files = dataTransfer.files;
					}
					if ($item.value.length === 0) {
						itemHasError($item.closest('.form-item'));
					} else {
						itemHasSuccess($item.closest('.form-item'));
					}
					if ($item.closest('._required')) {
						activeFormBtn($item);
					}

				});

			}
			if ($item.closest('.form-item.custom.select')) {
				$item.closest('.form-item').addEventListener('click', (e) => {
					// if (e.target.closest())
					if (e.target.closest('.select-box-item__js')) {
						let $this = e.target.closest('.select-box-item__js');
						$this.closest('.form-item').querySelector('input').value = $this.querySelector('span').textContent.trim();
						$this.closest('.form-item').classList.add('has-success');
						if ($this.closest('._required')) {
							activeFormBtn($item);
						}
					} else {
						return;
					}
				});
				// $item.closest('.form-item').querySelector('input').value = $this.querySelector('span').textContent.trim();
				// $item.closest('.form-item').classList.add('has-success');
			}
			if ($btn) {
				$btn.addEventListener('click', (e) => {
					if ($form.querySelectorAll('.has-success').length !== $form.querySelectorAll('._required').length) {
						if ($item.type === 'radio' || $item.type === 'checkbox') {
							if (!$item.closest('._required').classList.contains('has-success')) {
								$item.closest('._required').classList.add('has-error');
							}
						} else if ($item.classList.contains('_required') && !$item.closest('.form-item').classList.contains('has-success')) {
							$item.closest('.form-item').classList.add('has-error');
						}
						e.preventDefault();
					} else {
						$form.classList.add('_send');
					}
				});
			}
		});
	}

	function itemHasSuccess($item) {
		$item.classList.add('has-success');
		$item.classList.remove('has-error');
	}

	function itemHasError($item) {
		$item.classList.add('has-error');
		$item.classList.remove('has-success');
	}

	function activeFormBtn($item) {
		if ($item.closest('form').querySelectorAll('._required.has-success').length === $item.closest('form').querySelectorAll('._required').length) {
			$item.closest('form').querySelector('button').classList.add('_active');
		} else {
			$item.closest('form').querySelector('button').classList.remove('_active');
		}
	}
}
validateForm();