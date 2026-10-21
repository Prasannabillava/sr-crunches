
/* =========================================
   1. ENABLE JAVASCRIPT STYLING
========================================= */

document.documentElement.classList.add('js');


/* =========================================
   2. SCROLL REVEAL ANIMATIONS
========================================= */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

// Observe all elements with the reveal class
document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
});


/* =========================================
   3. AUTOMATIC COPYRIGHT YEAR
========================================= */

document.getElementById('year').textContent =
    new Date().getFullYear();


/* =========================================
   4. SNACK MOMENT CONTENT
========================================= */

const moments = {
    tea: [
        '☕',
        'A warm cup. A golden crunch.',
        'Put the kettle on, bring out the Chakali, and give your afternoon a delicious little pause.',
        'Meet your chai companions'
    ],

    together: [
        '♡',
        'Good company. One more handful.',
        'Set out a bowl of Kodubale, gather your favourite people, and let the conversations go round.',
        'Discover something to share'
    ],

    me: [
        '✦',
        'Your break. Your favourite bite.',
        'A book, a playlist, or simply a quiet minute. Pick your favourite crunch and make a little time for yourself.',
        'Find your everyday favourite'
    ]
};


/* =========================================
   5. INTERACTIVE SNACK MOMENT TABS
========================================= */

// Get all moment selection buttons
const tabs = [
    ...document.querySelectorAll('[data-moment]')
];


/**
 * Updates the active snack moment.
 *
 * @param {HTMLButtonElement} button
 */
function selectMoment(button) {

    // Update active tab state
    tabs.forEach((tab) => {
        const isActive = tab === button;

        tab.setAttribute(
            'aria-selected',
            String(isActive)
        );

        tab.tabIndex = isActive ? 0 : -1;
    });

    // Get selected moment content
    const [icon, title, copy, link] =
        moments[button.dataset.moment];

    // Get the moment display panel
    const panel = document.getElementById('moment-panel');

    // Update accessibility label
    panel.setAttribute(
        'aria-labelledby',
        button.id
    );

    // Update moment content
    panel.querySelector('.moment-icon').textContent = icon;

    panel.querySelector('h3').textContent = title;

    panel.querySelector('p').textContent = copy;

    panel.querySelector('a').replaceChildren(
        document.createTextNode(link + ' ↗')
    );
}


// Add click and keyboard navigation
tabs.forEach((button, index) => {

    // Mouse click
    button.addEventListener('click', () => {
        selectMoment(button);
    });

    // Keyboard navigation
    button.addEventListener('keydown', (event) => {

        let next;

        if (event.key === 'ArrowRight') {
            next = (index + 1) % tabs.length;
        }

        if (event.key === 'ArrowLeft') {
            next = (index + tabs.length - 1) % tabs.length;
        }

        if (event.key === 'Home') {
            next = 0;
        }

        if (event.key === 'End') {
            next = tabs.length - 1;
        }

        if (next !== undefined) {
            event.preventDefault();

            tabs[next].focus();
            selectMoment(tabs[next]);
        }
    });
});


/* =========================================
   6. PRODUCT DETAILS DATA
========================================= */

const descriptions = {

    chakali: [
        'Chakali',
        'A spiral worth slowing down for. Discover SR Crunches Chakali — a golden, crunchy companion to chai, conversations and everyday breaks.'
    ],

    kodubale: [
        'Kodubale',
        'A little ring of happiness. Discover SR Crunches Kodubale — crunchy rings made for sharing around the table or enjoying a moment to yourself.'
    ]

};


/* =========================================
   7. PRODUCT DETAILS DIALOG
========================================= */

// Get product dialog
const dialog = document.getElementById('product-dialog');


// Open product details
document.querySelectorAll('[data-product]').forEach((button) => {

    button.addEventListener('click', () => {

        // Get selected product
        const [title, copy] =
            descriptions[button.dataset.product];

        // Update dialog title
        document.getElementById('dialog-title').textContent =
            title;

        // Update dialog description
        document.getElementById('dialog-copy').textContent =
            copy;

        // Set accessibility label
        dialog.setAttribute(
            'aria-labelledby',
            'dialog-title'
        );

        // Open dialog
        dialog.showModal();
    });
});


/* =========================================
   8. CLOSE PRODUCT DIALOG
========================================= */

// Close using buttons
document.querySelectorAll(
    '.close, .close-bottom'
).forEach((button) => {

    button.addEventListener('click', () => {
        dialog.close();
    });

});


// Close when clicking outside dialog content
dialog.addEventListener('click', (event) => {

    if (event.target === dialog) {

        const rect = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            dialog.close();
        }
    }
});
