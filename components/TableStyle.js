const styles = ({
    page: {
      backgroundColor: 'white',
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: 'black',
      color: 'white',
      height: 40,
      fontSize: 14,
    },
    tableColHeader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tableColHeaderLabel: {
      color: 'white',
      // fontSize: 18,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      height: 50,
    },
    tableColData: {
      flex:1,
      justifyContent: "center",
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      fontSize: 12
    },
    tableColDataLabel: {
      // fontSize: 14,
    },
  });

  export default styles;
