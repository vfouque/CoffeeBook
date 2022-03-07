import React from 'react';
import CategoryFilter from './category/CategoryFilter';
import MyCategories from './category/MyCategories';
import Contact from './contact/Contact';
import HeaderProfile from './profileSection/HeaderProfile';
import Post from './postSection/post/Post';
import Actualites from './postSection/actualites/Actualites';
import CreateCategory from './category/CreateCategory';
import LogoCB from './logo/LogoCB';
import CreatePost from './postSection/createPost/CreatePost';
import Login from './login/Login';
import Subscribe from './subscribe/Subscribe';
import { Route } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAccount: false,
      createNewPost: false,
      id: 0,
      firstName: '',
      lastName: '',
      isAdmin: false,
      profilePicturePath: '',
      posts: [],
      postsOffset: 0,
      news: true,
      best: false,
      searchByKeyword: false,
      myCat: 0,
      myContact: 0,
      titleKeyword: '',
      feedMessage: '',
      allCategories: []
    };
  }

  // METHODS passed as props to posts

  // User has logged in
  // Save the user data in localStorage to keep the user signed in
  // until he/she signed out
  userHasLoggedIn = ({ id, isAdmin, firstName, lastName, profilePicturePath }) => {
    localStorage.setItem('id', id);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('profilePicturePath', profilePicturePath);
    this.setState({ id, isAdmin, firstName, lastName, profilePicturePath });
  };

  userHasLogout = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:${PORT}/logout`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          console.log('User was successfully logout');
          localStorage.clear();
          window.location.reload();
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createNewUser = () => {
    this.setState({ newAccount: true });
  };

  newUserCreated = ({ id, firstName, lastName, isAdmin, profilePicturePath }) => {
    localStorage.setItem('id', id);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('profilePicturePath', profilePicturePath);
    this.setState({ id, firstName, lastName, isAdmin, profilePicturePath, newAccount: false });
  };

  // Get the latest posts created in CoffeeBook
  // - "items" : posts by descending order of their creation date
  getLatest = async () => {
    try {
      const latestReq = `http://localhost:${PORT}/latestposts`;
      const newPosts = await axios.post(latestReq);
      console.log('latest posts : ', newPosts);
      this.setState({
        posts: newPosts.data,
        news: true,
        best: false,
        myCat: 0,
        myContact: 0,
        titleKeyword: '',
        feedMessage: 'Les dernières actualités',
      });
    } catch (err) {
      localStorage.clear();
      window.location.reload();
      console.error('Error getting latest posts : ', err);
    }
  };

  // Get best average vote posts.
  // - "items" : posts by descending order of their average vote
  getBest = async () => {
    try {
      const bestReq = `http://localhost:${PORT}/bestposts`;
      const bestPosts = await axios.post(bestReq);
      this.setState({
        posts: bestPosts.data,
        news: false,
        best: true,
        myCatId: 0,
        myContactId: 0,
        titleKeyword: '',
        feedMessage: 'Les posts les mieux votés',
      });
    } catch (err) {
      console.error('Error getting best posts by votes: ', err);
    }
  };


  //Get all categories
  getAllCategories = async()=>{
    try {
      const allCategories = await axios.post(`http://localhost:${PORT}/categories`)
      this.setState({allCategories: allCategories.data})
    } catch (error) {
      localStorage.clear();
      window.location.reload();
      console.log('Error getting all categories: ', error);
    }
  }

  // Get posts by category.
  // The request should return :
  // - "categoryName" : The name of the category
  // - "items" : the posts in that category by descending order of their
  //   creation date
  getCategoryPosts = async (e) => {
    const categoryId = e.target.dataset.catid;
    const catPosts = await axios.post(`http://localhost:${PORT}/getcategoryposts`, { categoryId });
    this.setState({
      posts: catPosts.data.categoryPost,
      news: false,
      best: false,
      myCatId: categoryId,
      myContactId: 0,
      titleKeyword: '',
      feedMessage: `Les derniers post de la catégorie ${catPosts.data.name}`,
    });
  };

  // Get posts which title contain a keyword
  // The request should return :
  // -
  getPostsWithKeyword = async (e) => {
    const keyword = e.target.value.toString();
    if (keyword !== '') {
      const keywordPosts = await axios.post(`http://localhost:${PORT}/postsbykeyword`, { filter: keyword, offset: this.state.postsOffset });
      this.setState({
        searchByKeyword: true,
        postsOffset: 0,
        titleKeyword: keyword,
        feedMessage: `Les derniers posts par mot clé: ${keyword}`,
        news: false,
        best: false,
        posts: keywordPosts.data
      })
    } else {
      this.setState({
        searchByKeyword: false,
        postsOffset: 0,
        titleKeyword: '',
        feedMessage: '',
        news: false,
        best: false,
      })
      this.getLatest()
    }
  };

  // Display the createPost component
  createNewPost = () => {
    if (!this.state.createNewPost) {
      this.setState({ createNewPost: true });
    } else {
      this.setState({ createNewPost: false });
    }
  };

  // Get posts from contacts
  // The request should return :
  // - "firstName","lastName" : the firstname and lastname of the contact
  // - "items" : the posts authored by the contact by descending order
  //   of their creation date
  getContactPosts = async (e) => {
    e.stopPropagation();
    const contactId = parseInt(e.target.dataset.contactid);
    if (contactId) {
      const contactPosts = await axios.post(`http://localhost:${PORT}/getuserposts`, { userId: contactId });
      console.log("fetched contact posts : ", contactPosts);   
      this.setState({
        posts: contactPosts.data.userPost,
        news: false,
        best: false,
        myCatId: 0,
        myContactId: contactId,
        titleKeyword: '',
        feedMessage: `Les derniers posts de ${contactPosts.data.firstName} ${contactPosts.data.lastName}`,
      });
    };
  }

  // Save a new post.
  // The server should return the latest posts in CoffeeBook
  // by descending order of their creation date. It will possibly return the post
  // that has been sent.
  saveNewPost = async (e) => {
    e.preventDefault();
    const newPostForm = new FormData(e.target);
    const newPost = {};
    for (let [key, value] of newPostForm) {
      newPost[key] = value;
    }
    newPost.categoryId ? newPost.categoryId = newPost.categoryId.split('*').map((catId)=>parseInt(catId)): newPost.categoryId = false;
    try {
      const newPosts = await axios.post(`http://localhost:${PORT}/post/create`, { ...newPost });
      if (newPosts.data.length > 0){
        this.setState({postsOffset: 0, posts: newPosts.data, createNewPost: false})
      }else{
        this.setState({createNewPost: false})
        alert('Post is already exist')
      }
      
    } catch (error) {
      console.log('Error getting all categories: ', error);
    }
  };

  // Route to delete a post by its id
  // return all posts by descending order of their creation date
  deletePost = async (e) => {
    console.log(`delete post ${e.currentTarget.id}`);
    const updatedPostList = await axios.post(`http://localhost:${PORT}/post/delete`, { id: e.currentTarget.id });
    let refreshedList = updatedPostList.data.slice();
    if (this.state.best) {
      refreshedList.sort((a, b) => a.voteAvg - b.voteAvg);
    }

    if (this.state.myCat) {
      // TODO : need to retrieve the list of post with its categories
      //refreshedList is filtered for items having the myCat category
    }

    if (this.state.myContact) {
      refreshedList = refreshedList.filter((post) => post.userId === this.state.myContact);
    }

    if (this.state.keyword) {
      refreshedList = refreshedList.filter((post) => post.title.contains(this.state.keyword));
    }
    this.setState({
      posts: refreshedList,
    });
  };

  addActualites = async (e) => {
    try {
      let state = { ...this.state };
      let newPosts;
      if (this.state.searchByKeyword){
        newPosts = await axios.post(`http://localhost:${PORT}/postsbykeyword`, { filter: this.state.titleKeyword, offset: this.state.postsOffset + 10 });
      }else if (this.state.news){
        newPosts = await axios.post(`http://localhost:${PORT}/latestposts`, { offset: this.state.postsOffset + 10 });
      }
      state.posts = state.posts.concat(newPosts.data);
      state.postsOffset += 10;
      this.setState(state);
    } catch (error) {
      localStorage.clear();
      window.location.reload();
      console.error('Error getting latest posts : ', error);
    }
  };

  // In case a previous user signed in to CoffeeBook, his/her info are retrieved from
  // archive in localStorage.
  // As there is an user "id" when this component mounts, the Login screen will be called
  componentDidMount() {
    if (localStorage.getItem('id')) {
      const isAdmin = localStorage.getItem("isAdmin") === "false" ? false : true;

      this.setState({
        id: parseInt(localStorage.getItem('id')),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        isAdmin: isAdmin,
        profilePicturePath: localStorage.getItem('profilePicturePath'),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      // axios.post(`http://localhost:${PORT}/login`)
      // .then(this.getLatest());
      this.getLatest();
    }
  }

  render() {
    return this.state.id === 0 && !this.state.newAccount ? (
      <Login loggedUser={this.userHasLoggedIn} createUser={this.createNewUser} />
    ) : this.state.newAccount ? (
      <Subscribe newUserCreated={this.newUserCreated} />
    ) : (
      <div className='container'>
        <Route exact path='/'>
          <div className='row '>
            <div className='col-3 category maxHeight'>
              <LogoCB />
              {
                this.state.isAdmin ? <CreateCategory /> : ""
              }
              <CategoryFilter getLatest={this.getLatest} getBest={this.getBest} />
              <MyCategories userId={this.state.id} getCategoryPosts={this.getCategoryPosts} />
            </div>
            <div className='col-6 profilSection'>
              <div className='headerProfil'>
                <HeaderProfile userId={this.state.id} isAdmin={this.state.isAdmin} firstName={this.state.firstName} lastName={this.state.lastName} profilePicturePath={this.state.profilePicturePath} userHasLogout={this.userHasLogout} />
              </div>
              <div className='sectionPost'>
                <Post getPostsWithKeyword={this.getPostsWithKeyword} createNewPost={this.createNewPost} 
                   createNewPostStatus ={this.state.createNewPost} searchByKeyword={this.state.searchByKeyword}/>
                {this.state.createNewPost ? <CreatePost saveNewPost={this.saveNewPost} createNewPost={this.createNewPost} allCategories={this.state.allCategories} getAllCategories={this.getAllCategories} /> : ''}
              </div>
              <div>
                <Actualites feedMessage={this.state.feedMessage} posts={this.state.posts} addActualites={this.addActualites} userId={this.state.id} isAdmin={this.state.isAdmin}/>
              </div>
            </div>
            <div className='col-3 contact d-flex flex-row justify-content-center align-items-start '>
              <Contact userId={this.state.id} getContactPosts={this.getContactPosts} isAdmin={this.state.isAdmin} />
            </div>
          </div>
        </Route>
      </div>
    );
  }
}

export default App;
