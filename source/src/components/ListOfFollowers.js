import React, {Component} from 'react';

class ListOfFllowers extends Component {

    state = {
        data: this.props.data,
        search: false,
        sorted: false
    }

    clickHandle = (e) => {
        const url = e.target.getAttribute('data_url');
        this.props.getUser(url);
    }

    handleSelect = (e) => {
        e.target.select();
    }

    handeChange = (e) => {
        let nickName = this.refs.localSearch.value;
        let data = this.props.data;

        data = data.filter(function (item) {
            return item.login.indexOf(nickName) >= 0;
        })
        this.setState({
            search: true
        })
        if (data.length > 0) {
            this.setState({
                data: data,
            });
        } else {
            this.setState({
                data: false,
            });
        }
    }

    sortHandle = (targetSort) => {
        let data = this.props.data;

        if (this.state.sorted) {
            data.sort(function (a,b) {
                if (a[targetSort] > b[targetSort]) {
                    return 1
                }
                if (a[targetSort] < b[targetSort]) {
                    return -1
                }
                return 0
            });
        } else {
            data.sort(function (a,b) {
                if (a[targetSort] < b[targetSort]) {
                    return 1
                }
                if (a[targetSort] > b[targetSort]) {
                    return -1
                }
                return 0
            });
        }

        this.setState({
            data: data,
            sorted: !this.state.sorted
        });
    }

    render () {
        return (
            <React.Fragment>
                {(this.state.data.length > 1 || this.state.search) &&
                    <React.Fragment>
                        <div className="search">
                            Введите имя пользователя для поиска среди подписчиков <input type="text" onChange={this.handeChange} onClick={this.handleSelect} ref="localSearch" defaultValue="Поиск" />
                        </div>
                    </React.Fragment>
                }
                {this.state.data.length > 1 &&
                    <React.Fragment>
                        <div className="sort">
                            <input type="button" onClick={() => this.sortHandle('login')} defaultValue="Сортировка по имени" />
                            <input type="button" onClick={() => this.sortHandle('id')} defaultValue="Сортировка по ID" />
                        </div>
                    </React.Fragment>
                }
                <div className='listOfFollowers'>
                    {this.state.data.length > 0 &&
                        this.state.data.map((item) => {
                            return (
                                <div key={item.id} className="follower__user">
                                    <div className="follower__avatar">
                                        <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                                            <img src={item.avatar_url} alt={item.login}/>
                                        </a>
                                        <p>{item.login}</p>
                                        <input onClick={this.clickHandle} data_url={item.url} type="button" rel="getdata" value="Подробнее" />
                                    </div>
                                </div>
                            )
                        })
                    }
                    {this.state.data.length < 1 &&
                        <div>У пользователя нет подписчиков</div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default ListOfFllowers;