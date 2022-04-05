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
      ]
    };
    
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

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
    if (newItem.name !== '' || newItem.salary !== '') {
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

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList 
            data={this.state.data}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
