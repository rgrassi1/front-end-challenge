import React, { useState, useEffect } from 'react';
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import Table from '../../components/table';

export default function DocumentMasterlist() {
    const [documents, setDocuments] = useState([]);

    function documentsToDataTable(documents = []) {
        return documents.map(document => {
            return { 
                ...document, 
                'processes-text': document.processes.map((process, idx, processes) => { 
                    return (processes.length === idx + 1) ? process.name : process.name + ', '
                })
            }
        })
    } 

    useEffect(() => {
        api.get('/documents')
            .then(response => setDocuments(documentsToDataTable(response.data)))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <PageHeader title="Masterlist" />
            <PageContent>
                <Table 
                    header={[
                        {title: 'Code', column: 'code'},
                        {title: 'Title', column: 'title'},
                        {title: 'Release date', column: 'release-date'},
                        {title: 'Processes', column: 'processes-text'},                    
                    ]}
                    rows={documents}
                />
            </PageContent>    
        </div>
    )
}