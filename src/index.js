import './css/timer.css';

const refs = {
    timer: document.querySelector('#timer-1'),
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.selector = selector;
      this.targetDate = targetDate;
    }
    intervalId = null;

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = this.targetDate - currentTime;
        let time = this.getTimeComponents(deltaTime);

        if(deltaTime <= 0) {
          this.finishTime();
          time = { days: '00', hours: '00', mins: '00', secs: '00' }
          refs.timer.textContent = 'sale time expired';
        }

        this.updateClockface(time);

        const { days, hours, mins, secs } = time;
    }, 1000)

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        return { days, hours, mins, secs };
    }

    finishTime() {
      clearInterval(this.intervalId);
      }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    updateClockface({ days, hours, mins, secs }) {
        refs.days.innerHTML = days;
        refs.hours.innerHTML = hours;
        refs.mins.innerHTML = mins;
        refs.secs.innerHTML = secs;
      }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 6, 2020, 23:07:00'),
});