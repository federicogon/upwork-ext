'use strict';
console.log('== INIT Upwork extension.');


function selectTime(modal, name, time) {
    let dropdowns = modal.querySelectorAll('div[name=' + name + '] ul.eo-dropdown-menu li a:not(.active)');
    if (dropdowns.length) {
        let item = Array.from(dropdowns).find(el => el.textContent === time);
        if (item) item.click();
    }
}

function loadDefaultValues(modal) {
    console.log('++ Setting default Values...');
    selectTime(modal, 'timeFrom', '09:00');
    selectTime(modal, 'timeTo', '17:00');
    modal.querySelectorAll('textarea[name=memo]').forEach(memo => {
        memo.value = 'REGULAR';
        memo.dispatchEvent(new Event('change'));
    });
}

function addDefaultValuesLink(modal) {
    let modalTitle = modal.querySelectorAll('div[slot="header-title"]');
    if (modalTitle.length) {
        modalTitle.forEach(el => {
            let a = document.createElement('a');
            a.innerText = 'Load Default Values';
            a.href = '#';
            a.onclick = (e) => {
                e.preventDefault();
                loadDefaultValues(modal);
            }
            el.appendChild(a);
        });
    } else {
        setTimeout(addDefaultValuesLink, 100);
    }
}

function waitForModal() {
    console.log('++ Waiting for MODAL...');
    let modals = document.querySelectorAll('up-c-modal');
    for (let i = 0; i < modals.length; i++) {
        const display = window.getComputedStyle(modals[i]).display;
        if (display === 'inline') {
            loadDefaultValues(modals[i]);
            addDefaultValuesLink(modals[i]);
            return;
        }
    }
    setTimeout(waitForModal, 100);
}

function isAddManualTimeButton(el) {
    return (el.target.tagName === 'SPAN' && el.target.classList.contains('air-icon-add')) || el.target.classList.contains('add-manual-time-button')
}

console.log('++ Listening...');
document.addEventListener('click', (e) => {
    if (isAddManualTimeButton(e)) waitForModal();
}, false);
