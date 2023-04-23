import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
      },

    mapContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 300,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    searchButton: {
       
      backgroundColor: '#666',
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });