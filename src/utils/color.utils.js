export function brandColor(request) {
    if (request.requestBrand.includes('Whirlpool')) {
        return 'badge badge-warning';
    }

    if (request.requestBrand.includes('Kitchen')) {
        return 'badge badge-danger';
    }

    if (request.requestBrand.includes('Maytag')) {
        return 'badge badge-primary';
    }

    if (request.requestBrand.includes('Acros')) {
        return 'badge badge-info';
    }

    if (request.requestBrand.includes('Compra')) {
        return 'badge badge-success';
    }

    if (request.requestBrand.includes('Tienda')) {
        return 'badge badge-secondary';
    }
}

export function typeColor(request) {
    switch(request.requestType) {
        case 'Website improvement':
            return 'badge badge-info'
        case 'I want to measure something':
            return 'badge badge-primary'
        case 'Project':
            return 'badge badge-success'
        case 'Automation - Data/Process':
            return 'badge badge-danger'
    }
}

export function statusColor(request) {
    switch(request.requestStatus) {
        case 'Done':
            return 'badge badge-success';

        case 'Requested':
            return 'badge badge-secondary';

        case 'requested':
            return 'badge badge-secondary';

        case 'processing':
            return 'badge badge-primary';

        case 'InProgress':
            return 'badge badge-warning';

        case 'Fix':
            return 'badge badge-danger';

        case 'QA':
            return 'badge badge-dark';

        case 'Go-live':
            return 'badge badge-info';
    }
}