const $body = document.body;
let documentWidth = document.documentElement.clientWidth + (window.innerWidth - $body.offsetWidth);
let documentHeight = document.documentElement.clientHeight;
let isDesktop = documentWidth > documentHeight;

export const pxToPercent = (px, percent) => (px * percent / 100);
export const remToPixels = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export function selectElements(el) {
	return document.querySelectorAll(el);
}
export function selectElement(el) {
	return document.querySelector(el);
}
export function getSiblings(elem) {
	if (elem) {
		let all = [];
		let left = [];
		let right = [];
		let sibling = elem;
		while (sibling.previousSibling) {
			sibling = sibling.previousSibling;
			sibling.nodeType == 1 && all.push(sibling) && left.push(sibling);
		}
		sibling = elem;
		while (sibling.nextSibling) {
			sibling = sibling.nextSibling;
			sibling.nodeType == 1 && all.push(sibling) && right.push(sibling);
		}
		return { all, left, right };
	}
}
export function siblingsClassLeft(item, _action) {
	if (getSiblings(item).left) {
		getSiblings(item).left.forEach(function ($item, indx) {
			if (_action.add) {
				let classes = _action.add.replace(/ /g, '').split(',');
				$item.classList.add(...classes);
			}
			if (_action.remove) {
				let classes = _action.remove.replace(/ /g, '').split(',');
				$item.classList.remove(...classes);
			}
			if (_action.toggle) {
				let classes = _action.toggle.replace(/ /g, '').split(',');
				$item.classList.toggle(...classes);
			}
		});
	}

}
export function siblingsClassRight(item, _action) {
	if (getSiblings(item).right) {
		getSiblings(item).right.forEach(function ($item, indx) {
			if (_action.add) {
				let classes = _action.add.replace(/ /g, '').split(',');
				$item.classList.add(...classes);
			}
			if (_action.remove) {
				let classes = _action.remove.replace(/ /g, '').split(',');
				$item.classList.remove(...classes);
			}
			if (_action.toggle) {
				let classes = _action.toggle.replace(/ /g, '').split(',');
				$item.classList.toggle(...classes);
			}
		});
	}

}
export function siblingsClass(item, _action) {
	if (getSiblings(item).all) {
		getSiblings(item).all.forEach(function ($item, indx) {
			if (_action.add) {
				let classes = _action.add.replace(/ /g, '').split(',');
				$item.classList.add(...classes);
			}
			if (_action.remove) {
				let classes = _action.remove.replace(/ /g, '').split(',');
				$item.classList.remove(...classes);
			}
			if (_action.toggle) {
				let classes = _action.toggle.replace(/ /g, '').split(',');
				$item.classList.toggle(...classes);
			}
		});
	}

}
export function setClass($items, _action) {
	if ($items.length) {
		$items.forEach(function ($item, indx) {
			if (_action.add) {
				let classes = _action.add.replace(/ /g, '').split(',');
				$item.classList.add(...classes);
			}
			if (_action.remove) {
				let classes = _action.remove.replace(/ /g, '').split(',');
				$item.classList.remove(...classes);
			}
			if (_action.toggle) {
				let classes = _action.toggle.replace(/ /g, '').split(',');
				$item.classList.toggle(...classes);
			}
		});
	}
}
export function siblingsAction($item, action) {
	if (getSiblings($item).all) {
		getSiblings($item).all.forEach(($el, indx) => {
			action($el, indx);
		});
	}
}
export function eventsItems($items, _nameEvent) {
	if ($items.length) {
		$items.forEach(function ($item, indx) {
			let ev = Object.keys(_nameEvent).map(function (key) {
				return $item.addEventListener(key, _nameEvent[key]);
			});
		});
	}
}
export function strToHtml(str) {
	return new DOMParser().parseFromString(str, 'text/html').body;
}
export function dynamicAdaptive(size) {
	// ex: data-da="where, size, position"
	let $items = document.querySelectorAll('[data-da]');
	if ($items.length) {
		$items.forEach(function ($item, indx) {
			let _data = $item.getAttribute('data-da').split(',');
			let _where = _data[0].trim();
			let _sizeScreen = _data[1].trim();
			let _pos = _data[2].trim();

			if (size === 'max' && documentWidth <= _sizeScreen) {
				moveItem();
			}
			if (size === 'min' && documentWidth >= _sizeScreen) {
				moveItem();
			}

			function moveItem() {
				if (_pos === 'first') {
					document.querySelectorAll(_where)[indx].insertAdjacentElement('afterbegin', $item);
				}
				if (_pos === 'last') {
					document.querySelectorAll(_where)[indx].insertAdjacentElement('beforeEnd', $item);
					console.log(true);
				}
			}
		});
	}
}
export function diffElements($items, i, _parent) {
	if ($items.length) {
		$items.forEach((item, indx) => {
			if (i !== indx) {
				if (_parent) {
					item.parentElement.classList.remove('_active');
				} else {
					item.classList.remove('_active');
				}
			}
		});
	}
}
export function reverseArr(input) {
	let ret = new Array();
	for (let i = input.length - 1; i >= 0; i--) {
		ret.push(input[i]);
	}
	return ret;
}
export function heightNull($items) {
	if ($items.length) {
		$items.forEach(function ($item, indx) {
			$item.style.height = 0;
		});
	}
}
export function maxHeightBlock($items) {
	if ($items.length) {
		let maxHeight = 0;
		$items.forEach(function ($item, indx) {
			let _height = $item.offsetHeight;
			if (maxHeight < _height) {
				maxHeight = _height;
			}
		});
		setTimeout(() => {
			$items.forEach(function ($item, indx) {
				$item.style.height = maxHeight + 'px';
			});
		}, 50);
	}
}
export function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export function getIndex(_this, items) {
	return Array.from(items).indexOf(_this);
}
export function getCoords(elem) {
	if (elem) {
		let box = elem.getBoundingClientRect();

		let body = document.body;
		let docEl = document.documentElement;

		let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		let clientTop = docEl.clientTop || body.clientTop || 0;
		let clientLeft = docEl.clientLeft || body.clientLeft || 0;

		let top = box.top + scrollTop - clientTop;
		let left = box.left + scrollLeft - clientLeft;

		return {
			top: top,
			left: left,
		};
	}
}
/* 
let telPattern = /^\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
ex: 
email.addEventListener('input', function(){
	if (validate(emailPattern, item.value)){
		console.log(true)
	} else{
		console.log(false)
	}
})
*/
export function validate(regex, inp) {
	return regex.test(inp);
}

