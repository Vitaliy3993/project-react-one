import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [ // Легше створити масив даних, ніж постійно змінювати верстку
        {name: 'all', label: 'Все сотрудники'},
        {name: 'like', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/П больше 1000$'}
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name; // Умова, яка повертає або true або false в active
        const clazz = active ? 'btn-light' : 'btn-outline-light'; // Якщо умова true, то кнопка активна буде з 1 класом, навпаки - з другим
        return (
            <button type="button"
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onFilterSelect(name)} // Робимо через =>, бо треба передати аргумент
                    > 
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;