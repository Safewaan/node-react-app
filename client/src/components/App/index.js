import * as React from 'react';

const textbooks = [
  {
    title: 'The Road to React',
    url: 'https://www.roadtoreact.com/',
    author: 'Wieruch, R.',
    year: "2021",
  }, {
    title: 'Learning Node.js',
    url: 'https://github.com/marcwan/LearningNodeJS',
    author: 'Wandschneider, Marc',
    year: "2017",
  },
];

function getTitle(id) {
  return textbooks[id].title;
}

function App() {
  return (
    <div>
      <h1>
        Hello!
      </h1>
      <label htmlFor="saerch">Search: </label>
      <input id="search" type="text" />
      <hr />

      <Books />
      
    </div>
  )
}

function Books() {
  return (
    <ul>
      {textbooks.map(function (item) {
        return (
          <li>
            <span>
              <a href={item.url}>{item.url}</a>
            </span>
            <span> {item.title}</span>
            <span>{" by " + item.author}</span>
          </li>);
      })}
    </ul>

  )
}

export default App;