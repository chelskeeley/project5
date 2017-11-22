import React from 'react';
import ReactDOM from 'react-dom';
import Donut from './donut';

const donuts = ['Sour Cream Glazed', 'Honey Dip', 'Boston Cream'];

class App extends React.Component {
    render() {
      return (
        <div>
          {donuts.map((donut)=>{
            return (
              <Donut donutName={donut}/>
            )
          })}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

//check the movieDB codealong in the react section to learn about routing,to have different views (pages) but just the one index.html