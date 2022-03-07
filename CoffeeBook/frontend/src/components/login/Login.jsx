import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: { status: false, errorMessage: 'Wrong login or password' },
        };
    }

    goHome = () => {
        window.location.reload()
    }

    loginUser = async (e) => {
        e.preventDefault();
        const loginForm = new FormData(e.currentTarget);
        const userToLog = {};
        for (let [key, value] of loginForm) {
            userToLog[key] = value;
        }
        axios
            .post(`http://localhost:${PORT}/login`, userToLog)
            .then((response) => {
                if (response.status === 200) {
                    this.props.loggedUser({ ...response.data.user });
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                this.setState({ error: { ...this.state.error, status: true } });
            });
    };

    render() {
        return (
            <div className='container py-5 vh-100 d-flex justify-content-center align-items-center'>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                    <header className='text-white text-left d-flex justify-content-start'>
                        <img src={process.env.PUBLIC_URL + `./images/iconeCB.png`} alt='Logo CoffeeBook' className='logoLogin' type='button' onClick={this.goHome} />
                        <div>
                            <h1>CoffeeBook</h1>
                            <h4>La réseau social de partage d'actualités</h4>
                        </div>
                    </header>
                    <div className='card shadow-2-strong sectionLogin' style={{ borderRadius: '1rem' }}>
                        <div className='card-body p-5 text-center' style={{ position: 'relative' }}>
                            {this.state.error.status ? <p className='alertDuplicate'>{this.state.error.errorMessage}</p> : ''}
                            <form method='POST' onSubmit={this.loginUser}>
                                <div className='form-outline mb-4'>
                                    <input type='email' name='email' placeholder='Email' id='typeEmailX-2' className='form-control form-control-lg' />
                                </div>
                                <div className='form-outline mb-4'>
                                    <input type='password' name='password' placeholder='Mot de passe' id='typePasswordX-2' className='form-control form-control-lg' />
                                </div>
                                <button className='btn btnLogin btn-lg btn-block' type='submit'>
                                    Se connecter
                                </button>
                            </form>
                            <hr className='my-4' />

                            <button className='btn btn-lg btnSubscribe' onClick={this.props.createUser}>
                                Créer un nouveau compte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
