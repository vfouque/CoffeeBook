import React from 'react';
import './category.css';

export default class SearchCategory extends React.Component {
    render() {
        return (
            <div className='searchCategory mt-3'>
                <span>{this.props.title}</span>
                <input className='container-fluid' type='text' placeholder={this.props.placeholder} onChange={this.props.searchCategories} />
                {this.props.searchResults.length
                    ? this.props.searchResults.map((category, id) => {
                          return (
                              <div className='itemSearchCategory d-flex justify-content-between align-items-baseline ms-3' key={category.id}>
                                  <p># {category.name}</p>
                                  <button className='ms-3' data-catid={category.id} data-arraytid={id} onClick={this.props.addCategory}>
                                      {/* <AiOutlinePlusCircle /> */} +
                                  </button>
                              </div>
                          );
                      })
                    : ''}
            </div>
        );
    }
}
