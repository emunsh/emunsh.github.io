import React, {Component} from 'react';

class User extends Component {
    showUserInfo = () => {
        const data = this.props.data;
        return (
            <div className='userInfo'>
                <div className="follower__avatar">
                    <p>
                        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
                            <img src={data.avatar_url} alt={data.login}/>
                        </a>
                    </p>
                    <p>Логин пользователя: {data.login}</p>
                    <p>Количество репозиториев: {data.public_repos}</p>
                    <p>Место нахождения: {data.location}</p>
                    <p>Количество подписчиков: {data.followers}</p>
                    <p>Дата создания профиля: {data.created_at}</p>
                </div>
            </div>
        );
    };
    render () {
        return (
            <React.Fragment>
                {this.props.data &&
                    this.showUserInfo()
                }
            </React.Fragment>
        )
    }
}

export default User;