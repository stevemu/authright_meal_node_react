export default {
    container: {
        height: '100vh',
        fontFamily: 'Open Sans',
        display: 'grid',
        gridTemplateRows: '8% 92%',
      },
    nav: {
        gridRow: '1/2',
    },
    content: {
        gridRow: '2/3',
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        // border: '1px solid lightgrey',
    },
    info: {
        gridColumn: '1/2',
        display: 'grid',
        gridTemplateRows: '30% 70%',
    },
    restaurant: {
        gridRow: '1/2',
    },
    menu: {
        gridRow: '2/3',
    },
    order: {
        gridColumn: '2/3',
        display: 'grid',
        gridTemplateRows: '10% 80% 10%',
    }
}