import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import SongDisplay from './SongDisplay'

import SongService from './SongsService'

const songService = new SongService();

class SongEdit extends Component {
    constructor(props){
        super(props);
        this.state  = {
            song: {
                id: 4,
                title: "",
                text: ""
            }
        }
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        const  { match: {params} }  = this.props;

        if(params && params.id) {
            songService.getSong(params.id).then( result => {
                this.setState({
                    song: result
                });
            })
        }
    }


    handleChange = (event) => {

        let { name, value } = event.target;
        const activeSong = {...this.state.song, [name]: value };
        this.setState({
            song:activeSong
        })
    }

    handleSave() {
        console.log("save", this.state.song);
        songService.updateSong(this.state.song);
    }

    render() {
        return (
            <div className="edit-song-parent">
                <div className="edit-song-form">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name="title" placeholder="Title" value={this.state.song.title} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control className="edit-song-textarea" as="textarea" name="text" value={this.state.song.text} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button onClick={this.handleSave}>Save</Button>
                </Form>
                </div>
                <div className="edit-song-display">
                    < SongDisplay mode="BY_SONG" id={4} song={this.state.song} widescreen={true}/>
                </div>
            </div>
            

        )
    }
}

export default SongEdit