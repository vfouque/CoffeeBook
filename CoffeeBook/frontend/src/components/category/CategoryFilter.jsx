import React, { Component } from 'react';
import './category.css';

export default class CategoryFilter extends Component {
    render() {
        return (
            <div className='categoryFilter container text-light d-flex justify-content-center flex-column marginT mb-3'>
                <div className='mt-2 h6' type='button' onClick={this.props.getLatest}>
                    # les dernières actus
                </div>
                <div className='mt-2 h6' type='button' onClick={this.props.getBest}>
                    # les meilleures actus
                </div>
            </div>
        );
    }
}
