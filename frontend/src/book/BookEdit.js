import { useState, useEffect } from 'react';

import BookService from './BookService'

import {SongsList} from '../song/SongsList'

const bookService = new BookService()

export const BookEdit = (data) => {
    const [book, setBook] = useState({});

    useEffect( () => {

        // Handle URL request
        const { match: {params} } = data;
        if(params && params.id) {
            bookService.getBook(params.id).then(function(result) {
                setBook(result);
            })
        }
    // eslint-disable-next-line
    },[data.match.params]);

    function handleClick() {
        bookService.updateBook(book);
        data.history.push(`/book/${book.book_id}`);
    }

    function updateSongOrder(newList){
        if(!newList || newList.length===0) return;
        console.log("update song order TODO", newList)
        const newbook =  {...book, songs:newList}
        setBook(newbook)
    }

    // Callback function used by SongList to indicate a selection of a song
    function setId(id) {
        
        // console.log(id, book.songs);
        // the id of the book that was selected / deselected
        var songList = [];
        // if the id was found
        if (book.songs.some( e=> e.song_id === id) ) {
            //remove it
            // console.log("setid", "remove");
            songList = book.songs.filter( e => e.song_id !== id );
        }else {
            songList = [...book.songs,{song_id: id}]
            // console.log("setid", "add", songList);
        }
        const newbook =  {...book, songs:songList}
        setBook(newbook)
    }

    //if book doesn't exist
    if(!book.songs) {
        console.log ("no such book");
        return <div>No such book</div>
    }
    return (
            
        <div className="book-edit-parent widescreen-parent">
            <div className="book-edit widescreen">
                <h2 className="book-name ">{book.title}</h2>
                <div className="links-parent">
                 <button className="control-link" onClick={()=>handleClick()}>Save</button>
                </div>
                < SongsList book={book} mode={'BOOK_EDIT'} updateList={updateSongOrder}/>
            </div>
            <div className="book-edit-songlist widescreen">
                <h2 className="book-name">All songs</h2>
                < SongsList showSong={false} setId={setId} mode={'BOOK_EDIT_SELECT'} selected={book.songs}/>
            </div>
        </div>

    )
}