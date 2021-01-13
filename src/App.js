import React, { Component } from 'react';

import Input from './components/input/Input';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      userInput: '',
    };
  }

  handleChangeInput = (inputText) => {
    this.setState({
      userInput: inputText,
    });
  };

  getTransformations = () => {
    const { userInput } = this.state;

    const inputTransformations = [];

    // reverse conversion
    let transformedInput = userInput.split('').reverse()
      .toString().replace(/[,]/g, '');
    
    inputTransformations.push({
      id: 0,
      description: 'Texto Invertido:',
      text: transformedInput,
    });

    // numeric conversion
    transformedInput = userInput.toUpperCase()
      .replace(/[O]/g, '0')
      .replace(/[L]/g, '1')
      .replace(/[E]/g, '3')
      .replace(/[A]/g, '4')
      .replace(/[S]/g, '5')
      .replace(/[T]/g, '7');
    
    inputTransformations.push({
      id: 1,
      description: 'Texto Numérico:',
      text: transformedInput,
    });

    // csv conversion
    if (userInput !== '') {
      transformedInput = userInput.split(' ')
      .map((word) => `"${word}"`)
      .toString()
      .replace(/[,]/g, ';');
    } else {
      transformedInput = '';
    }
    
    inputTransformations.push({
      id: 2,
      description: 'CSV:',
      text: transformedInput,
    });

    // slug conversion
    transformedInput = userInput.toLowerCase()
      .split(' ')
      .toString()
      .replace(/[,]/g, '-');
    
    inputTransformations.push({
      id: 3,
      description: 'Slug:',
      text: transformedInput,
    });

    // vowels only with blank space
    transformedInput = userInput.replace(/[^aeiouà-ú ]/gi, '');

    inputTransformations.push({
      id: 4,
      description: 'Somente Vogais:',
      text: transformedInput,
    });

    // consonants only with blank space
    transformedInput = userInput.replace(/[aeiouà-ú]/gi, '');

    inputTransformations.push({
      id: 5,
      description: 'Somente Consoantes:',
      text: transformedInput,
    });

    // camelCase format
    const words = userInput.split(' ');
    transformedInput = words[0].toLowerCase();

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const firstLetter = word[0];

      if (firstLetter) {
        transformedInput += word.replace(firstLetter, firstLetter.toUpperCase());
      }
    }

    inputTransformations.push({
      id: 6,
      description: 'Camel Case:',
      text: transformedInput,
    });

    return inputTransformations;
  };

  render() {
    const { userInput } = this.state;

    const inputTransformations = this.getTransformations();

    return (
      <div className="container">
        <h1 className="center-align">react-text-transformer</h1>
        <Input label="Digite um texto qualquer:" readOnly={false} value={userInput}
          onChange={this.handleChangeInput} />
        
        <h2>Transformações</h2>
        {
          inputTransformations.map((inputTransformation) => {
            const { id, description, text } = inputTransformation;
            return (
              <div className="section">
                <Input key={id} label={description} readOnly={true} value={text} />
              </div>
            );
          })
        }
      </div>
    );
  }
}
