const readstatus = document.querySelector('.readstatus');
const checkbox = document.querySelector('.readstatustoggle');
checkbox.addEventListener('change', function (e){
    e.target.checked ? readstatus.innerHTML = "Read" : readstatus.innerHTML = "Unread";
});
