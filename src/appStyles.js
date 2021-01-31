const appStyles = {
    listStyles: {
        padding: 0,
    },
    listItemStyles: {
        rootButtonContainer: {
            backgroundColor: 'white', display: 'flex', width: '100%', borderWidth: 4, borderColor: '#636e72', borderRadius: 7, borderStyle: 'solid', flexDirection: 'row', marginTop: 20, padding: 0
        },
        image: {
            height: 300, alignSelf: 'center'
        },
        textContainer: {
            marginLeft: 50, marginRight: 50, display: 'flex', flexDirection: 'column', textAlign: 'start'
        },
    },
    recipeStyles: {
        rootContainer: {
            backgroundColor: 'white', display: 'flex', height: '100%', width: '100%', borderColor: '#636e72', borderWidth: 4, borderRadius: 7, borderStyle: 'solid', flexDirection: 'row', marginTop: 20, paddingBottom: 50
        },
        leftColumnContainer: {
            flexDirection: 'column', display: 'flex',
        },
        image: {
            height: 500,
        },
        leftColumnTextContainer: {
            marginLeft: 50, flexDirection: 'column', display: 'flex',
        },
        leftColumnText: {
            fontSize: 25 , marginTop: 30,
        },
        rightColumnContainer: {
            marginLeft: 50, marginRight: 50, display: 'flex', flex: 1, flexDirection: 'column', height: '100%', justifyContent: 'center', textAlign: 'start',
        }
    }
}

export default appStyles;