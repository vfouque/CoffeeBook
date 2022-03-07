import React, { Component } from 'react'

export default class CreateCategory extends Component {



  render() {
    return (
      <div className='d-flex flex-column'>
        <p className="h4">Créer une catégorie</p>
        <form action="" method="post">
          <input type="text" name="newCategory" placeholder="ex: Paris 2024" />
          <div className='mt-2 d-flex justify-content-center'>
            <input type="submit" value="Créer" className='ml-auto'/>
          </div>
        </form>
      </div>
    )
  }
}