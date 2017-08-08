const React = require('react');
const css = require('./ImageList.css');

module.exports = function ImageList() {
  return (
    <div className='image-list'>
      <img src="/assets/bne-min.jpeg" alt="Bryce and Emmy"/>
      <img src="/assets/rne-min.jpeg" alt="Rachael and Emmy"/>
      <img src="/assets/hike-min.jpg" alt="Rachael, Bryce and Emmy on a hike"/>
    </div>
  );
}
