import React from 'react'
import SearchContact from './SearchContact.jsx';
import './contact.css'
import { AiOutlineMinusCircle } from "react-icons/ai";
import AdminFilters from './AdminFilters.jsx';
import axios from "axios";
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      removeContact: false,
      searchResults: [],
    }
    this.addContact = this.addContact.bind(this);
    this.searchTimeout = null;
    this.searchContacts = this.searchContacts.bind(this);
  }

  componentDidMount() {
    axios.post(`http://localhost:${PORT}/user/contacts`, { userId: this.props.userId })
      .then(res => {
        console.log("userContacts : ", res);
        if (res.data.length) {
          this.setState({ contacts: res.data })
        } 
      })
      .catch(err => console.log("Error while fetch user contacts :", err))
  }



  allowRemove = () => {
    this.setState({ removeContact: !this.state.removeContact });
  }

  eraseContact = (e) => {
    e.stopPropagation();

    if (e.target.dataset.contactid) {
      axios.post(`http://localhost:${PORT}/user/contacts/delete`, {
        userId: this.props.userId,
        contactId: e.target.dataset.contactid
      })
      .then(res => {
        this.setState({ contacts: res.data})
      })
    }
  }

  addContact = (e) => {
    e.stopPropagation();
    if (e.target.dataset.contactid) {
      axios.post(`http://localhost:${PORT}/user/contacts/create`, {
        userId: this.props.userId,
        contactId: e.target.dataset.contactid
      })
      .then(res => {
        console.log("result from add contact : ", res)
        if (res.data.length) {
          let searchResults = [...this.state.searchResults]
          searchResults.splice(e.target.dataset.arraytid, 1)
          this.setState({ searchResults });
          this.setState({ contacts: res.data });
        }
      })
      .catch(err => {
        console.log("Error while saving new contact", err);
      }) 
    }
  }
  searchContacts = (e) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (!e.target.value) 
      return;

    const contactKeyword = e.target.value;
    this.searchTimeout = setTimeout(() => {
      axios.post(`http://localhost:${PORT}/user/filter`, {
        filter: contactKeyword,
        userId: this.props.userId
      })
        .then(res => {
          if (res.data.length) {
            let contactsIdsArray = this.state.contacts.map((contact)=>contact.id)
            let notInContactList = res.data.filter(contact => {
              return !contactsIdsArray.includes(contact.id)
            })
            this.setState({ searchResults: notInContactList })
          } else {
            this.setState({ searchResults: [] })
          }
        })
        .catch(err => console.log("Error while searching contacts by keyword", err))
    }, 600);


  }

  render() {
    return (
      <div className='d-flex flex-column'>
        { this.props.isAdmin ? <AdminFilters /> : "" }
        <span className='titreContact'>Contacts</span>
        <div className=''>
          {
            this.state.contacts !== undefined && this.state.contacts.map(contact => {
              return (
                <div key={contact.id} className='blocContacts d-flex justify-content-between align-items-center' >
                  <div className="contact d-flex align-items-center" type='button' data-contactid={contact.id} onClick={this.props.getContactPosts}>
                    <img src={contact.profilePicturePath} alt={`${contact.firstName} ${contact.lastName}`} data-contactid={contact.id}/>
                    <p data-contactid={contact.id}>{contact.firstName} {contact.lastName}</p>
                  </div>
                  {
                    this.state.removeContact
                    ? <button className="minusBtn" data-contactid={contact.id} onClick={this.eraseContact} >
                        {/* <AiOutlineMinusCircle /> */} -
                      </button>
                    : "" 
                  }
                </div>
              )
            })
          }
        </div>        
        <button className='btnSeeMore'>Voir plus</button>    
        <button className='bntEdit' onClick={this.allowRemove}>Editer la liste</button>
        <div className='searchContact'>
          <SearchContact 
          title={"Chercher un contact"} 
          placeholder={"contact"} 
          userId={this.props.userId} 
          addContact={this.addContact}
          searchContacts={this.searchContacts}
          searchResults={this.state.searchResults}
          />
        </div>
      </div>
    )
  }
}
