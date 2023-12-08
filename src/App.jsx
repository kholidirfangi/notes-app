import React from 'react';
import Header from './Layouts/Header';
import Body from './Layouts/Body';
import './App.css';
import { getInitialData, showFormattedDate } from './utils';
import Heading from './components/Heading';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      archivedNotes: [],
      searchValue: '',
      inputTitle: '',
      inputContent: '',
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
    this.setState({ searchValue: value });
  }

  onAddNoteHandler({ title, body }) {
    const currentDate = new Date();

    if (title !== '' && body !== '') {
      this.setState((prevState) => {
        return {
          notes: [
            ...prevState.notes,
            {
              id: +new Date(),
              title,
              body,
              archived: false,
              createdAt: currentDate,
            },
          ],
        };
      });
    }
  }

  onArchiveHandler(id) {
    const archivedNote = this.state.notes.find((note) => note.id === id);
    this.setState((prevState) => {
      if (!archivedNote.archived) {
        return {
          notes: prevState.notes.filter((note) => note.id !== id),
          archivedNotes: [...prevState.archivedNotes, archivedNote],
        };
      }
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
        inputTitle: inputText,
        maxChar: remainingChar,
      };
    });
  }

  onInputContentEventHandler(event) {
    this.setState(() => {
      return {
        inputContent: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.onAddNoteHandler({
      title: this.state.inputTitle,
      body: this.state.inputContent,
    });

    this.setState({
      inputTitle: '',
      inputContent: '',
      maxChar: 50,
    });
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
    );

    const filteredArchivedNotes = this.state.archivedNotes.filter(
      (archivedNote) =>
        archivedNote.title
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
    );
    return (
      <div className="container">
        <Header onChange={this.onSeachInputHandler} />
        <Body
          notes={filteredNotes}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
          onSubmit={this.onSubmitEventHandler}
          onInputTitle={this.onInputTitleEventHandler}
          onInputBody={this.onInputContentEventHandler}
          title={this.state.inputTitle}
          body={this.state.inputContent}
          maxChar={this.state.maxChar}
        />

        <div className="archives">
          <Heading>Arsip</Heading>
          <div className="archives-notes-container">
            {filteredArchivedNotes.length > 0 ? (
              filteredArchivedNotes.map((archivedNote) => (
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
      </div>
    );
  }
}

export default App;
