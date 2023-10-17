import { StyleSheet } from 'react-native';

const baseContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const baseText = {
  fontFamily: 'Montserrat',
  fontSize: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'Barlow-ExtraLight',
    color: 'rgb(12, 9, 9)',
    backgroundColor: '#ffffff',
  },
  app: {
    ...baseContainer,
    padding: 20,
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: 10,
  },
  languageSelection: {
    ...baseText,
    justifyContent: 'space-between',
  },
  languageSelectorImage: {
    width: 50,
    marginHorizontal: 10,
  },
  logoContainerLogo: {
    width: '100%', 
    marginBottom: 10,
  },
  container: {
    width: '80%',
  },
  languageSelectionContainer: {
    ...baseContainer,
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  chatModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    ...baseContainer,
    justifyContent: 'center',
    padding: 20,
  },
  inputButtonContainer: {
    ...baseContainer,
    justifyContent: 'space-between',
  },
  enlargedTextarea: {
    flexGrow: 1,
    marginRight: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#007BFF',
    color: 'white',
  },
  centerButton: {
    textAlign: 'center',
    marginTop: 10,
  },
  chatForm: {
    ...baseContainer,
  },
  chatContainer: {
    width: '100%',
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    marginBottom: 10,
  },

  error: {
    color: 'red',
    marginTop: 10,
  },
  generatedContent: {
    marginTop: 20,
    backgroundColor: '#2c2c2c',
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
  flags: {
    ...baseContainer,
    justifyContent: 'center',
  },
  flagHover: {
    transform: [{ scale: 1.1 }],
  },
  footer: {
    backgroundColor: '#ffffff',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  signature: {
    marginTop: 50,
    textAlign: 'center',
    ...baseContainer,
  },
});

export default styles;
