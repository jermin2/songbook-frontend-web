import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SongsService from './SongsService';

const songsService = new SongsService();

class SongDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            song: {
                id: -1,
                title: "",
                text: ""
            }
        }

        // const uniqueId = 0;
    }

    componentDidMount(){

        const id = this.props.id;
        if( id ){
            return this.getSong(id);
        }
        else {
            // Handle URL
            const { match: { params } } =  this.props;
            if (params && params.id){
                return this.getSong(params.id);
            }
        }
    }

    getUniqueId(){
        this.uniqueId = this.uniqueId + 1;
        return this.uniqueId;
    }

    getSong(id){
        if(parseInt(this.state.song.id) === parseInt(id)) { return false; }
        var self = this;
        songsService.getSong(id).then(function (result) {
            self.setState({
                song: result
            })
        })
        
    }

    componentDidUpdate(){

        if (this.props.mode && this.props.mode === "BY_SONG") {
            
            if (this.state.song.id === this.props.song.id){
                return
            }
            return this.setState({
                song: this.props.song
            })
        }

        const id = this.props.id;
        if( id ){
            return this.getSong(id);
        }
        else {
            // Handle URL
            const { match: { params } } =  this.props;
            if (params && params.id){
                return this.getSong(params.id);
            }
        }
    }

    parseSong = () =>{

        //If in SONG_MODE, then parse the song from props instead of state
        if (this.props.mode && this.props.mode === "BY_SONG" ) {
            var song_text = this.props.song.text
        }
        else {
            song_text = this.state.song.text
        }

        // Sanitize the inputs
        var song_text_sanitised = song_text.replace(/(\r\n)|\r|\n/igm, '\n')
        var lines = song_text_sanitised.split("\n");
        
        return(
            <div className="lines">
            {lines.map( (line) => this.parseLineType(line) ) }
            </div>
        )
    }

    parseLineType = (line) => {
        if (line[0] === '#'){ return ( <div className="line" key={this.getUniqueId}>{this.parseComment(line)}</div>); } //Comments
        if (line.search( /^\d/ig) > -1 ){ 
            return ( <div className="verse-number">{line}</div>); } //Numbers
        else {  
            // Check for chords
            if (line.search(/\[/) > -1) {
                var words = line.split(" ");
                return ( <div className="line" key={line}><span className="line-text">{words.map( word => this.parseWords(word))}</span></div> ); 
            } 
            else {
                //return the line if no chords
                return ( <div className="line" key={line}><span className="line-text">{line}&nbsp;</span></div>)
            }
        }
    }
    parseComment = (comment) => {
        const commented_edit = comment.split(/^#\s*/gm);
        return ( <span className="comment"><em>{commented_edit[1]}</em></span> )
    }

    parseWords = (word) => {
        // Chords in the word
        // Split the word in the case of multiple chords - chord-word
        const arr = word.split ( /(\[.*?\])/ );

        return (
            <span className="chord-word" key={word}>{
            arr.map( word_chord => {
                // If its a chord
                if( word_chord[0] === "["){
                    const chord = word_chord.split( /\[(.*?)\]/ );
                    return ( <span className="chord" key={word_chord}>{chord[1]}</span>);
                } else {   return word_chord;  } // otherwise just return the 'part word'
            })
            }&nbsp;</span> //need a space after each word
        )
    }

    render() {
        if(this.props.widescreen){
            
            return (
                <div>
                    <div className="song-controls">
                        <div className="song-control-link">
                            <Link className="song-link" to={`/song/${this.state.song.id}/edit`}>Edit</Link>
                        </div>
                        <div className="song-control-link">
                            <Link className="song-link" to={`/song/${this.state.song.id}`}>Full Screen</Link>
                        </div>
                    </div>
                    <div className="song">{this.parseSong()}</div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <div className="song-controls">
                        <div className="song-control-link">
                            <Link className="song-link" to={`/song/${this.state.song.id}/edit`}>Edit</Link>
                        </div>
                    </div>
                    <div className="song">{this.parseSong()}</div>
                </div>
            )
        }
    }
}

export default SongDisplay;