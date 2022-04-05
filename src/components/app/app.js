import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, id: 1, like: true},
        {name: 'Alex V.', salary: 4000, increase: true, id: 2, like: false},
        {name: 'Carl O.', salary: 15000, increase: false, id: 3, like: false},
      ],
      term: '',
      filter: 'all'
    };
    
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      // const index = data.findIndex(elem => elem.id === id); // Спосіб №1

      /* const before = data.slice(0, index); 
      const after = data.slice(index + 1);

      const newArray = [...before, ...after]; */

      return {
        data: data.filter(item => item.id !== id)
      }
    }) 
  }

  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        id: this.maxId++
    }
    if (newItem.name !== '' && newItem.salary !== '') {
      this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
      });
    }
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  // Функція пошуку букв, які вводяться з data.name
  searchEmp = (items, term) => {  // items - рядок, по якому шукаємо; term - масив даних, який фільтруємо
    if (term.length == 0) {
      return items; // Коли видаляємо рядок і він пустий, то нічого не робимо
    }

    return items.filter(item => { // Беремо name і шукаємо подібність з term (кусочок рядка, який приходить)
      return item.name.indexOf(term) > -1 // Якщо пусто, то виводить -1, тому зараз буде виводити все, що не пусто
    }) // Повертає масив тих елементів, які підходять по пошуку. Це пошук букв у всьому слові, а не початку.
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  // Фільтр списків
  filterPost = (items, filter) => { // items - масив наш; filter - сам фільтр.
    switch (filter) {
      case 'like':
        return items.filter(item => item.like); // Повертає елементи like зі значенням true. if (item.like) return
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => { // Якщо є on..., то це ті дії, які робить користувач
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter); // Зараз це подвійна фільтрація (по пошуку і по критеріям) Приходить масив, відфільтрований від іншого компоненту

    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased}/>

          <div className="search-panel">
              <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
