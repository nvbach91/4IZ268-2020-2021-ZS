'use strict';

const e = React.createElement;

class KanyeQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: ''};
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    axios.get('https://api.kanye.rest')
      .then(response => response.data)
      .then(
        (data) => this.setState({quote: data.quote})
      );
  }

  componentDidMount() {
    axios.get('https://api.kanye.rest')
    .then(response => response.data)
    .then(
      (data) => this.setState({quote: data.quote})
    );
  };

  render() {
    const { quote } = this.state;

    const kanyeQuote = e(
      'p',
      { class: 'kanye_quote' },
      quote ? quote : 'Kanye is thinking...',
    );

    const kanyeFace = e(
      'img',
      { src: 'https://news.artnet.com/app/news-upload/2016/03/kanye-west-crop-e1458141735868.jpg',
        onClick: this.handleClick,
        class: 'kanyeFace'
      },
    );
    return e(
      'div',
      {},
      kanyeFace, kanyeQuote
    );
  }
}

document.querySelectorAll('#kayne-quote')
  .forEach(domContainer => {
    ReactDOM.render(
      e(KanyeQuote),
      domContainer
    );
  });