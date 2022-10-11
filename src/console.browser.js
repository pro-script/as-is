(function () {
    var timers = {};
    var logger = document.getElementById('log');
    console.info = (message)=> logger.innerHTML += `<h3 class="info">${message} </h3>`;
    console.time = (timerName)=> {
        if(typeof timerName !== 'string') throw new SyntaxError(`${timerName} must be a string`);
        timers[timerName] = Date.now();
    };
    console.timeEnd = (timerName)=> {
        if(typeof timerName !== 'string') throw new SyntaxError(`${timerName} must be a string`);
        if ( timers[ timerName ] ) {
            logger.innerHTML += `<p class="timeEnd">${timerName}: ${(Date.now() - timers[ timerName ])} ms </p>`;
            delete timers[ timerName ];
        }
    };
    console.log = (message)=> logger.innerHTML += `<div class="log"> &nbsp; ${message} </div>`;
    console.error = (message)=> logger.innerHTML += `<div class="error">${message} </div>`;

})();
