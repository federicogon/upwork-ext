'use strict';
console.log('== INIT Upwork extension.');

function loadDefaultValues() {
    console.log('++ Setting default Values...');
    Array.from(document.querySelectorAll('div[name=timeFrom] ul.eo-dropdown-menu li a:not(.active)')).find(el => el.textContent === '09:00').click();
    Array.from(document.querySelectorAll('div[name=timeTo] ul.eo-dropdown-menu li a:not(.active)')).find(el => el.textContent === '17:00').click();
    let memo = document.querySelector('textarea[name=memo].ng-pristine');
    memo.value = 'REGULAR';
    memo.dispatchEvent(new Event('change'));
}

setTimeout(() => {
    console.log('++ Listening...');
    document.addEventListener('click', function (e) {
        if ((e.target.tagName === 'SPAN' && e.target.classList.contains('air-icon-add'))) {
            console.log('++ Timeout for loadDefaultValues');
            setTimeout(loadDefaultValues, 5000);
        }
    }, false);
}, 3000);
