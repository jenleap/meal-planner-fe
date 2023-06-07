import React from 'react';
import { Pagination, Button } from 'react-bootstrap';

type PaginateProps = {
    itemCall: (x: number) => void;
    totalPages: number;
    page: number;
}

const Paginate = ({ itemCall, totalPages, page}: PaginateProps) => {
    return (
    <>
        {
            totalPages > 1 && (
                <Pagination className="mt-3">
                    {[...Array(totalPages).keys()].map(x => (
                            <Pagination.Item 
                                active={x + 1 === page}
                                key={x + 1}
                                onClick={() => itemCall(x + 1)}>
                                {x + 1}
                            </Pagination.Item>
                    ))}
                </Pagination>
            )
        }
    </>
    )
}

export default Paginate;
