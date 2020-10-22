'use strict';
console.log('== INIT Upwork extension.');


function selectTime(name, time) {
    let dropdowns = document.querySelectorAll('div[name=' + name + '] ul.eo-dropdown-menu li a:not(.active)');
    if (dropdowns.length) {
        let item = Array.from(dropdowns).find(el => el.textContent === time);
        if (item) item.click();
    }
}

function loadDefaultValues() {
    console.log('++ Setting default Values...');
    selectTime('timeFrom', '09:00');
    selectTime('timeTo', '17:00');
    document.querySelectorAll('textarea[name=memo]').forEach(memo => {
        memo.value = 'REGULAR';
        memo.dispatchEvent(new Event('change'));
    });
}

function addDefaultValuesLink() {
    let modalTitle = document.querySelectorAll('div[slot="header-title"]');
    if (modalTitle.length) {
        modalTitle.forEach(el => {
            let a = document.createElement('a');
            a.innerText = 'Load Default Values';
            a.href = '#';
            a.onclick = (e) => {
                e.preventDefault();
                loadDefaultValues();
            }
            el.appendChild(a);
        });
    } else {
        setTimeout(addDefaultValuesLink, 100);
    }
}

function watchModal() {
    console.log('++ Waiting for MODAL...');
    if (document.querySelectorAll('div[slot="header-title"]').length) {
        loadDefaultValues();
        addDefaultValuesLink();
        return;
    }
    setTimeout(watchModal, 100);
}

function isAddManualTimeButton(el) {
    return (el.target.tagName === 'SPAN' && el.target.classList.contains('air-icon-add')) || el.target.classList.contains('add-manual-time-button')
}

console.log('++ Listening...');
document.addEventListener('click', (e) => {
    if (isAddManualTimeButton(e)) watchModal();
}, false);
