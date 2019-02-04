import React from "react";
import {Route} from 'react-router-dom'
import Search from "./Search"
import BooksPage from "./BooksPage"


import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []  /** The list of books */
  };
 

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


  /**
   * Moving books to a shelf and update the shelf
   */

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  render() {
    return (
      <div className="app">

         {/* Render the search page */}

        <Route path="/search"
          render={() => (
          
              <Search moveShelf={this.moveShelf} books={this.state.books} />
            )}
          />

          {/* Render the home page */}
        <Route exact path='/' render={() => (
             <BooksPage books={this.state.books} moveShelf={this.moveShelf} />
             )}
           />
        
          
           
      </div>
    )
  }
}

export default BooksApp
