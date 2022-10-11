let seconds = 5;
window.document.querySelector('#close').innerHTML = `The browser window will be closed in <sec id="sec">${seconds}</sec> sec`;
const inter = setInterval(()=> {
    window.document.querySelector('#sec').innerHTML = seconds--;
    if(seconds <=0){
        (confirm('Do you want to close th window') == true)
            ? window.close()
            : window.document.querySelector('#close').innerHTML = '' && clearInterval(inter);
    }
}, 1000)
