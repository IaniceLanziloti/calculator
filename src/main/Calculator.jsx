import React, { useState, useEffect } from 'react';

import './Calculator.css';

import Button from '../Components/Button/Button';
import Display from '../Components/Display/Display';

export default (props) => {
  const [value, setValue] = useState('0');
  const [memory, setMemory] = useState(null);
  const [history, setHistory] = useState('');
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [clear, setClear] = useState(false);

  const clearMemory = () => {
    setMemory(null);
    setOperation('');
    setValue('0');
    setHistory('');
  };

  const calc = (op) => {
    switch (op) {
      case '+':
        setMemory(memory + parseFloat(value));
        break;
      case '-':
        setMemory(memory - parseFloat(value));
        break;
      case '/':
        if (value !== '0') setMemory(memory / parseFloat(value));
        break;
      case '*':
        setMemory(memory * parseFloat(value));
        break;
      default:
        break;
    }

    setHistory(`${history ? history : memory} ${operation} ${value}`);
  };

  const addOperation = (newOp) => {
    const execOperation = memory !== null && operation && (newOp === '=' || !clear);
    const saveMemory = memory === null && value;
    const clearValue = operation && newOp !== '=' && operation !== newOp;

    if (!value) return;

    if (execOperation) calc(operation);
    if (saveMemory) setMemory(parseFloat(value));
    if (clearValue) setValue('0');
    if (newOp !== '=' && operation !== newOp) setOperation(newOp);
    setClear(true);
  };

  const addDigit = (dig) => {
    if (dig === '.' && value.includes('.')) return;
    if (value === '0' || clear) {
      setValue(dig);
      setClear(false);
    } else setValue(value + dig);
  };

  useEffect(() => {
    setDisplay(clear ? memory : value || '0');
  }, [memory, clear, value]);

  return (
    <div className='calculator'>
      <Display history={history} value={display} />
      <Button label='AC' click={() => clearMemory()} triple />
      <Button label='/' click={addOperation} operation />
      <Button label='7' click={addDigit} />
      <Button label='8' click={addDigit} />
      <Button label='9' click={addDigit} />
      <Button label='*' click={addOperation} operation />
      <Button label='4' click={addDigit} />
      <Button label='5' click={addDigit} />
      <Button label='6' click={addDigit} />
      <Button label='-' click={addOperation} operation />
      <Button label='1' click={addDigit} />
      <Button label='2' click={addDigit} />
      <Button label='3' click={addDigit} />
      <Button label='+' click={addOperation} operation />
      <Button label='0' click={addDigit} double />
      <Button label='.' click={addDigit} />
      <Button label='=' click={addOperation} operation />
    </div>
  );
};
