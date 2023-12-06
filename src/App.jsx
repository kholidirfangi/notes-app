import React from 'react';
import Header from './Layouts/Header';
import Body from './Layouts/Body';
import './App.css';
import { getData } from './utils/data';
import Heading from './components/Heading';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    const dataKey = 'notesData';
    super(props);

    this.state = {
      notes: getData(),
      archivedNotes: [],
      searchValue: '',
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
    this.setState({ searchValue: value });
  }

  onAddNoteHandler({ title, content }) {
    const currentDate = new Date().toLocaleString('id-ID');

    if (title !== '' && content !== '') {
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
    this.setState(
      (prevState) => {
        return {
          notes: prevState.notes.filter((note) => note.id !== id),
          archivedNotes: [...prevState.archivedNotes, archivedNote],
        };
      },
      () => {
        this.saveData();
      }
    );
  }

  onMovedHandler(id) {
    this.setState(
      (prevState) => {
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
      },
      () => {
        this.saveData();
      }
    );
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    const archivedNotes = this.state.archivedNotes.filter(
      (archivedNote) => archivedNote.id !== id
    );
    this.setState({ notes, archivedNotes });

    const dataStored = localStorage.getItem(this.dataKey);
    const dataParse = JSON.parse(dataStored);

    const updateNotes = dataParse.notes.filter((note) => note.id !== id);
    const updateArchivedNotes = dataParse.archivedNotes.filter(
      (archivedNote) => archivedNote.id !== id
    );

    const updateData = {
      notes: updateNotes,
      archivedNotes: updateArchivedNotes,
    };

    localStorage.setItem(this.dataKey, JSON.stringify(updateData));

    if (updateData.notes.length <= 0 && updateData.archivedNotes.length <= 0) {
      localStorage.removeItem(this.dataKey);
    }
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

    localStorage.setItem(this.dataKey, JSON.stringify(dataToSave));
  }

  componentDidMount() {
    const savedData = localStorage.getItem(this.dataKey);

    if (savedData) {
      const { notes, archivedNotes } = JSON.parse(savedData);

      this.setState({
        notes: notes || [],
        archivedNotes: archivedNotes || [],
      });
    }
  }

  render() {
    const filteredNotes = this.state.notes.filter(
      (note) =>
        note.title
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
        note.content
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
    );

    const filteredArchivedNotes = this.state.archivedNotes.filter(
      (archivedNote) =>
        archivedNote.title
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
        archivedNote.content
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
    );
    return (
      <div>
        <Header onChange={this.onSeachInputHandler} />
        <Body
          notes={filteredNotes}
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
