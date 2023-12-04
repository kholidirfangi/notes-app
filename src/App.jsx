import React from 'react';
import Header from './Layouts/Header';
import Body from './Layouts/Body';
import './App.css';
import { getData } from './utils/data';
import Heading from './components/Heading';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getData(),
      archivedNotes: [],
      seachValue: '',
      title: '',
      content: '',
      maxChar: 50,
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onMovedHandler = this.onMovedHandler.bind(this);
    this.onSeachInputHandler = this.onSeachInputHandler.bind(this);
    this.onInputTitleEventHandler = this.onInputTitleEventHandler.bind(this);
    this.onInputContentEventHandler =
      this.onInputContentEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onSeachInputHandler(event) {
    const value = event.target.value;

    this.setState((prevState) => {
      const notes = prevState.notes;
      console.log(notes);
      const showNotes = value
        ? notes.filter(
            (note) => note.title.includes(value) || note.content.includes(value)
          )
        : notes;
      return {
        seachValue: value,
        notes: showNotes,
      };
    });
  }

  onAddNoteHandler({ title, content }) {
    const currentDate = new Date().toLocaleString('id-ID');
    if (title || content !== '') {
      this.setState(
        (prevState) => {
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
        },
        () => {
          this.saveData();
        }
      );
    }
  }

  onArchiveHandler(id) {
    const archivedNote = this.state.notes.find((note) => note.id === id);
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => note.id !== id),
        archivedNotes: [...prevState.archivedNotes, archivedNote],
      };
    });
  }

  onMovedHandler(id) {
    this.setState((prevState) => {
      const movedNote = prevState.archivedNotes.find(
        (archivedNote) => archivedNote.id === id
      );

      if (movedNote) {
        const updatedNotes = [...prevState.notes, { ...movedNote }];
        const updatedArchivedNotes = prevState.archivedNotes.filter(
          (archivedNote) => archivedNote.id !== id
        );

        return {
          notes: updatedNotes,
          archivedNotes: updatedArchivedNotes,
        };
      }

      return prevState;
    });
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    const archivedNotes = this.state.archivedNotes.filter(
      (archivedNote) => archivedNote.id !== id
    );
    this.setState({ notes, archivedNotes });
  }

  onInputTitleEventHandler(event) {
    this.setState(() => {
      const inputText = event.target.value;
      const remainingChar = 50 - inputText.length;
      return {
        title: inputText,
        maxChar: remainingChar,
      };
    });
  }

  onInputContentEventHandler(event) {
    this.setState(() => {
      return {
        content: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.onAddNoteHandler({
      title: this.state.title,
      content: this.state.content,
    });

    this.setState({
      title: '',
      content: '',
      maxChar: 50,
    });
  }

  saveData() {
    const { notes, archivedNotes } = this.state;
    const dataToSave = {
      notes,
      archivedNotes,
    };

    localStorage.setItem('notesData', JSON.stringify(dataToSave));
  }

  render() {
    return (
      <div>
        <Header onChange={this.onSeachInputHandler} />
        <Body
          notes={this.state.notes}
          // addNote={this.onAddNoteHandler}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
          onSubmit={this.onSubmitEventHandler}
          onInputTitle={this.onInputTitleEventHandler}
          onInputContent={this.onInputContentEventHandler}
          title={this.state.title}
          content={this.state.content}
          maxChar={this.state.maxChar}
        />

        <div className="archives">
          <Heading>Arsip</Heading>
          {this.state.archivedNotes.length > 0 ? (
            this.state.archivedNotes.map((archivedNote) => (
              <Card
                key={archivedNote.id}
                id={archivedNote.id}
                {...archivedNote}
                children="Pindahkan"
                onDelete={() => this.onDeleteHandler(archivedNote.id)}
                onClick={() => this.onMovedHandler(archivedNote.id)}
              />
            ))
          ) : (
            <p className="no-notes">tidak ada catatan..</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
