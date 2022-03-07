import React, { Component } from 'react';
import './category.css';
import '../contact/contact.css';
import SearchCategory from './SearchCategory';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class MyCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            removeCategory: false,
            searchResults: [],
        };
        this.searchTimeout = null;
        this.searchCategories = this.searchCategories.bind(this);
    }

    componentDidMount() {
        axios
            .post(`http://localhost:${PORT}/user/${this.props.userId}/categories`)
            .then((res) => {
                console.log('userCategories : ', res);
                if (res.data.length) {
                    this.setState({ categories: res.data });
                }
            })
            .catch((err) => console.log('Error while fetching user categories : ', err));
    }

    allowRemove = () => {
        this.setState({ removeCategory: !this.state.removeCategory });
    };

    eraseCategory = (e) => {
        e.stopPropagation();
        let catId = parseInt(e.target.dataset.catid);
        console.log(`remove category ${catId} for user ${this.props.userId}`);
        if (catId) {
            axios
                .delete(`http://localhost:${PORT}/user/${this.props.userId}/category/${catId}`)
                .then((res) => {
                    console.log('new user categories : ', res);
                    this.setState({ categories: res.data });
                })
                .catch((err) => {
                    console.log('Error while removing category from user : ', err);
                });
        }
    };

    addCategory = (e) => {
        e.stopPropagation();
        let catId = parseInt(e.target.dataset.catid);
        console.log(`remove category ${catId} for user ${this.props.userId}`);
        if (catId) {
            axios
                .post(`http://localhost:${PORT}/user/${this.props.userId}/category`, {
                    categoryId: catId,
                })
                .then((res) => {
                    console.log('results from add Category : ', res);
                    if (res.data.length) {
                        let searchResults = [...this.state.searchResults];
                        searchResults.splice(e.target.dataset.arraytid, 1);
                        this.setState({ searchResults });
                        this.setState({ categories: res.data });
                    }
                })
                .catch((err) => {
                    console.log('Error while saving new category for user : ', err);
                });
        }
    };

    searchCategories = (e) => {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        if (!e.target.value) {
            this.setState({ searchResults: [] });
            return;
        }

        const categoryKeyword = e.target.value;
        console.log('category keyword :', categoryKeyword);
        this.searchTimeout = setTimeout(() => {
            axios
                .post(`http://localhost:${PORT}/categories/filter`, {
                    userId: this.props.userId,
                    keyword: categoryKeyword,
                })
                .then((res) => {
                    if (res.data.length) {
                        let categoriesIdsArray = this.state.categories.map((category) => category.id);
                        let notInCategoriesList = res.data.filter((category) => {
                            return !categoriesIdsArray.includes(category.id);
                        });
                        this.setState({ searchResults: notInCategoriesList });
                        console.log('Categories filtered by keyword : ', res.data);
                    } else {
                        this.setState({ searchResults: [] });
                    }
                })
                .catch((err) => console.log('Error while searching for categories by keyword : ', err));
        }, 600);
    };

    render() {
        return (
            <div className='myCategories d-flex flex-column'>
                <div className='text-light'>
                    <div className='d-flex justify-content-center fs-4 marginT'>Mes catégories</div>
                </div>
                <div className='d-flex justify-content-start align-items-baseline flex-column mt-3'>
                    {this.state.categories !== undefined &&
                        this.state.categories.map((cat) => {
                            return (
                                <div className='listCategory container d-flex justify-content-between align-items-center ms-1 me-3' key={cat.id} type='button'>
                                    <p data-catid={cat.id} onClick={this.props.getCategoryPosts}>
                                        #{cat.name}
                                    </p>
                                    {this.state.removeCategory ? (
                                        <button data-catid={cat.id} onClick={this.eraseCategory} className='btnMinus ms-3'>
                                            {/* <AiOutlineMinusCircle /> */} -
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            );
                        })}
                </div>
                <button className='btnSeeMore'>Voir plus</button>
                <button className='bntEdit' onClick={this.allowRemove}>
                    Editer la liste
                </button>
                <SearchCategory title={'Chercher une catégorie'} placeholder={'catégorie'} addCategory={this.addCategory} searchCategories={this.searchCategories} searchResults={this.state.searchResults} />
            </div>
        );
    }
}
