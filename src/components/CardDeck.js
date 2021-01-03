import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './CardDeck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class CardDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      drawn: []
    };

    this.getCard = this.getCard.bind(this);
  }

  componentDidMount() {
    console.log('CARD DECK COMPONENT MOUNTED!');
    fetch(`${API_BASE_URL}/new/shuffle/`)
    .then(res => res.json())
    .then(deck => this.setState({ deck }));
  }

  async getCard() {
    console.log('BUTTON CLICKED!')
    let id = this.state.deck.deck_id;
    try {
      let cardURL = `${API_BASE_URL}/${id}/draw/`
      let cardRes = await axios.get(cardURL);
      if(!cardRes.data.success) {
        throw new Error('No cards remaining!');
      } 
      let card = cardRes.data.cards[0];
      // Set state using new card info from API
      this.setState(curState => ({
        drawn: [
          ...curState.drawn, 
          { 
            id: card.code, 
            image: card.image, 
            name: `${card.value} of ${card.suit}` 
          }
        ]
      }));
    } catch(err) {
      alert(err);
    }
  }

  render() {
    return (
      <div className='CardDeck'>
        <h1 className='CardDeck-title'>♦ Card Dealer ♦</h1>
        <h2 className='CardDeck-title subtitle'>♦ A little demo made with React ♦</h2>
        <button className="CardDeck-btn" onClick={this.getCard}>GIMME A CARD!</button>
        <div className='CardDeck-cardarea'>
          {this.state.drawn.map(card => (
            <Card key={card.id} name={card.name} image={card.image} />
          ))}
        </div>
      </div>
    )
  }
}
export default CardDeck;
