const openAttribute = 'data-open';
const closeSelector = '.close';
const ANIM_CLASS = 'animate';

document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((c, i) => {
        setTimeout(() => c.classList.add(ANIM_CLASS), i * 120);
    });

    const openLinks = Array.from(document.querySelectorAll('.card-link'));
    openLinks.forEach(link => {
        link.addEventListener('click', (evt) => {
            evt.preventDefault();
            const target = link.getAttribute(openAttribute);
            openModal(target, link);
        });
    });

    const cardWrappers = Array.from(document.querySelectorAll('.card'));
    cardWrappers.forEach(card => {
        card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = card.getAttribute('data-modal');
            if (target) openModal(target, card);
            e.preventDefault();
        }
        });
    });

    const modals = Array.from(document.querySelectorAll('.modal'));
    modals.forEach(modal => {
        const closeBtn = modal.querySelector(closeSelector);
        closeBtn.addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
        });
    });
})

function openModal(id, opener) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  const firstFocusable = modal.querySelector('.close') || modal.querySelector('a,button,input,textarea,select');
  (firstFocusable || modal).focus();
  // store opener for returning focus
  modal.dataset.openerId = opener ? (opener.id || '') : '';
  // keydown listener to close on Escape
  modal.addEventListener('keydown', modalKeyHandler);
}

function closeModal(modal) {
  modal.setAttribute('aria-hidden', 'true');
  // return focus to opener if present
  const openerId = modal.dataset.openerId;
  if (openerId) {
    const opener = document.getElementById(openerId);
    opener?.focus();
  } else {
    // otherwise focus body
    document.querySelector('main')?.focus();
  }
  modal.removeEventListener('keydown', modalKeyHandler);
}

function modalKeyHandler(e) {
  if (e.key === 'Escape') {
    let node = e.currentTarget;
    if (node && node.classList.contains('modal')) {
      closeModal(node);
    }
  }
}




