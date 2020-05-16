import React from "react";


const Filter = ({genres, onFilter, textProperty, idProperty, selectedGenre}) => {

    return(
        <ul className="list-group">
            {genres.map(genre => <li key={genre[idProperty]}
                                     onClick={() => onFilter(genre)}
                                     className={genre === selectedGenre ? "list-group-item active": "list-group-item"}>
                {genre[textProperty]}
            </li> )}
        </ul>
    );
}
Filter.defaultProps = {
    textProperty: "name",
    idProperty: "_id"
}
export default Filter;