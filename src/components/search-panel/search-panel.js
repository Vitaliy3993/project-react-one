import { Component } from 'react'; // потрібен стан, тому підключаємо це і робимо компонент класом

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '' // Це стан, який треба перекинути на app.js
        }
    }

    onUpdateSearch = (e) => { // Локальна функція
        const term = e.target.value;
        this.setState({term}); 
        this.props.onUpdateSearch(term); // Глобальна функція. Стан викидуємо наверх в app.js
    }

    render() {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    value={this.state.term}
                    onChange={this.onUpdateSearch}/>
        )
    }
}

export default SearchPanel;