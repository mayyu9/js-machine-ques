import React, {useState, useEffect} from 'react';
 
const AutoCompleteSearch = () => {

    const [input, setInput] = useState("")
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
     const [cache, setCache] = useState({}); // local state cache

    const fetchData = async () => {
         if (cache[input]) {
            setResults(cache[input]);
            return;
        }

        const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
        const json = await data.json();
        setResults(json?.recipes);
        setCache((prev) => ({...prev, [input]: json?.recipes}));
    }

    const handleSuggestions = (e, selectedVal) => {
        console.log("thakur suggestion: ", selectedVal);
        setInput(selectedVal);
    };

    useEffect( () => {
        const timer = setTimeout(fetchData(), 300); // added debounce

        return () => {
            clearTimeout(timer);
        }
    }, [input]);


    return (
        <div>
            AutoComplete Search Bar

            <div>
                <input type="text" className='search-text' value={input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setShowResults(true)}
                onBlur={() => setShowResults(false)}
                />
                {showResults && (
                <div className='results-container'>
                    {results.map( (r) => <span className='result'
                        onClick={(e) => handleSuggestions(e, r.name)}
                        role="button"
                        key={r.id}
                        >
                            {r.name}
                        </span>)
                    }
                </div>
                )}
            </div>
            
        </div>
    );
}
 
 
export default AutoCompleteSearch;