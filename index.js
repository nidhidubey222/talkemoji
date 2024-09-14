'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

const emojis = {
  "👋": "Hello",
  "😀": "Grinning face",
  "😁": "Beaming face with smiling eyes",
  "😂": "Face with tears of joy",
  "🤣": "Rolling on floor laughing",
  "😃": "Grinning face with big eyes",
  "😄": "Grinning face with smiling eyes",
  "😅": "Grinning face with sweat",
  "😆": "Grinning squinting face",
  "😉": "Winking face",
  "😊": "Smiling face with smiling eyes",
  "😋": "Face savoring food",
  "😎": "Smiling face with sunglasses",
  "😍": "Smiling face with heart eyes",
  "😘": "Face blowing a kiss",
  "😗": "Kissing face",
  "😙": "Kissing face with smiling eyes",
  "😚": "Kissing face with closed eyes",
  "😜": "Winking face with tongue",
  "😝": "Squinting face with tongue",
  "🤤": "Drooling face",
  "😒": "Unamused face",
  "😓": "Downcast face with sweat",
  "😔": "Pensive face",
  "😕": "Confused face",
  "🙃": "Upside down face",
  "🤑": "Money mouth face",
  "😲": "Astonished face",
  "☹️": "Frowning face",
  "🙁": "Slightly frowning face",
  "😖": "Confounded face",
  "😞": "Disappointed face",
  "😟": "Worried face",
  "😤": "Face with steam from nose",
  "😢": "Crying face",
  "😭": "Loudly crying face",
  "😦": "Frowning face with open mouth",
  "😧": "Anguished face",
  "😨": "Fearful face",
  "😩": "Weary face",
  "🤯": "Exploding head",
  "😬": "Grimacing face",
  "😮‍💨": "Face exhaling",
  "😰": "Anxious face with sweat",
  "😱": "Face screaming in fear",
  "🥵": "Hot face",
  "🥶": "Cold face",
  "😳": "Flushed face",
  "🤪": "Zany face",
  "😵": "Knocked out face",
  "😵‍💫": "Dizzy face",
  "🥴": "Woozy face",
  "😠": "Angry face",
  "🥺": "Pleading face",
  "🤠": "Cowboy hat face",
  "🤥": "Lying face",
  "🤫": "Shushing face",
  "🤭": "Face with hand over mouth",
  "🧐": "Face with monocle",
  "🤓": "Nerd face",
  "👻": "Ghost",
  "🐷": "Pig",
  "🦓": "Zebra",
  "🦄": "Unicorn",
  "🐫": "Camel",
  "🐵": "Monkey",
  "🐶": "Dog",
  "🐱": "Cat face",
  "🐭": "Mouse face",
  "🐹": "Hamster face",
  "🐰": "Rabbit face",
  "🦊": "Fox face",
  "🐻": "Bear face",
  "🐼": "Panda face",
  "🐨": "Koala face",
  "🐯": "Tiger face",
  "🦁": "Lion face",
  "🐮": "Cow face",
  "🐷": "Pig face",
  "🐸": "Frog face",
  "🐵": "Monkey face",
  "🙈": "See-no-evil monkey",
  "🙉": "Hear-no-evil monkey",
  "🙊": "Speak-no-evil monkey",
  "💋": "Kiss mark",
  "💌": "Love letter",
  "❤": "Red heart",
  "🧡": "Orange heart",
  "💛": "Yellow heart",
  "💚": "Green heart",
  "💙": "Blue heart",
  "💜": "Purple heart",
  "🖤": "Black heart",
  "💔": "Broken heart",
  "💖": "Sparkling heart",
  "💗": "Growing heart",
  "💓": "Beating heart",
  "💞": "Revolving hearts",
  "💕": "Two hearts",
  "💟": "Heart decoration",
  "👌": "OK hand",
  "👍": "Thumbs up",
  "👎": "Thumbs down",
  "👊": "Oncoming fist",
  "✊": "Raised fist",
  "✌": "Victory hand",
  "🤞": "Crossed fingers",
  "🤟": "Love-you gesture",
  "🤘": "Sign of the horns",
  "👏": "Clapping hands",
  "🙏": "Folded hands"
};

function findEmoji(text) {
  const words = text.split(' ');
  for (let word of words) {
    for (let emoji in emojis) {
      if (emojis[emoji].toLowerCase().includes(word.toLowerCase())) {
        return emoji;
      }
    }
  }
  return null;
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (text) => {
    console.log('Message: ' + text);
    let emoji = findEmoji(text);
    let replyText = emoji ? emoji : 'No corresponding emoji found.';
    socket.emit('bot reply', replyText);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('Express server listening on port %d', port);
});
