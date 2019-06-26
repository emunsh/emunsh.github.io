import React, {Component} from 'react';

class Form extends Component {
    handleSubmit= (e) => {
        e.preventDefault();
        const nickname = this.refs.nickname.value;
        this.props.getUserFolowers(nickname);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit} className='searchForm'>
                <p>Введите имя пользователя</p>
                <input ref="nickname" type="text" defaultValue=''/>
                <input type="submit"  value="Искать" />
            </form>
        )
    }
}

export default Form;