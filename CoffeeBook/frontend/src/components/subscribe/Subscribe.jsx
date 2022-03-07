import React, { Component } from 'react';
import '../login/login.css';
import axios from 'axios';
axios.defaults.withCredentials = true;
const PORT = 5000;

export default class Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
        };
    }

    goHome = ()=>{
        window.location.reload()
    }


    createAccount = (e) => {
        e.preventDefault();
        const subscribeForm = new FormData(e.currentTarget);
        const newClient = {};
        for (let [key, value] of subscribeForm) {
            newClient[key] = value;
        }
        console.log(newClient);
        if (newClient.password === newClient.passwordConfirmation) {
            delete newClient.passwordConfirmation;
            console.log(newClient);
            axios
                .post(`http://localhost:${PORT}/subscribe`, newClient)
                .then((newUser) => {
                    this.props.newUserCreated({
                        ...newUser.data.user,
                    });
                })
                .catch((err) => {
                    console.log('subscribe request status code : ', err.response.status);
                    if (err.response.status === 409) this.setState({ errorMessage: "L'email a déjà été utilisé !" });
                });
        } else {
            [e.target[3].value, e.target[4].value] = ['', ''];
            this.setState({ errorMessage: 'Les mots de passe ne correspondent pas!' });
        }
        console.log('newClient : ', newClient);
    };

    render() {
        return (
            <div className='container py-5 vh-100 d-flex justify-content-center align-items-center'>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                    <header className='text-white text-left d-flex justify-content-start'>
                        <img src={process.env.PUBLIC_URL + `./images/iconeCB.png`} alt='Logo CoffeeBook' className='logoLogin' onClick={this.goHome} type='button' />
                        <div>
                            <h1>CoffeeBook</h1>
                            <h4>La réseau social de partage d'actualités</h4>
                        </div>
                    </header>
                    <div className='card shadow-2-strong sectionLogin' style={{ borderRadius: '1rem' }}>
                        <div className='card-body p-5 text-center' style={{ position: 'relative' }}>
                            {this.state.errorMessage !== '' ? <p className='alertDuplicate'>{this.state.errorMessage}</p> : ''}
                            <form method='POST' onSubmit={this.createAccount}>
                                <div className='form-outline mb-4'>
                                    <input type='text' name='firstName' placeholder='Prénom' id='typeFirstName-2' className='form-control form-control-lg' />
                                </div>

                                <div className='form-outline mb-4'>
                                    <input type='text' name='lastName' placeholder='Nom de Famille' id='typeLastName-2' className='form-control form-control-lg' />
                                </div>

                                <div className='form-outline mb-4'>
                                    <input type='email' name='email' placeholder='Email' id='typeEmailX-2' className='form-control form-control-lg' />
                                </div>

                                <div className='form-outline mb-4'>
                                    <input type='password' name='password' placeholder='Mot de passe' id='typePasswordX-2' className='form-control form-control-lg' />
                                </div>
                                <div className='form-outline mb-4'>
                                    <input type='password' name='passwordConfirmation' placeholder='Confirmer le mot de passe' id='matchTypePasswordX-2' className='form-control form-control-lg' />
                                </div>

                                <button className='btn btnSubscribe btn-lg btn-block' type='submit'>
                                    Créer mon compte
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
