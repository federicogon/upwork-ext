'use strict';
console.log('== INIT Upwork extension.');

function loadDefaultValues() {
    Array.from(document.querySelectorAll('div[name=timeFrom] ul.eo-dropdown-menu li a:not(.active)')).find(el => el.textContent === '9:00am').click();
    Array.from(document.querySelectorAll('div[name=timeTo] ul.eo-dropdown-menu li a:not(.active)')).find(el => el.textContent === '5:00pm').click();
    let memo = document.getElementById('memo');
    memo.value = 'REGULAR';
    memo.dispatchEvent(new Event('change'));
}

document.addEventListener('click', function (e) {
    if ((e.target.tagName === 'SPAN' && e.target.classList.contains('air-icon-add'))) {
        console.log('++ Timeout for loadDefaultValues');
        setTimeout(loadDefaultValues, 3000);
    }
}, false);