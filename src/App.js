import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import './App.css';

const Button = styled.button`
  ${props => props.secondary && css`
    background-color: white;
    color: grey;
  `}
  ${props => props.danger && css`
    background-color: yellow;
  `}
`

function App() {
  const [editIndex, setEditIndex] = useState(null);
  const [isNote, setIsNote] = useState(false);
  const [items, setItems] = useState([]);
  const [todo, setTodo] = useState('');

  // bisa menggunakan autofocus
  /* const textarea = useRef();

  useEffect(() => {
    if(isNote && textarea.current) {
      textarea.current.focus();
    }
  }, [isNote]); */

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

  const handleInsert = () => {
    if(todo) {
      let temp = items;

      temp.push(todo);

      setItems(temp);
      setIsNote(false);
      setTodo('');
    }
  }

  const handleCancel = () => {
    setIsNote(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isNote ? (
        <Container visible={isNote}>
          { /* <textarea placeholder="Apa yang ingin anda kerjakan?" ref={textarea} value={todo} onChange={e => {setTodo(e.target.value)}} /> */ }
          <textarea placeholder="Apa yang ingin anda kerjakan?" value={todo} onChange={e => {setTodo(e.target.value)}} autoFocus />
          <br />
          <Button onClick={handleInsert}>Catat!</Button>
          <Button secondary onClick={handleCancel}>Tidak Jadi</Button>
        </Container>
        ) : (
        <Container visible={!isNote}>
          <Button onClick={() => {
            setEditIndex(null);
            setIsNote(true);
          }}>Aku ingin mengerjakan sesuatu!</Button>
        </Container>
        )}
        {items.map((item,index) => (
          <ToDo key={index} index={index} value={item} isEdit={index === editIndex} setEditIndex={setEditIndex} setIsNote={setIsNote} saveItem={saveItem} deleteItem={deleteItem} />
        ))}
      </header>
    </div>
  );
}

function ToDo(props) {
  const [todo, setTodo] = useState(props.value);
  const style = {marginTop:"10px"};

  const handleEdit = () => {
    setTodo(props.value);

    props.setIsNote(false);
    props.setEditIndex(props.index);
  }

  const handleUpdate = () => {
    if(todo)
      props.saveItem(props.index, todo);
  }

  const handleCancel = () => {
    props.setEditIndex(null);
  }

  const handleDelete = () => {
    props.deleteItem(props.index)
  }

  return (
    <div style={style}>
      {props.isEdit ? (
      <Container>
        <textarea placeholder={props.value} value={todo} onChange={e => {setTodo(e.target.value)}} />
        <br />
        <Button onClick={handleUpdate}>Simpan!</Button>
        <Button secondary onClick={handleCancel}>Tidak Jadi</Button>
        <Button danger onClick={handleDelete}>Hapus!</Button>
      </Container>
      ) : (
      <Container>
        <div onClick={handleEdit}>{props.value}</div>
      </Container>
      )}
    </div>
  )
}

function Container(props) {
  // show hide diserahkan ke rendering react, jadinya div biasa hehehe
  /* let attribute = {};

  if(!props.visible)
    attribute.style = {display: 'none'};

  return (<div {...attribute}>{props.children}</div>); */

  return (<div>{props.children}</div>);
}

// menggunakan styled components di atas
/* function Button(props) {
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
} */

export default App;