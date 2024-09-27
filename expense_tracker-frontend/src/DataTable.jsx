import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DataTable.css';

const DataTable = ({ data }) => {
    const categories = ['Food', 'Travel', 'Entertainment', 'Health', 'Other'];
    const [sortColumn, setSortColumn] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleSort = (column) => {
        if (sortColumn === column) {
            // Toggle sort order if the same column is clicked
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort column and default sort order
            setSortColumn(column);
            setSortOrder('desc');
        }
    };

    // Prepare data entries
    const dataEntries = Object.keys(data).map((date) => {
        const { category_map, total } = data[date];
        const entry = {
            date,
            total,
        };
        categories.forEach((category) => {
            entry[category] = category_map[category] || 0;
        });
        return entry;
    });

    // Sort data entries
    const sortedData = dataEntries.sort((a, b) => {
        let valueA = a[sortColumn];
        let valueB = b[sortColumn];

        // Handle Date separately
        if (sortColumn === 'date') {
            valueA = new Date(a.date);
            valueB = new Date(b.date);
        }

        if (valueA < valueB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const columns = [
        { label: 'Date', key: 'date' },
        ...categories.map((category) => ({ label: category, key: category })),
        { label: 'Total', key: 'total' },
    ];

    return (
        <table className="data-table">
            <thead>
            <tr>
                {columns.map((column) => {
                    let arrow = '△'; // Default outline arrow
                    if (sortColumn === column.key) {
                        // Filled arrow for sorted column
                        arrow = sortOrder === 'asc' ? '▲' : '▼';
                    }
                    return (
                        <th
                            key={column.key}
                            onClick={() => handleSort(column.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {column.label} {arrow}
                        </th>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {sortedData.map((entry) => (
                <tr key={entry.date}>
                    {columns.map((column) => (
                        <td key={column.key}>{entry[column.key]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

DataTable.propTypes = {
    data: PropTypes.objectOf(
        PropTypes.shape({
            category_map: PropTypes.objectOf(PropTypes.number).isRequired,
            total: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default DataTable;
