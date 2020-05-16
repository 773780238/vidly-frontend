import React from "react";
import _ from  "lodash";
import {func, number} from "prop-types";
const Pagination = (props) => {
        const {itemsCount, pageSize, onPageChange, currentPage} = props;
        const pageCount = Math.ceil(itemsCount / pageSize);
        if(pageCount === 1)return null;
        const pages = _.range(1, pageCount + 1);

        return(
            <nav>
                <ul className="pagination">
                {pages.map(page =>
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                        <a onClick={() => onPageChange(page)} className="page-link">{page}</a>
                    </li>
                )}
                </ul>
            </nav>
        );

}

Pagination.propTypes = {
        itemsCount: number.isRequired, pageSize: number.isRequired, onPageChange: func.isRequired, currentPage: number.isRequired
}

export default Pagination;