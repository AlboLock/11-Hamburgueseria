function toggleExtras(idExpandable, header) {
    let expandable = document.getElementById(idExpandable);
    header.classList.toggle('extended');
    if (expandable.style.height == 0)
        expandable.style.height = expandable.scrollHeight + 'px';
    else
        expandable.style.height = null;
}