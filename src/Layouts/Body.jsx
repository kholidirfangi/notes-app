import React from 'react';
import Heading from '../components/Heading';
import Card from '../components/Card';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
    };

    this.onInputTitleEventHandler = this.onInputTitleEventHandler.bind(this);
    this.onInputContentEventHandler =
      this.onInputContentEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onInputTitleEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
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
    this.props.addNote(this.state);
  }

  render() {
    const { notes } = this.props;

    return (
      <div className="main-content">
        <form className="input-content" onSubmit={this.onSubmitEventHandler}>
          <Heading>Buat Catatan</Heading>
          <p>sisa karakter: 0</p>
          <div>
            <input
              type="text"
              className="input-judul"
              placeholder="Masukkan Judul.."
              value={this.state.title}
              onChange={this.onInputTitleEventHandler}
            />
          </div>
          <div>
            <textarea
              name="note-content"
              placeholder="isi catatan.."
              value={this.state.content}
              onChange={this.onInputContentEventHandler}
            ></textarea>
          </div>

          <button className="btn-create">Buat</button>
        </form>

        <div className="active-notes">
          <Heading>Catatan Aktif</Heading>
          {notes.map((note) => (
            <Card key={note.id} id={note.id} {...note} onDelete={onDelete} onArchive={onArchive}/>
          ))}
        </div>

        <div>
          <Heading>Arsip</Heading>
          <p>...</p>
        </div>
      </div>
    );
  }
}

export default Body;
