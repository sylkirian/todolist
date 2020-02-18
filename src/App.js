import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const [editIndex, setEditIndex] = useState(null);
  const [isCatat, setIsCatat] = useState(false);
  const [items, setItems] = useState([]);
  const [todo, setTodo] = useState('');

  const textarea = useRef();

  useEffect(() => {
    if(isCatat && textarea.current) {
      textarea.current.focus();
    }
  }, [isCatat]);

  const saveItem = (index, value) => {
    let temp = items;

    temp[index] = value;

    setItems(temp);
    setEditIndex(null);
  }

  const deleteItem = (index) => {
    let temp = items;

    temp.splice(index, 1);

    setItems(temp);
    setEditIndex(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container visible={isCatat}>
          <textarea placeholder="Apa yang ingin anda kerjakan?" ref={textarea} value={todo} onChange={e => {setTodo(e.target.value)}} />
          <br />
          <Button onClick={() => {
            if(todo) {
              let temp = items;
  
              temp.push(todo);

              setItems(temp);
              setIsCatat(false);
              setTodo('');
            }
          }}>Catat!</Button>
          <Button secondary onClick={() => {setIsCatat(false)}}>Tidak Jadi</Button>
        </Container>
        <Container visible={!isCatat}>
          <Button onClick={() => {
            setEditIndex(null);
            setIsCatat(true);
          }}>Aku ingin mengerjakan sesuatu!</Button>
        </Container>
        {items.map((item,index) => (
          <ToDo key={index} index={index} value={item} isEdit={index === editIndex} setEditIndex={setEditIndex} setIsCatat={setIsCatat} saveItem={saveItem} deleteItem={deleteItem} />
        ))}
      </header>
    </div>
  );
}

function ToDo(props) {
  const [todo, setTodo] = useState(props.value);

  return (
    <div style={{marginTop:"10px"}}>
      <Container visible={props.isEdit}>
        <textarea placeholder={props.value} value={todo} onChange={e => {setTodo(e.target.value)}} />
        <br />
        <Button onClick={() => {
          if(todo)
            props.saveItem(props.index, todo);
        }}>Simpan!</Button>
        <Button secondary onClick={() => {props.setEditIndex(null)}}>Tidak Jadi</Button>
        <Button danger onClick={() => {props.deleteItem(props.index)}}>Hapus!</Button>
      </Container>
      <Container visible={!props.isEdit}>
        <div onClick={() => {
          setTodo(props.value);

          props.setIsCatat(false);
          props.setEditIndex(props.index);
        }}>
          {props.value}
        </div>
      </Container>
    </div>
  )
}

function Container(props) {
  let attribute = {};

  if(!props.visible)
    attribute.style = {display: 'none'};

  return (<div {...attribute}>{props.children}</div>);
}

function Button(props) {
  let attribute = {
    onClick: props.onClick,
    style: {}
  };

  if(props.secondary) {
    Object.assign(attribute.style, {
      backgroundColor: 'white',
      color: 'grey'
    });
  }
  else if(props.danger)
    attribute.style.backgroundColor = 'yellow';

  return (<button {...attribute}>{props.children}</button>);
}

export default App;