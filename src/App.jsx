import React from 'react';
import Header from './Layouts/Header';
import Body from './Layouts/Body';
import './App.css';
import { getData } from './utils/data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getData(),
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onAddNoteHandler({ title, content }) {
    const currentDate = new Date().toLocaleString('id-ID');
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            date: currentDate,
            content,
          },
        ],
      };
    });
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  render() {
    return (
      <div>
        <Header />
        <Body
          notes={this.state.notes}
          addNote={this.onAddNoteHandler}
          onDelete={this.onDeleteHandler}
        />
      </div>
    );
  }
}

export default App;
