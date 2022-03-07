import React, { useEffect } from 'react'
import Select from 'react-select'
import './createPost.css'


export default function CreatePost({saveNewPost, createNewPost, allCategories, getAllCategories}) {


    useEffect(getAllCategories, [getAllCategories])

    const categoryOptions = allCategories.map((cat)=>{
        return { value: cat.id, label: cat.name }
    });

    return (
        <div className='container createPostGlobal mt-2'>
            <form className="mt-3" onSubmit={saveNewPost}>

                <div className="mb-3">
                    <Select name='categoryId' className='selectPost' options={categoryOptions} isMulti={true} delimiter={'*'} placeholder={'Sélectionnez une catégorie / les catégories'} required/>
                </div>

                <div className='mb-3'>
                    <input type="text" className="form-control selectPost" name="postTitle" placeholder="Choisissez un titre" required></input>
                </div>

                <div className="mb-3">
                    <textarea className="form-control selectPost" id="validationTextarea" name="postContent" placeholder="Ecrivez votre nouveau post" rows="6" required></textarea>
                </div>
                <div className='btnFormCreateForm d-flex justify-content-center ml-1 mr-1 mb-3'>
                    <button onClick={createNewPost} type='reset'>Annuler</button>
                    <button type='submit'>Publier</button>
                </div>
            </form>
        </div>
    )
}
