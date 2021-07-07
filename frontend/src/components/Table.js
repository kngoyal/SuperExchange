import React, { useState, useEffect } from 'react'

export default function Table({name, rows: parentRows, header, headerLength}) {

    const [rows, setRows] = useState(parentRows);

    useEffect(() => {
        console.log(parentRows);
        setRows(parentRows);
        }, [parentRows]);


   const renderTableData = (rows) => {
        return rows.map((row, index) => {
            var rowArray = [];

            for (var i=1; i<headerLength; i++) {
                rowArray.push(<td key={name+'-col-'+i}>{row[header[i]]}</td>)
            }
            return (
                <tr key={name+'-row-'+index}>
                    {rowArray}
                </tr>
            )
        })
    }

    const renderTableHeader = (rows) => {
        let renderHeader = header.slice(1, headerLength);
        return renderHeader.map((key, index) => {
           return <th key={name+'-'+key+'-'+index}>{key}</th>
        })
    }
  
    return (
        <div>
            <table id="table" key={name}>
                <tbody key={name+'-table'}>
                <tr key={name+'-header'}>{renderTableHeader(rows)}</tr>
                {renderTableData(rows)}
                </tbody>
            </table>
        </div>
    )
}

