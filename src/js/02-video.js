import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

function handleTimeUpdate(event) {
  const currentTime = event.seconds;
  save('videoplayer-current-time', currentTime);
}

function save(key, value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
}

player.ready().then(() => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime));
  }

  player.on('timeupdate', throttle(handleTimeUpdate, 1000));
});
