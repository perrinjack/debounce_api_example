import React from 'react';
import './App.css';
import _ from 'lodash';

const App = () => {
  const [name, setName] = React.useState(null);

  const [delay, setDelay] = React.useState(1000);

  const onChange = (value) => {
    fetch(`https://api.mocki.io/v1/b043df5a`) ///generic api response.
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setName(res);
      });
  };

  const debounceOnChange = React.useCallback(_.debounce(onChange, delay), [
    delay,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <h2>Debounce Api Example</h2>

      <input
        placeholder="Input field of your choice"
        onChange={(e) => debounceOnChange(e.target.value)}
      />

      <select onChange={(e) => setDelay(e.target.value)}>
        <option value="1000">1s</option>
        <option value="2000">2s</option>
        <option value="5000">5s</option>
      </select>

      <p>Debounce time: {delay}ms</p>

      <button onClick={(e) => setName(null)}>Clear Response</button>

      {name && name.map((item, index) => <li key={index}>{item.city}</li>)}
    </div>
  );
};

export default App;
