import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import BookService from './BookService';

const bookService = new BookService();

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: ""
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        var self = this;

        bookService.getBooks().then(function (result) {
            result = result.sort( (s1, s2) => {
                if (s1.name > s2.name) { return 1; }
                else if (s2.name > s1.name){ return -1; }
                else return 0;
            });
            self.setState({
                books: result
            })
        })
        
    }

    handleDelete(e, id){
        bookService.deleteBook( {id: id}).then( () => {
            var newArr = this.state.books.filter( (s)=> {return s.id !== id;} );
            this.setState({ books: newArr}); 
        })
    }

    handleChange = e => {
        let { value } = e.target;
        this.setState({ search: value });
    };

    handleClick(id){
        this.props.toggleSideNav();
        this.props.history.push(`/book/${id}/`);
    }

    render() {
        return (
                <div className="book-list">
                    {this.state.books.map( b =>
                        <div className="book-list-title nav-item" key={b.book_id} onClick={ () => this.handleClick(b.book_id)}>{b.name}</div>
                    )}
                </div>
        );
    }
}



export default withRouter(BookList);