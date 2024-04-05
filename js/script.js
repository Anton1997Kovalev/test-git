import {
	selectElements,
	selectElement,
	getSiblings,
	setClass,
	siblingsClass,
	siblingsClassLeft,
	siblingsClassRight,
	eventsItems,
	siblingsAction,
	getIndex,
	diffElements,
	getCoords,
	strToHtml,
	reverseArr,
	heightNull,
	maxHeightBlock,
	dynamicAdaptive,
	numberWithSpaces,
	validate,
	Submenu,
	Tooltip,
	Accordions,
	Tabs,
	SelectBox,
	_slideToggle,
	_slideUp,
	_slideDown,
	ftransitionDelay,
	pxToPercent,
	remToPixels,
	sliderSlideOpacity,
	totalLength
} from '/js/function.js';
import { validateForm } from '/js/form.js';

document.addEventListener('DOMContentLoaded', function () {
	gsap.registerPlugin(ScrollTrigger);
	const $body = document.body;
	const $main = document.querySelector('main');
	let documentWidth = document.documentElement.clientWidth + (window.innerWidth - $body.offsetWidth);
	let documentHeight = document.documentElement.clientHeight;
	let isDesktop = documentWidth > documentHeight;
	// let isMobile = documentWidth < documentHeight;

	let submenu = new Submenu(document.querySelectorAll('.submenu__js>a'));
	let tooltip = new Tooltip(document.querySelectorAll('.tooltip'));
	let accordion = new Accordions(document.querySelectorAll('.accordions .accordion-item'));
	let tabs = new Tabs(document.querySelectorAll('.tabs'));
	let selectbox = new SelectBox('.select-box__js');

	validateForm();

	document.addEventListener('mouseup', function (e) {
		function closePopupsOrTooltips($items, _parentEl, _child) {
			if ($items.length) {
				$items.forEach(function ($item, indx) {
					if (_child === undefined && $item.contains(e.target) === false) {
						$item.closest(_parentEl).classList.remove('_active');
					} else if ($item.contains(e.target) === false && $item.closest(_parentEl).querySelector(_child) && $item.closest(_parentEl).querySelector(_child).contains(e.target) === false) {
						$item.closest(_parentEl).classList.remove('_active');
					}
				})
			}

		}

		// closePopupsOrTooltips(document.querySelectorAll('.tooltip__body'), '.tooltip', '.tooltip__head');
	});


	let ESC = 27;
	document.addEventListener('keydown', function (e) {
		if (e.keyCode === ESC) {

		}
	});

	// dynamicAdaptive('max');

	// SmoothScroll({
	// 	// Время скролла 400 = 0.4 секунды
	// 	animationTime: 1500,
	// 	// Размер шага в пикселях
	// 	stepSize: 50,
	// 	// Дополнительные настройки:
	// 	// Ускорение
	// 	accelerationDelta: 130,
	// 	// Максимальное ускорение
	// 	accelerationMax: 1,
	// 	// Поддержка клавиатуры
	// 	keyboardSupport: true,
	// 	// Шаг скролла стрелками на клавиатуре в пикселях
	// 	arrowScroll: 50,
	// 	// Pulse (less tweakable)
	// 	// ratio of "tail" to "acceleration"
	// 	pulseAlgorithm: false,
	// 	pulseScale: 4,
	// 	pulseNormalize: 1,
	// 	// Поддержка тачпада
	// 	touchpadSupport: false,
	// })

	async function oAjax(url, type) {
		let response = await fetch(url, {
			method: 'POST',
		});

		if (response.ok) {
			try {
				if (type === 'json') {
					return await response.json();
				} else if (type === 'text') {
					return await response.text();
				} else if (type === 'formData') {
					return await response.formData();
				} else if (type === 'blob') {
					return await response.blob();
				} else if (type === 'arrayBuffer') {
					return await response.arrayBuffer();
				} else if (type === 'body') {
					return await response.body;
				}
			}
			catch (err) {
				console.log(err)
			}
		} else {
			return false;
		}
	}

	async function sendDataAjax(url, data, sendType, getType, _method = 'POST', optionsResponse = {}) {
		let sData = (sendType === 'formData') ? new FormData() : data;
		if (sendType === 'formData') {
			for (let key in data) {
				if (data.hasOwnProperty(key)) { //* если свойство содержится внутри объекта, а не в прототипе
					sData.append(key, data[key]);
				}
			}
		}

		let response = await fetch(url, {
			method: _method,
			body: sData,
			...optionsResponse
		});
		if (response.ok) {
			try {
				if (getType === 'json') {
					return await response.json();
				} else if (getType === 'text') {
					return await response.text();
				} else if (getType === 'formData') {
					return await response.formData();
				} else if (getType === 'blob') {
					return await response.blob();
				} else if (getType === 'arrayBuffer') {
					return await response.arrayBuffer();
				} else if (getType === 'body') {
					return await response.body;
				}
			}
			catch (err) {
				console.log(err)
			}
		} else {
			return false;
		}
	}

});