export class Submenu {
	constructor($items) {
		this.items = $items;
		if (this.items.length) {
			this.items.forEach((item, indx) => {
				this.click(item, indx);
			});
		}
	}
	click(item, indx) {
		item.addEventListener('click', (e) => {
			diffElements(this.items, indx, true);
			item.parentElement.classList.toggle('_active');
			e.preventDefault();
		});
	}
	close() {
		if (this.items.length) {
			this.items.forEach((item, indx) => {
				item.parentElement.classList.remove('_active');
				console.log('asg')
			});
		}
	}
}
export class Tooltip {
	constructor($items) {
		this.items = $items;
		this.items.forEach(($item, indx) => {
			this.click($item, indx)
		});
	}
	click($item, indx) {
		$item.querySelector('.toggle-tooltip__js').addEventListener('click', () => {
			diffElements(this.items, indx, false);
			$item.classList.toggle('_active');
		});
		$item.querySelector('.close-tooltip__js').addEventListener('click', () => {
			$item.classList.remove('_active');
		});
	}
	close() {
		this.items.forEach(($item, indx) => {
			$item.classList.remove('_active');
		});
	}
}
export const _slideUp = (target, duration = 300) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
export const _slideDown = (target, duration = 300) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
export const _slideToggle = (target, duration = 300) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
export function ftransitionDelay($items, _start, _step, _delay, _col) {
	let i = 0;
	if (_delay === undefined || _delay === false) {
		$items.forEach(function ($item, indx) {
			$item.style.transitionDelay = _start + (i * _step) + 'ms';
			if ((i + 1) % _col === 0) {
				i = -1;
			}
			i++;
		});
	} else {
		$items.forEach(function ($item, indx) {
			$item.style.transitionDelay = _delay + 'ms';
		});
	}
}
export class Accordions {
	constructor($items) {
		this.items = $items;
		if (this.items.length) {
			this.items.forEach(($item, indx) => {
				this.click($item, indx);
			});
		}
	}
	click($item, indx) {
		$item.querySelector('.toggle-accordion-item__js').addEventListener('click', () => {
			$item.classList.toggle('_active');
			if ($item.classList.contains('_active')) {
				_slideDown($item.querySelector('.accordion-item__body'))
				// $item.querySelector('.accordion-item__body').style.height = $item.querySelector('.accordion-item__content').offsetHeight + 'px';
			} else {
				_slideUp($item.querySelector('.accordion-item__body'))
				// $item.querySelector('.accordion-item__body').style.height = 0;
			}
		});
	}

