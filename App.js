import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styles from './style.js'; 
import { useRef } from 'react';

if (__DEV__) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}




function App() {
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [counselor, setCounselor] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [language, setLanguage] = useState('fr');
  const [page, setPage] = useState('home');
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const scrollViewRef = useRef();

  <ScrollView 
  style={styles.scrollView} 
  ref={scrollViewRef}
  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
>
  {chatHistory.map((chat, i) => (
    chat.content.includes('https://temu.com') ? (
      <TouchableOpacity key={i} onPress={() => Linking.openURL(chat.content.match(/https:\/\/temu\.com\/[a-zA-Z0-9/-]+/)[0])}>
        <Text style={chat.role === 'system' ? styles.systemChatText : styles.userChatText}>{chat.content}</Text>
      </TouchableOpacity>
    ) : (
      <Text style={chat.role === 'system' ? styles.systemChatText : styles.userChatText} key={i}>{chat.content}</Text>
    )
  ))}
</ScrollView>





  const counselorImages = {
    Emmanuel: "https://storage.googleapis.com/imagespardonetmerci/Emmanuel.jpg",
    Yasmina: "https://storage.googleapis.com/imagespardonetmerci/Yasmina.jpg"
  };

  
// La variable pour selectionner un conseiller

const handleImageClick = (selectedCounselor) => {
  console.log("handleImageClick is called with counselor:", selectedCounselor);
  setCounselor(selectedCounselor);
  setShowChat(true);
  setPage('chatPage');  // Ajoutez cette ligne pour changer la page au chat
  setCurrentQuestionIndex(0);

  const initialMessageContent = staticQuestions[0].content.replace('[counselor]', selectedCounselor);
  addSystemMessage({ role: 'system', content: initialMessageContent });
};



const staticQuestionsFR = [
  { role: "system", content: 'Bonjour, je suis [counselor] de Pardon et Merci. Pour commencer, comment vous appelez-vous ?' },
  { role: "system", content: '🚫 Avertissement: il est strictement interdit d\'utiliser cette application à des fins illicites (santé, sexualité, mort...). Etes-vous d\'accord ?' },
  { role: "system", content: 'Bien. Quelle erreur avez-vous commise pour laquelle vous souhaitez présenter vos excuses ?' },
  { role: "system", content: 'Pouvez-vous m\'en dire davantage sur ce qui s\'est passé et quand cela s\'est-il produit ? Comment se nomme la personne concernée ?' },
  { role: "system", content: 'Quel ton souhaitez-vous pour votre message : sérieux, drôle, ou fou ? Faut-il utiliser un langage formel (vous) ou informel (tu) ?' },
  { role: "system", content: 'Quelle longueur préférez-vous pour votre message : long, moyen, ou court ?' },
  { role: "system", content: 'Quelque chose d\'autre à ajouter ? Si oui, dites-nous. Si non, écrivez non.' },
  { role: "system", content: 'Veuillez indiquer votre adresse mail pour recevoir le message d\'excuses 📧.' },
  { role: "system", content: 'Surprise ! 🎁 Voici 200 euros de crédits TEMU à dépenser sans attendre : https://temu.com/u/5bgaYy50bMLaU. Qu\'est-ce qu\'on dit ?' },
  { role: "system", content: 'Dernière étape pour la réconciliation ! Pour recevoir votre message, complétez : Pardon et...' }
];

const staticQuestionsEN = [
  { role: "system", content: 'Hello, I am [counselor] from Pardon and Merci. First off, what\'s your name?' },
  { role: "system", content: '🚫 Warning: it is strictly forbidden to use this application for illicit purposes (health, sexuality, death...). Do you agree?' },
  { role: "system", content: 'Good. What mistake have you made that you wish to apologize for?' },
  { role: "system", content: 'Can you tell me more about what happened and when it took place? What\'s the name of the person involved?' },
  { role: "system", content: 'What tone would you like for your message: serious, funny, or crazy? Should I use formal (you) or informal (you) language?' },
  { role: "system", content: 'How long would you like your message to be: long, medium, or short?' },
  { role: "system", content: 'Anything else you want to add? If yes, please tell us. If not, write no.' },
  { role: "system", content: 'Please provide your email address to receive the apology message 📧.' },
  { role: "system", content: 'Surprise! 🎁 Here\'s 200 euros in TEMU credits for you to spend right away: https://temu.com/u/5bgaYy50bMLaU. What do we say?(in french)' },
  { role: "system", content: 'Here we go again! To receive your message, complete: Pardon et...' }
];



const [staticQuestions, setStaticQuestions] = useState(staticQuestionsFR); 

useEffect(() => {
  setStaticQuestions(language === 'fr' ? staticQuestionsFR : staticQuestionsEN);
}, [language]);
 

  
  
// La fonction pour appeler la question suivante jusqu'a declencher la fonciton sendrequestochatpgt

function nextQuestion() {
  console.log('Entering nextQuestion');
  const nextIndex = currentQuestionIndex + 1;
  console.log(nextIndex)
  console.log(staticQuestions.length)
  if (nextIndex < staticQuestions.length) {
    // Ajoutez la question suivante à l'historique du chat
    addSystemMessage(staticQuestions[nextIndex]);
    setCurrentQuestionIndex(nextIndex);
    
  } else {
    // Toutes les questions ont été posées, vous pouvez appeler sendRequestToChatGPT
    sendRequestToChatGPT();
  }
}
  // Ajout des logs pour vérifier les valeurs de currentQuestionIndex et staticQuestions.length
console.log(`currentQuestionIndex: ${currentQuestionIndex}, staticQuestions.length: ${staticQuestions.length}`);

const addSystemMessage = (text) => {
  setChatHistory((prevChatHistory) => [...prevChatHistory, { role: 'system', content: text.content }]);
};

const handleChatSubmit = (e) => {
  e.preventDefault();
  setErrorMessage('');
  const userText = chatInput.trim();
  if (userText !== '') {
    const newUserMessage = { role: 'user', content: userText };
    setChatHistory((prevChatHistory) => [...prevChatHistory, newUserMessage]);

    // Ajustez cette condition ici
    if (userText.toLowerCase() === 'merci' && currentQuestionIndex === staticQuestions.length - 1) {
      addSystemMessage({ role: 'system', content: 'Merci ;) Checkez votre boite mail à présent 📩' });
    }

    setChatInput('');
    nextQuestion();
  }
};


const sendRequestToChatGPT = async () => {
  console.log('sendRequestToChatGPT is called');
  try {
    const finalInstruction = { role: "system", content: "Maintenant, veuillez rédiger un message d'excuse pour l'utilisateur en fonction des informations fournies." };
    const finalChatHistory = [...chatHistory, finalInstruction];

    const requestBody = {
      conversation: finalChatHistory,
      counselor: counselor,
      language: language
    };

    console.log('Corps de la requête :', requestBody);

    fetch('https://vps.pardonetmerci.com/generateText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        response.text().then(text => {
          console.error('Erreur de réseau:', response.status, text);
          setErrorMessage(`Erreur réseau. Statut: ${response.status}, Message: ${text}`);
        });
        throw Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.log('Erreur :', error);
      setErrorMessage(`Une erreur s'est produite : ${error.message}`);
    });
    

  } catch (err) {
    console.error('Error communicating with the server:', err);
    setErrorMessage('Error while trying to communicate with the server. Please try again later.');
  }
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {page === 'home' && (
        <>
          <View style={{ position: 'absolute', top: -50, left: 0, right: 0, height: '50%', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              source={{ uri: "https://storage.googleapis.com/imagespardonetmerci/Pardon.png" }}
              onLoad={() => console.log("Logo image loaded successfully")}
              onError={() => console.log("Error loading logo image")}
              
            />

          </View>
  
          <View style={{ flexDirection: 'row', marginTop: 100 }}> 
          <TouchableOpacity onPress={() => {
    console.log('Flag clicked');
    setPage('frenchPage');
}}>
              <Image
                style={{ width: 100, height: 100, marginRight: 10 }}
                source={{ uri: "https://storage.googleapis.com/imagespardonetmerci/france_flag.jpg" }} 
              />
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => setPage('englishPage')}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri:  "https://storage.googleapis.com/imagespardonetmerci/uk_flag.jpg" }}
              />
            </TouchableOpacity>
          </View>
          
        </>
      )}

    {page === 'frenchPage' && (
      <View style={{ backgroundColor: 'transparent' }}>
      <View style={{ top: -200, left: 0, right: 0 }}> 
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Choisissez votre conseiller:</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity  onPress={() => handleImageClick('Emmanuel')}>
            <Image 
              source={{ uri: "https://storage.googleapis.com/imagespardonetmerci/Emmanuel.jpg" }} 
              style={{ width: 100, height: 100, marginRight: 10 }} 
              onLoad={() => console.log('Image Emmanuel chargée avec succès')}
              onError={(e) => console.log('Erreur lors du chargement de l’image Emmanuel:', e.nativeEvent.error)}
            />
      <Text style={{ textAlign: 'center' }}>Emmanuel</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => handleImageClick('Yasmina')}>
            <Image 
              source={{ uri: "https://storage.googleapis.com/imagespardonetmerci/Yasmina.jpg" }} 
              style={{ width: 100, height: 100, marginRight: 10 }}
              onLoad={() => console.log('Image Yasmina chargée avec succès')}
              onError={(e) => console.log('Erreur lors du chargement de l’image Yasmina:', e.nativeEvent.error)}
            />
      <Text style={{ textAlign: 'center' }}>Yasmina</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      
    )}

  {page === 'englishPage' && (
    <View style={{ backgroundColor: 'transparent' }}>
    <View style={{ top: -200, left: 0, right: 0 }}> 
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Now choose a counselor:</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity  onPress={() => handleImageClick('Emmanuel')}>
          <Image 
            source={{ uri: "https://storage.googleapis.com/imagespardonetmerci/Emmanuel.jpg" }} 
            style={{ width: 100, height: 100, marginRight: 10 }} 
            onLoad={() => console.log('Image Emmanuel chargée avec succès')}
            onError={(e) => console.log('Erreur lors du chargement de l’image Emmanuel:', e.nativeEvent.error)}
          />
    <Text style={{ textAlign: 'center' }}>Emmanuel</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => handleImageClick('Yasmina')}>
          <Image 
            source={{ uri: "https://storage.googleapis.com/imagespardonetmerci/Yasmina.jpg" }} 
            style={{ width: 100, height: 100, marginRight: 10 }}
            onLoad={() => console.log('Image Yasmina chargée avec succès')}
            onError={(e) => console.log('Erreur lors du chargement de l’image Yasmina:', e.nativeEvent.error)}
          />
    <Text style={{ textAlign: 'center' }}>Yasmina</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

{page === 'chatPage' && (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
    <View style={styles.chatContainer}>
      {counselor && (
        <Image 
          source={{ uri: counselorImages[counselor] }} 
          style={{ 
            width: 100, 
            height: 100, 
            position: 'absolute', 
            left: '50%',
            top: -200,
            transform: [
              { translateX: -50 },
              { translateY: -50 },
            ],
          }} 
        />
      )}

      <ScrollView 
        style={styles.scrollView} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {chatHistory.map((chat, i) => (
          <Text style={chat.role === 'system' ? styles.systemChatText : styles.userChatText} key={i}>{chat.content}</Text>
        ))}
      </ScrollView>

      <TextInput
    style={styles.textInput}
    value={chatInput}
    onChangeText={(text) => setChatInput(text)}
    onSubmitEditing={handleChatSubmit} 
    blurOnSubmit={false}  // Ajoutez cette ligne
/>


      <TouchableOpacity style={styles.sendButton} onPress={handleChatSubmit}>
        <Text style={{ textAlign: 'center' }}>Envoyer</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  </KeyboardAvoidingView>
)}


        <Text style={styles.footer}>Pardon & Merci &copy; 2023</Text>
        {showThankYouMessage && (
          <Text style={styles.thankYouMessage}>Merci d'avoir utilisé Pardon & Merci !</Text>
        )}
      </View> 
  );
      }
export default App;