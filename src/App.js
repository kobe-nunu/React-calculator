import { Parser } from 'expr-eval';
import React, {Component} from 'react';
import Button from './components/Button';
import './css/styles.css'

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      current: '0',
      previous: '',
      hasPrev: false,
      display: false,
    }
 
  }

  calculate = (symbol) => {
    if(!this.state.hasPrev){return}
    let output = Parser.evaluate(this.state.previous + this.state.current);
    this.setState({previous: this.state.previous + this.state.current + ' =', current: String(output), hasPrev: false});
  }

  reset = () => {
    this.setState({current: '0', previous: '', hasPrev: false, display: false});
  }

  
  addToCurrent = (symbol, ty) =>{
    if(ty == 'digit'){
      if(this.state.current.charAt(this.state.current.length-1) == '.' && symbol == '.'){
        return
      }
      if(this.state.previous.charAt(this.state.previous.length-1) == '='){
        this.setState({current: symbol, previous: '', hasPrev: false, display: false});
        return
      }
      if((this.state.current=='0' && symbol != ".")){
        this.setState({current: symbol});
      }
      else{
      this.setState({current: this.state.current + symbol});
      }
    }
    else if (ty == 'operator') {
      if(this.state.hasPrev){
        let len = this.state.previous.length;
        this.setState({previous:this.state.previous.substring(0,len - 2) + symbol});
        return
      }
      this.setState({previous: this.state.current + symbol, hasPrev: true, display:true, current: '0'});
    }
  }
  
  

  render() {
    const buttons = [{symbol: 'c', cols: 2, action: this.reset, ty: 'operator'},
    {symbol: ' ^ ', cols: 1, action: this.addToCurrent, ty: 'operator'},
    {symbol: ' / ', cols: 1, action: this.addToCurrent, ty: 'operator'},
    {symbol: '7', cols: 1, action: this.addToCurrent, ty: 'digit'}, 
    {symbol: '8', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: '9', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: ' * ', cols: 1, action: this.addToCurrent, ty: 'operator'},
    {symbol: '4', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: '5', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: '6', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: ' - ', cols: 1, action: this.addToCurrent, ty: 'operator'},
    {symbol: '1', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: '2', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: '3', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: ' + ', cols: 1, action: this.addToCurrent, ty: 'operator'},
    {symbol: '0', cols: 2, action: this.addToCurrent, ty: 'digit'},
    {symbol: '.', cols: 1, action: this.addToCurrent, ty: 'digit'},
    {symbol: ' = ', cols: 1, action: this.calculate, ty: 'operator'},
    ];

    return (
      <div className="App">
          {this.state.display ?
            <div className="prev">{this.state.previous}</div>
          : null}
          <input className="result" type="text" value = {this.state.current} />
          {buttons.map((btn, i) => {
            return <Button  key={i} ty={btn.ty} symbol ={btn.symbol} cols ={btn.cols} action = {(symbol, ty)=> btn.action(symbol, ty)}/>
          })} 
      </div>
    );
  }
}

export default App;