	close() {
		if (this.items.length) {
			this.items.forEach(($item, indx) => {
				$item.classList.remove('_active');
				$item.querySelector('.accordion-item__body').style.height = 0;
			});
		}
	}
}
export class Tabs {
	constructor($items) {
		this.tabs = $items;
		if (this.tabs.length) {
			this.tabs.forEach(($tab, indx) => {
				this.click($tab, indx);
			});
		}
	}

	click($tab, indx) {
		let i = 0;
		$tab.addEventListener('click', (e) => {
			let _this = e.target;

			if (_this.closest('.click-tab-item__js')) {
				let $item = _this.closest('.click-tab-item__js');
				let indx = getIndex($item, selectElements('.click-tab-item__js').all);

				$item.classList.add('_active');
				$tab.querySelectorAll('.tab-item-block')[indx].classList.add('_active');

				siblingsClass($item, { remove: '_active' });
				siblingsClass($tab.querySelectorAll('.tab-item-block')[indx], { remove: '_active' });
			}
		});
	}

}
export class SelectBox {
	constructor($items) {
		this.items = document.querySelectorAll($items);
		if (this.items.length) {
			this.items.forEach(($item, indx) => {
				this.click($item, indx);
			});
		}
	}
	click($item, indx) {
		$item.querySelector('.select-box__head').addEventListener('click', () => {
			diffElements(this.items, indx, false);
			$item.classList.toggle('_active');
			if ($item.classList.contains('sb-anim-height')) {
				if ($item.classList.contains('_active')) {
					_slideDown($item.querySelector('.select-box__body'));
				} else {
					_slideUp($item.querySelector('.select-box__body'));
				}
			}

		});
		$item.addEventListener('click', (e) => {
			if (e.target.closest('.select-box-item__js')) {
				let $this = e.target.closest('.select-box-item__js');

				$item.querySelector('.select-box__label').textContent = $this.querySelector('span').textContent.trim();

				if (!$item.classList.contains('no-hidden-li')) {
					siblingsClass($this, { remove: 'hidden' });
					$this.classList.add('hidden');
				}


				$item.classList.add('_selected');
				$item.classList.remove('_active');
				if ($item.classList.contains('sb-anim-height')) {
					_slideUp($item.querySelector('.select-box__body'));
				}
			}
		});
	}
	close() {
		if (this.items.length) {
			this.items.forEach(($item, indx) => {
				$item.classList.remove('_active');
				if ($item.classList.contains('sb-anim-height')) {
					_slideUp($item.querySelector('.select-box__body'));
				}
			});
		}
	}
}

export function sliderSlideOpacity(slider, _count) {
	// console.log(slider.querySelectorAll('.swiper-slide').length)
	if (slider.$el && slider.$el.length) {
		let $slides = slider.$el[0].querySelectorAll('.swiper-slide');
		if ($slides.length) {
			$slides.forEach(($item, indx) => {
				if (indx > (_count - 1)) {
					$item.classList.add('_opacity');
				}
			});
		}

		slider.on('realIndexChange', function (e) {
			slider.$el[0].querySelectorAll('.swiper-slide').forEach(($item, indx) => {
				if (indx === e.realIndex) {
					$item.classList.remove('_opacity');
				}
				if (indx < e.realIndex) {
					$item.classList.add('_opacity');
				} else if (indx >= (e.realIndex + (_count))) {
					$item.classList.add('_opacity');
				} else if (indx <= (e.realIndex + (_count - 1))) {
					$item.classList.remove('_opacity');
				}
			})
		});
	}


}

export function totalLength(path) {
	let len = Math.round(path.getTotalLength());
}