import React from 'react';
import Heading from '../components/Heading';
import Card from '../components/Card';

function Body({
  notes,
  onDelete,
  onArchive,
  onSubmit,
  onInputTitle,
  onInputBody,
  title,
  body,
  maxChar,
}) {
  return (
    <div className="main-content">
      <form className="input-content" onSubmit={onSubmit}>
        <Heading style="center">Buat Catatan</Heading>
        <p className="remainder-char">sisa karakter: {maxChar}</p>
        <div>
          <input
            type="text"
            className="input-judul"
            placeholder="Masukkan Judul.."
            maxLength={50}
            value={title}
            onChange={onInputTitle}
          />
        </div>
        <div>
          <textarea
            name="note-content"
            placeholder="isi catatan.."
            value={body}
            onChange={onInputBody}
          ></textarea>
        </div>

        <button className="btn-create">Buat</button>
      </form>

      <div className="active-notes">
        <Heading>Catatan Aktif</Heading>
        <div className="card-active-container">
          {notes.length > 0 ? (
            notes.map((note) => (
              console.log(note),
              <Card
                key={note.id}
                id={note.id}
                {...note}
                onDelete={() => onDelete(note.id)}
                onClick={() => onArchive(note.id)}
                children="Arsip"
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

export default Body;
