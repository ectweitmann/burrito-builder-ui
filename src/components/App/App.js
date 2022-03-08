import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import topBurrito from '../../top_burrito.png'
import bottomBurrito from '../../bottom_burrito.png';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import 'animate.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  addOrder = (newOrder) => {
    postOrder(newOrder)
      .then(order => this.setState({ orders: [...this.state.orders, order] }))
      .catch(err => console.error('Error fetching:', err));
  }

  componentDidMount() {
    getOrders()
      .then(orders => this.setState({ orders: orders.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <div className="header-stying">
            <h1 className="animate__animated animate__zoomIn animate_slower">Burrito Builder</h1>
            <img className="top-burrito animate__animated animate__rotateInDownLeft top-burrito" src={topBurrito} />
            <img className="bottom-burrito animate__animated animate__rotateInUpRight" src={bottomBurrito} />
          </div>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
