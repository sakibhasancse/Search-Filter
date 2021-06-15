import React, { useState, useEffect } from 'react';

const Home = () => {
    const [error, setError] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [searchParams] = useState(["capital", "name"]);
    const [filterParams ,setFilterParams] = useState(['All'])

    useEffect(() => {
         fetch("https://restcountries.eu/rest/v2/all")
                .then((res) => res.json())
            .then(result => {
                setIsLoaded(true);
                setItems(result)

            }, (error) => {
                console.log(error)
                setError(error)
                setIsLoaded(true);
            })


    }, [])


    // This function takes in our fetched items and returns all the items that match anything in our searchParam array if the indexOF() is > -1.
    function searchs(items) {
        return items.filter(item => {
            return searchParams.some(newItem => {
                return (
                    
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) > -1
                )

            })
        })
    }
    
    const isError = () => error && (<div>Error: {error}</div>)
    const isLoading = () => !isLoaded && (<div>Loading...</div>);
    const searchFilter = () => {
        return (
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        id="search-form"
                        placeholder="Search for..."
                        value={search}
                        className="search-input"
                        onChange={(e)=> setSearch(e.target.value)}
                    
                    />
                     <span className="sr-only">Search countries here</span>
                </label>
            </div>
        )
    }
    const rigionFilter = () => {
        return (
            <select name="" id="">
                <option value="">Amirica</option>
            </select>
        )
    }
    const allItems = () => (
        items && searchs(items).map((item, i) => (

            <li>

                <article className="card" key={item.callingCodes}>
                    <div className="card-image">
                        <img src={item.flag} alt={item.name}/>
                    </div>
                    <div className="card-content">
                        <h2 className="card-name">{ item.name}</h2>
                        <ol className="card-list">
                            <li>
                                population: {" "}
                                 <span>{item.population}</span>
                            </li>
                            <li>Rigion: {item.rigion} </li>
                            <li>Capital: { item.capital}</li>
                        </ol>
                    </div>
                </article>
                </li>
        ))
    )
    return (
        <div>
            {isError()}
            {isLoading()}
            <div className="wrapper">
                {searchFilter()}
                <ul className="card-grid">
                {allItems()}
                </ul>
            </div>
        </div>
    );
}

export default Home;
