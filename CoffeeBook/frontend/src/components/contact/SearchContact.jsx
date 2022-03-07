import React from 'react';
import "../category/category.css";
import { AiOutlinePlusCircle } from "react-icons/ai";


export default class SearchContact extends React.Component {
  render() {
    return (
      <div className='container-fluid searchContact'>
        <span>{this.props.title}</span>
        <input 
          className='container-fluid' type="text" placeholder={this.props.placeholder} 
          onChange={this.props.searchContacts}/>
        {
          this.props.searchResults.length
            ?
            this.props.searchResults.map((contact, id) => {
              return (
                <div className='listContactCategory d-flex ms-3' 
                      key={contact.id}>
                  <p>#{contact.firstName} {contact.lastName}</p>
                  <button className='ms-3' data-contactid={contact.id} data-arrayid={id} onClick={this.props.addContact}>
                    {/* <AiOutlinePlusCircle /> */} +
                  </button>
                </div>
              )
            })
            : ""
        }
      </div>
    )
  }
}