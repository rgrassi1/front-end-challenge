import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';
import api from '../../api';
import DocumentMasterlist from '.';

var mockedDocuments = [
    {
        "id": 1,
        "code": "PO001",
        "title": "Safety and mission assurance",
        "active": true,
        "published": true,
        "release-date": "02/12/2019",
        "processes": [
            {
                "id": 1,
                "name": "Production"
            },
            {
                "id": 2,
                "name": "Quality Management"
            }
        ]
    },
    {
        "id": 2,
        "code": "PO002",
        "title": "Software assurance research program",
        "active": true,
        "published": true,
        "release-date": "12/12/2019",
        "processes": [
            {
                "id": 3,
                "name": "Sales"
            },
        ]
    }
]

describe('Masterlist', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet(/.*\/documents.*/).reply(200, mockedDocuments)
    })

    it('should render page title', () => {
        render(<DocumentMasterlist />);
        expect(screen.getByText("Masterlist")).toBeInTheDocument()
    });

    it('should render all headers', async () => {
        render(<DocumentMasterlist />);

        const title = await screen.findByRole('columnheader', { name: 'Title' })
        const code = await screen.findByRole('columnheader', { name: 'Code' })
        const releaseDate = await screen.findByRole('columnheader', { name: 'Release date' })
        const process = await screen.findByRole('columnheader', { name: 'Processes' })

        expect(title).toBeInTheDocument();
        expect(code).toBeInTheDocument();
        expect(releaseDate).toBeInTheDocument();
        expect(process).toBeInTheDocument();
    })
});