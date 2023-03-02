const rect = document.querySelector('#rect');
const donutOuter = document.querySelector('#donut-outer');

rect.addEventListener('click', function() {
    rect.classList.toggle('active');
});

donutOuter.addEventListener('mouseover', function() {
    donutOuter.classList.add('hover');
});

donutOuter.addEventListener('mouseleave', function() {
    donutOuter.classList.remove('hover');
});